import React, {useContext, useState} from 'react';
import {Alert, Image} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//local import
import {Loader, RootView} from '../../components/index';
import R from '../../R';
import {AuthContext} from '../../context/auth/AuthContext';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../utils/Constants';
import {fetchApiService} from '../../internetconnection/CommonApiService';
import {CTA_firebaseAnalytics} from '../../components/Analytics/CTAAnalytics';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';
import SubHeader from '../../components/SubHeader';
import {Platform} from 'react-native';

export const ContactUs = () => {
  const {authAction, authState} = useContext(AuthContext);
  const [mallData, setMallData] = useState({});
  const [fullAddress, setFullAddress] = useState('');
  const [ShowLoader, setShowLoader] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      if (authState?.mallDetails?.oko_Row_Code != null) {
        apiMallDetails();
      }
    }, [authState?.mallDetails?.oko_Row_Code]),
  );

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('Contact_Us', authState?.userToken, authState?.userId);
    }, []),
  );

  const handleAddressOnPress = () => {
    const latitude = mallData.latitude_val;
    const longitude = mallData.longitude_val;
    const label = mallData.mall_name;

    const url = Platform.select({
      ios: 'maps:' + latitude + ',' + longitude + '?q=' + label,
      android: 'geo:' + latitude + ',' + longitude + '?q=' + label,
    });
    if (url) {
      Linking.openURL(url);
    } else {
      Alert.alert('ERROR', 'Unable to open: ' + url, [{text: 'OK'}]);
    }
  };

  const handlePhoneOnPress = () => {
    CTA_firebaseAnalytics(
      'Call_Button',
      'Contact_Us',
      authState?.userToken,
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
      '',
      '',
    )
      .then((res) => {})
      .catch((e) => {});

    let phoneNo = mallData['bm.branch_mobno'];
    let number = '';
    if (Platform.OS === 'android') {
      number = 'tel:' + phoneNo;
    } else {
      number = `telprompt:${phoneNo}`;
    }
    Linking.openURL(number);
  };

  const handleEmailOnPress = () => {
    Linking.openURL(`mailto:${mallData['bm.branch_email']}`);
  };
  const apiMallDetails = (params) => {
    const data = JSON.stringify({
      okenType: 'Mall',
      okenStatus: '1',
      approveStatus: 1,
      okenRow: authState?.mallDetails?.oko_Row_Code,
      pageUrl: 'FetchMallDetails',
    });

    const config = {
      method: 'post',

      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'FetchMallDetails?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'FetchMallDetails?' + OPEN_API_TENANT_ID,

      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'FetchMallDetails',
        event: 'ContactUsPage',
        action: 'onLoadMallDetails',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then((response) => {
        setShowLoader(false);

        var data = response.data.data.Response[0];
        var images = response.data.data.Response[0]?.images;
        var imagesArray = [];
        if (images.includes('<->')) {
          imagesArray = images?.split('<->');
        } else {
          imagesArray = [images];
        }
        var finalObject = {...data, images: imagesArray};
        let fullAddress = '';
        if (finalObject['bm.branch_add_door'] != null) {
          fullAddress = finalObject['bm.branch_add_door'];
        }
        if (finalObject['bm.branch_add_landmark'] != null) {
          if (fullAddress.length == 0) {
            fullAddress = finalObject['bm.branch_add_landmark'];
          } else {
            fullAddress =
              fullAddress + ', ' + finalObject['bm.branch_add_landmark'];
          }
        }
        if (finalObject['bm.branch_add_street'] != null) {
          if (fullAddress.length == 0) {
            fullAddress = finalObject['bm.branch_add_street'];
          } else {
            fullAddress =
              fullAddress + ', ' + finalObject['bm.branch_add_street'];
          }
        }
        if (finalObject['bm.branch_area_name'] != null) {
          if (fullAddress.length == 0) {
            fullAddress = finalObject['bm.branch_area_name'];
          } else {
            fullAddress =
              fullAddress + ', ' + finalObject['bm.branch_area_name'];
          }
        }
        if (finalObject['bm.branch_city_name'] != null) {
          if (fullAddress.length == 0) {
            fullAddress = finalObject['bm.branch_city_name'];
          } else {
            fullAddress =
              fullAddress + ', ' + finalObject['bm.branch_city_name'];
          }
        }

        setMallData(finalObject);
        setFullAddress(fullAddress);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const ContactHeadingSection = ({title, details, onPress, icon}) => {
    return (
      <View style={styles.contactMainConatiner}>
        <View style={{flex: 4}}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.detailsText}>{details}</Text>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={{flex: 0.5, marginTop: '5%'}}
        >
          <Image
            source={icon}
            style={{
              height: R.dimensions.wp(8),
              width: R.dimensions.wp(8),
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <SubHeader title={'Contact Us'} />

      <RootView>
        <Loader isVisible={ShowLoader} />

        {Object.keys(mallData).length > 0 && (
          <ScrollView style={{flex: 1}}>
            <Image
              style={styles.mallImage}
              resizeMode={'cover'}
              source={{
                uri:
                  (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                  mallData?.images[0],
              }}
            />
            <ContactHeadingSection
              title={'Mall Address'}
              details={fullAddress}
              onPress={() => handleAddressOnPress()}
              icon={R.images.contactUsPin}
            />
            <ContactHeadingSection
              title={'Phone Number'}
              details={mallData['bm.branch_mobno']}
              onPress={() => handlePhoneOnPress()}
              icon={R.images.contactUsPhone}
            />
            <ContactHeadingSection
              title={'Email'}
              details={mallData['bm.branch_email']}
              onPress={() => handleEmailOnPress()}
              icon={R.images.contactUsEmail}
            />
          </ScrollView>
        )}
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  mallImage: {
    height: R.dimensions.hp(34),
  },
  maincontainer: {
    flex: 1,
    paddingLeft: '3%',
    paddingRight: '3%',
    backgroundColor: R.colors.primaryBrand2,
  },
  contactMainConatiner: {
    flexDirection: 'row',
    marginTop: '5%',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp(2.5),
    color: R.themes.accountTextColour,
    marginTop: '5%',
    fontWeight: '700',
  },
  detailsText: {
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp(1.8),
    color: R.themes.accountTextColour,
    marginTop: '3%',
    width: '65%',
    fontWeight: '400',
  },
});
