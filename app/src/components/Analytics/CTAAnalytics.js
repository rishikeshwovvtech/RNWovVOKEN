import analytics from '@react-native-firebase/analytics';

export const CTA_firebaseAnalytics = async (
  eventName,
  screenName = '',
  userToken = null,
  userId = '',
  mallName = '',
  brandName = '',
  otherParameters = '',
) => {
  let isLoggedIn = false;
  if (userToken == null || userToken == '') {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }

  // mallName = mallName.trim().replace(/\s+/g, '_').replace(/-/g, '_');

  await analytics()
    .logEvent('click_event', {
      event_name: eventName,
      user_ID: userId,
      mall_name: mallName,
      brand_name: brandName,
      other_parameters: otherParameters,
      screen_name: screenName,
      is_loggedIn: isLoggedIn,
    })
    .then((res) => {})
    .catch((e) => {});
};
