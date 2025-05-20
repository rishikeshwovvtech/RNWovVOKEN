import React, {useState, useEffect, useContext} from 'react';
import {Text, Keyboard, Platform} from 'react-native';

import {
  Loader,
  CModal,
  BackHeader,
  RootView,
  SimpleButton,
} from '../../../components/index';
import R from '../../../R';
import {
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../../utils/Constants';

import RNOtpVerify from 'react-native-otp-verify';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import styles from './verifyPasswordForgetStyles';
import {AuthContext} from '../../../context/auth/AuthContext';
export const VerifypasswordForgot = ({route, navigation}) => {
  const {authState, authAction} = useContext(AuthContext);

  const party_Code = route?.params?.party_Code;

  const [otp, setOtp] = useState('');
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);

  useEffect(() => {
    return () => {
      if (Platform.OS === 'android') {
        RNOtpVerify.removeListener();
      }
    };
  }, []);

  useEffect(() => {
    let timerId;
    if (Platform.OS === 'android') {
      timerId = setTimeout(() => {
        RNOtpVerify?.getHash()
          .then((test) => {})
          .catch();

        RNOtpVerify.getOtp()
          .then((p) => RNOtpVerify?.addListener(otpHandler))
          .catch((p) => {});
      }, 1000);
      return (
        () => clearTimeout(timerId), RNOtpVerify?.removeListener(otpHandler)
      );
    }
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

  const verifyTheOTP = (codeotp) => {
    if (codeotp == '') {
      setErrorModalMessage('Please enter valid OTP');
      setShowErrorModal(true);
      return;
    }

    var data = JSON.stringify({
      party_Id: party_Code,
      otp: codeotp,
      module_Name: 'Password Reset',
      pageUrl:'verifyOTPMSG91VersionFive',

    });

    var config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'verifyOTPMSG91VersionFive?' +
          OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL +
          'verifyOTPMSG91VersionFive?' +
          OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'verifyOTPMSG91VersionFive',
        event:'VerifyPasswordForgotScreen',
        action:'onClickSubmit'
      },

      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        setShowLoader(false);
        if (response?.data?.message?.type == 'success') {
          navigation.navigate('PasswordChange', {
            party_Code: party_Code,
          });
          setOtp('');
        } else {
          setErrorModalMessage('Please enter valid OTP');
          setShowErrorModal(true);
          setOtp('');
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

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
          <Text style={styles.mainHeadingText}>Verify your OTP</Text>
          <Text style={styles.subHeadingText}>
            Enter your 6 digit verification code sent to you
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

          <SimpleButton title={'Verify'} onPress={() => verifyTheOTP(otp)} />
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
