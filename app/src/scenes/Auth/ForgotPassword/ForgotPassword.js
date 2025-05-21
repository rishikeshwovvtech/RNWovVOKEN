import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';
/* -------------------------------------------------------------------------- */
/*                                local import                                */
/* -------------------------------------------------------------------------- */
import {
  EMAIL_REGEX_PATTERN,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  USER_BASE_OPEN_API_URL,
} from '../../../utils/Constants';
import {
  SimpleButton,
  BackHeader,
  CModal,
  CTextInput,
  RootView,
} from '../../../components/index';
import styles from './ForgotPasswordStyle';
import R from '../../../R';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {CustomCountryCodeTextInput} from '../Login/CustomCountryCodeTextInput';
import {AuthContext} from '../../../context/auth/AuthContext';
/* -------------------------------------------------------------------------- */
/*                               component start                              */
/* -------------------------------------------------------------------------- */
export const ForgotPassword = ({navigation}) => {
  const {authState, authAction} = useContext(AuthContext);
  const [InputData, setInputData] = useState({emailId: '', phoneNo: ''});
  const [InputDataError, setInputDataError] = useState({
    emailIdError: false,
    phoneNoError: false,
  });
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [isPhoneNumberSelected, setIsPhoneNumberSelected] = useState(true);
  const [selectedCountryData, setSelectedCountryData] = useState({
    code: '+91',
    length: 10,
    id: 118121891,
  });

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('Forgot_Password', '', '').then((res) => {});
    }, []),
  );

  const handleCountryCodeSelect = (code, length, id) => {
    setSelectedCountryData({
      code: code,
      length: length,
      id: id,
    });
  };
  const handleOnChange = (name, value) => {
    if (name == 'phoneNo') {
      setInputData({...InputData, phoneNo: value});
      setInputDataError({...InputDataError, phoneNoError: false});
    } else {
      setInputData({...InputData, emailId: value});
      setInputDataError({...InputDataError, emailIdError: false});
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                               validate input                               */
  /* -------------------------------------------------------------------------- */
  const validateInput = () => {
    if (isPhoneNumberSelected) {
      if (
        InputData.phoneNo == '' ||
        InputData.phoneNo.length != selectedCountryData.length
      ) {
        setInputDataError({...InputDataError, phoneNoError: true});
      } else {
        ForgotPasswordAPI();
      }
    } else {
      if (
        InputData.emailId === '' ||
        EMAIL_REGEX_PATTERN.test(InputData.emailId) === false
      ) {
        setInputDataError({...InputDataError, emailIdError: true});
      } else {
        ForgotPasswordAPI();
      }
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                             forgot password api                            */
  /* -------------------------------------------------------------------------- */
  const ForgotPasswordAPI = () => {
    var mobile_no = isPhoneNumberSelected
      ? InputData.phoneNo
      : InputData.emailId;

    var country_id = isPhoneNumberSelected ? selectedCountryData.id : null;
    var data = JSON.stringify({
      pageUrl:'sendOTPMSG91VersionFive',

      country_Code: country_id,
      module_Name: 'Password Reset',
      mobile_no: mobile_no,
    });
    var config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'sendOTPMSG91VersionFive?' +
          OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL +
          'sendOTPMSG91VersionFive?' +
          OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'sendOTPMSG91VersionFive',
        event:'ForgotPasswordScreen',
        action:'onClickSubmit'
      },

      data: data,
    };
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        if (response?.data?.message?.type == 'OTP Successful') {
          let party_Code = response?.data?.data?.party_Code;

          navigation.navigate('VerifypasswordForgot', {
            party_Code: party_Code,
          });
        } else if (response?.data?.message?.type == 'Social Account.') {
          setErrorModalMessage(
            'Dear Customer,You seem to have signed up to NexusONE app using social sign-in. Please use the same account and proceed for direct login.',
          );
          setShowErrorModal(true);
        } else {
          setErrorModalMessage(
            'Uh-Oh, the email id/Mobile number entered is not registered with us.',
          );
          setShowErrorModal(true);
        }
      })
      .catch(function (error) {
        setErrorModalMessage(
          'Please wait for few minutes before you try again !!',
        );
        setShowErrorModal(true);
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                           radio button component                           */
  /* -------------------------------------------------------------------------- */
  const PhoneEmailOptionSelection = () => {
    return (
      <View style={styles.radioButtonMainContainer}>
        <View style={styles.radioButtonContainer}>
          <CheckBox
            value={isPhoneNumberSelected}
            disabled={isPhoneNumberSelected}
            onValueChange={() => setIsPhoneNumberSelected(true)}
            tintColors={{true: R.themes.darkIconColor}}
            onAnimationType={'fill'}
            offAnimationType={'fill'}
            onCheckColor={R.themes.darkIconColor}
            onTintColor={R.themes.darkIconColor}
            style={{height: R.dimensions.wp(5)}}
          />

          <Text style={styles.radioButtonText}>Phone No</Text>
        </View>

        <View style={styles.radioButtonContainer}>
          <CheckBox
            value={!isPhoneNumberSelected}
            disabled={!isPhoneNumberSelected}
            onValueChange={() => setIsPhoneNumberSelected(false)}
            tintColors={{true: R.themes.darkIconColor}}
            onAnimationType={'fill'}
            offAnimationType={'fill'}
            onCheckColor={R.themes.darkIconColor}
            onTintColor={R.themes.darkIconColor}
            style={{height: R.dimensions.wp(5)}}
          />
          <Text style={styles.radioButtonText}>Email</Text>
        </View>
      </View>
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                                render method                               */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <BackHeader navigation={navigation} />
      <RootView>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          keyboardShouldPersistTaps={'handled'}
          enableResetScrollToCoords={false}
          enableOnAndroid={true}
          extraHeight={10}
        >
          <Text style={styles.headerText}>Enter Below Details</Text>
          <Text style={styles.helpingText}>
            Please enter your Email ID or Phone Number to receive a confirmation
            code to set a new password.
          </Text>
          <PhoneEmailOptionSelection />
          {isPhoneNumberSelected ? (
            <CustomCountryCodeTextInput
              country={selectedCountryData.code}
              onSelect={handleCountryCodeSelect}
              value={InputData.phoneNo}
              onChangeText={(text) => handleOnChange('phoneNo', text)}
              showErrorText={InputDataError.phoneNoError}
              maxLength={selectedCountryData.length}
            />
          ) : (
            <CTextInput
              value={InputData.emailId}
              placeholder="Email ID "
              onChangeText={(text) => handleOnChange('emailId', text)}
              errorText={'* Please Enter Valid Email'}
              showErrorText={InputDataError.emailIdError}
            />
          )}
          <SimpleButton
            onPress={validateInput}
            title={
              isPhoneNumberSelected ? 'Confirm Phone Number' : 'Confirm Email'
            }
          />
          <CModal
            isVisible={ShowErrorModal}
            modalMsg={ErrorModalMessage}
            onPressModal={() => {
              setShowErrorModal(!ShowErrorModal);
              navigation.goBack();
            }}
            isForm={'Signup'}
          />
        </KeyboardAwareScrollView>
      </RootView>
    </>
  );
};
