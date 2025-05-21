import React, {useState, useEffect, useContext} from 'react';
import {Text, FlatList, Image, TouchableOpacity, View} from 'react-native';

//local import
import {RootView, BackHeader, Loader, CModal} from '../../../components';
import {AuthContext} from '../../../context/auth/AuthContext';
import R from '../../../R';
import styles from './AmenitiesStyle';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  FCM_BASE_OPEN_API_URL,
  USER_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import SubHeader from '../../../components/SubHeader';

export const Amenities = ({navigation}) => {
  const {authAction, authState} = useContext(AuthContext);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [data, setData] = useState([]);
  let timeid;
  useEffect(() => {
    apiGetAmenities();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('Amenities', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});

      return () => {
        clearTimeout(timeid);
      };
    }, []),
  );

  const apiGetAmenities = () => {
    let data = JSON.stringify({
      atrbt_class_code: '1008',
      av_status: '1',
      row_code: authState?.mallDetails?.oko_Row_Code,
      pageUrl:'FetchAmenities',
    });

    let config = {
      method: 'post',
      // url: BASE_URL,
      // headers: {
      //   access_Token: Temp_Token,
      //   Register_Id: Register_ID,
      //   'Content-Type': 'application/json',
      // },
      // data: data,
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'FetchAmenities?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'FetchAmenities?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'FetchAmenities',
        event:'AmenitiesScreen',
        action:'onLoadAmenities'
      },
      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then((response) => {
        setShowLoader(false);

        //console.log("apiGetAmenities ",config);
        //console.log("apiGetAmenities response.data ",response.data);

        //console.log("apiGetAmenities response ",response.data.data.Response);
        let data = response.data.data.Response;
        let data1 = data.sort((a, b) =>
          a.amenities_name.toLowerCase() > b.amenities_name.toLowerCase()
            ? 1
            : -1,
        );

        setData(data1);
        timeid = setTimeout(() => {
          setShowLoader(false);
        }, 2000);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  const renderAmenitiesItem = (item) => {
    return (
      <TouchableOpacity
        style={styles.mainView}
        onPress={() => {
          CTA_firebaseAnalytics(
            'Amenities',
            'Amenities',
            authState?.userToken,
            authState?.userId,
            authState?.mallDetails?.oko_Row_Desc,
            '',
            item.item.amenities_name,
          )
            .then((res) => {})
            .catch((e) => {});

          navigation.navigate('MapNavigation', {
            brandid: item.item.aval_id,
          });
        }}
      >
        <TouchableOpacity style={styles.imgView}>
          <Image
            source={{
              uri:
                (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                item.item.amenities_image,
            }}
            style={styles.img}
            resizeMode={'contain'}
            defaultSource={R.images.defaultImageSource}
          />
        </TouchableOpacity>
        <Text numberOfLines={2} ellipsizeMode={'clip'} style={styles.text}>
          {item.item.amenities_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Amenities'} />
      <RootView>
        <View style={{marginBottom: '5%'}}>
          <FlatList
            data={data}
            contentContainerStyle={{marginBottom: '5%'}}
            showsVerticalScrollIndicator={false}
            renderItem={renderAmenitiesItem}
            keyExtractor={(item) => item.id}
          />
          <CModal
            isVisible={ShowErrorModal}
            onPressModal={() => setShowErrorModal(false)}
            isForm={'Signup'}
            modalMsg={'For more information, visit the information desk'}
          />

          <Loader isVisible={ShowLoader} />
        </View>
      </RootView>
    </>
  );
};
