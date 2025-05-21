import React, {useContext, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  BackHandler,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
//local import
import R from '../../R';
import styles from './MapfirstStyle';
import {useRoute} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';

import {AuthContext} from '../../context/auth/AuthContext';
import checkInternetStatus from '../../internetconnection/inConnectionOn';
import {navigate} from '../../utils/NavigationService';

import {CTA_firebaseAnalytics} from '../../components/Analytics/CTAAnalytics';
import {MainHeader, RootView} from '../../components';

export const MapFirstPage = ({navigation}) => {
  const routeName = useRoute();
  const {authState} = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );

  useEffect(() => {
    CTA_firebaseAnalytics(
      'Wayfinding_card',
      'Offers',
      authState?.userToken,
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
    )
      .then((res) => {})
      .catch((e) => {});
  }, []);

  const backAction = () => {
    if (routeName?.name != 'HomePage') {
      navigation.navigate('HomePage');
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  };

  const handleNavigate = () => {
    navigate('NewInternetScreen');
  };

  const checkNetwork = async () => {
    checkInternetStatus().then((isWorking) => {
      if (!isWorking) {
        handleNavigate();
      } else {
        navigation.navigate('MapNavigation');
      }
    });
  };

  const ServicesCard = ({image, title}) => {
    return (
      <View style={styles.servicemainView}>
        <Image
          source={image}
          style={styles.serviceimg}
          resizeMode={'contain'}
        />

        <Text style={styles.servicetext}>{title}</Text>
      </View>
    );
  };

  return (
    <>
      <MainHeader navigation={navigation} />
      <RootView>
        <View style={{flex: 0.6}}>
          <ImageBackground
            source={R.images.wovvmapsNexusbackground}
            style={styles.imageBackgroundContainer}
          >
            <Image
              resizeMode="contain"
              style={styles.logoImage}
              source={R.images.newapplogo}
            />
          </ImageBackground>
        </View>

        <View style={{flex: 1, margin: '5%', flexDirection: 'column'}}>
          <Text style={styles.text1}>
            {`Spend your time shopping at your favourite stores! \n \n We will help you get there.`}
          </Text>
          <Text style={styles.text2}>Through Wayfinding !</Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                CTA_firebaseAnalytics(
                  'Navigation_Clicked',
                  'Navigate',
                  authState?.userToken,
                  authState?.userId,
                  authState?.mallDetails?.oko_Row_Desc,
                )
                  .then((res) => {})
                  .catch((e) => {});

                checkNetwork();
              }}
              style={styles.navigateButtonContainer}
            >
              <Image
                source={R.images.LocationPin}
                style={{
                  tintColor: R.themes.backgroundColor,
                  width: R.dimensions.wp(4.5),
                  alignSelf: 'flex-start',
                }}
                resizeMode="cover"
              />
              <Text
                style={{
                  color: R.themes.backgroundColor,
                  fontFamily: R.fonts.primaryRegular,
                  fontSize: R.dimensions.hp('1.6%'),
                  textAlign: 'center',
                  lineHeight: 20,
                  fontWeight: '400',
                  paddingHorizontal: '2%',
                  flex: 0.5,
                }}
              >
                Navigate Now {'>>'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text3}>Also, be guided to all</Text>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
              alignSelf: 'center',
              marginBottom: '5%',
            }}
          >
            <ServicesCard image={R.images.wovvmapsHome} title={'Amenities'} />
            <ServicesCard
              image={R.images.wovvmapsDining}
              title={'Food Outlets'}
            />
            <ServicesCard
              image={R.images.wovvmapsParking}
              title={'Parking Lots'}
            />
          </View>
        </View>
      </RootView>
    </>
  );
};
