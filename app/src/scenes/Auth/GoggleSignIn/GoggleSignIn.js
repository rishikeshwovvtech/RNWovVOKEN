import React, {useState, useContext} from 'react';
import {Image, View, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';
//local imports
import {AuthContext} from '../../../context/auth/AuthContext';
import {RootView} from '../../../components/RootView';
import {AUTH_BASE_URL, TENANT_ID, USER_APP_ID} from '../../../utils/Constants';
import {fetchPartyCode} from '../API/CommonApiCalls';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {useFocusEffect} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';
import {horizontalScale} from '../../../../res/scale';
import R from '../../../R';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import analytics from '@react-native-firebase/analytics';

import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import {Platform} from 'react-native';

export const GoggleSignIn = ({route, navigation}) => {
  const isfrommallSelection = route.params.isfrommallSelection;
  const [token, settoken] = useState('');
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowLoader] = useState(false);
  const CleverTap = require('clevertap-react-native');

  const MINUTE_MS = 3000;
  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('Google_Sign_In', '', '')
        .then((res) => {})
        .catch((e) => {});
      let timerId = setTimeout(() => {
        handleGoogleSignIn();
      }, 2000);

      return () => clearTimeout(timerId);
    }, []),
  );

  const getPartyData = async (
    userId,
    accessToken,
    userDetails,
    fcmToken,
    fcmTokenId,
    defaultMall,
    source,
  ) => {
    let currentDate = moment(new Date()).format('MM/DD/YYYY');

    const {result} = await fetchPartyCode(
      userId,
      accessToken,
      authAction,
      authState,
    );
    //console.log("google userdetails ",userDetails);

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

    await authAction.setData(userInfo);
    setShowLoader(false);

    await analytics()
      .logEvent('signin_event', {
        user_ID: userInfo.userId,
        mall_name: authState?.mallDetails?.oko_Row_Desc,
        is_loggedIn: 1,
        sign_in_mode: 'Social_media:Google',
        app_version: DeviceInfo.getVersion,
        device_platform: Platform.OS,
      })
      .then((res) => {})
      .catch((e) => {});

    //CLEVERTAP
    var props = {
      identity: result?.toString(),

      Email: userDetails?.email,
      Phone: userDetails?.mobilePhone,
    };
    if (source != 'App Signup') {
      props['Default Mall'] = defaultMall;
      props['User Status'] = 'ACTIVE';
      props['MSG-whatsapp'] = true;
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
  };

  const handleGoogleSignIn = async (params) => {
    try {
      const test = await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();

      var data = JSON.stringify({
        pageUrl: 'identityProviderLogin',

        applicationId: 'bff87de9-fe1a-4404-9a72-f12d07343c44',
        data: {
          token: userInfo.idToken,
        },
        identityProviderId: '82339786-3dff-42a6-aac6-1f1ceecb6c46',
      });

      var config = {
        method: 'post',
        //SIT
        url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/identityProviderLogin`,
        //PROD
        // url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/identityProviderLoginProd`,

        headers: {
          'Content-Type': 'application/json',
          pageUrl: 'identityProviderLogin',
          event: 'GoogleSignInScreen',
          action: 'onLoad',
        },
        data: data,
      };

      setShowLoader(true);
      fetchApiService(config, authAction, authState)
        .then(function (response) {
          var email = response?.data?.data?.fusionAuthUserDetails?.email;
          var token = response?.data?.data?.fusionAuthUserDetails?.token;
          setShowLoader(false);
          signInGoogle(email, token);
        })
        .catch(function (error) {
          //console.log("gogglesignin error ",error );

          setShowLoader(false);
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // navigation.goBack();
        isfrommallSelection
          ? navigation.dispatch(StackActions.pop(2))
          : navigation.dispatch(StackActions.pop(1));
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        navigation.dispatch(StackActions.pop(2));
      }
    }
  };
  const signInGoogle = (email, token) => {
    //

    var config = {
      method: 'get',
      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/callBackHtmlForWovvtech?tenantId=_${TENANT_ID}&isMobile=4&user_App_ID=${USER_APP_ID}&relation=Employee&email=${email}&accessToken=${token}`,
      headers: {
        pageUrl: 'callBackHtmlForWovvtech',
        event: 'GoogleSignInScreen',
        action: 'onClickSignin',
      },
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        if (response?.data?.data?.fusionAuthUserDetails?.mobilePhone == null) {
          navigation.navigate('AppleVerifyPhone', {
            responsedata: response,
            isfrommallSelection: isfrommallSelection,
          });
        } else {
          apiPushNotification(
            response.data.data.wovvUserDetails.userId,
            response.data.data.wovvUserDetails.accessToken,
            response.data.data.fusionAuthUserDetails,
            response.data.data.wovvUserDetails.defaultMall,
            response.data.data.wovvUserDetails.source,
          );
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  const apiPushNotification = async (
    userId,
    accessToken,
    userDetails,
    defaultMall,
    source,
  ) => {
    const fcmToken = await messaging().getToken();
    let useremail = userDetails.email;
    let deviceplatfrom = Platform.OS === 'ios' ? '2001' : '1001';

    var data = JSON.stringify({
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
    var config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/bpm/process?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: accessToken,
        userid: userId,
        'Content-Type': 'application/json',
        pageUrl: 'loginTimeActiveUserVersion2',
        event: 'GoogleSignInScreen',
        action: 'pushNotification',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
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
        if (authState?.mallDetails?.oko_Row_Desc) {
          getPartyData(
            userId,
            accessToken,
            userDetails,
            fcmToken,
            fcmTokenId,
            defaultMall,
            source,
          );
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  return (
    <RootView>
      {ShowLoader && (
        <View
          style={{
            flex: 1,
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
            /> */}
            <Image
              source={R.images.loaderNexus}
              style={{width: 50, height: 50}}
            />
            <Text
              style={{
                marginTop: '5%',
                fontSize: horizontalScale(12),
                fontFamily: R.fonts.primaryRegular,
                textAlign: 'center',
              }}
            >
              'Please wait while we load the magical world of Nexus..'
            </Text>
          </View>
        </View>
      )}
    </RootView>
  );
};
