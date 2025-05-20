import React from 'react';
import {View, SafeAreaView, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import {BackHeader} from '../../components';
import R from '../../R';
import {Image} from 'react-native';

export const NotificationWebView = ({navigation, route}) => {
  const redirectUrl = route.params.redirectUrl;
  return (
    <View style={{flex: 1, backgroundColor: R.colors.primaryBrand2}}>
      <SafeAreaView style={{flex: 1}}>
        <BackHeader title={'Your Space'} navigation={navigation} />
        <WebView
          startInLoadingState={true}
          renderLoading={() => (
            <View style={{flex: 1}}>
              {/* <ActivityIndicator
                size={'large'}
                color={R.themes.boxBackgroundColour}
              /> */}
              <Image
                source={R.images.loaderNexus}
                style={{width: 50, height: 50}}
              />
            </View>
          )}
          style={{width: '100%', height: '100%'}}
          source={{uri: redirectUrl}}
        />
      </SafeAreaView>
    </View>
  );
};
