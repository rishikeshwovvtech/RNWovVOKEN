import React, {useContext, useState, useEffect} from 'react';
import {Text, Keyboard, Platform} from 'react-native';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import styles from './VerifyPhoneStyle';
import {
  Loader,
  CModal,
  BackHeader,
  RootView,
  SimpleButton,
} from '../../../components/index';
import {AuthContext} from '../../../context/auth/AuthContext';
import analytics from '@react-native-firebase/analytics';

import R from '../../../R';
import {
  USER_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  FCM_BASE_OPEN_API_URL,
  USER_APP_ID,
} from '../../../utils/Constants';
import RNOtpVerify from 'react-native-otp-verify';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DeviceInfo from 'react-native-device-info';
import {resetNavigation} from '../../../utils/NavigationService';

export const VerifyPhone = ({route, navigation}) => {
  const {authAction, authState} = useContext(AuthContext);

  const phoneNo = route?.params?.phoneNo;
  const userId = route?.params?.userId;
  const countryId = route?.params?.countryId;
  const twoFactor = route?.params?.twoFactor;
  const [counter, setCounter] = React.useState(60);
  const [callVerify, setcallVerify] = useState(true);
  const [otp, setOtp] = useState('');
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);

  let verifyOtpTimer, verifyTheResendOTPTImer;

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    return () => {
      if (Platform.OS === 'android') {
        RNOtpVerify.removeListener();
      }
    };
  }, []);

  // this below useeffect should be commented for ios build
  useEffect(() => {
    let timerid;
    if (Platform.OS === 'android') {
      timerid = setTimeout(() => {
        RNOtpVerify?.getHash()
          .then((test) => {})
          .catch();

        RNOtpVerify.getOtp()
          .then((p) => RNOtpVerify?.addListener(otpHandler))
          .catch((p) => {});
      }, 1000);
    }

    return () => {
      clearTimeout(verifyOtpTimer);
      clearTimeout(verifyTheResendOTPTImer);
      clearTimeout(timerid);
    };
  }, []);

  const otpHandler = (message) => {
    try {
      const otp = /(\d{6})/g?.exec(message)[1];
      setOtp(otp);
      if (Platform.OS === 'android') {
        RNOtpVerify?.removeListener();
      }
      Keyboard?.dismiss();
    } catch (e) {}
  };

  const sendOTP = () => {
    if (Platform.OS === 'android') {
      RNOtpVerify?.getHash()
        .then((test) => {})
        .catch();

      RNOtpVerify?.getOtp()
        .then((p) => RNOtpVerify?.addListener(otpHandler))
        .catch((p) => {});
    }
    setCounter(60);

    setcallVerify(false);

    var data = JSON.stringify({
      mobilePhone: String(phoneNo),
      country_Code: String(countryId),
      pageUrl:'loginViaOTPVersionfour',
    });
    var config = {
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
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'loginViaOTPVersionfour',
        event:'VerifyPhonePage',
        action:'onSendOtp'
      },

      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(async function (response) {
        setShowLoader(false);
        if (Object.keys(response?.data).includes('2409')) {
          // console.log("LOG OUT");

          await authAction.removeData();

          try {
            resetNavigation('AuthNavigator', 'Login', 'null');
          } catch (error) {}
        } else {
          setOtp('');
        }
      })
      .catch(function (error) {
        setShowLoader(false);
        setErrorModalMessage(
          'Please wait for few minutes before you try again',
        );
        setShowErrorModal(true);
      });
  };

  const verifyTheOTP = (codeotp) => {
    //console.log("verifyTheOTP");

    if (codeotp == '') {
      setErrorModalMessage('Please enter valid OTP');
      setShowErrorModal(true);
      return;
    }

  var data = JSON.stringify({
      code: codeotp,
      to: phoneNo,
      country_Code: countryId,
      pageUrl:'verifyOTPForLoginVersionfour',

    });

    var config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'verifyOTPForLoginVersionfour?' +
          OPEN_API_TENANT_ID +
          `&user_App_ID=${USER_APP_ID}&twoFactor=${twoFactor}&userId=${userId}`
        : FCM_BASE_OPEN_API_URL +
          'verifyOTPForLoginVersionfour?' +
          OPEN_API_TENANT_ID +
          `&user_App_ID=${USER_APP_ID}&twoFactor=${twoFactor}&userId=${userId}`,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'verifyOTPForLoginVersionfour',
        event:'VerifyPhonePage',
        action:'onVerifyOtp'
      },

      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(async function (response) {
        //console.log("verifyOTPForLoginVersionfour config ",config);

        //console.log("verifyOTPForLoginVersionfour response ",response.data);

        let userId = response.data.data.WovvUserDetails.userId;
        let accessToken = response.data.data.WovvUserDetails.accessToken;
        let userDetails = response.data.data.fusionauthUserDetails;
        let source = response.data.data.WovvUserDetails.source;
        let defaultMall = response.data.data.WovvUserDetails.defaultMall;

        setShowLoader(false);
        if (response?.data?.message?.type == 'Fail') {
          setErrorModalMessage(response?.data?.message?.message);
          setShowErrorModal(true);
          setOtp('');
        } else {
          await analytics()
            .logEvent('signin_event', {
              user_ID: userId,
              mall_name: authState?.mallDetails?.oko_Row_Desc,
              is_loggedIn: 1,
              sign_in_mode: 'Mobile_Number',
              app_version: DeviceInfo.getVersion,
              device_platform: Platform.OS,
            })
            .then((res) => {})
            .catch((e) => {});

          navigation?.navigate('MultipleMallScreen', {
            isFromSkip: 1,
            data: {userId, accessToken, userDetails, source, defaultMall},
          });
        }
      })
      .catch(function (error) {
        //console.log("verifyOTPForLoginVersionfour config ",config);

        //console.log("verifyOTPForLoginVersionfour error ",error);
        setShowLoader(false);
        //console.log("verifyTheOTP  error ",error);

        verifyOtpTimer = setTimeout(() => {
          if (error?.response?.data?.code == 2014) {
            setErrorModalMessage(error?.response?.data?.cause);
            setShowErrorModal(true);
          } else if (error?.response?.data?.code == 2015) {
            setErrorModalMessage(error?.response?.data?.cause);
            setShowErrorModal(true);
          } else {
            setErrorModalMessage(
              'Please wait for few minutes before you try again !!',
            );
            setShowErrorModal(true);
          }
        }, 500);
      });
  };

  const verifyTheResendOTP = (codeotp) => {
    if (codeotp == '') {
      setErrorModalMessage('Please enter valid OTP');
      setShowErrorModal(true);
      return;
    }

    var data = JSON.stringify({
      code: codeotp,
      to: phoneNo,
      country_Code: countryId,
      pageUrl:'verifyOTPForLoginVersionfour',

    });

    var config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'verifyOTPForLoginVersionfour?' +
          OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL +
          'verifyOTPForLoginVersionfour?' +
          OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'verifyOTPForLoginVersionfour',
        event:'VerifyPhonePage',
        action:'onVerifyResendOtp'
      },

      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(async function (response) {
        setShowLoader(false);

        //console.log("resend ",response.data);

        // /WovvUserDetails
        let userId = response.data.data.Response.userId;
        let accessToken = response.data.data.Response.accessToken;
        let userDetails = response.data.data.Response.fusionauthUserDetails;

        setShowLoader(false);
        if (response?.data?.message?.type == 'Fail') {
          setErrorModalMessage(response?.data?.message?.message);
          setShowErrorModal(true);
          setOtp('');
        } else {
          await analytics()
            .logEvent('signin_event', {
              user_ID: userId,
              mall_name: authState?.mallDetails?.oko_Row_Desc,
              is_loggedIn: 1,
              sign_in_mode: 'Mobile_Number',
              app_version: DeviceInfo.getVersion,
              device_platform: Platform.OS,
            })
            .then((res) => {})
            .catch((e) => {});

          navigation?.navigate('MultipleMallScreen', {
            isFromSkip: 1,
            data: {userId, accessToken, userDetails},
          });
        }
      })
      .catch(function (error) {
        setShowLoader(false);
        //console.log("resend error ",error);
        verifyTheResendOTPTImer = setTimeout(() => {
          if (error?.response?.data?.code == 2014) {
            setErrorModalMessage(error?.response?.data?.cause);
            setShowErrorModal(true);
          } else if (error?.response?.data?.code == 2015) {
            setErrorModalMessage(error?.response?.data?.cause);
            setShowErrorModal(true);
          } else {
            setErrorModalMessage(
              'Please wait for few minutes before you try again !!',
            );
            setShowErrorModal(true);
          }
        }, 500);
      });
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
          <Text style={styles.mainHeadingText}>Verify your Phone Number</Text>
          <Text style={styles.subHeadingText}>
            Enter your 6 digit verification code sent to your Phone Number
          </Text>
          <OTPInputView
            style={styles.otpMainView}
            pinCount={6}
            code={otp}
            onCodeChanged={(code) => setOtp(code)}
            autoFocusOnLoad={true}
            selectionColor={R.themes.borderColor}
            codeInputFieldStyle={styles.optInputBoxesView}
            keyboardType="numeric"
          />
          {counter > 0 && (
            <Text style={styles.otpSecondsText}>
              Didn't receive OTP? Resend in{' '}
              {counter > 9 ? counter : '0' + counter} s
            </Text>
          )}

          <SimpleButton
            title={'Verify'}
            onPress={() => {
              callVerify ? verifyTheOTP(otp) : verifyTheResendOTP(otp);
            }}
          />
          {counter == '0' ? (
            <Text
              onPress={() => {
                setOtp(''), sendOTP();
              }}
              style={styles.resendOtpText}
            >
              RESEND
            </Text>
          ) : null}

          <CModal
            isVisible={ShowErrorModal}
            modalMsg={ErrorModalMessage}
            onPressModal={() => setShowErrorModal(!ShowErrorModal)}
            isForm={'Signup'}
          />
          <Loader isVisible={ShowLoader} />
        </KeyboardAwareScrollView>
      </RootView>
    </>
  );
};
