import React, {useContext, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CryptoJS from 'react-native-crypto-js';

import {
  AUTH_BASE_URL,
  PASSWORD_REJEX_PATTERN,
  TENANT_ID,
} from '../../../utils/Constants';
import {
  SimpleButton,
  BackHeader,
  CModal,
  CTextInput,
  RootView,
} from '../../../components/index';
import styles from './PasswordChangeStyles';
import R from '../../../R';
import {StackActions} from '@react-navigation/native';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import SubHeader from '../../../components/SubHeader';
import {AuthContext} from '../../../context/auth/AuthContext';
export const PasswordChange = ({route, navigation}) => {
  const {authAction, authState} = useContext(AuthContext);
  const party_Code = route?.params?.party_Code;

  const [InputData, setInputData] = useState({
    password: '',
    confirmpwd: '',
  });

  const [InputDataError, setInputDataError] = useState({
    passwordError: false,
    confirmpwdError: false,
  });

  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [ShowErrorModalCancel, setShowErrorModalCancel] = useState(false);
  const handleOnChange = (name, value) => {
    setInputData({...InputData, [name]: value});
    setInputDataError({...InputDataError, [`${name}Error`]: false});
  };

  const validation = () => {
    if (InputData.password == '') {
      setInputDataError({
        ...InputDataError,
        passwordError: true,
      });
    } else if (!PASSWORD_REJEX_PATTERN.test(InputData.password) === true) {
      setInputDataError({
        ...InputDataError,
        passwordError: true,
      });
    } else if (InputData.confirmpwd == '') {
      setInputDataError({
        ...InputDataError,
        confirmpwdError: true,
      });
    } else if (InputData.confirmpwd !== InputData.password) {
      setErrorModalMessage(
        'The passwords and confirm password entered don’t match. Please try again',
      );
      setShowErrorModal(true);
      setShowErrorModalCancel(true);
    } else {
      changePasswordAPI();
    }
  };

  const changePasswordAPI = () => {
    var key = CryptoJS.enc.Base64.parse('2b7e151628aed2a6abf7158809cf4f3c');
    var iv = CryptoJS.enc.Base64.parse('S4duQOLzqeKP3rf8nSb5Ow==');
    var encrypted = CryptoJS.AES.encrypt(InputData.password, key, {iv: iv});
    encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    var data = JSON.stringify({
      loginId: party_Code,
      password: encrypted,
      //pageUrl:'forgotPasswordInFusionauthEmailV1',
    });

    var config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/forgotPasswordInFusionauthEmailV2?tenantId=_${TENANT_ID}`,
      headers: {
        'Content-Type': 'application/json',
        pageUrl: 'forgotPasswordInFusionauthEmailV2',
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        event: 'ChangePasswordScreen',
        action: 'onClickSubmit',
      },
      data: data,
    };
    //console.log("changePasswordAPI config ",config);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        // console.log("changePasswordAPI ",response);
        // console.log("changePasswordAPI config ",config);
        setErrorModalMessage(response?.data?.message?.message);
        setShowErrorModal(true);
      })
      .catch(function (error) {
        //console.log("changePasswordAPI error ",error);

        setErrorModalMessage(
          'Please wait for few minutes before you try again !!',
        );
        setShowErrorModal(true);
      });
  };

  const backAction = () => {
    setErrorModalMessage('Do you want the exit the change password process');
    setShowErrorModal(true);

    return true;
  };

  const signOut = async () => {
    try {
      navigation.dispatch(StackActions.pop(3));
    } catch (error) {}
  };
  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Change Password'} />
      <RootView>
        <KeyboardAwareScrollView
          style={styles.subcontainer}
          keyboardShouldPersistTaps={'handled'}
          enableResetScrollToCoords={false}
          enableOnAndroid={true}
          extraHeight={10}
        >
          <View style={styles.mainContainer}>
            <Image
              resizeMode={'contain'}
              style={{width: R.dimensions.wp(40), height: R.dimensions.wp(40)}}
              source={R.images.ForgotPassword1}
            />
            <Text style={styles.mainText1}>New Credentials</Text>
            <Text style={styles.mainText2}>Please set your new password.</Text>
          </View>
          <View>
            <CTextInput
              value={InputData.password}
              placeholder="Password"
              onChangeText={(text) => handleOnChange('password', text.trim())}
              secureTextEntry={true}
              errorText={
                '* Password must be atleast 5 characters long and \n should include atleast 1 capital alphabet'
              }
              showErrorText={InputDataError.passwordError}
            />
            <CTextInput
              value={InputData.confirmpwd}
              placeholder="Confirm Password"
              onChangeText={(text) => handleOnChange('confirmpwd', text.trim())}
              secureTextEntry={true}
              errorText={'* Please Enter valid confirm password'}
              showErrorText={InputDataError.confirmpwdError}
            />
            <SimpleButton
              onPress={validation}
              title={'Reset Password'}
              customTxtStyle={styles.buttontext}
              customStyle={styles.button}
            />
            <CModal
              isVisible={ShowErrorModal}
              modalMsg={ErrorModalMessage}
              onPressModal={() => {
                ShowErrorModalCancel === true
                  ? [
                      setShowErrorModalCancel(!ShowErrorModal),
                      setShowErrorModal(!ShowErrorModal),
                    ]
                  : [
                      setShowErrorModal(!ShowErrorModal),
                      navigation.navigate('Login'),
                    ];
              }}
              onCancelPressModal={() => [setShowErrorModal(!ShowErrorModal)]}
              isForm={'Signup'}
            />
          </View>
        </KeyboardAwareScrollView>
      </RootView>
    </>
  );
};
