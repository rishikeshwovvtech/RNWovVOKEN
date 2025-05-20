import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native';
/* -------------------------------------------------------------------------- */
/*                                local import                                */
/* -------------------------------------------------------------------------- */
import {BackHeader, RootView} from '../../../components/index';
import R from '../../../R';
import Nexus247SelectionScreenStyle from './Nexus247SelectionScreenStyle';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IMAGE_URL,
  IS_CDN,
} from '../../../utils/Constants';
import {AuthContext} from '../../../context/auth/AuthContext';

/* -------------------------------------------------------------------------- */
/*                               main component                               */
/* -------------------------------------------------------------------------- */
export const Nexus247SelectionScreen = ({navigation, route}) => {
  const {authState} = useContext(AuthContext);
  const mallDetails = route.params.mallDetails;
  console.log(
    '🚀 ~ Nexus247SelectionScreen.js:16 ~ Nexus247SelectionScreen ~ mallDetails:',
    mallDetails,
    authState.userToken
      ? mallDetails.SplashScreen1Image
      : mallDetails.SkipSplashScreenimage,
  );
  /* -------------------------------------------------------------------------- */
  /*                             main render method                             */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <BackHeader navigation={navigation} showBackButton={false} />
      <RootView>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Text style={Nexus247SelectionScreenStyle.welcomeText}>
              Welcome !
            </Text>
          </View>

          <View style={{flex: 5}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'MainNavigator',
                      params: {
                        screen: 'FyndWebView',
                        params: {isFromNexus247Selection: true},
                      },
                    },
                  ],
                })
              }
            >
              <Image
                resizeMode="cover"
                source={{
                  uri:
                    (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                    (authState.userToken
                      ? mallDetails.SplashScreen1Image
                      : mallDetails.SkipSplashScreenimage),
                }}
                style={Nexus247SelectionScreenStyle.view}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5}} />
          <View style={{flex: 5}}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() =>
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
                })
              }
            >
              <Image
                resizeMode="cover"
                source={{
                  uri:
                    (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                    mallDetails.SplashScreen2Image,
                }}
                style={Nexus247SelectionScreenStyle.view}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5}} />
        </View>
      </RootView>
    </>
  );
};
