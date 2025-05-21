import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Keyboard,
  Modal,
  BackHandler,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './AppleVerifyPhoneStyle';
import R from '../../../R';
import {
  SimpleButton,
  BackHeader,
  CModal,
  RootView,
} from '../../../components/index';
import {
  AUTH_BASE_URL,
  OPEN_API_TENANT_ID,
  TENANT_ID,
  USER_APP_ID,
  USER_BASE_OPEN_API_URL,
} from '../../../utils/Constants';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import messaging from '@react-native-firebase/messaging';
import {AuthContext} from '../../../context/auth/AuthContext';

import {StackActions} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import RNOtpVerify from 'react-native-otp-verify';
import {horizontalScale} from '../../../../res/scale';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import analytics from '@react-native-firebase/analytics';
import {CustomCountryCodeTextInput} from '../Login/CustomCountryCodeTextInput';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {resetNavigation} from '../../../utils/NavigationService';

export const Country_len = [
  {
    countrylen: 10,
    countryId: 118121891,
  },
];

export const SocialSignUPVerifyPage = ({route, navigation}) => {
  let timeid, sendotpTimerid, verifyOtpTimerid, checkPhoneTimerid;
  const responsedata = route.params.responsedata;
  const CleverTap = require('clevertap-react-native');

  const isfrommallSelection = route.params.isfrommallSelection;
  const {authState, authAction} = useContext(AuthContext);

  var userid = responsedata?.data?.data?.wovvUserDetails?.userId;
  var user_Email = responsedata?.data?.data?.fusionAuthUserDetails?.email;
  var accessToken = responsedata?.data?.data?.wovvUserDetails?.accessToken;

  const [ShowLoader, setShowLoader] = useState({show: false});
  const [modalVisible, setModalVisible] = useState(false);

  const [Otp, setOtp] = useState();

  const [ShowErrorModal, setShowErrorModal] = useState({show: false});
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [ShowErrorModalCancel, setShowErrorModalCancel] = useState({
    show: false,
  });
  const [SuccessModalMessage, setSuccessModalMessage] = useState({msg: null});
  const [ShowSuccessModal, setShowSuccessModal] = useState({show: false});
  const [nextButton, setNextButton] = useState({clickable: false});

  const [InputData, setInputData] = useState({
    phoneNo: '',
  });
  const [InputDataError, setInputDataError] = useState({
    phoneNoError: false,
  });
  const [selectedCountryData, setSelectedCountryData] = useState({
    code: '+91',
    length: 10,
    id: 118121891,
  });

  const handleCountryCodeSelect = (code, length, id) => {
    setSelectedCountryData({
      code: code,
      length: length,
      id: id,
    });
  };
  const handleOnChange = (name, value) => {
    setInputData({...InputData, [name]: value});
    setInputDataError({...InputDataError, [`${name}Error`]: false});
  };

  useEffect(() => {
    ScreenAnalytics('Apple_Verify_Phone', userid, accessToken)
      .then((res) => {})
      .catch((e) => {});
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return (
      () => backHandler.remove(),
      BackHandler.removeEventListener('hardwareBackPress', backHandler),
      clearTimeout(checkPhoneTimerid),
      clearTimeout(timeid),
      clearTimeout(sendotpTimerid),
      clearTimeout(sendotpTimerid),
      clearTimeout(verifyOtpTimerid)
    );
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                      back navigation handler                               */
  /* -------------------------------------------------------------------------- */
  const backAction = () => {
    setErrorModalMessage('Do you want the exit the social Sign-in process');
    setShowErrorModal({show: true});
    setShowErrorModalCancel({show: true});
    return true;
  };

  const signOut = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();

      if (isSignedIn) {
        // await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
      isfrommallSelection
        ? navigation.dispatch(StackActions.pop(3))
        : navigation.dispatch(StackActions.pop(2));
    } catch (error) {}
  };

  /* -------------------------------------------------------------------------- */
  /*                      Handle Otp fetched                                    */
  /* -------------------------------------------------------------------------- */
  const otpautofetch = () => {
    if (Platform.OS === 'android') {
      timeid = setTimeout(() => {
        RNOtpVerify?.getHash()
          .then((test) => {})
          .catch();
        RNOtpVerify.getOtp()
          .then((p) => RNOtpVerify?.addListener(otpHandler))
          .catch((p) => {});
      }, 1000);
    }
  };
  const otpHandler = (message) => {
    try {
      const otp = /(\d{6})/g?.exec(message)[1];
      setOtp(otp);
    } catch (e) {}
  };

  /* -------------------------------------------------------------------------- */
  /*                      Validate user entered Data                            */
  /* -------------------------------------------------------------------------- */
  const validate = () => {
    if (InputData.phoneNo == '' || InputData.phoneNo.length < 10) {
      setInputDataError({...InputDataError, phoneNoError: true});
    } else {
      _check_Phone(InputData.phoneNo);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                            check phone api call                            */
  /* -------------------------------------------------------------------------- */
  const _check_Phone = (phoneNo) => {
    setNextButton({clickable: true});
    setOtp('');
    Keyboard.dismiss();

    var data = JSON.stringify({
      mobile: String(phoneNo),
      countryCode: String(selectedCountryData.id),
      pageUrl: 'CheckMobileAvailable1',
    });

    var config = {
      method: 'post',
      url:
        USER_BASE_OPEN_API_URL +
        'CheckMobileAvailable1?' +
        OPEN_API_TENANT_ID +
        `&user_App_ID=${USER_APP_ID}&isAuthReq=0`,
      headers: {
        access_Token: accessToken,
        userId: userid,
        'Content-Type': 'application/json',
        pageUrl: 'CheckMobileAvailable1',
        event: 'SocialSignUpVerifyScreen',
        action: 'onClickSubmit',
      },

      data: data,
    };
    setShowLoader({show: true});
    fetchApiService(config, authAction, authState)
      .then(async function (response) {
        //console.log("_check_Phone  response ",response.data);
        if (response?.data == 'AuthInvalid') {
          await authAction.removeData();

          try {
            resetNavigation('AuthNavigator', 'Login', 'null');
          } catch (error) {}
        } else {
          checkPhoneTimerid = setTimeout(() => {
            if (response.data == 'SUCCESS') {
              setNextButton({clickable: false});
              setShowLoader({show: false});
              setErrorModalMessage('Mobile Number already exists');
              setShowErrorModal({show: true});
            } else if (response.data == 'FAIL') {
              _sendOtp(phoneNo);
            }
          }, 500);
        }
      })
      .catch(function (error) {
        setNextButton({clickable: false});
        setShowLoader({show: false});
        setErrorModalMessage('Something went wrong');
        setShowErrorModal({show: true});
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                              send otp api call                             */
  /* -------------------------------------------------------------------------- */
  const _sendOtp = (mobil) => {
    setOtp('');

    var data = JSON.stringify({
      pageUrl: 'signUpsmsversionsix',
      formList: [
        {
          country_Code: selectedCountryData.id,
          to: mobil,
        },
      ],
    });

    var config = {
      method: 'post',
      url: USER_BASE_OPEN_API_URL + 'signUpsmsversionsix?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: accessToken,
        userId: userid,
        'Content-Type': 'application/json',
        pageUrl: 'signUpsmsversionsix',
        event: 'SocialSignUpVerifyScreen',
        action: 'onClickSendOTP',
      },

      data: data,
    };

    fetchApiService(config, authAction, authState)
      .then(function (response) {
        setShowLoader({show: false});
        //console.log("_sendOtp  response ",response.data);

        sendotpTimerid = setTimeout(() => {
          if (response?.data?.message?.code == 0) {
            setModalVisible(true);
            otpautofetch();
          } else if (response?.data?.message?.code == 1016) {
            setErrorModalMessage(response?.data?.message?.message);
            setShowErrorModal({show: true});
          }
        }, 500);
      })
      .catch(function (error) {
        setShowLoader({show: false});
        setNextButton({clickable: false});
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                verify otp and add user mobile number and name              */
  /* -------------------------------------------------------------------------- */
  const verfiyOtpAndAddMobile = async (otp) => {
    let finalFullName = '';
    if (
      responsedata?.data?.data?.fusionAuthUserDetails?.firstName != null &&
      responsedata?.data?.data?.fusionAuthUserDetails?.lastName != null
    ) {
      finalFullName =
        responsedata?.data?.data?.fusionAuthUserDetails?.firstName +
        ' ' +
        responsedata?.data?.data?.fusionAuthUserDetails?.lastName;
    } else {
      finalFullName = responsedata?.data?.data?.fusionAuthUserDetails?.email;
    }

    setModalVisible(false);

    let deviceplatfrom = Platform.OS === 'ios' ? '2001' : '1001';
    const fcmToken = await messaging().getToken();
    setShowLoader({show: true});
    if (otp == '') {
      setModalVisible(false);
      setErrorModalMessage('Enter Valid OTP');
      setShowErrorModal({show: true});
      setNextButton({clickable: false});
      return;
    }

    if (Platform.OS === 'android') {
      RNOtpVerify.removeListener();
    }

    var data = {
      pageUrl: 'verifysignupotpsocial',

      formList: [
        {
          country_Code: String(selectedCountryData.id),
          to: String(InputData.phoneNo),
          otp: Number(otp),
          party_Email: String(user_Email),
          userName: finalFullName,
          branch_Code: authState?.mallDetails?.oko_Row_Code,
          fcm_Token: fcmToken,
          platform_Desc: deviceplatfrom,
          userId: userid,
        },
      ],
    };
    var config = {
      method: 'post',

      url: `${AUTH_BASE_URL}/ipos/rest/bpm/verifysignupotpsocial?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: accessToken,
        userId: userid,
        'Content-Type': 'application/json',
        pageUrl: 'verifysignupotpsocial',
        event: 'SocialSignUpVerifyScreen',
        action: 'onClickVerify',
      },
      data: data,
    };

    fetchApiService(config, authAction, authState)
      .then(function (response) {
        //console.log("verfiyOtpAndAddMobile  response ",response.data);

        let successType = response?.data?.message?.type;
        if (successType === 'false') {
          setShowLoader({show: false});
          setNextButton({clickable: false});
          setErrorModalMessage(response?.data?.message?.message);
          setShowErrorModal({show: true});
        }
        if (response?.data?.message?.code === 1018) {
          Keyboard.dismiss();
          getPartyData(response.data, fcmToken);
        }
      })
      .catch(function (error) {
        setNextButton({clickable: false});
        setShowLoader({show: false});
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                             get party api call                             */
  /* -------------------------------------------------------------------------- */
  const getPartyData = async (userDetails, fcmToken) => {
    const userData = {
      birthDate: userDetails.data.profileData?.birthDate,
      code: userDetails.data.profileData?.code,
      email: userDetails.data.profileData?.email,
      firstName: userDetails.data.profileData?.firstName,
      fullName: userDetails.data.profileData?.fullName,
      imageUrl: userDetails.data.profileData?.imageUrl,
      lastName: userDetails.data.profileData?.lastName,
      message: userDetails.data.profileData?.message,
      mobilePhone: userDetails.data.profileData?.mobilePhone,
      data: {
        data: userDetails.data.profileData?.data,
        social: userDetails.data.profileData?.social,
        userDOA: userDetails.data.profileData?.userDOA,
        userGender: userDetails.data.profileData?.userGender,
      },
      id: userDetails.data.profileData?.id,
    };

    let userInfo = {
      ...authState,
      isLogInSkipped: false,
      userToken: accessToken,
      userId: userid,
      userObject: userData,
      PartyCode: userDetails.data.partyId?.[0].party_Code,
      partyCode: userDetails.data.partyId?.[0].party_Code,
      fcmTokenDetails: {
        fcmToken: fcmToken,
        fcmTokenId: userDetails?.data?.pushNotificationId,
      },
    };

    await authAction.setData(userInfo);
    //CLEVERTAP
    var props = {
      identity: userDetails.data.partyId?.[0].party_Code?.toString(),

      Name: userDetails.data.profileData?.fullName,
      Email: userDetails.data.profileData?.email,
      Phone: userDetails.data.profileData?.mobilePhone,
      'Default Mall': authState?.mallDetails?.oko_Row_Desc,
      'Signup Date': new Date(),
      'User Status': 'ACTIVE',
      'MSG-whatsapp': true,
    };

    CleverTap.onUserLogin(props);
    setShowLoader({show: false});
    if (userDetails?.data?.parkingVoucher?.status == 'true') {
      navigation.navigate('NewSignupVoucher', {
        isFromSocial: true,
      });
    } else {
      setSuccessModalMessage({
        msg: 'Congratulations the user has been created successfully ',
      });
      setShowSuccessModal({show: true});
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              render otp modal                              */
  /* -------------------------------------------------------------------------- */
  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#ffffff',
              width: R.dimensions.wp('90%'),
              paddingBottom: '10%',
              borderRadius: 20,
            }}
          >
            <View style={{marginVertical: '10%', paddingHorizontal: '4%'}}>
              <Text
                style={{
                  fontSize: 17,
                  fontFamily: R.fonts.primaryBold,
                  textAlign: 'center',
                  color: R.colors.primaryBrand2,
                }}
              >
                Mobile Phone Verification
              </Text>

              <View
                style={{
                  marginBottom: '5%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: R.fonts.primaryLight,
                    //marginTop:'5%',
                    color: R.colors.grey,
                  }}
                >
                  Enter the OTP sent on{' '}
                </Text>
                <Text
                  style={{
                    color: R.themes.boxBackgroundColour,
                    fontSize: 15,
                    paddingTop: Platform.OS == 'ios' ? '0.5%' : '1%',
                    fontFamily: R.fonts.primaryMedium,
                  }}
                >
                  {InputData.phoneNo}
                </Text>
              </View>

              <OTPInputView
                style={{
                  marginVertical: 10,
                  height: 40,
                }}
                pinCount={6}
                code={Otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                onCodeChanged={(code) => setOtp(code)}
                autoFocusOnLoad={false}
                selectionColor={'white'}
                codeInputFieldStyle={{
                  fontSize: 15,
                  borderWidth: 1,
                  borderColor: R.colors.primaryBrand2,
                  borderBottomWidth: 1,
                  color: R.colors.black,
                }}
                keyboardType="numeric"
                onCodeFilled={(code) => verfiyOtpAndAddMobile(code)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                verfiyOtpAndAddMobile(Otp);
              }}
            >
              <Text
                style={{
                  color: R.themes.boxBackgroundColour,
                  fontSize: 15,

                  textAlign: 'center',
                  fontFamily: R.fonts.primaryMedium,
                }}
              >
                Verify
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                fontFamily: R.fonts.primaryLight,
                marginVertical: '2%',
                color: R.colors.grey,
                textAlign: 'center',
              }}
            >
              Didn't receive the code ?
            </Text>
            <TouchableOpacity
              onPress={() => [
                setModalVisible(false),
                setNextButton({clickable: false}),
              ]}
            >
              <Text
                style={{
                  color: R.themes.boxBackgroundColour,
                  fontSize: 15,
                  // paddingLeft: '2%',
                  textAlign: 'center',
                  fontFamily: R.fonts.primaryMedium,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                            main render function                            */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <BackHeader navigation={navigation} customOnPress={backAction} />
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
          {renderModal()}

          <Text style={styles.text}>Enter your phone number</Text>

          <CustomCountryCodeTextInput
            country={selectedCountryData.code}
            onSelect={handleCountryCodeSelect}
            value={InputData.phoneNo}
            onChangeText={(text) => handleOnChange('phoneNo', text)}
            showErrorText={InputDataError.phoneNoError}
            maxLength={selectedCountryData.length}
            editable={!ShowLoader.show}
          />
          <SimpleButton
            onPress={() => validate()}
            disabled={nextButton.clickable}
            title={'Next'}
          />

          <CModal
            isVisible={ShowErrorModal.show}
            isOkModal={ShowErrorModalCancel.show}
            isCancell={ShowErrorModalCancel.show}
            modalMsg={ErrorModalMessage}
            onPressModal={() => {
              ShowErrorModalCancel.show === true
                ? [
                    setShowErrorModal({show: !ShowErrorModal.show}),
                    setShowErrorModalCancel({show: !ShowErrorModal.show}),
                    signOut(),
                    setNextButton({clickable: false}),
                  ]
                : [setShowErrorModal({show: !ShowErrorModal.show})];
            }}
            onCancelPressModal={() => [
              setShowErrorModal({show: !ShowErrorModal.show}),
              setShowErrorModalCancel({show: !ShowErrorModal.show}),
            ]}
            isForm={'Signup'}
          />

          <CModal
            isVisible={ShowSuccessModal.show}
            modalMsg={SuccessModalMessage.msg}
            onPressModal={async () => {
              setNextButton({clickable: false});
              setShowSuccessModal({show: !ShowSuccessModal.show});
              await analytics()
                .logEvent('signin_event', {
                  user_ID: userid,
                  mall_name: authState?.mallDetails?.oko_Row_Desc,
                  is_loggedIn: 1,
                  sign_in_mode: 'Social_media:Apple',
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
            }}
            isForm={'Signup'}
          />

          {ShowLoader.show && (
            <View
              style={{
                flex: 1,
                marginTop: '60%',
                position: 'absolute',
                justifyContent: 'center',
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
                {/* <ActivityIndicator
                  size={'large'}
                  color={R.themes.boxBackgroundColour}
                />
                <Text
                  style={{
                    marginTop: '5%',
                    fontSize: horizontalScale(12),
                    fontFamily: R.fonts.primaryRegular,
                    textAlign: 'center',
                  }}
                >
                  Loading
                </Text> */}
                <Image
                  source={R.images.loaderNexus}
                  style={{width: 50, height: 50}}
                />
              </View>
            </View>
          )}
        </KeyboardAwareScrollView>
      </RootView>
    </>
  );
};
