import React, {useState, useContext} from 'react';
import {View} from 'react-native';

import {
  RootView,
  BackHeader,
  SimpleButton,
  CModal,
  CTextInput,
} from '../../../components/index';
import styles from './SetPasswordStyle';
import {
  TENANT_ID,
  USER_APP_ID,
  EMAIL_REGEX_PATTERN,
  AUTH_BASE_URL,
  PASSWORD_REJEX_PATTERN,
} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {AuthContext} from '../../../context/auth/AuthContext';
import SubHeader from '../../../components/SubHeader';
import CryptoJS from 'react-native-crypto-js';
export const SetNewPassword = ({navigation}) => {
  const {authState, authAction} = useContext(AuthContext);
  let email = authState?.userObject?.email;

  const [InputData, setInputData] = useState({
    emailId: email,
    oldPassword: '',
    newPassword: '',
  });
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [pwdSuccessModal, setPwdSuccessModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [InputDataError, setInputDataError] = useState({
    emailIdError: false,
    oldPasswordError: false,
    newPasswordError: false,
    samePasswordError: false,
  });

  const handleOnChange = (name, value) => {
    setInputData({...InputData, [name]: value});
    setInputDataError({...InputDataError, [`${name}Error`]: false});
  };

  const validate = () => {
    if (
      InputData.emailId === '' ||
      EMAIL_REGEX_PATTERN.test(InputData.emailId) === false
    ) {
      setInputDataError({...InputDataError, emailIdError: true});
    } else if (
      InputData.oldPassword === ''
      //  || PASSWORD_REJEX_PATTERN.test(InputData.password) === false
    ) {
      setInputDataError({
        ...InputDataError,
        oldPasswordError: true,
      });
    } else if (
      InputData.newPassword === ''
      //  || PASSWORD_REJEX_PATTERN.test(InputData.password) === false
    ) {
      setInputDataError({
        ...InputDataError,
        newPasswordError: true,
      });
    } else if (!PASSWORD_REJEX_PATTERN.test(InputData.newPassword) === true) {
      setInputDataError({
        ...InputDataError,
        newPasswordError: true,
      });
    } else if (InputData.oldPassword == InputData.newPassword) {
      setErrorModalMessage('Password cannot be same');
      setShowErrorModal(true);
    } else {
      resetPasswordAPI();
    }
  };

  const resetPasswordAPI = () => {
    var key = CryptoJS.enc.Base64.parse('2b7e151628aed2a6abf7158809cf4f3c');
    var iv = CryptoJS.enc.Base64.parse('S4duQOLzqeKP3rf8nSb5Ow==');
    var encrypted1 = CryptoJS.AES.encrypt(InputData.oldPassword, key, {iv: iv});
    encrypted1 = encrypted1.ciphertext.toString(CryptoJS.enc.Base64);
    var encrypted2 = CryptoJS.AES.encrypt(InputData.newPassword, key, {iv: iv});
    encrypted2 = encrypted2.ciphertext.toString(CryptoJS.enc.Base64);
    let data = JSON.stringify({
      currentPassword: encrypted1,
      loginId: InputData.emailId,
      password: encrypted2,
      //pageUrl:'resetPasswordInFusionauth4',
    });

    let config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/resetPasswordInFusionauth5?tenantId=_${TENANT_ID}`,
      headers: {
        tenantId: `_${TENANT_ID}`,
        user_App_ID: USER_APP_ID,
        access_Token: authState?.userToken,
        userid: authState?.userId,
        // access_Token: 'f05adc8996594d238dd71c135e99db49.eyJhbGciOiJSU0EtT0FFUC0yNTYiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2Iiwia2lkIjoiNzc2NjYxOTY5NTg2OTYzIiwiY3R5IjoiSldUIn0.R0ZqVKmQj5Wd4UvMPinINfS-P6vjSBq6N_g8txOAef_M4uFQDIVM-UBc16TDUI-TnAasyyIGj0KMmkgLKVjHqcRq2ATP7zt8NVv8lD4V7hgn624_BKvKdD7U9uaVnKVfSgiVAOsdkbMuGylz33Y7AHRxxkfgpFSNwcnqn5uRxWQYCeXxENtekUkUKcH1KSVvnC-SNqg-GyfScXdUiJeAEMAf8U0vdenUJX1JnyvI9ssRW2zdSOSvbiQtaMthE-WQKamRly1UqaGaDdZbJapoqLkar3lXOiQlFkWYAu1GFOur88KODW34hOrF2NrENAw1MjPpTK0EBh4QHnYEzWp_vw.ItP4zg6UzPekogyWk3Zpwg.FS2pflLmqkqx0ivEz4uzEKz_nLFtEIpYWhjKJ5nzn6YT4VhoexpPO993uom8Ts4v02ZDaygzoMy34N44ydHj8dUWmPYHxSy_yd6-MaiW0qQMPoCftsgwTcnzvXAOG1Lew-WwJdgqXc9vU0mERV6dYYbXmqzyHChjLk36p7QdC2h7tg80Nag1YxpoXH4WSyHjNXaMFY5Ggdz83_lNgTZqC6TROBSp7k7ZTZE5CB7yb6a2BIhmpxYQvrQ5nVoGV-u5QxfO8KIjnQ3kuHXfQoJFg6eKnNnz7_ywpEB9IAb_sBixpsv8ZUFTpYEgKLnfgbemaug9WoIIlKIhTBregGZCUk1WnCjXHcvsZuslXNRwPGpOHu0ufltYSaLkYutGh-o_wC90c17eGiT4cy7P8qoqoM5VRWZylrvIkoLg5Z0CCGm9rwk-vIlnqIXiNC9MeyRH2iSx7KL-6a-v4vwvd8wESFjBg6P_137DN_GuKPTlEbg-EKCUAMP_TULbk6GPNlnRIxK2-ksKVp8ZJDcFwLBZjK3yAidx9iOzdaf9lvw3R5C3MStrWbY_zquTEAKr_0bEKc8kzoV9OxgIRoh44GBeDhlUQDW94gAiUkvUvBOQzx7cPWXJmsxnZ2v6DVYe0rYxQfYrptXNVITJPlEYUxeXHXkZePlnJnCvm3XGURUD4Yi5Iu_mKf8v5bL5rQYmFxYe3jRAHt-BHxtl_1ojbM7j2t3gu8TczcBsJkDcy6xEYT_u0NQnjj4EzZY8OAXjUA_-Ho_1oIPADEpcWHh1xR8-oejaf8WUBGcauslYalprSiE.Uq9fEOHoTUz25DxjRnyLrA',
        // userId: '776661969586963',
        isAuthReq: '1',
        

        //  authorization: 'mRUY0JEjWkoGwljOYn1_WYs57l_jcgNnq0X6ymwGzCljxnypFvCYpOIt',
        'Content-Type': 'application/json',
        pageUrl:'resetPasswordInFusionauth5',
        event:'SetNewPasswordScreen',
        action:'onResetPasswordSubmit'
      },
      data: data,
    };

   fetchApiService(config, authAction,authState)
      .then(function (response) {
        //console.log("set new password ",response);
        ////console.log("set new password response.data ",response.data);

        if (JSON.stringify(response.data) == '"Password unsuccessful!"') {
          setErrorModalMessage('Please Enter Correct Old Password !!');
          setShowErrorModal(true);
        } else {
          setErrorModalMessage(response.data);
          setPwdSuccessModal(true);
        }
      })
      .catch(function (error) {
          //console.log("set new password error ",error);
      });
  };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Change Password'} />
      <RootView>
        <View style={styles.textInputView}>
          <CTextInput
            placeholder="Email Address"
            editable={false}
            value={email}
          />

          <CTextInput
            value={InputData.oldPassword}
            placeholder="Old Password"
            secureTextEntry={true}
            onChangeText={(text) => handleOnChange('oldPassword', text.trim())}
            errorText={'* Please enter valid old password'}
            showErrorText={InputDataError.oldPasswordError}
          />

          <CTextInput
            value={InputData.newPassword}
            placeholder="New Password"
            secureTextEntry={true}
            onChangeText={(text) => handleOnChange('newPassword', text.trim())}
            errorText={
              '* Password must be atleast 5 characters long and \n should include atleast 1 capital alphabet'
            }
            showErrorText={InputDataError.newPasswordError}
          />
        </View>
        <SimpleButton onPress={validate} title={'CONFIRM PASSWORD'} />
      </RootView>
      <CModal
        isVisible={ShowErrorModal}
        modalMsg={ErrorModalMessage}
        onPressModal={() => {
          setShowErrorModal(!ShowErrorModal);
        }}
        isForm={'Signup'}
      />
      <CModal
        isVisible={pwdSuccessModal}
        modalMsg={ErrorModalMessage}
        onPressModal={() => {
          setPwdSuccessModal(!pwdSuccessModal);
          authAction.removeData();
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'AuthNavigator',
                params: {
                  screen: 'Login',
                },
              },
            ],
          });
        }}
        isForm={'Signup'}
      />
    </>
  );
};
