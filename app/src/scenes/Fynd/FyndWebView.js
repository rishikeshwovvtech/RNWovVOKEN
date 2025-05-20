import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, ActivityIndicator, Image, Alert, BackHandler} from 'react-native';
import WebView from 'react-native-webview';
import {BackHeader, RootView} from '../../components';
import R from '../../R';
import {AuthContext} from '../../context/auth/AuthContext';
import {useFocusEffect} from '@react-navigation/native';
import {horizontalScale} from '../../../res/scale';
import {AUTH_BASE_URL, TENANT_ID, USER_APP_ID} from '../../utils/Constants';
import axios from 'axios';
const CleverTap = require('clevertap-react-native');

export const FyndWebView = ({navigation, route}) => {
  const isFromNexus247Selection = route?.params?.isFromNexus247Selection;
  const {authState} = useContext(AuthContext);
  const webViewRef = useRef(null);
  const [fyndWebUrl, setfyndWebUrl] = useState('');
  const [ShowLoader, setShowLoader] = useState(false);
  const [webViewCanGoBack, setWebViewCanGoBack] = useState(false);
  const [fyndWebOpened, setfyndWebOpened] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      console.log(
        'first',
        authState?.userToken
          ? fyndWebUrl
          : authState.mallDetails.SkipSplashScreenlink,
      );
      const openTime = new Date();
      CleverTap.recordEvent('Nexus 247 Launched', {
        time: openTime,
      });
      authState?.userToken && apiFynd(openTime);
    }, []),
  );

  useEffect(() => {
    const backAction = () => {
      if (webViewCanGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, [webViewCanGoBack]);

  const onFyndClose = () => {
    const closetime = new Date();

    CleverTap.recordEvent('Nexus 247 Closed', {
      time: closetime,
    });

    try {
      const diffMs = closetime - fyndWebOpened;
      const diffSeconds = diffMs / 1000;
      CleverTap.recordEvent('Nexus 247 Session', {
        time: diffSeconds,
      });
    } catch (error) {}
  };

  const onBackPress = () => {
    if (webViewCanGoBack) {
      webViewRef.current.goBack();
      return true; // Prevent default back action
    } else {
      onFyndClose();
      if (isFromNexus247Selection) {
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
        navigation.goBack();
      }
      return true;
    }
    return false; // Allow default back action
  };

  const apiFynd = (openTime) => {
    console.log(
      'authState?.userObject?.mobilePhone.length > 10',
      authState?.userObject?.mobilePhone.length > 10,
    );
    setfyndWebOpened(openTime);
    setShowLoader(true);
    let dataObj = {
      userId: authState.userId,
      name: authState?.userObject?.fullName,
      email: authState?.userObject?.email,
    };
    if (authState?.userObject?.mobilePhone.length > 10) {
      dataObj.phone = authState?.userObject?.mobilePhone.substring(3);
      dataObj.countryCode = authState?.userObject?.mobilePhone.substring(1, 3);
    } else {
      dataObj.phone = authState?.userObject?.username.substring(3);
      dataObj.countryCode = authState?.userObject?.username.substring(1, 3);
    }
    if (
      authState?.userObject?.data?.birthDate != 'null' &&
      authState?.userObject?.data?.birthDate != null
    ) {
      dataObj.dob = authState?.userObject?.data?.birthDate;
    }
    if (
      authState?.userObject?.data?.userGender != 'null' &&
      authState?.userObject?.data?.userGender != null
    ) {
      dataObj.gender =
        authState?.userObject?.data?.userGender == 0
          ? 'female'
          : authState?.userObject?.data?.userGender == 1
          ? 'male'
          : 'other';
    }

    console.log(
      '🚀 ~ FyndWebView.js:122 ~ apiFynd ~ dataObj:',
      dataObj,
      authState?.userObject?.mobilePhone,
    );
    let data = JSON.stringify(dataObj);

    let config = {
      method: 'post',
      url: AUTH_BASE_URL + `/ipos/rest/FYND/SOSURLV2?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'SOSURLV2',
        event: 'FyndWebView',
        action: 'onLoadFyndWebView',
        user_App_ID: USER_APP_ID,
        fromApp: true,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log('🚀 ~ FyndWebView.js:156 ~ .then ~ response:', response);
        if (response?.data?.message?.type == 'SUCCESS') {
          setShowLoader(false);
          setfyndWebUrl(response?.data?.data?.url);
        } else {
          setShowLoader(false);
          Alert.alert(
            'Something went wrong',
            response?.data?.message?.message,
            [{text: 'Go Back', onPress: () => navigation.goBack()}],
          );
        }
      })
      .catch((error) => {
        setShowLoader(false);
        Alert.alert('Something went wrong', error.message, [
          {text: 'Go Back', onPress: () => navigation.goBack()},
        ]);
      });
  };

  return (
    <>
      <BackHeader
        navigation={navigation}
        customOnPress={onBackPress}
        showNexus247Logo={true}
      />
      <RootView>
        {ShowLoader ? (
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
                padding: '5%',
                borderRadius: 8,
                width: horizontalScale(300),
                alignItems: 'center',
              }}
            >
              <Image
                source={R.images.loaderNexus}
                style={{width: 50, height: 50}}
              />
            </View>
          </View>
        ) : (
          <WebView
            startInLoadingState={true}
            ref={webViewRef}
            allowsBackForwardNavigationGestures
            renderLoading={() => (
              <View style={{flex: 1}}>
                <ActivityIndicator size={'large'} color="#db4712" />
              </View>
            )}
            onNavigationStateChange={(t) => {
              console.log(
                '🚀 ~ FyndWebView.js:202 ~ FyndWebView ~ t:',
                t.canGoBack,
                webViewCanGoBack,
              );
              if (t.canGoBack != webViewCanGoBack) {
                setWebViewCanGoBack(t.canGoBack);
              }

              if (!t.canGoBack) {
                BackHandler.removeEventListener(
                  'hardwareBackPress',
                  onBackPress,
                );
              }
            }}
            style={{width: '100%', height: '100%'}}
            source={{
              uri: authState?.userToken
                ? fyndWebUrl
                : authState.mallDetails.SkipSplashScreenlink,
            }}
          />
        )}
      </RootView>
    </>
  );
};
