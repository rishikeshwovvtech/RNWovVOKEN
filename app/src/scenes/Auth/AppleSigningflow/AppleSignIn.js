import React, {useState, useContext, useEffect} from 'react';
import {ActivityIndicator, View, BackHandler, Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import messaging from '@react-native-firebase/messaging';
//local imports
import {AuthContext} from '../../../context/auth/AuthContext';
import {RootView} from '../../../components/RootView';
import analytics from '@react-native-firebase/analytics';

import {
  APPLE_LOGIN_URL,
  AUTH_BASE_URL,
  TENANT_ID,
  USER_APP_ID,
} from '../../../utils/Constants';
import {fetchPartyCode} from '../API/CommonApiCalls';
import {StackActions} from '@react-navigation/native';
import {MainHeader} from '../../../components';
import R from '../../../R';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';

export const AppleSignIn = ({route, navigation}) => {
  const isfrommallSelection = route.params.isfrommallSelection;
  const [token, setToken] = useState(null);
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowLoader] = useState(false);

  const CleverTap = require('clevertap-react-native');

  useEffect(() => {
    ScreenAnalytics('Apple_Sign_In', '', '')
      .then((res) => {})
      .catch((e) => {});
    // resetParking();
    const backAction = () => {
      isfrommallSelection
        ? navigation.dispatch(StackActions.pop(2))
        : navigation.dispatch(StackActions.pop(1));

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return (
      () => backHandler.remove(),
      BackHandler.removeEventListener('hardwareBackPress', backHandler)
    );
  }, []);

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

    setShowLoader(false);
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

    await analytics()
      .logEvent('signin_event', {
        user_ID: userInfo.userId,
        mall_name: authState?.mallDetails?.oko_Row_Desc,
        is_loggedIn: 1,
        sign_in_mode: 'Social_media:Apple',
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
        userDetails.data?.userGender &&
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

    //CleverTap.profileSet(props);

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
  const storeNow = (tok) => {
    var config = {
      method: 'get',

      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/callBackHtmlForWovvtech1?tenantId=_${TENANT_ID}&isMobile=4&user_App_ID=${USER_APP_ID}&relation=Employee&accessToken=${tok}`,
      headers: {
        pageUrl: 'callBackHtmlForWovvtech1',
        event: 'AppleSignINScreen',
        action: 'onClick',
      },
    };
    fetchApiService(config, authAction, authState)
      .then(async function (response) {
        // let userInfo = {
        //   userId: response.data.data.wovvUserDetails.userId,
        //   userToken: response.data.data.wovvUserDetails.accessToken,
        //   userObject: response.data.data.fusionAuthUserDetails,
        // };
        setShowLoader(true);
        if (response.data == '' || response.data == null) {
        } else {
          if (response.data.data.fusionAuthUserDetails.mobilePhone == null) {
            //   const {pcdta} = await  fetchPartyCode(response.data.data.wovvUserDetails.userId,   response.data.data.wovvUserDetails.accessToken)
            // navigation.navigate('LoginWithPhone', {phoneNo: phoneNo});

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
        }
      })
      .catch(function (error) {});
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
        event: 'AppleSignINScreen',
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
    <>
      <MainHeader navigation={navigation} isFromDrawer={true} />
      <RootView>
        <View style={{flex: 1, height: '100%'}}>
          <WebView
            style={{height: '100%'}}
            source={{
              uri: APPLE_LOGIN_URL,
            }}
            startInLoadingState={true}
            thirdPartyCookiesEnabled={true}
            sharedCookiesEnabled={true}
            renderLoading={() => (
              <View style={{flex: 1}}>
                <ActivityIndicator
                  size={'large'}
                  color={R.themes.boxBackgroundColour}
                />
              </View>
            )}
            //  injectedJavaScript={jsCode}
            onNavigationStateChange={(navState) => {
              if (navState.url.includes('applesuccess')) {
                var res = null;
                var str = navState.url;
                res = str.split('=')[1].split('&')[0];

                if (token == null) {
                  setToken(res);
                  storeNow(res);
                }
              }
            }}
          />
        </View>
      </RootView>
    </>
  );
};
