import React, {useContext} from 'react';
import {Image, View, Text, TouchableOpacity, Platform} from 'react-native';
import R from '../../R';
import {horizontalScale} from '../../../res/scale';
import {AuthContext} from '../../context/auth/AuthContext';

export const NewSignupVoucher = ({navigation, route}) => {
  const {authState} = useContext(AuthContext);

  const dwg_point = route?.params?.dwg_point;

  return (
    <View style={{flex: 1, backgroundColor: R.themes.backgroundColor}}>
      <View style={{height: R.dimensions.hp(50), width: '100%'}}></View>

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
          backgroundColor: R.themes.accountTextColour,
          borderRadius: 30,
          height: R.dimensions.hp(60),
          borderBottomWidth: Platform.OS === 'ios' ? 10 : 8,
          borderRightWidth: Platform.OS === 'ios' ? 0.4 : 0.2,
          borderLeftWidth: Platform.OS === 'ios' ? 0.4 : 0.2,
          borderTopColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: R.themes.borderColorlight,
          borderBottomLeftRadius: 300,
          borderBottomRightRadius: 300,
          width: R.dimensions.wp(160),
        }}
      ></View>

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
        source={R.images.firstSignupVoucherGift}
        style={{
          position: 'absolute',
          top: '22%',
          resizeMode: 'contain',
          width: 120,
          height: 120,
          alignSelf: 'center',
        }}
      />
      {/* </ImageBackground> */}

      <View
        style={{
          height: R.dimensions.hp(60),
          backgroundColor: R.themes.calenderFromToBackColour,
          flexDirection: 'column',
          borderTopRightRadius: 120,
          borderTopLeftRadius: 120,
          alignSelf: 'center',
          borderRadius: 30,
          width: R.dimensions.wp(100),
        }}
      >
        <View
          style={{
            flex: 2,
            // backgroundColor: 'blue',
            borderTopRightRadius: 120,
            borderTopLeftRadius: 120,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '80%',
              height: '60%',
              backgroundColor: 'white',
              borderRadius: 10,
              bottom: '14%',
            }}
          >
            <View
              style={{
                width: '100%',
                height: '20%',
                backgroundColor: R.themes.darkCardBackgroundColor,
                borderBottomLeftRadius: 120,
                borderBottomRightRadius: 120,
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 22,
                  color: R.themes.backgroundColor,
                }}
              >
                First Sign-up Reward
              </Text>
            </View>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: horizontalScale(28),

                color: R.themes.accountTextColour,
                fontFamily: R.fonts.primaryRegular,
                marginTop: '5%',
                fontWeight: '700',
              }}
            >
              Congratulations!
            </Text>
            <Text
              style={{
                color: R.themes.accountTextColour,
                fontFamily: R.fonts.primaryRegular,
                fontSize: R.dimensions.h2,
                paddingHorizontal: '5%',
                textAlign: 'center',
                marginTop: '5%',
                alignSelf: 'center',
              }}
            >
              We are pleased to offer you a gift.
              {'\n'} You can view the special reward under Rewards Section.
            </Text>

            {dwg_point != null && (
              <Text
                style={{
                  alignSelf: 'center',
                  color: R.themes.accountTextColour,
                  fontFamily: R.fonts.primaryMedium,
                  fontSize: R.dimensions.h2,
                  textAlign: 'center',
                  marginTop: '5%',
                }}
              >
                Yay! You have earned {dwg_point} points! {'\n'} Exciting rewards
                await you on {'\n'} your special day.
              </Text>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              if (authState?.mallDetails?.splashScreenStatus) {
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'AuthNavigator',
                      params: {
                        screen: 'Nexus247SelectionScreen',
                        params: {
                          mallDetails: authState?.mallDetails,
                        },
                      },
                    },
                  ],
                });
              } else {
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
                });
              }
            }}
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                backgroundColor: R.themes.accountTextColour,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  paddingVertical: '3%',
                  paddingHorizontal: '15%',
                  color: R.themes.backgroundColor,
                  fontFamily: R.fonts.primaryBold,
                }}
              >
                {/* {isFromSocial ? 'Go to Home' : 'Go to Home'} */}
                Go to Home Page
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
