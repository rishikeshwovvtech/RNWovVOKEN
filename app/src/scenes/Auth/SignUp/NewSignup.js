import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Modal,
  Keyboard,
} from 'react-native';
import {AuthContext} from '../../../context/auth/AuthContext';
import CryptoJS from 'react-native-crypto-js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '@react-native-firebase/database';
import CheckBox from '@react-native-community/checkbox';
import RNOtpVerify from 'react-native-otp-verify';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import analytics from '@react-native-firebase/analytics';
// import ExtraDimensions from 'react-native-extra-dimensions-android';

/* -------------------------------------------------------------------------- */
/*                                local imports                               */
/* -------------------------------------------------------------------------- */
import {
  BackHeader,
  CModal,
  CTextInput,
  RootView,
  SimpleButton,
} from '../../../components/index';
import {CustomCountryCodeTextInput} from '.././Login/CustomCountryCodeTextInput';
import R from '../../../R';
import styles from './SignUpStyle';
import {
  EMAIL_REGEX_PATTERN,
  TEXTINPUT_REJEX_PATTREN,
  TENANT_ID,
  USER_APP_ID,
  AUTH_BASE_URL,
  PASSWORD_REJEX_PATTERN,
  USER_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  FCM_BASE_OPEN_API_URL,
  Temp_Token,
  Register_ID,
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
import {resetNavigation} from '../../../utils/NavigationService';

export const NewSignUp = ({navigation, params}) => {
  const CleverTap = require('clevertap-react-native');
  const {authAction, authState} = useContext(AuthContext);

  const [InputData, setInputData] = useState({
    firstName: '',
    email: '',
    phone: Number,
    password: '',
    confirmpwd: '',
  });
  const [InputDataError, setInputDataError] = useState({
    firstNameError: false,
    emailError: false,
    phoneError: false,
    passwordError: false,
    confirmpwdError: false,
  });

  const [tncSelection, setTncSelection] = useState(false);
  const [selectedGender, setSelectedGender] = useState(1);
  const [date, setDate] = useState(new Date('2020-01-01'));
  const [Adate, setADate] = useState(new Date('2020-01-01'));
  const [newDate, setnewDate] = useState(null);
  const [AnewDate, setAnewDate] = useState(null);
  const [apinewDate, setapinewDate] = useState(null);
  const [apiAnewDate, setapiAnewDate] = useState(null);

  const [SignupLoader, setSignupLoader] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [EmailCheck, setEmailCheck] = useState(false);
  const [PhoneCheck, setPhoneCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Editable, setEditable] = useState(true);
  const [EmailEditable, setEmailEditable] = useState(true);
  const [SendOtp, setSendOtp] = useState(false);
  const [Otp, setOtp] = useState();
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [ShowSuccessModal, setShowSuccessModal] = useState(false);
  const [SuccessModalMessage, setSuccessModalMessage] = useState(null);
  const [SuccessModaldwg_point, setSuccessModaldwg_point] = useState(null);

  const [countryCode] = useState('');

  const [selectedCountryData, setSelectedCountryData] = useState({
    code: '+91',
    length: 10,
    id: 118121891,
  });
  var timerId;
  useFocusEffect(
    React.useCallback(() => {
      getDatabaseValue();
      ScreenAnalytics('Sign_Up', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});

      return () => clearTimeout(timerId);
    }, []),
  );

  const handleOnChange = (name, value) => {
    setInputData({...InputData, [name]: value.replace(/\s/g, ' ')});
    setInputDataError({...InputDataError, [`${name}Error`]: false});
  };
  // const hasNotchDisplay = ExtraDimensions.get('STATUS_BAR_HEIGHT') > 24;
  // 'hasNotchDisplay', hasNotchDisplay;

  // ***********************  Firebase age and dob data fetching  *****************************

  const [ageristriction, setAgeristriction] = useState('');
  const [dobCompulsion, setBobCompulsion] = useState('');

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
    if (!EmailCheck) {
      setErrorModalMessage('Email is not verified. Please use valid email');
      setShowErrorModal(true);
    } else if (!PhoneCheck) {
      setErrorModalMessage(
        'Phone number is not verified. Please use valid phone number',
      );
      setShowErrorModal(true);
    } else if (
      InputData.firstName == '' ||
      TEXTINPUT_REJEX_PATTREN.test(InputData.firstName) == false
    ) {
      setInputDataError({...InputDataError, firstNameError: true});
    } else if (
      InputData.email == '' ||
      EMAIL_REGEX_PATTERN.test(InputData.email) == false
    ) {
      setInputDataError({
        ...InputDataError,
        emailError: true,
      });
    } else if (InputData.phone == '' || InputData.phone.length < 10) {
      setInputDataError({
        ...InputDataError,
        phoneError: true,
      });
    } else if (InputData.password == '') {
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
        'The passwords entered don’t match. Please try again',
      );
      setShowErrorModal(true);
    } else {
      var key = CryptoJS.enc.Base64.parse('2b7e151628aed2a6abf7158809cf4f3c');
      var iv = CryptoJS.enc.Base64.parse('S4duQOLzqeKP3rf8nSb5Ow==');
      var encrypted = CryptoJS.AES.encrypt(InputData.password, key, {iv: iv});
      encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      navigation.navigate('NewSignUp', {
        password: encrypted,
        email: InputData.email,
        username: InputData.phone,
        firstName: InputData.firstName.split(' ')[0],
        fullName: InputData.firstName,
        imageUrl: '',
        lastName:
          InputData.firstName.split(' ')[1] != undefined
            ? InputData.firstName.split(' ')[1]
            : '',
        mobilePhone: InputData.phone,
        country_Code: selectedCountryData.id,
      });
    }
  };
  const validate_without_data = () => {
    if (
      InputData.firstName == '' ||
      TEXTINPUT_REJEX_PATTREN.test(InputData.firstName) == false
    ) {
      setInputDataError({...InputDataError, firstNameError: true});
    } else if (
      InputData.email == '' ||
      EMAIL_REGEX_PATTERN.test(InputData.email) == false
    ) {
      setInputDataError({
        ...InputDataError,
        emailError: true,
      });
    } else if (InputData.phone == '' || InputData.phone.length < 10) {
      setInputDataError({
        ...InputDataError,
        phoneError: true,
      });
    } else if (InputData.password == '') {
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
        'The passwords entered don’t match. Please try again',
      );
      setShowErrorModal(true);
    } else {
      var key = CryptoJS.enc.Base64.parse('2b7e151628aed2a6abf7158809cf4f3c');
      var iv = CryptoJS.enc.Base64.parse('S4duQOLzqeKP3rf8nSb5Ow==');
      var encrypted = CryptoJS.AES.encrypt(InputData.password, key, {iv: iv});
      encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
      navigation.navigate('NewSignUp', {
        password: encrypted,
        email: InputData.email,
        username: InputData.phone,
        firstName: InputData.firstName.split(' ')[0],
        fullName: InputData.firstName,
        imageUrl: '',
        lastName:
          InputData.firstName.split(' ')[1] != undefined
            ? InputData.firstName.split(' ')[1]
            : '',
        mobilePhone: InputData.phone,
        country_Code: selectedCountryData.id,
      });
    }
    //  else if (
    //   dobCompulsion == true &&
    //   newDate != null &&
    //   !isOlderThanAgeRestriction(newDate, ageristriction)
    // ) {
    //   setErrorModalMessage(
    //     'Please enter a valid date of birth. You must be 18 years or above to register on NexusOne App !!',
    //   );
    //   setShowErrorModal(true);
    // } else if (EmailCheck === false) {
    //   setErrorModalMessage(
    //     'Please click on "Send OTP" to verify the mobile number, before sign-up !!',
    //   );
    //   setShowErrorModal(true);
    // } else if (PhoneCheck === false) {
    //   setErrorModalMessage(
    //     'Please click on "Send OTP" to verify the mobile number, before sign-up !!',
    //   );
    //   setShowErrorModal(true);
    // }
  };
  // *********************** End of Validation  *****************************

  // *********************** Country Code and OTP validation  *****************************

  // *********************** Country Code selection
  const handleCountryCodeSelect = (code, length, id) => {
    setSelectedCountryData({
      code: code,
      length: length,
      id: id,
    });
    changeTextFunction('', length);
  };

  const changeTextFunction = (text, length) => {
    text.trim().length == length ? setSendOtp(true) : setSendOtp(false),
      text.trim().length > 0
        ? handleOnChange('phone', text.trim())
        : handleOnChange('phone', text);
  };
  // *********************** End Country Code selection
  const otpautofetch = () => {
    if (Platform.OS === 'android') {
      timerId = setTimeout(() => {
        RNOtpVerify?.getHash()
          .then((test) => {})
          .catch((p) => {});
        RNOtpVerify.getOtp()
          .then((p) => {})
          .catch((p) => {});
      }, 1000);
    }
  };

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
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'signUpsmsversionsix?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'signUpsmsversionsix?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'signUpsmsversionsix',
        event: 'SignUpScreen',
        action: 'verifyNumberViaOtp',
      },

      data: data,
    };
    // setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        // setShowLoader(false);

        //console.log("_sendOtp ",response.data);

        setTimeout(() => {
          if (response?.data?.message?.code == 0) {
            setModalVisible(true);
            otpautofetch();
          } else if (response?.data?.message?.code == 1016) {
            setErrorModalMessage(response?.data?.message?.message);
            setShowErrorModal(true);
          }
        }, 500);
      })
      .catch(function (error) {
        // setShowLoader(false);
      });
  };

  const _verifyOtp = (otp) => {
    if (otp == '') {
      setModalVisible(false);
      setErrorModalMessage('Enter Valid OTP');
      setShowErrorModal(true);
      return;
    }
    if (Platform.OS === 'android') {
      RNOtpVerify.removeListener();
    }

    var data = {
      pageUrl: 'verifysignupotpversionfour',
      formList: [
        {
          country_Code: selectedCountryData.id,
          otp: parseInt(otp),
          to: InputData.phone,
        },
      ],
    };
    var config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'verifysignupotpversionfour?' +
          OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL +
          'verifysignupotpversionfour?' +
          OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'verifysignupotpversionfour',
        event: 'SignUpScreen',
        action: 'verifyEnteredOTP',
      },

      data: data,
    };
    setModalVisible(false);
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        setShowLoader(false);
        setModalVisible(false);
        setErrorModalMessage(response?.data?.message?.message);
        setShowErrorModal(true);

        if (
          response?.data?.message?.code === 0 ||
          response?.data?.message?.code === 1018
        ) {
          setPhoneCheck(true);
          setSendOtp(false);
          setEditable(false);

          Keyboard.dismiss();
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };
  // ***********************  End of Country Code and OTP validation *****************************

  /* -------------------------------------------------------------------------- */
  /*                         push notification api call                         */
  /* -------------------------------------------------------------------------- */

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
      'Date Of Birth': new Date(userResponse.data.user?.birthDate),
      Gender:
        userResponse.data.user?.userGender == '0'
          ? 'F'
          : userResponse.data.user?.userGender == '1'
          ? 'M'
          : 'O',

      'Default Mall': authState?.mallDetails?.oko_Row_Desc,
      'Signup Date': new Date(),
      'User Status': 'ACTIVE',
      ...(userResponse.data.user?.userDOA != null &&
      userResponse.data.user?.userDOA != ''
        ? {'Anniversary Date': new Date(userResponse.data.user?.userDOA)}
        : {}),
      'MSG-whatsapp': true,
    };

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
    var fullname = InputData.firstName;
    var key = CryptoJS.enc.Base64.parse('2b7e151628aed2a6abf7158809cf4f3c');
    var iv = CryptoJS.enc.Base64.parse('S4duQOLzqeKP3rf8nSb5Ow==');
    var encrypted = CryptoJS.AES.encrypt(InputData.password, key, {iv: iv});
    encrypted = encrypted.ciphertext.toString(CryptoJS.enc.Base64);

    var data = JSON.stringify({
      user: {
        password: encrypted,
        data: {
          role: 'Customer',
          role_template: 'Unregistered Sales',
          displayName: 'testinguser',
          birthDate: '',
          timezone: 'Asia/Calcutta',
          userDOA: '',
          userGender: '',
          favoriteColors: ['Red', 'Blue'],
          country_Code: selectedCountryData.id,
          fcm_Token: fcmToken,
          platform_Desc: deviceplatfrom,
        },
        email: InputData.email,
        username: InputData.phone,
        encryptionScheme: 'salted-sha256',
        factor: 24000,
        firstName: InputData.firstName.split(' ')[0],
        fullName: fullname,
        imageUrl: '',
        lastName:
          InputData.firstName.split(' ')[1] != undefined
            ? InputData.firstName.split(' ')[1]
            : '',
        middleName: 'test2',
        mobilePhone: InputData.phone,
        passwordChangeRequired: false,
        preferredLanguages: ['en', 'fr'],
        twoFactorEnabled: false,
        usernameStatus: 'PENDING',
      },
      //pageUrl:'SequentialSignUp',
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
        //console.log("SequentialSignUp config ",config);

        //console.log("SequentialSignUp response?.data ",response?.data);
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
        //console.log("SequentialSignUp config ",config);

        //console.log("SequentialSignUp error ",error);

        setSignupLoader(false);
        setShowLoader(false);
        setErrorModalMessage(
          'Please wait for few minutes before you try again',
        );
        setShowErrorModal(true);
      });
  };

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
              //position: 'absolute',
              paddingBottom: '10%',
              // height: '50%',
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
                  Enter the OTP sent on
                </Text>
                <Text
                  style={{
                    color: R.themes.boxBackgroundColour,
                    fontSize: 15,
                    paddingTop: Platform.OS == 'ios' ? '0.5%' : '1%',
                    fontFamily: R.fonts.primaryMedium,
                  }}
                >
                  {' '}
                  {InputData.phone}
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
                onCodeFilled={(code) => _verifyOtp(code)}
              />
            </View>
            <TouchableOpacity
              disabled={ShowLoader}
              onPress={() => {
                _verifyOtp(Otp);
              }}
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
            <TouchableOpacity onPress={() => setModalVisible(false)}>
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
  // ***********************  Email Check  *****************************
  const _check_Email = (EmailData) => {
    var data = JSON.stringify({
      email: EmailData,
      pageUrl: 'CheckEmailAvailable',
    });

    var config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/CheckEmailAvailable?tenantId=_${TENANT_ID}&user_App_ID=${USER_APP_ID}&isAuthReq=0`,
      headers: {
        'Content-Type': 'application/json',
        pageUrl: 'CheckEmailAvailable',
        event: 'SignUpScreen',
        action: 'checkEmailValidity',
        access_Token: Temp_Token,
        Register_Id: Register_ID,
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(async function (response) {
        setShowLoader(false);
        if (response.data == 'SUCCESS') {
          setEmailCheck(false);
          setErrorModalMessage('Email ID already exists');
          setShowErrorModal(true);
        } else if (response?.data == 'AuthInvalid') {
          await authAction.removeData();
          try {
            resetNavigation('AuthNavigator', 'Login', 'null');
          } catch (error) {}
        } else {
          setEmailCheck(true);
          setEmailEditable(false);
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };
  // ***********************  Mobile Number Check  *****************************
  const _check_Phone = (phone) => {
    setOtp('');
    Keyboard.dismiss();

    var data = JSON.stringify({
      pageUrl: 'CheckMobileAvailable1',

      mobile: String(phone),
      countryCode: String(selectedCountryData.id),
    });

    var config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'CheckMobileAvailable1?' +
          OPEN_API_TENANT_ID +
          `&user_App_ID=${USER_APP_ID}&isAuthReq=0`
        : FCM_BASE_OPEN_API_URL +
          'CheckMobileAvailable1?' +
          OPEN_API_TENANT_ID +
          `&user_App_ID=${USER_APP_ID}&isAuthReq=0`,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'CheckMobileAvailable1',
        event: 'SignUpScreen',
        action: 'checkPhoneValidity',
      },

      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(async function (response) {
        setShowLoader(false);
        //console.log("_check_Phone ",response.data);
        if (response?.data == 'AuthInvalid') {
          await authAction.removeData();

          try {
            resetNavigation('AuthNavigator', 'Login', 'null');
          } catch (error) {}
        } else {
          setTimeout(() => {
            if (response.data == 'SUCCESS') {
              setErrorModalMessage('Mobile Number already exists');
              setShowErrorModal(true);
            } else if (response.data == 'FAIL') {
              _sendOtp(phone);
            }
          }, 500);
        }
      })
      .catch(function (error) {
        setShowLoader(false);
        setErrorModalMessage('Something went wrong');
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
    );
  };
  /* -------------------------------------------------------------------------- */
  /*                         gender selection component                         */
  /* -------------------------------------------------------------------------- */
  const GenderSelectionRadioButton = () => {
    return (
      <View style={styles.genderSelectionMainContainer}>
        <Text style={styles.radioButtonText}>Gender</Text>

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
          scrollEnabled={!countryCode}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          extraHeight={10}
        >
          {ShowLoader && <LoaderView />}
          {renderModal()}
          <View style={styles.welcomeTextContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.welcomeSubText}>
              Sign up to get started and{'\n'}experience great shopping deals
            </Text>
          </View>

          <CTextInput
            value={InputData.firstName}
            placeholder="First Name & Last Name"
            onChangeText={(text) => handleOnChange('firstName', text)}
            errorText={'* Please Enter Your Valid First Name'}
            showErrorText={InputDataError.firstNameError}
          />
          {/* <GenderSelectionRadioButton /> */}
          <CTextInput
            value={InputData.email}
            placeholder="Email"
            onChangeText={(text) => handleOnChange('email', text.trim())}
            errorText={'* Please Enter valid email'}
            showErrorText={InputDataError.emailError}
            editable={EmailEditable}
            greenCheck={EmailCheck}
            onEndEditing={(event) => {
              EMAIL_REGEX_PATTERN.test(event.nativeEvent.text) == true
                ? _check_Email(event.nativeEvent.text)
                : (setErrorModalMessage('Please enter a valid email'),
                  setShowErrorModal(true));
            }}
          />

          <CustomCountryCodeTextInput
            country={selectedCountryData.code}
            onSelect={handleCountryCodeSelect}
            editable={Editable}
            value={InputData.phone}
            onChangeText={(text) =>
              changeTextFunction(text, selectedCountryData.length)
            }
            showErrorText={InputDataError.phoneError}
            maxLength={selectedCountryData.length}
            greenCheck={PhoneCheck}
            showSendOtpBtn={SendOtp}
            otpBtnOnPress={() => {
              InputData.phone.length == selectedCountryData.length
                ? _check_Phone(InputData.phone)
                : [
                    setErrorModalMessage('Please enter a valid Mobile Number'),
                    setShowErrorModal(true),
                  ];
            }}
          />

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
          {/* <CustomDatePicker
            text={newDate ? `Date Of Birth: ${newDate}` : 'Date Of Birth'}
            date={date}
            onConfirm={(Adate) => {
              dateChangeFun(Adate, 1);
            }}
          /> */}

          {/* <CustomDatePicker
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
          </View> */}
          <SimpleButton
            title={'Next'}
            disabled={SignupLoader}
            onPress={() => {
              validate();
            }}
          />
          {/* <SimpleButton
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
              PhoneCheck && EmailCheck ? validate() : validate_without_data();
            }}
          /> */}
          <Text style={styles.signInText}>Already have an account?</Text>
          <SimpleButton
            title={'Sign-in'}
            onPress={() => {
              CTA_firebaseAnalytics('Signup', 'Login')
                .then((res) => {})
                .catch((e) => {});
              navigation.navigate('Login');
            }}
          />
          <Text style={styles.bottomNoteText}>
            Nexus Malls will not use your number for telemarketing.
          </Text>
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
              setSignupLoader(false);
            }}
            isForm={'Signup'}
          />
        </KeyboardAwareScrollView>
      </RootView>
    </>
  );
};
