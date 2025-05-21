import analytics from '@react-native-firebase/analytics';

export const ScreenAnalytics = async (
  screenName,

  userToken = null,
  userId = '',
) => {
  let isLoggedIn = false;
  if (userToken == null || userToken == '') {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }

  await analytics()
    .logEvent('screen_event', {
      screen_name: screenName,
      is_loggedIn: isLoggedIn,
      user_ID: userId,
    })
    .then((res) => {})
    .catch((e) => {});
};
