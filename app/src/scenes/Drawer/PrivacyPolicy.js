import React, {useRef, useContext} from 'react';
import WebView from 'react-native-webview';
//local import
import {RootView} from '../../components/index';
import {useFocusEffect} from '@react-navigation/native';
import checkInternetStatus from '../../internetconnection/inConnectionOn';
import {navigate} from '../../utils/NavigationService';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';

import {AuthContext} from '../../context/auth/AuthContext';
import SubHeader from '../../components/SubHeader';
export const PrivacyPolicy = () => {
  const {authState} = useContext(AuthContext);
  const webViewRef = useRef();

  const internetCheck = () => {
    checkInternetStatus().then((isWorking) => {
      if (!isWorking) {
        navigate('NewInternetScreen');
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('Privacy_Policy', authState?.userToken, authState?.userId)
        .then(() => {})
        .catch(() => {});
      internetCheck();
      // webViewRef.current.reload();
    }, []),
  );

  return (
    <>
      <SubHeader title={'Privacy Policy'} />
      <RootView>
        <WebView
          ref={(ref) => (webViewRef.current = ref)}
          startInLoadingState={true}
          source={{
            uri: 'https://www.nexusselecttrust.com/privacy-policy',
          }}
          style={{
            height: '100%',
            width: '100%',
          }}
          onError={() => {
            internetCheck();
          }}
        ></WebView>
      </RootView>
    </>
  );
};
