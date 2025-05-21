import {AppRegistry} from 'react-native';
import App from './app/src/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {navigate, navigationRef} from './app/src/utils/NavigationService';

PushNotification.configure({
  onNotification: function (notification) {
    if (notification.foreground && notification.userInteraction) {
      try {
        if (notification?.data?.type == 'url') {
          if (
            notification?.data?.redirectUrl.trim() != 'null' &&
            notification?.data?.redirectUrl.trim() != ''
          ) {
            navigate('NotificationWebView', {
              redirectUrl: notification?.data?.redirectUrl,
            });
          }
        }
      } catch (error) {}
    } else if (!notification.foreground && notification.userInteraction) {
      if (navigationRef.current.getRootState().routeNames == 'SplashScreen') {
        setTimeout(() => {
          if (notification?.data?.type == 'url') {
            if (
              notification?.data?.redirectUrl.trim() != 'null' &&
              notification?.data?.redirectUrl.trim() != ''
            ) {
              navigate('NotificationWebView', {
                redirectUrl: notification?.data?.redirectUrl,
              });
            }
          }
        }, 6000);
      }
    }
  },
  popInitialNotification: true,
  requestPermissions: true,
});
// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;
const CleverTap = require('clevertap-react-native');

CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, (e) => {
  /*consume the event*/
});

AppRegistry.registerComponent(appName, () => App);
