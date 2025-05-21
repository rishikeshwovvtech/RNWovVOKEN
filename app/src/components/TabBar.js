import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
  Text,
} from 'react-native';
import {StackActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
//local imports
import R from '../R';
import {AuthContext} from '../context/auth/AuthContext';
import {TourGuideZone, useTourGuideController} from 'rn-tourguide';

export const TabBar = (props) => {
  const {authAction, authState} = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const {state, navigation} = props.data;
  const [Active, setActive] = useState(state.index);

  const {
    tourKey, // an object for listening some events
  } = useTourGuideController();
  // Use Hooks to control!
  // const {
  //   canStart, // a boolean indicate if you can start tour guide
  //   start, // a function to start the tourguide

  //   eventEmitter,
  //   tourKey, // an object for listening some events
  // } = useTourGuideController();

  // Can start at mount 🎉
  // you need to wait until everything is registered 😁
  // React.useEffect(() => {
  //   if (canStart) {
  //     // 👈 test if you can start otherwise nothing will happen
  //     if (authState?.showTourGuide == true) {
  //       start();
  //     }
  //   }
  // }, [canStart]); // 👈 don't miss it!

  // const handleOnStart = () => {};
  // const handleOnStop = () => {
  //   authAction.setData({
  //     ...authState,
  //     showTourGuide: false,
  //   });
  // };
  // const handleOnStepChange = () => {};

  // useEffect(() => {
  //   eventEmitter.on('start', handleOnStart);
  //   eventEmitter.on('stop', handleOnStop);
  //   eventEmitter.on('stepChange', handleOnStepChange);

  //   return () => {
  //     eventEmitter.off('start', handleOnStart);
  //     eventEmitter.off('stop', handleOnStop);
  //     eventEmitter.off('stepChange', handleOnStepChange);
  //   };
  // }, []);

  const resetStack = (e) => {
    if (state) {
      const nonTargetTabs = state.routes.filter((r) => r.key !== e.target);
      nonTargetTabs.forEach((tab) => {
        const stackKey = tab?.state?.key;
        if (stackKey) {
          navigation.dispatch({
            ...StackActions.popToTop(),
            target: stackKey,
          });
        }
      });
    }
  };

  useEffect(() => {
    setActive(state.index);
  }, [state.index]);

  return (
    <View
      style={[
        styles.tabBarStyle,
        {
          height:
            Platform.OS === 'ios'
              ? insets.bottom
                ? R.dimensions.hp(8) + insets.bottom
                : R.dimensions.hp(10)
              : R.dimensions.hp(10),
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : null,
          paddingTop: Platform.OS === 'ios' ? insets.bottom : '2%',
        },
      ]}
    >
      {state.routeNames.map((e, index) => {
        let filledIcon, unFilledIcon;
        switch (e) {
          case 'Home':
            filledIcon = R.images.bottomTabHomeFilled;
            unFilledIcon = R.images.bottomTabHomeUnfilled;
            break;
          case 'Navigate':
            filledIcon = R.images.bottomTabNavigateFilled;
            unFilledIcon = R.images.bottomTabNavigateUnfilled;
            break;
          case 'Explore':
            filledIcon = R.images.bottomTabExploreFilled;
            unFilledIcon = R.images.bottomTabExploreUnfilled;
            break;
          case 'Scan':
            filledIcon = R.images.bottomTabCameraFilled;
            unFilledIcon = R.images.bottomTabCameraUnfilled;
            break;
          case 'Rewards':
            filledIcon = R.images.bottomTabGiftFilled;
            unFilledIcon = R.images.bottomTabGiftUnfilled;
            break;
          default:
            filledIcon = R.images.bottomTabHomeFilled;
            unFilledIcon = R.images.bottomTabHomeUnfilled;
            break;
        }
        return e == 'Scan' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flex: 1,
              height: R.dimensions.hp(20),
            }}
          >
            <View
              style={{
                backgroundColor: R.themes.darkCardBackgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
                height: R.dimensions.wp(22),
                width: R.dimensions.wp(22),
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  if (authState?.userToken == null) {
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
                    navigation.navigate('UploadBillCapture');
                  }
                }}
              >
                <View
                  style={{
                    backgroundColor: R.themes.bottomTabButtonColor,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    height: R.dimensions.wp(18),
                    width: R.dimensions.wp(18),
                  }}
                >
                  <TourGuideZone
                    zone={index}
                    text={`Bill upload|Upload your shopping bills here!|${index}/4`}
                    shape="circle"
                    tourKey={tourKey}
                    borderRadius={16}
                    style={{justifyContent: 'center', alignItems: 'center'}}
                  >
                    <Image
                      source={Active === index ? filledIcon : unFilledIcon}
                      style={{
                        height: R.dimensions.hp(2.8),
                        width: R.dimensions.hp(2.8),
                      }}
                    />

                    <Text
                      style={{
                        fontSize: R.dimensions.hp(1.6),
                        color: R.colors.white,
                        fontFamily:
                          Active === index
                            ? R.fonts.primaryBold
                            : R.fonts.primaryRegular,
                        paddingTop: '4%',
                        textAlign: 'center',
                      }}
                    >
                      {'Bill \n Upload'}
                    </Text>
                  </TourGuideZone>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              if (e === 'Explore' || e === 'Home') {
                setActive(index);
                navigation.navigate(e);
                resetStack(e);
              } else if (e === 'Navigate') {
                navigation.navigate('MapNavigation');
              } else {
                if (authState?.userToken == null) {
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
                  setActive(index);
                  navigation.navigate(e);
                  resetStack(e);
                }
              }
            }}
          >
            {e === 'Explore' || e === 'Rewards' ? (
              //    <TourGuideZone
              //        zone={index}
              //        text={`Hey there! Welcome|Check the Others!|${index}/4`}
              //   // shape='circle_and_keep'
              //        tourKey={tourKey}
              //        borderRadius={16}
              //        style={{height:20}}
              // >

              <View
                style={{
                  flex: Platform.OS == 'ios' ? 1 : 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor:"red"
                }}
              >
                <TourGuideZone
                  zone={e === 'Rewards' ? 3 : index}
                  shape="circle"
                  text={`${
                    e === 'Rewards'
                      ? 'Rewards|Check the rewards you have unlocked here!|3/4'
                      : 'Explore| Find your favourite brands here!|1/4'
                  }`}
                  borderRadius={16}
                  maskOffset={10}
                  tooltipBottomOffset={40}
                  style={{
                    flex: Platform.OS == 'ios' ? 0 : 1,
                    alignItems: 'center',
                    justifyContent: Platform.OS == 'ios' ? '' : 'center',
                  }}
                  tourKey={tourKey}
                >
                  <>
                    <Image
                      source={Active === index ? filledIcon : unFilledIcon}
                      style={{
                        height: R.dimensions.hp(2.8),
                        width: R.dimensions.hp(2.8),
                      }}
                    />
                    <Text
                      style={{
                        fontSize: R.dimensions.hp(1.6),
                        color: R.themes.backgroundColor,
                        paddingHorizontal: '1%',
                        margin: Platform.OS == 'ios' ? '8%' : '4%',
                        fontFamily:
                          Active === index
                            ? R.fonts.primaryBold
                            : R.fonts.primaryRegular,
                      }}
                    >
                      {e}
                    </Text>
                  </>
                </TourGuideZone>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}
              >
                <Image
                  source={Active === index ? filledIcon : unFilledIcon}
                  style={{
                    height: R.dimensions.hp(2.8),
                    width: R.dimensions.hp(2.8),
                  }}
                />
                <Text
                  style={{
                    fontSize: R.dimensions.hp(1.6),
                    color: R.themes.backgroundColor,
                    paddingHorizontal: '1%',
                    margin: '8%',
                    fontFamily:
                      Active === index
                        ? R.fonts.primaryBold
                        : R.fonts.primaryRegular,
                  }}
                >
                  {e}
                </Text>
              </View>
            )}
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: R.colors.primaryBrand2,
    paddingHorizontal: '2%',
    elevation: 8,
    shadowColor: R.colors.primaryBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
