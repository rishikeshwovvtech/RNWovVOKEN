import React, {useContext, useEffect} from 'react';
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
//local imports
import {isReadyRef, navigate, navigationRef} from './utils/NavigationService';
import {AuthNavigator} from './navigation/AuthNavigator';
import {StackNavigator} from './navigation/StackNavigator';
import {SplashScreen} from './scenes/Auth/SplashScreen/SplashScreen';
import {DownScreen} from './scenes/Auth/DownScreen';
import R from './R';

import {NewInternetScreen} from './internetconnection/NewInternetScreen';
import {AuthContext} from './context/auth/AuthContext';
import {TourGuideProvider} from 'rn-tourguide';
import {linking} from './utils/DeepLinkHelper';
const Stack = createStackNavigator();

export const RootNavigator = () => {
  const {authState} = useContext(AuthContext);

  let timerid, timerid2;
  useEffect(() => {
    requestNotificationPermission();
    createNotificationChannel();
    notificationHandler();

    return () => {
      clearTimeout(timerid);
      clearTimeout(timerid2);
    };
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS')
          .then((response) => {
            if (!response) {
              PermissionsAndroid.request(
                'android.permission.POST_NOTIFICATIONS',
                {
                  title: 'Notification',
                  message:
                    'App needs access to your notification ' +
                    'so you can get Updates',
                  buttonNeutral: 'Ask Me Later',
                  buttonNegative: 'Cancel',
                  buttonPositive: 'OK',
                },
              );
            }
          })
          .catch((err) => {});
      } catch (err) {}
    }
  };

  const notificationHandler = () => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {});
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage?.data?.type == 'url') {
        if (
          remoteMessage?.data?.redirectUrl.trim() != 'null' &&
          remoteMessage?.data?.redirectUrl.trim() != ''
        ) {
          navigate('NotificationWebView', {
            redirectUrl: remoteMessage?.data?.redirectUrl,
          });
        }
      }
    });
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          timerid = setTimeout(() => {
            if (remoteMessage?.data?.type == 'url') {
              if (
                remoteMessage?.data?.redirectUrl.trim() != 'null' &&
                remoteMessage?.data?.redirectUrl.trim() != ''
              ) {
                navigate('NotificationWebView', {
                  redirectUrl: remoteMessage?.data?.redirectUrl,
                });
              }
            }
          }, 9000);
        }
      });

    messaging().onMessage(async (remoteMessage) => {
      Platform.OS === 'android'
        ? PushNotification.localNotification({
            channelId: 'nexusone',
            title: remoteMessage?.notification?.title,
            message: remoteMessage?.notification?.body,
            bigPictureUrl: remoteMessage?.notification.android.imageUrl,
            bigLargeIcon: remoteMessage?.notification.android.imageUrl,
            largeIconUrl: remoteMessage?.notification.android.imageUrl,
            data: remoteMessage?.data,
          })
        : PushNotificationIOS.addNotificationRequest({
            id: remoteMessage?.messageId,
            title: remoteMessage?.notification?.title,
            body: remoteMessage?.notification?.body,
            userInfo: {
              image: remoteMessage?.data?.fcm_options?.image,
              data: remoteMessage?.data,
            },
          });
    });

    PushNotificationIOS.addEventListener('localNotification', (notif) => {
      const isClicked = notif.getData().userInteraction === 1;
      let data = notif.getData().data;

      if (isClicked) {
        if (data?.type == 'url') {
          if (
            data?.redirectUrl.trim() != 'null' &&
            data?.redirectUrl.trim() != ''
          ) {
            if (
              navigationRef.current.getRootState().routeNames == 'SplashScreen'
            ) {
              timerid2 = setTimeout(() => {
                navigate('NotificationWebView', {
                  redirectUrl: data?.redirectUrl,
                });
              }, 6000);
            } else {
              navigate('NotificationWebView', {
                redirectUrl: data?.redirectUrl,
              });
            }
          }
        }
      }
    });
  };

  const createNotificationChannel = () => {
    PushNotification.createChannel({
      channelId: 'nexusone',
      channelName: 'nexusone',
      channelDescription: 'A notification channel',
      playSound: true,
      soundName: 'default',
      importance: 5,
      vibrate: true,
    });
  };

  const TooltipComponent = ({
    isFirstStep,
    isLastStep,
    handleNext,
    handlePrev,
    handleStop,
    currentStep,
    labels,
  }) => (
    <View
      style={{
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',

        width: '80%',
        backgroundColor: '#ffffffff',
      }}
    >
      <View
        style={{
          flex: 1,
          //alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginHorizontal: '5%',
          width: '90%',
          flexDirection: 'row',
        }}
      >
        <Text style={{textAlign: 'left', fontSize: 18, fontWeight: 'bold'}}>
          {currentStep && currentStep.text.split('|')[0]}
        </Text>
        <Text
          style={{
            textAlign: 'right',
            fontSize: 18,
            fontWeight: 'bold',
            color: R.themes.headerBackgroundColor,
          }}
        >
          {currentStep && currentStep.text.split('|')[2]}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
        }}
      >
        <View
          style={{
            alignContent: 'flex-start',
            marginTop: '5%',
            width: '90%',
            marginHorizontal: '5%',
          }}
        >
          <Text style={{textAlign: 'left', fontSize: 14, color: '#383838'}}>
            {currentStep && currentStep.text.split('|')[1]}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '8%',
            width: '100%',
          }}
        >
          {!isLastStep ? (
            <>
              <TouchableOpacity
                style={{
                  backgroundColor: R.themes.borderColorlight,
                  marginLeft: '5%',
                  width: 60,
                  alignItems: 'center',
                  height: 35,
                  justifyContent: 'center',
                }}
                onPress={handleNext}
              >
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                >
                  Next
                </Text>

                {/* <Text>hello</Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginRight: '5%',
                  justifyContent: 'center',
                }}
                onPress={handleStop}
              >
                <Text style={{color: '#580A5A', fontSize: 14}}>
                  Skip All...
                </Text>

                {/* <Text>hello</Text> */}
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: R.themes.borderColorlight,
                marginLeft: '5%',
                width: 60,
                alignItems: 'center',
                height: 35,
                justifyContent: 'center',
              }}
              onPress={handleStop}
            >
              <Text style={{color: '#ffffff', fontSize: 12}}>Done</Text>

              {/* <Text>hello</Text> */}
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          //backgroundColor: "white",
          width: 0,
          height: 0,
          // width: 20,
          // height: 20,
          bottom: -15,
          start: currentStep.text.split('|')[2] == '1/4' ? 50 : undefined,
          //borderBottomLeftRadius: 90,
          alignSelf:
            currentStep.text.split('|')[2] == '2/4' ||
            currentStep.text.split('|')[2] == '4/4'
              ? 'center'
              : undefined,
          end: currentStep.text.split('|')[2] == '3/4' ? 10 : undefined,

          borderTopColor: 'white',
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderTopWidth: 20,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
        }}
      />
    </View>
  );

  return (
    <TourGuideProvider
      androidStatusBarVisible={true}
      startAtMount={authState?.showTourGuide == true ? true : false}
      {...{
        borderRadius: 16,

        tooltipStyle: {
          marginVertical: -40,
        },
        tooltipComponent: TooltipComponent,
      }}
    >
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          {/* <Stack.Screen name="AppUpdateScreen" component={AppUpdateScreen} /> */}
          <Stack.Screen name="DownScreen" component={DownScreen} />

          <Stack.Screen
            name="NewInternetScreen"
            component={NewInternetScreen}
          />
          <Stack.Screen name="MainNavigator" component={StackNavigator} />
          <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </TourGuideProvider>
  );
};
