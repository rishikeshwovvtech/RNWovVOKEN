import React, {useContext} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StyleSheet,
} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
//local imports
import {AuthContext} from '../context/auth/AuthContext';
import R from '../R';
import {
  AUTH_BASE_URL,
  BASE_URL,
  IMAGE_CDN_URL,
  IS_CDN,
} from '../utils/Constants';
import {fetchApiService} from '../internetconnection/CommonApiService';
import {CTA_firebaseAnalytics} from './Analytics/CTAAnalytics';
import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';

export const CustomDrawer = (props) => {
  const {authAction, authState} = useContext(AuthContext);

  const clearAsync = async () => {
    try {
      let userInfo = {
        ...authState,
        isLoading: true,
        isLogInSkipped: false,
        userToken: null,
        userId: null,
        userObject: null,
        PartyCode: null,
        partyCode: null,
        parkingDetails: null,
        fcmTokenDetails: null,
        mallDetails: null,
      };
      await analytics()
        .logEvent('signout_event', {
          user_ID: authState?.userId,
          mall_name: authState?.mallDetails?.oko_Row_Desc,
        })
        .then((res) => {})
        .catch((e) => {});

      try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
          await GoogleSignin.signOut();
        }
      } catch (e) {}

      await authAction.setData(userInfo);

      props.navigation.reset({
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
    } catch (error) {}
  };

  const api_logout_PushNotification = async () => {
    let data = JSON.stringify({
      entityName: 'User_Vs_Token',
      action: 'payloadRuleWithTid',
      pageUrl: 'Logoutuserfornoti',
      event: 'JR_855',
      formList: [
        {
          Id: authState?.fcmTokenDetails?.fcmTokenId,
          user_Code: authState?.userId,
          user_Email: authState?.userObject?.email,
          fcm_Token: authState?.fcmTokenDetails?.fcmToken,
        },
      ],
    });
    let config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        event: 'CustomDrawerScreen',
        pageUrl: 'Logoutuserfornoti',
        action: 'onClickLogout',
      },

      data: data,
    };

    await fetchApiService(config, authAction, authState, false, 'logout')
      .then(function (response) {
        clearAsync();
      })
      .catch(function (error) {
        clearAsync();
      });
  };

  const onLoginClick = () => {
    props.navigation.reset({
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
  };

  const drawerItems = [
    {
      label: 'Favourite Brands',
      image: R.images.drawerFavourite,
      onPress: () => {
        CTA_firebaseAnalytics(
          'FavouriteBrand_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          props.navigation.navigate('DrawerNavigation', {
            screen: 'FavouriteBrand',
          });
      },
    },

    {
      label: 'My Account',
      image: R.images.drawerMyAccount,
      onPress: () => {
        CTA_firebaseAnalytics(
          'MyAccount_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          authState?.userToken == null
            ? onLoginClick()
            : props.navigation.navigate('DrawerNavigation', {
                screen: 'AccountProfile',
              });
      },
    },

    {
      label: 'Rewards',
      image: R.images.drawerRewardSection,
      onPress: () => {
        CTA_firebaseAnalytics(
          'Rewards_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          authState.userToken == null
            ? onLoginClick()
            : props.navigation.navigate('Rewards');
      },
    },

    {
      label: 'My Rewards Code',
      image: R.images.rewardsCode,
      onPress: () => {
        CTA_firebaseAnalytics(
          'GenerateRewardCode_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          authState.userToken == null
            ? onLoginClick()
            : props.navigation.navigate('GenerateRewardCode');
      },
    },
    {
      label: 'Transaction History',
      image: R.images.drawerPointStatement,
      onPress: () => {
        CTA_firebaseAnalytics(
          'TransactionHistory_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          authState?.userToken == null
            ? onLoginClick()
            : props.navigation.navigate('DrawerNavigation', {
                screen: 'TransactionHistory',
              });
      },
    },
    {
      label: 'Bill History',
      image: R.images.drawerBillHistory,
      onPress: () => {
        CTA_firebaseAnalytics(
          'BillHistory_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          authState?.userToken == null
            ? onLoginClick()
            : props.navigation.navigate('DrawerNavigation', {
                screen: 'TopTabNavigation',
              });
      },
    },
    {
      label: 'Contact Us',
      image: R.images.drawerContactUs,
      onPress: () => {
        CTA_firebaseAnalytics(
          'ContactUs_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          props.navigation.navigate('DrawerNavigation', {
            screen: 'ContactUs',
          });
      },
    },
    {
      label: 'T&C',
      image: R.images.drawerTermsCondition,
      onPress: () => {
        CTA_firebaseAnalytics(
          'T&C_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          props.navigation.navigate('DrawerNavigation', {
            screen: 'TermsConditions',
          });
      },
    },
    {
      label: 'Privacy Policy',
      image: R.images.drawerPrivacyPolicy,
      onPress: () => {
        CTA_firebaseAnalytics(
          'PrivacyPolicy_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          props.navigation.navigate('DrawerNavigation', {
            screen: 'PrivacyPolicy',
          });
      },
    },
    {
      label: 'FAQs',
      image: R.images.drawerFaqs,
      onPress: () => {
        CTA_firebaseAnalytics(
          'FAQ_Clicked',
          'Drawer',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {}),
          props.navigation.navigate('DrawerNavigation', {
            screen: 'FAQs',
          });
      },
    },
  ];

  const CustomDrawerItem = (item) => {
    return (
      <TouchableOpacity
        onPress={item.onPress}
        style={{
          flexDirection: 'row',
          paddingHorizontal: '5%',
          marginVertical: '4%',
          alignContent: 'center',
        }}
      >
        <Image
          source={item.image}
          tintColor={R.themes.darkIconColor}
          style={{
            height: R.dimensions.wp(9),
            width: R.dimensions.wp(9),
            tintColor: R.themes.darkIconColor,
          }}
          resizeMode={'contain'}
        />
        <Text
          style={{
            color: R.themes.darkTextColor,
            fontFamily: R.fonts.primaryBold,
            fontWeight: 'bold',
            fontSize: R.dimensions.wp(4),
            textAlignVertical: 'center',
            ...Platform.select({
              ios: {
                lineHeight: 30,
              },
              android: {},
            }),
            paddingLeft: '5%',
          }}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainView}>
      <View
        style={{
          paddingHorizontal: '6%',
          paddingVertical: '5%',
          borderTopRightRadius: 20,
          flex: 1.2,
          justifyContent: 'flex-end',
        }}
      >
        <ImageBackground
          source={R.images.nexusSplashLogo}
          style={{
            height: R.dimensions.wp(30),
            width: R.dimensions.wp(30),
            position: 'absolute',
            alignSelf: 'flex-start',
            left: -16,
            top: -18,
          }}
        />
        <View
          style={{
            backgroundColor: R.themes.darkCardBackgroundColor,
            height: R.dimensions.wp(16),
            width: R.dimensions.wp(40),
            position: 'absolute',
            right: 0,
            top: 50,
            borderTopLeftRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            resizeMode={'contain'}
            source={R.images.NexusOne}
            style={{height: R.dimensions.wp(10), width: R.dimensions.wp(30)}}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            authState?.userToken == null
              ? onLoginClick()
              : props.navigation.navigate('AccountProfile')
          }
          style={{flexDirection: 'row'}}
        >
          <View style={styles.imgTouchableOpacity}>
            <Image
              resizeMode={'contain'}
              source={
                authState?.userObject?.imageUrl == '' ||
                authState?.userObject?.imageUrl == null
                  ? R.images.defaultUser
                  : authState?.userObject?.imageUrl.includes('Profile_Image')
                  ? {
                      uri:
                        (IS_CDN ? IMAGE_CDN_URL : AUTH_BASE_URL) +
                        authState?.userObject?.imageUrl,
                    }
                  : {uri: authState?.userObject?.imageUrl}
              }
              style={styles.image}
            />
          </View>
          <View
            style={{
              marginLeft: '5%',
              marginTop: Platform.OS == 'ios' ? '6%' : '4%',
              flex: 1,
            }}
          >
            <Text
              style={styles.nameTxt}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              {authState?.userToken == null
                ? 'Guest'
                : authState?.userObject?.fullName}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.emailTxt}
            >
              {authState?.userToken == null
                ? 'click to login'
                : authState?.userObject?.email}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{paddingTop: 0}}
        >
          {drawerItems.map((item) => (
            <CustomDrawerItem
              label={item.label}
              onPress={item.onPress}
              image={item.image}
            />
          ))}
          {authState?.userToken != null && (
            <CustomDrawerItem
              label={'Log Out'}
              onPress={() => {
                CTA_firebaseAnalytics(
                  'Logout_Clicked',
                  'Drawer',
                  authState?.userToken,
                  authState?.userId,
                  authState?.mallDetails?.oko_Row_Desc,
                )
                  .then((res) => {})
                  .catch((e) => {}),
                  api_logout_PushNotification();
              }}
              image={R.images.drawerLogOut}
            />
          )}
        </DrawerContentScrollView>
      </View>
      <Text
        style={{
          paddingHorizontal: '8%',
          fontSize: R.dimensions.hp(1.5),
          color: R.themes.darkTextColor,
          fontFamily: R.fonts.primaryMedium,
          paddingTop: '5%',
          paddingBottom: Platform.OS == 'ios' ? '10%' : '5%',
        }}
      >
        V{' - '}
        {DeviceInfo.getVersion()}-{DeviceInfo.getBuildNumber()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: R.themes.backgroundColor,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  imgTouchableOpacity: {
    height: R.dimensions.wp(16),
    width: R.dimensions.wp(16),
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  image: {
    height: R.dimensions.wp(16),
    width: R.dimensions.wp(16),
  },
  nameTxt: {
    fontSize: R.dimensions.hp(2.5),
    fontFamily: R.fonts.primaryBold,
    fontWeight: 'bold',
    color: R.themes.darkTextColor,
  },
  emailTxt: {
    fontSize: R.dimensions.hp(1.8),
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.darkTextColor,
  },
  bottomView: {
    flex: 3,
    paddingBottom: Platform.OS == 'ios' ? R.dimensions.hp(3) : 0,
  },
});

//to filter drawer list
// const {state, ...rest} = props;
// const newState = {...state};
// newState.routes = newState.routes.filter((item) => item.name !== 'Home');

/* <DrawerItemList state={newState} {...rest} /> */
