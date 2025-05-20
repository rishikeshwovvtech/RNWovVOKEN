import React, {useContext} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {View, Text, ImageBackground} from 'react-native';
import R from '../../R';
import {AuthContext} from '../../context/auth/AuthContext';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';
import {useFocusEffect} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import DeviceInfo from 'react-native-device-info';

export const SignupVoucher = ({route, navigation}) => {
  const isFromSocial = route?.params?.isFromSocial;

  const dwg_point = route?.params?.dwg_point;
  const {authAction, authState} = useContext(AuthContext);
  const vouchermsg = route?.params?.message && splitfun(route.params.message);
  function splitfun(msg) {
    return msg.split('.');
  }

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics(
        'Sign_Up_Voucher',
        authState?.userToken,
        authState?.userId,
      )
        .then((res) => {})
        .catch((e) => {});
    }, []),
  );
  return (
    // <ScrollView style={{flex: 1, backgroundColor: R.colors.primaryBrand2}}>
    <View style={{flex: 1, backgroundColor: R.colors.primaryBrand2}}>
      <View style={{height: R.dimensions.hp(50), width: '100%'}}></View>

      <Image
        source={R.images.newapplogo}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          resizeMode: 'contain',
          width: '40%',
          bottom: '80%',
        }}
      />

      <Image
        source={R.images.congralationsVoucherDesign1}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          resizeMode: 'contain',
          width: '40%',
          bottom: '80%',
          left: '-34%',
          top: '12%',
        }}
      />
      <Image
        source={R.images.congralationsVoucherDesign2}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          resizeMode: 'contain',
          width: '40%',
          bottom: '80%',
          // left: '-34%',
          right: '-20%',
          top: '12%',
        }}
      />

      <Image
        source={R.images.congralationsVoucherDesign3}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          resizeMode: 'contain',
          width: '40%',
          bottom: '80%',
          // left: '-34%',
          left: '-12%',
          top: '35%',
        }}
      />

      <Image
        source={R.images.congralationsVoucherDesign4}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          resizeMode: 'contain',
          width: '40%',
          bottom: '80%',
          // left: '-34%',
          right: '-8%',
          top: '28%',
        }}
      />

      <Image
        source={R.images.congralationsVoucherDesign5}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          resizeMode: 'contain',
          width: '40%',
          bottom: '80%',
          // left: '-34%',
          right: '-19.5%',
          top: '41%',
        }}
      />

      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: '-44%',
          backgroundColor: 'transparent',
          borderRadius: 30,
          height: R.dimensions.hp(60),
          borderBottomWidth: Platform.OS === 'ios' ? 10 : 8,
          borderRightWidth: Platform.OS === 'ios' ? 0.4 : 0.2,
          borderLeftWidth: Platform.OS === 'ios' ? 0.4 : 0.2,
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: R.themes.boxBackgroundColour,
          borderBottomLeftRadius: 300,
          borderBottomRightRadius: 300,
          width: R.dimensions.wp(160),
        }}
      ></View>

      <ImageBackground
        style={{
          position: 'absolute',
          alignSelf: 'center',
          justifyContent: 'center',
          top: '20%',
          resizeMode: 'contain',
          width: 120,
          height: 120,
        }}
        source={R.images.rewardribbon}
      >
        {/* <Image
          source={R.images.signupVoucherImg2}
          style={{
            flex: 1,
            position: 'absolute',
            resizeMode: 'contain',
            width: 45,
            height: 45,
            alignSelf: 'center',
          }}
        /> */}
      </ImageBackground>

      <View
        style={{
          height: R.dimensions.hp(60),
          backgroundColor: R.themes.boxBackgroundColour,
          top: '8%',
          flexDirection: 'column',
          borderTopRightRadius: 120,
          borderTopLeftRadius: 120,

          alignSelf: 'center',

          borderRadius: 30,

          width: R.dimensions.wp(120),
        }}
      >
        <View
          style={{
            position: 'absolute',
            zIndex: 100,
            top: '-25%',
            height: '70%',
            width: '70%',

            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: 'white',
            alignSelf: 'center',
          }}
        >
          <Image
            source={R.images.VoucherClip}
            resizeMode="contain"
            style={{width: '100%', position: 'absolute', top: '-38%'}}
          />
          <Text
            style={{
              alignSelf: 'center',
              // fontStyle: R.fonts.primaryBold,
              fontSize: R.dimensions.h4,
            }}
          >
            First Sign-up Reward
          </Text>
          <ScrollView
            style={{
              marginTop: '8%',
              paddingBottom: '5%',
              marginBottom: '3%',
            }}
          >
            <View
              style={{
                alignSelf: 'center',
              }}
            >
              <Image
                source={R.images.CongralationVoucherText}
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  width: '100%',
                  color: R.themes.boxBackgroundColour,
                }}
              />

              <Text
                style={{
                  marginTop: '20%',
                  color: '#000000',
                  fontFamily: R.fonts.primaryRegular,
                  fontSize: R.dimensions.h3,
                  paddingHorizontal: '5%',
                  textAlign: 'center',
                }}
              >
                {/* {vouchermsg[0]}.{'\n\n'}
                {vouchermsg[1]}. */}
                hello hi
              </Text>

              {/* <Text
                style={{
                  marginTop: '20%',
                  alignSelf: 'center',
                  color: '#000000',
                  fontFamily: R.fonts.primaryRegular,
                  fontSize: R.dimensions.h3,
                  paddingHorizontal: '5%',
                  textAlign: 'center',
                  textAlign: 'center',
                }}
              >
                {authState?.mallDetails?.oko_Row_Desc != 'Nexus Elante'
                  ? 'We are pleased to offer you a gift!'
                  : 'We are pleased to offer you a free parking voucher.'}
              </Text>
              <Text
                style={{
                  marginTop: 20,
                  alignSelf: 'center',
                  color: '#000000',
                  fontFamily: R.fonts.primaryRegular,
                  fontSize: R.dimensions.h3,
                }}
              >
                {isFromSocial ? 'You can view the' : 'Sign-in to view the'}
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  fontFamily: R.fonts.primaryRegular,
                  fontSize: R.dimensions.h3,
                  textAlign: 'center',
                }}
              >
                {authState?.mallDetails?.oko_Row_Desc != 'Nexus Elante'
                  ? 'free gift under'
                  : 'free parking voucher under'}
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#000000',
                  fontFamily: R.fonts.primaryRegular,
                  fontSize: R.dimensions.h3,
                  textAlign: 'center',
                }}
              >
                {`Rewards -> Claimed tab`}
              </Text> */}
              {dwg_point != null && (
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#000000',
                    fontFamily: R.fonts.primaryBold,
                    fontSize: R.dimensions.h2,
                    textAlign: 'center',
                    marginTop: '5%',
                  }}
                >
                  Yay! You have earned {dwg_point} points! {'\n'} Exciting
                  rewards await you on {'\n'} your special day.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={async () =>
            isFromSocial
              ? navigation.reset({
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
              : (await analytics()
                  .logEvent('signup_event', {
                    user_ID: authState?.userId,
                    mall_name: authState?.mallDetails?.oko_Row_Desc,
                    is_loggedIn: 0,
                    app_version: DeviceInfo.getVersion,
                    device_platform: Platform.OS,
                  })
                  .then((res) => {})
                  .catch((e) => {}),
                navigation.navigate('Login'))
          }
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            top: '50%',
            position: 'absolute',
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                paddingVertical: '3%',
                paddingHorizontal: '2%',
              }}
            >
              {isFromSocial ? 'Go to Home' : 'Go to Sign-in page'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
