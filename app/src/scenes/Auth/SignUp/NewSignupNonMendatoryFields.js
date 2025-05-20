import React, {useState, useContext} from 'react';
import {Text, View, Platform} from 'react-native';
import {AuthContext} from '../../../context/auth/AuthContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import CheckBox from '@react-native-community/checkbox';
import analytics from '@react-native-firebase/analytics';

/* -------------------------------------------------------------------------- */
/*                                local imports                               */
/* -------------------------------------------------------------------------- */
import {
  BackHeader,
  CModal,
  RootView,
  SimpleButton,
} from '../../../components/index';
import R from '../../../R';
import styles from './SignUpStyle';
import {
  USER_APP_ID,
  USER_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  FCM_BASE_OPEN_API_URL,
} from '../../../utils/Constants';
import {horizontalScale} from '../../../../res/scale';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {useFocusEffect} from '@react-navigation/native';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {CustomDatePicker} from '../../../components/CustomDatePicker';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import {Image} from 'react-native';

export const NewSignupNonMendatoryFields = ({navigation, route}) => {
  const CleverTap = require('clevertap-react-native');
  const {authAction, authState} = useContext(AuthContext);

  const [tncSelection, setTncSelection] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [date, setDate] = useState(new Date());
  const [Adate, setADate] = useState(new Date());
  const [newDate, setnewDate] = useState(null);
  const [AnewDate, setAnewDate] = useState(null);
  const [apinewDate, setapinewDate] = useState(null);
  const [apiAnewDate, setapiAnewDate] = useState(null);

  const [SignupLoader, setSignupLoader] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [SuccessModalMessage, setSuccessModalMessage] = useState(null);
  const [SuccessModaldwg_point, setSuccessModaldwg_point] = useState(null);
  const [ageristriction, setAgeristriction] = useState(18);
  const [dobCompulsion, setBobCompulsion] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // getDatabaseValue();
      ScreenAnalytics('Sign_Up', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});

      return () => {};
    }, []),
  );

  const getDatabaseValue = () => {
    setShowLoader(true);
    const database = firebase
      .app()
      .database('https://nexusone-5f77e-default-rtdb.firebaseio.com/');

    database
      .ref('nexusone')

      .once('value')
      .then((snapshot) => {
        setAgeristriction(snapshot.toJSON().appConfig.ageRestrictionValue);
        setBobCompulsion(snapshot.toJSON().appConfig.dobCompulsion);
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  // ***********************  Validation  *****************************
  //////////////// Age Validation code ///////////
  function isOlderThanAgeRestriction(dateOfBirth, ageRestriction) {
    //const birthDate = new Date(dateOfBirth); // Convert the dateOfBirth string to a Date object

    let date_parts = dateOfBirth.split('-');
    let year = date_parts[2];
    let month = date_parts[1];
    let day = date_parts[0];
    const currentDate = new Date();

    // Calculate the age difference in years
    const ageDiff = currentDate.getFullYear() - year;

    // Check if the birthday has already occurred this year

    const hasBirthdayOccurred =
      currentDate.getMonth() + 1 > month ||
      (currentDate.getMonth() + 1 === month && currentDate.getDate() >= day);

    // Adjust the age difference if the birthday has not occurred yet this year
    const adjustedAgeDiff = hasBirthdayOccurred ? ageDiff : ageDiff - 1;

    // Compare the adjusted age difference with the age restriction
    return adjustedAgeDiff >= ageRestriction;
  }

  const validate = () => {
    if (
      newDate != null &&
      !isOlderThanAgeRestriction(newDate, ageristriction)
    ) {
      setErrorModalMessage(
        'Please enter a valid date of birth. You must be 18 years or above to register on NexusOne App !!',
      );
      setShowErrorModal(true);
    } else if (tncSelection === false) {
      setErrorModalMessage(
        'Please click on checkbox and accept the Terms and Conditions !!',
      );
      setShowErrorModal(true);
    } else {
      signUpVersionTwo();
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                           get party data api call                          */
  /* -------------------------------------------------------------------------- */
  const getPartyData = async (userResponse, fcmToken) => {
    setShowLoader(true);

    const userData = {
      email: userResponse.data.user?.email,
      firstName: userResponse.data.user?.firstName,
      fullName: userResponse.data.user?.fullName,
      imageUrl: userResponse.data.user?.imageUrl,
      lastName: userResponse.data.user?.lastName,
      mobilePhone: userResponse.data.user?.mobilePhone,
      data: {
        birthDate: userResponse.data.user?.birthDate,
        userDOA: userResponse.data.user?.userDOA,
        userGender: userResponse.data.user?.userGender,
        country_Code: userResponse.data.user?.country_Code,
      },
      id: userResponse.data.user?.id,
    };

    let userInfo = {
      ...authState,
      isLogInSkipped: false,
      userToken: userResponse?.data?.responseMap?.accessToken,
      userId: userResponse?.data?.responseMap?.userId,
      userObject: userData,
      PartyCode: userResponse?.data?.partyId,
      partyCode: userResponse?.data?.partyId,
      fcmTokenDetails: {
        fcmToken: fcmToken,
        fcmTokenId: userResponse?.data?.pushNotificationId,
      },
    };

    setShowLoader(false);

    await authAction.setData(userInfo);

    var props = {
      identity: userResponse?.data?.partyId,
      Name: userResponse.data.user?.fullName,
      Email: userResponse.data.user?.email,
      Phone: userResponse.data.user?.mobilePhone,
      'Default Mall': authState?.mallDetails?.oko_Row_Desc,
      'Signup Date': new Date(),
      'User Status': 'ACTIVE',
      'MSG-whatsapp': true,
    };

    if (
      userResponse.data?.user?.userGender.toString() &&
      userResponse.data?.user?.userGender.toString() != 'null'
    ) {
      userResponse.data.user?.userGender.toString() == '0'
        ? (props.Gender = 'F')
        : userResponse.data.user?.userGender.toString() == '1'
        ? (props.Gender = 'M')
        : (props.Gender = 'O');
    }

    if (
      userResponse.data?.user?.birthDate &&
      userResponse.data?.user?.birthDate != 'null'
    ) {
      props['Date Of Birth'] = new Date(userResponse.data.user?.birthDate);
    }
    if (
      userResponse.data?.user?.userDOA &&
      userResponse.data?.user?.userDOA != 'null'
    ) {
      props['Anniversary Date'] = new Date(userResponse.data?.user?.userDOA);
    }
    CleverTap.onUserLogin(props);

    if (userResponse?.data?.parking_Status === 'true') {
      navigation.navigate('NewSignupVoucher', {
        isFromSocial: false,
        dwg_point:
          userResponse?.data?.dwg_point == undefined
            ? null
            : userResponse?.data?.dwg_point,
        message: userResponse?.data?.msg,
      });
    } else {
      if (userResponse?.data?.dwg_point != undefined) {
        setSuccessModaldwg_point(userResponse?.data?.dwg_point);
      }
      setShowSuccessModal(true);

      setSuccessModalMessage(
        'Congratulations the user has been created successfully',
      );
    }
  };

  const signUpVersionTwo = async () => {
    const fcmToken = await messaging().getToken();
    let deviceplatfrom = Platform.OS === 'ios' ? '2001' : '1001';
    var fullname = route.params.firstName;

    var data = JSON.stringify({
      user: {
        password: route.params.password,
        data: {
          role: 'Customer',
          role_template: 'Unregistered Sales',
          displayName: 'testinguser',
          birthDate: apinewDate,
          timezone: 'Asia/Calcutta',
          userDOA: apiAnewDate,
          userGender: selectedGender,
          favoriteColors: ['Red', 'Blue'],
          country_Code: route.params.country_Code,
          fcm_Token: fcmToken,
          platform_Desc: deviceplatfrom,
        },
        email: route.params.email,
        username: route.params.username,
        encryptionScheme: 'salted-sha256',
        factor: 24000,
        firstName: route.params.firstName.split(' ')[0],
        fullName: fullname,
        imageUrl: '',
        lastName:
          route.params.firstName.split(' ')[1] != undefined
            ? route.params.firstName.split(' ')[1]
            : '',
        middleName: 'test2',
        mobilePhone: route.params.username,
        passwordChangeRequired: false,
        preferredLanguages: ['en', 'fr'],
        twoFactorEnabled: false,
        usernameStatus: 'PENDING',
      },
    });

    var config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'SequentialSignUp?' +
          OPEN_API_TENANT_ID +
          `&user_App_ID=${USER_APP_ID}&isAuthReq=0&branch_Code=${authState?.mallDetails?.oko_Row_Code}`
        : FCM_BASE_OPEN_API_URL +
          'SequentialSignUp?' +
          OPEN_API_TENANT_ID +
          `&user_App_ID=${USER_APP_ID}&isAuthReq=0&branch_Code=${authState?.mallDetails?.oko_Row_Code}`,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'SequentialSignUp',
        event: 'SignUpScreen',
        action: 'onSubmit',
      },

      data: data,
    };
    setSignupLoader(true);
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        setShowLoader(false);

        if (response?.data?.message?.code == 0) {
          getPartyData(response.data, fcmToken);
        } else {
          setErrorModalMessage(
            'Uh oh something is not right Please try signing up again after sometime. <2411>',
          );
          setShowErrorModal(true);
        }
      })
      .catch(function (error) {
        setSignupLoader(false);
        setShowLoader(false);
        setErrorModalMessage(
          'Please wait for few minutes before you try again',
        );
        setShowErrorModal(true);
      });
  };

  // ***********************  Date Selection process *****************************
  const dateChangeFun = (date, type) => {
    var datee = date.getDate().toString().padStart(2, '0'); //Current Date
    var month = (date.getMonth() + 1).toString().padStart(2, '0'); //Current Month
    var year = date.getFullYear();
    if (type === 1) {
      // setOpen(false);
      setDate(date);
      setnewDate(datee + '-' + month + '-' + year);
      setapinewDate(year + '-' + month + '-' + datee);
    } else {
      // setAOpen(false);
      setADate(date);
      setAnewDate(datee + '-' + month + '-' + year);
      setapiAnewDate(year + '-' + month + '-' + datee);
    }
  };

  const LoaderView = () => {
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: R.colors.modalBlack,
          alignSelf: 'center',
          zIndex: 10,
        }}
      >
        <View
          style={{
            backgroundColor: R.themes.backgroundColor,
            padding: '5%',
            borderRadius: 8,
            width: horizontalScale(300),
            alignItems: 'center',
          }}
        >
          <Image
            source={R.images.loaderNexus}
            style={{width: 50, height: 50}}
          />
        </View>
      </View>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                         gender selection component                         */
  /* -------------------------------------------------------------------------- */
  const GenderSelectionRadioButton = () => {
    return (
      <View style={styles.genderSelectionMainContainer}>
        <View style={styles.radioButtonView}>
          <CheckBox
            value={selectedGender == 1}
            disabled={selectedGender == 1}
            onValueChange={() => setSelectedGender(1)}
            tintColors={{true: R.themes.darkIconColor}}
            onAnimationType={'fill'}
            offAnimationType={'fill'}
            onCheckColor={R.themes.darkIconColor}
            onTintColor={R.themes.darkIconColor}
            style={{height: R.dimensions.wp(5)}}
          />
          <Text style={styles.radioButtonText}>Male</Text>
        </View>

        <View style={styles.radioButtonView}>
          <CheckBox
            value={selectedGender == 0}
            disabled={selectedGender == 0}
            onValueChange={() => setSelectedGender(0)}
            tintColors={{true: R.themes.darkIconColor}}
            onAnimationType={'fill'}
            offAnimationType={'fill'}
            onCheckColor={R.themes.darkIconColor}
            onTintColor={R.themes.darkIconColor}
            style={{height: R.dimensions.wp(5)}}
          />

          <Text style={styles.radioButtonText}>Female</Text>
        </View>

        <View style={styles.radioButtonView}>
          <CheckBox
            value={selectedGender == 2}
            disabled={selectedGender == 2}
            onValueChange={() => setSelectedGender(2)}
            tintColors={{true: R.themes.darkIconColor}}
            onAnimationType={'fill'}
            offAnimationType={'fill'}
            onCheckColor={R.themes.darkIconColor}
            onTintColor={R.themes.darkIconColor}
            style={{height: R.dimensions.wp(5)}}
          />

          <Text style={styles.radioButtonText}>Others</Text>
        </View>
      </View>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                             main render method                             */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <BackHeader navigation={navigation} />
      <RootView>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          keyboardShouldPersistTaps={'handled'}
          enableResetScrollToCoords={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          extraHeight={10}
        >
          {ShowLoader && <LoaderView />}

          <View
            style={{
              alignSelf: 'center',
              width: '80%',
              marginHorizontal: '5%',
              marginTop: '5%',
            }}
          >
            <Text style={styles.radioButtonText}>{`Gender (Optional)`}</Text>
          </View>
          <GenderSelectionRadioButton />

          <CustomDatePicker
            text={
              newDate
                ? `Date Of Birth: ${newDate}`
                : `Date Of Birth ${dobCompulsion ? '' : '(Optional)'}`
            }
            date={date}
            onConfirm={(Adate) => {
              dateChangeFun(Adate, 1);
            }}
          />

          <CustomDatePicker
            text={
              AnewDate
                ? `Anniversary: ${AnewDate}`
                : 'Anniversary Date (Optional)'
            }
            date={Adate}
            onConfirm={(Adate) => {
              dateChangeFun(Adate, 2);
            }}
          />
          <View style={styles.radioButtonMainContainer}>
            <View style={styles.radioButtonContainer}>
              <CheckBox
                value={tncSelection}
                onValueChange={setTncSelection}
                tintColors={{true: R.themes.darkIconColor}}
                onAnimationType={'fill'}
                offAnimationType={'fill'}
                onCheckColor={R.themes.darkIconColor}
                onTintColor={R.themes.darkIconColor}
                style={{height: R.dimensions.wp(5)}}
              />
              <Text
                onPress={() => navigation.navigate('TermsConditions')}
                style={styles.radioButtonText}
              >
                By clicking "Sign-up", you agree to our {'\n'}Terms and
                Conditions
              </Text>
            </View>
          </View>
          <SimpleButton
            title={'Sign-up'}
            disabled={SignupLoader}
            onPress={() => {
              CTA_firebaseAnalytics(
                'Signup',
                'SignUp',

                authState?.mallDetails?.oko_Row_Desc,
              )
                .then((res) => {})
                .catch((e) => {});
              validate();
            }}
          />
          <CModal
            isVisible={ShowErrorModal}
            modalMsg={ErrorModalMessage}
            onPressModal={() => {
              setShowErrorModal(!ShowErrorModal);
              setSignupLoader(false);
            }}
            isForm={'Signup'}
          />
          <CModal
            isVisible={ShowSuccessModal}
            modalMsg={SuccessModalMessage}
            modaldwg_point={SuccessModaldwg_point}
            onPressModal={async () => {
              setShowSuccessModal(!ShowSuccessModal);
              await analytics()
                .logEvent('signup_event', {
                  user_ID: authState?.userId,
                  mall_name: authState?.mallDetails?.oko_Row_Desc,
                  is_loggedIn: 0,
                  app_version: DeviceInfo.getVersion,
                  device_platform: Platform.OS,
                })
                .then((res) => {})
                .catch((e) => {});
              if (authState?.mallDetails?.splashScreenStatus) {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'AuthNavigator',
                      params: {
                        screen: 'Nexus247SelectionScreen',
                        params: {
                          mallDetails: authState?.mallDetails,
                        },
                      },
                    },
                  ],
                });
              } else {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'MainNavigator',
                      params: {
                        screen: 'DrawerNavigation',
                      },
                    },
                  ],
                });
              }
              setSignupLoader(false);
            }}
            isForm={'Signup'}
          />
        </KeyboardAwareScrollView>
      </RootView>
    </>
  );
};
