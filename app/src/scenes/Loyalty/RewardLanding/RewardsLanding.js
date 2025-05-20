import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {useRoute} from '@react-navigation/core';
//local import
import R from '../../../R';
import {RootView, BackHeader} from '../../../components/index';
import styles from './RewardsLandingStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {horizontalScale} from '../../../../res/scale';
import {dimensions} from '../../../../res/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {RewardsSlabView} from './RewardsSlabView';
import {RewardsPreloginLanding} from './RewardsPreloginLanding';
import SubHeader from '../../../components/SubHeader';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';

export const RewardsLanding = ({navigation, route}) => {
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowloader] = useState(false);

  const routeName = useRoute();

  ///////////////////// useFocusEffect to call api functions //////////////

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('ShopAndWin', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});
    }, []),
  );

  const backAction = () => {
    //console.log("rewardsLanding");

    if (routeName?.name != 'HomePage') {
      navigation.navigate('HomePage');
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  };

  ///////////////////////// Main Return VIew ////////////////////////////////

  function LoaderView() {
    return (
      <View
        style={{
          // flex: 1,
          animationType: 'fade',
          transparent: true,
          justifyContent: 'center',
          alignItems: 'center',
          height: R.dimensions.hp('55%'),
        }}
      >
        <View
          style={{
            backgroundColor: R.colors.modalBlack,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: R.themes.backgroundColor,
              padding: '5%',
              borderRadius: 8,
              width: horizontalScale(300),
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            {/* <ActivityIndicator
              size={'large'}
              color={R.themes.boxBackgroundColour}
            />
            <Text
              style={{
                marginTop: '5%',
                fontSize: horizontalScale(12),
                fontFamily: R.fonts.primaryRegular,
                textAlign: 'center',
              }}
            >
              Loading
            </Text> */}
            <Image
              source={R.images.loaderNexus}
              style={{width: 50, height: 50}}
            />
          </View>
        </View>
      </View>
    );
  }

  function SlabView() {
    return <RewardsSlabView navigation={navigation} route={route} />;
  }

  function PreloginView() {
    return <RewardsPreloginLanding navigation={navigation} route={route} />;
  }
  function HeaderButtonClick() {
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
      navigation.navigate('DrawerNavigation', {
        screen: 'TopTabNavigation',
      });
    }
  }
  return (
    <>
      <BackHeader navigation={navigation} customOnPress={backAction} />
      {authState.userToken == null && (
        <>
      
        <SubHeader
          navigation={navigation}
          title={'My Rewards'}
          buttonText={'Transactions'}
          routingName={'TransactionHistory'}
        />
        </>
      )}
      <RootView>
        {authState.userToken != null ? <SlabView /> : <PreloginView />}
      </RootView>
    </>
  );
};
