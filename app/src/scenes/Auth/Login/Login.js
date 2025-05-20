import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Clipboard,
  Platform,
  StatusBar,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import analytics from '@react-native-firebase/analytics';
import CryptoJS from 'react-native-crypto-js';
import messaging from '@react-native-firebase/messaging';
import {useFocusEffect} from '@react-navigation/native';
/* -------------------------------------------------------------------------- */
/*                                local imports                               */
/* -------------------------------------------------------------------------- */
import {
  EMAIL_REGEX_PATTERN,
  TENANT_ID,
  USER_APP_ID,
  AUTH_BASE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  Temp_Token,
  Register_ID,
} from '../../../utils/Constants';
import R from '../../../R';
import {CModal, CTextInput, RootView, SimpleButton} from '../../../components';
import {AuthContext} from '../../../context/auth/AuthContext';
import {fetchPartyCode} from '../API/CommonApiCalls';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import styles from './LoginStyles';
import {CustomCountryCodeTextInput} from './CustomCountryCodeTextInput';
import DeviceInfo from 'react-native-device-info';
import crashlytics from '@react-native-firebase/crashlytics';
import {resetNavigation} from '../../../utils/NavigationService';

/* -------------------------------------------------------------------------- */
/*                              component started                             */
/* -------------------------------------------------------------------------- */
export const Login = ({navigation, route}) => {
  crashlytics().log('LOGIN');

  const CleverTap = require('clevertap-react-native');
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowLoader] = useState(false);
  const [LoginBtnDisabled, setLoginBtnDisabled] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [InputData, setInputData] = useState({
    phoneNo: '',
    emailId: '',
    password: '',
  });
  const [InputDataError, setInputDataError] = useState({
    phoneNoError: false,
    emailIdError: false,
    passwordError: false,
  });
  const [selectedCountryData, setSelectedCountryData] = useState({
    code: '+91',
    length: 10,
    id: 118121891,
  });
  var timerId;

  useFocusEffect(
    React.useCallback(() => {
      // console.log("LOGIn route ",route);

      // console.log("LOGIn route.params ",route?.params);

      // console.log("LOGIn authState.tempAuthToken ",authState.tempAuthToken);

      // console.log("LOGIn authState.fcmId ",authState.fcmId);

      // console.log("LOGIn authState.userId ",authState.userId);
      // if (
      //   authState.tempAuthToken == null ||
      //   route?.params?.tempAuthToken == 'null'
      // ) {
      //   appAuthTokenGenerator();
      // }
      ScreenAnalytics('Login', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {}),
        clearClipboard();

      return () => clearTimeout(timerId);
    }, []),
  );

  const appAuthTokenGenerator = async (loginRedirected = '') => {
    //console.log("authState.tempAuthToken null appAuthTokenGenerator");
    setShowLoader(true);
    const fcmToken = await messaging().getToken();
    let data = JSON.stringify({
      FcmId: fcmToken,
      pageUrl: 'AppAuthGenrator',
      //FcmId:12453768769
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url:
        AUTH_BASE_URL +
        '/ipos/rest/domainAuth/AppAuthGenrator?' +
        OPEN_API_TENANT_ID,
      headers: {
        'Content-Type': 'application/json',
        access_Token: Temp_Token,
        Register_Id: Register_ID,
        user_App_ID: USER_APP_ID,
        pageUrl: 'AppAuthGenrator',
        event: 'Loginscreen',
        action: 'onAppAuthTokenGenerate',
      },
      data: data,
    };
    fetchApiService(config, authAction, authState)
      .then(async function (response) {
        setShowLoader(false);
        if (response?.data?.message?.type === 'SUCCESS') {
          // console.log('appAuthTokenGenerator ', response?.data?.data);

          const {access_Token, FcmId} = response?.data?.data;

          // const {access_Token} = response?.data?.data;
          await authAction.setData({
            ...authState,
            tempAuthToken: access_Token,
            fcmId: FcmId,
            // fcmId:12453768769
          });

          if (loginRedirected == 'appleLogin') {
            CTA_firebaseAnalytics('Apple_Sign_In', 'Login')
              .then((res) => {})
              .catch((e) => {}),
              authState?.mallDetails == null
                ? navigation.navigate('MultipleMallScreen', {
                    isFromSkip: 3,
                  })
                : navigation.navigate('AppleSignIn', {
                    isfrommallSelection: false,
                  });
          } else if (loginRedirected == 'googleLogin') {
            CTA_firebaseAnalytics('Google_Sign_In', 'Login')
              .then((res) => {})
              .catch((e) => {}),
              authState?.mallDetails == null
                ? navigation.navigate('MultipleMallScreen', {
                    isFromSkip: 4,
                  })
                : navigation.navigate('GoggleSignIn', {
                    isfrommallSelection: false,
                  });
          } else if (loginRedirected == 'forgotPassword') {
            navigation.navigate('ForgotPassword');
          } else if (loginRedirected == 'email_login') {
            login(access_Token, FcmId);
          } else if (loginRedirected == 'mobno_login') {
            sendOTP(access_Token, FcmId);
          } else if (loginRedirected == 'signup') {
            CTA_firebaseAnalytics('Signup', 'Login')
              .then((res) => {})
              .catch((e) => {});
            navigation.navigate('MultipleMallScreen', {isFromSkip: 2});
          } else if (loginRedirected == 'skipnow') {
            CTA_firebaseAnalytics('Login_as_guest', 'Login')
              .then((res) => {})
              .catch((e) => {});
            skipAuthentication(access_Token, FcmId);
          }
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  const clearClipboard = () => {
    Clipboard.getString()
      .then((data) => {
        if (data) {
          Clipboard.setString('');
        }
      })
      .catch((error) => {});
  };
  const handleOnChange = (name, value) => {
    setInputData({...InputData, [name]: value});
    setInputDataError({...InputDataError, [`${name}Error`]: false});
  };
  const handleCountryCodeSelect = (code, length, id) => {
    setSelectedCountryData({
      code: code,
      length: length,
      id: id,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                            validate phone number                           */
  /* -------------------------------------------------------------------------- */
  const validatenumber = () => {
    if (
      InputData.phoneNo == '' ||
      InputData.phoneNo.length != selectedCountryData.length
    ) {
      setInputDataError({...InputDataError, phoneNoError: true});
    } else {
      appAuthTokenGenerator('mobno_login');
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                       validate email id and password                       */
  /* -------------------------------------------------------------------------- */
  const validate = () => {
    if (
      InputData.emailId === '' ||
      EMAIL_REGEX_PATTERN.test(InputData.emailId) === false
    ) {
      setInputDataError({...InputDataError, emailIdError: true});
    } else if (InputData.password === '') {
      setInputDataError({
        ...InputDataError,
        passwordError: true,
      });
    } else {
      appAuthTokenGenerator('email_login');
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                        skip authentication handling                        */
  /* -------------------------------------------------------------------------- */
  const skipAuthentication = async (access_Token, FcmId) => {
    await authAction.setData({
      ...authState,
      tempAuthToken: access_Token,
      fcmId: FcmId,
      isLogInSkipped: true,
    });

    if (authState?.mallDetails?.oko_Row_Desc) {
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
    } else {
      navigation.navigate('MultipleMallScreen', {isFromSkip: 0});
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               login api call                               */
  /* -------------------------------------------------------------------------- */
  const login = async (access_Token, FcmId) => {
    var key = CryptoJS.enc.Base64.parse('2b7e151628aed2a6abf7158809cf4f3c');
    var iv = CryptoJS.enc.Base64.parse('S4duQOLzqeKP3rf8nSb5Ow==');
    var encrypted = CryptoJS.AES.encrypt(InputData.password, key, {iv: iv});
    encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    let data = JSON.stringify({
      password: encrypted,
      loginId: InputData.emailId,
      user_App_ID: USER_APP_ID,
      pageUrl: 'login5',
    });

    let config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'login5?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'login5?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken ? authState.userToken : access_Token,
        ...(authState.userToken ? {userId: authState.userId} : {fcmId: FcmId}),
        'Content-Type': 'application/json',
        event: 'LoginScreen',
        action: 'onClickLogin',
        pageUrl: 'login5',
      },
      data: data,
    };
    // console.log('Login  config ', config);
    setShowLoader(true);
    setLoginBtnDisabled(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        // console.log('Login  response ', response);

        setShowLoader(false);
        timerId = setTimeout(() => {
          if (response?.data?.message?.type === 'SUCCESS') {
            let userId = response.data.data.wovvUserDetails.userId;
            let accessToken = response.data.data.wovvUserDetails.accessToken;
            let userDetails = response.data.data.fusionAuthUserDetails;
            let defaultMall = response.data.data.wovvUserDetails.defaultMall;
            let source = response.data.data.wovvUserDetails.source;

            // if (authState?.mallDetails?.oko_Row_Desc) {
            //   apiPushNotification(
            //     userId,
            //     accessToken,
            //     userDetails,
            //     source,
            //     defaultMall,
            //   );
            // } else {
            setLoginBtnDisabled(false);
            navigation.navigate('MultipleMallScreen', {
              isFromSkip: 1,
              data: {
                userId,
                accessToken,
                userDetails,
                source,
                defaultMall,
              },
            });
            // }
          } else {
            setErrorModalMessage(response?.data?.message?.message);
            setShowErrorModal(true);
            setLoginBtnDisabled(false);
          }
        }, 500);
      })
      .catch(function (error) {
        //console.log("login error ",error);

        setLoginBtnDisabled(false);
        setShowLoader(false);
        setErrorModalMessage(
          'Please wait for few minutes before you try again',
        );
        setShowErrorModal(true);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                           get party data api call                          */
  /* -------------------------------------------------------------------------- */
  const getPartyData = async (
    userId,
    accessToken,
    userDetails,
    fcmToken,
    fcmTokenId,
    source,
    defaultMall,
  ) => {
    setShowLoader(true);
    const {result} = await fetchPartyCode(
      userId,
      accessToken,
      authAction,
      authState,
    );

    let userInfo = {
      ...authState,
      isLogInSkipped: false,
      userToken: accessToken,
      userId: userId,
      userObject: userDetails,
      PartyCode: result,
      partyCode: result,
      fcmTokenDetails: {fcmToken: fcmToken, fcmTokenId: fcmTokenId},
    };

    setShowLoader(false);

    await authAction.setData(userInfo);
    await analytics()
      .logEvent('signin_event', {
        user_ID: userInfo.userId,
        mall_name: authState?.mallDetails?.oko_Row_Desc,
        is_loggedIn: 1,
        sign_in_mode: 'Email_Id',
        app_version: DeviceInfo.getVersion,
        device_platform: Platform.OS,
      })
      .then((res) => {})
      .catch((e) => {});
    //CLEVERTAP
    var props = {
      identity: result.toString(),
      Email: authState.userObject?.email,
      Phone: authState.userObject?.mobilePhone,
    };

    if (source != 'App Signup') {
      props['Default Mall'] = defaultMall;
      props['User Status'] = 'ACTIVE';
      porps['MSG-whatsapp'] = true;
      props.Name = userDetails?.fullName;
      if (
        userDetails.data?.userGender.toString() &&
        userDetails.data?.userGender.toString() != 'null'
      ) {
        userDetails.data.userGender.toString() == '0'
          ? (props.Gender = 'F')
          : userDetails.data.userGender.toString() == '1'
          ? (props.Gender = 'M')
          : (props.Gender = 'O');
      }

      if (
        userDetails.data?.birthDate &&
        userDetails.data?.birthDate != 'null'
      ) {
        props['Date Of Birth'] = new Date(userDetails.data.birthDate);
      }
      if (userDetails.data?.userDOA && userDetails.data?.userDOA != 'null') {
        props['Anniversary Date'] = new Date(userDetails.data.userDOA);
      }
    }

    CleverTap.onUserLogin(props);

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
    setLoginBtnDisabled(false);
  };
  /* -------------------------------------------------------------------------- */
  /*                         push notification api call                         */
  /* -------------------------------------------------------------------------- */
  const apiPushNotification = async (
    userId,
    accessToken,
    userDetails,
    source,
    defaultMall,
  ) => {
    const fcmToken = await messaging().getToken();
    let useremail = userDetails.email;
    let deviceplatfrom = Platform.OS === 'ios' ? '2001' : '1001';

    let data = JSON.stringify({
      pageUrl: 'loginTimeActiveUserVersion2',
      entityName: 'User_Vs_Token',
      action: 'payloadRuleWithTid',
      event: 'JR_847_V2',
      formList: [
        {
          user_Code: userId,
          user_Email: useremail,
          fcm_Token: fcmToken,
          platform_Desc: deviceplatfrom,
          mall_Code: authState?.mallDetails?.oko_Row_Code,
          mall_Name: authState?.mallDetails?.oko_Row_Desc,
        },
      ],
    });
    let config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/bpm/process?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: accessToken,
        userid: userId,
        'Content-Type': 'application/json',
        pageUrl: 'loginTimeActiveUserVersion2',
        event: 'LoginScreen',
        action: 'pushNotification',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        setShowLoader(false);
        let fcmTokenId = null;
        if (response.data.message.type == 'SUCCESS') {
          const userTokens = response?.data?.data?.User_Vs_Token;

          if (userTokens[0].id) {
            if (userTokens[0].fcm_Token == fcmToken) {
              fcmTokenId = userTokens[0]?.id;
            }
          } else if (userTokens[1].Id) {
            if (userTokens[1].fcm_Token == fcmToken) {
              fcmTokenId = userTokens[1]?.Id;
            }
          }
        }

        getPartyData(
          userId,
          accessToken,
          userDetails,
          fcmToken,
          fcmTokenId,
          source,
          defaultMall,
        );
        // }
      })
      .catch(function (error) {
        setLoginBtnDisabled(false);
        setShowLoader(false);
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                              send otp api call                             */
  /* -------------------------------------------------------------------------- */
  const sendOTP = (access_Token, FcmId) => {
    setShowLoader(true);
    let data = JSON.stringify({
      mobilePhone: String(InputData.phoneNo),
      country_Code: String(selectedCountryData.id),
      pageUrl: 'loginViaOTPVersionfour',
    });

    let config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'loginViaOTPVersionfour?' +
          OPEN_API_TENANT_ID +
          `&user_App_ID=${USER_APP_ID}`
        : FCM_BASE_OPEN_API_URL +
          'loginViaOTPVersionfour?' +
          OPEN_API_TENANT_ID +
          `&user_App_ID=${USER_APP_ID}`,
      headers: {
        access_Token: authState.userToken ? authState.userToken : access_Token,
        ...(authState.userToken ? {userId: authState.userId} : {fcmId: FcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'loginViaOTPVersionfour',
        event: 'Loginscreen',
        action: 'onLoginViaPhone',
      },

      data: data,
    };

    fetchApiService(config, authAction, authState)
      .then(async function (response) {
        console.log('🚀 ~ Login.js:561 ~ response:', response);
        setShowLoader(false);
        // console.log("Object.keys(response?.data) ",Object.keys(response?.data));
        if (Object.keys(response?.data).includes('2409')) {
          //  console.log("LOG OUT");

          await authAction.removeData();

          try {
            resetNavigation('AuthNavigator', 'Login', 'null');
          } catch (error) {}
        } else if (Object.keys(response?.data) == '2008') {
          setErrorModalMessage(response?.data['2008']);
          setShowErrorModal(true);
        } else if (Object.keys(response?.data) == '2007') {
          setErrorModalMessage(response?.data['2007']);
          setShowErrorModal(true);
        } else if (Object.keys(response?.data) == '2006') {
          setErrorModalMessage(response?.data['2006']);
          setShowErrorModal(true);
        } else {
          navigation.navigate('VerifyPhone', {
            userId: response.data.userId,
            twoFactor: response.data.twoFactor,
            phoneNo: InputData.phoneNo,
            countryId: selectedCountryData.id,
          });
        }
      })
      .catch(function (error) {
        //console.log("sendOTP  error ",error);

        setShowLoader(false);
        setErrorModalMessage(
          'Please wait for few minutes before you try again',
        );
        setShowErrorModal(true);
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                              loader component                              */
  /* -------------------------------------------------------------------------- */
  const LoaderView = () => {
    return (
      <View style={styles.loaderContainer}>
        {/* <ActivityIndicator
          size={'large'}
          color={R.themes.boxBackgroundColour}
        />
        <Text style={styles.loaderText}>Loading</Text> */}
        <Image source={R.images.loaderNexus} style={{width: 50, height: 50}} />
      </View>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                                 main render                                */
  /* -------------------------------------------------------------------------- */
  return (
    <RootView>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'handled'}
        enableResetScrollToCoords={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        extraHeight={10}
      >
        <View style={styles.nexusLogoView}>
          <Image
            resizeMode="contain"
            source={R.images.nexusLogoWhiteBackground}
            style={{width: R.dimensions.wp(50), height: R.dimensions.wp(20)}}
          />
        </View>
        <View style={styles.socialLoginView}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: R.themes.backgroundColor,

              borderRadius: R.themes.theme == 'dark' ? 10 : null,
              marginHorizontal: '5%',
              marginVertical: '2.5%',
              borderColor: R.themes.borderColor,

              paddingTop: Platform.OS == 'ios' ? '2.5%' : '1.5%',
              paddingHorizontal: '2.5%',
              paddingBottom: Platform.OS == 'ios' ? '2.5%' : '1.5%',
              alignSelf: 'center',
              alignItems: 'center',

              borderWidth: R.themes.theme == 'dark' ? null : 1,
            }}
          >
            <TouchableOpacity
              disabled={LoginBtnDisabled}
              onPress={() => {
                appAuthTokenGenerator('appleLogin');
              }}
              style={{flexDirection: 'row'}}
            >
              <Image
                resizeMode="contain"
                source={R.images.applesearch}
                style={{
                  width: R.dimensions.wp(8),
                  height: R.dimensions.wp(8),
                }}
              />
              <Text
                style={{
                  color: R.colors.black,

                  width: '80%',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              >
                Login with Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* google */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: R.themes.backgroundColor,

              borderRadius: R.themes.theme == 'dark' ? 10 : null,
              marginHorizontal: '5%',
              marginVertical: '2.5%',
              borderColor: R.themes.borderColor,

              paddingTop: Platform.OS == 'ios' ? '2.5%' : '1.5%',
              paddingHorizontal: '2.5%',
              paddingBottom: Platform.OS == 'ios' ? '2.5%' : '1.5%',
              alignSelf: 'center',
              alignItems: 'center',

              borderWidth: R.themes.theme == 'dark' ? null : 1,
            }}
          >
            <TouchableOpacity
              disabled={LoginBtnDisabled}
              onPress={() => {
                appAuthTokenGenerator('googleLogin');
              }}
              style={{flexDirection: 'row'}}
            >
              <Image
                resizeMode="contain"
                source={R.images.googlesearch}
                style={{
                  width: R.dimensions.wp(8),
                  height: R.dimensions.wp(8),
                }}
              />
              <Text
                style={{
                  color: R.colors.black,

                  width: '80%',
                  alignSelf: 'center',
                  textAlign: 'center',
                }}
              >
                Login with Google
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.orMainContainer, {marginVertical: '3%'}]}>
            <View style={styles.orViewDividerLine} />
            <Text style={styles.orViewText}>OR</Text>
            <View style={styles.orViewDividerLine} />
          </View>
        </View>

        <View>
          <CustomCountryCodeTextInput
            country={selectedCountryData.code}
            onSelect={handleCountryCodeSelect}
            editable={InputData.emailId != '' ? false : true}
            value={InputData.phoneNo}
            onChangeText={(text) => handleOnChange('phoneNo', text)}
            showErrorText={InputDataError.phoneNoError}
            maxLength={selectedCountryData.length}
            appAuthGenerate={true}
          />
          <View style={[styles.orMainContainer, {marginVertical: '3%'}]}>
            <View style={styles.orViewDividerLine} />
            <Text style={styles.orViewText}>OR</Text>
            <View style={styles.orViewDividerLine} />
          </View>

          <CTextInput
            editable={InputData.phoneNo != '' ? false : true}
            value={InputData.emailId}
            placeholder="Email ID "
            onChangeText={(text) => handleOnChange('emailId', text.trim())}
            errorText={'Please Enter Valid Email'}
            showErrorText={InputDataError.emailIdError}
          />

          {InputData.emailId != '' && (
            <>
              <CTextInput
                value={InputData.password}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => handleOnChange('password', text.trim())}
                errorText={'* Please Enter Password'}
                showErrorText={InputDataError.passwordError}
              />

              <TouchableOpacity
                activeOpacity={0.5}
                disabled={LoginBtnDisabled}
                onPress={() => appAuthTokenGenerator('forgotPassword')}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </>
          )}

          <SimpleButton
            title={'Login'}
            disabled={LoginBtnDisabled}
            onPress={() => {
              CTA_firebaseAnalytics('Sign-In', 'Login')
                .then((res) => {})
                .catch((e) => {});

              InputData.emailId != '' ? validate() : validatenumber();
            }}
          />
          <View style={styles.dividerLine} />
        </View>
        <View>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <SimpleButton
            title={'Join nexusOne'}
            disabled={LoginBtnDisabled}
            onPress={() => {
              appAuthTokenGenerator('signup');
            }}
          />
          <View style={styles.skipTextView}>
            <TouchableOpacity
              onPress={() => {
                appAuthTokenGenerator('skipnow');
              }}
              disabled={LoginBtnDisabled}
            >
              <Text style={styles.skipText}>Skip For Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {ShowLoader && <LoaderView />}
        <CModal
          isVisible={ShowErrorModal}
          modalMsg={ErrorModalMessage}
          onPressModal={() => setShowErrorModal(!ShowErrorModal)}
          isForm={'Signup'}
        />
      </KeyboardAwareScrollView>
    </RootView>
  );
};
