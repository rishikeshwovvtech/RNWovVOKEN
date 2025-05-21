/* eslint-disable no-undef */
import React, {useRef, useContext} from 'react';
import {
  Animated,
  View,
  StatusBar,
  BackHandler,
  Linking,
  Alert,
} from 'react-native';
//local import
import styles from './SplashScreenStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import remoteConfig from '@react-native-firebase/remote-config';
import {RootView} from '../../../components/RootView';
import {useFocusEffect} from '@react-navigation/native';
import checkInternetStatus from '../../../internetconnection/inConnectionOn';
import VersionCheck from 'react-native-version-check';
import JailMonkey from 'jail-monkey';
import {getStateFromPath} from '@react-navigation/native';
import {linking} from '../../../utils/DeepLinkHelper';

export const SplashScreen = ({navigation}) => {
  const {authState, authAction} = useContext(AuthContext);
  const deepLinkRouteRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      handleDeepLink();
      animateImage();
      authAction.getData();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      const timer = setTimeout(() => {
        checkNetwork();
      }, 4000);

      return () => clearTimeout(timer);
    }, [authState]),
  );

  const handleDeepLink = async () => {
    const url = await Linking.getInitialURL();
    if (url) {
      // console.log('🚀 ~ SplashScreen.js:48 ~ handleDeepLink ~ url:', url);
      // const path = url.replace(/.*?:\/\//g, ''); // e.g., "map"
      // const t = getStateFromPath(url, linking.config);
      // console.log('🚀 ~ SplashScreen.js:51 ~ handleDeepLink ~ t:', t);
      deepLinkRouteRef.current = url;
    }
  };

  const checkNetwork = async () => {
    const connectionOn = await checkInternetStatus();
    const isJailBroken = JailMonkey.isJailBroken();
    // if (isJailBroken) {
    //   Alert.alert(
    //     'Security Alert',
    //     'This device has been modified (rooted/jailbroken). To protect your sensitive information, this app cannot be used on this device.',
    //     [{text: 'Close', onPress: () => BackHandler.exitApp()}],
    //     {cancelable: false},
    //   );
    // } else {
    if (connectionOn) {
      navigateToStack();
    } else {
      navigation.navigate('NewInternetScreen');
    }
    // }
  };

  const navigateToStack = async () => {
    let latestVersion = await VersionCheck.getLatestVersion();
    let currentVersion = await VersionCheck.getCurrentVersion();

    let updateNeeded = await VersionCheck.needUpdate({depth: 3});

    if (currentVersion < latestVersion) {
      Alert.alert(
        'New version available',
        'Please update app to latest version to continue.',
        [
          {
            text: 'Update',
            onPress: () => {
              BackHandler.exitApp();
              Linking.openURL(updateNeeded.storeUrl);
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      try {
        await remoteConfig().fetch(0);
        await remoteConfig().setConfigSettings({
          minimumFetchIntervalMillis: 0,
        });

        remoteConfig()
          .setDefaults({
            downTime: false,
          })
          .then(() => remoteConfig().fetchAndActivate())
          .then((fetchedRemotely) => {
            //console.log('remoteconfig fetchedRemotely ', fetchedRemotely);

            const value = remoteConfig().getValue('downTime');

            //console.log('remoteconfig value ', value);

            if (value.asBoolean() === true && value.getSource() === 'remote') {
              navigation.replace('DownScreen');
            }
            if (value.asBoolean() === false && value.getSource() === 'remote') {
              loginPage();
            }
          });
      } catch {
        //console.log('remoteconfig issue ');
        loginPage();
      }
    }
  };

  const loginPage = () => {
    // if (deepLinkRouteRef.current) {
    //   console.log('====>>', deepLinkRouteRef.current);
    //   Linking.openURL(deepLinkRouteRef.current);
    // } else {
    if (authState.isLogInSkipped) {
      navigation.reset({
        index: 0,
        routes: [{name: 'MainNavigator'}],
      });
    } else if (authState?.userToken === null) {
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
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'MainNavigator'}],
      });
    }
    // }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const circleRadiusValue = useRef(new Animated.Value(1500)).current;

  const animateImage = () => {
    Animated.parallel([
      Animated.timing(circleRadiusValue, {
        toValue: 60,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <RootView customStyle={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Animated.Image
        source={require('../../../../res/images/nexusSplashLogo.png')}
        resizeMode="contain"
        style={[
          styles.nexusImage,
          {height: circleRadiusValue, width: circleRadiusValue},
        ]}
      />
      <View style={styles.nexusView}>
        <Animated.Text style={[styles.nexusPrimaryText, {opacity: fadeAnim}]}>
          n
        </Animated.Text>

        <Animated.Text style={[styles.nexusPrimaryText, {opacity: fadeAnim}]}>
          e
        </Animated.Text>
        <Animated.Text style={[styles.nexusPrimaryText, {opacity: fadeAnim}]}>
          x
        </Animated.Text>
        <Animated.Text style={[styles.nexusPrimaryText, {opacity: fadeAnim}]}>
          u
        </Animated.Text>
        <Animated.Text style={[styles.nexusPrimaryText, {opacity: fadeAnim}]}>
          s
        </Animated.Text>
      </View>
      <View style={[styles.oneContainer]}>
        <Animated.Text style={[styles.oneText, {opacity: fadeAnim}]}>
          ONE
        </Animated.Text>
      </View>
    </RootView>
  );
};
