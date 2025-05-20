import React, {useEffect, useState, useContext} from 'react';
import {View, ScrollView, FlatList} from 'react-native';
import {AuthContext} from '../../../context/auth/AuthContext';
//local import
import styles from './OfferStyles';
import R from '../../../R';
import {
  RootView,
  SectionName,
  BackHeader,
  Loader,
  CategoryCard,
  OfferCard,
} from '../../../components/index';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../../utils/Constants';

import {fetchApiService} from '../.././../internetconnection/CommonApiService';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import SubHeader from '../../../components/SubHeader';
export const Offer = ({navigation}) => {
  const CleverTap = require('clevertap-react-native');

  const [Offerdata, setOfferData] = useState([]);
  const [offerDataForNavigation, setofferDataForNavigation] = useState([]);
  const [ShowLoader, setShowLoader] = useState(false);
  const {authAction, authState} = useContext(AuthContext);
  const [combinePartyCode, SetCombinePartyCode] = useState('');
  const [, setCarouselActiveSlidedata] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    apiOfferListing();
    apiofferimages();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('Offers', authState?.userToken, authState?.userId)
        .then(() => {})
        .catch(() => {});
    }, []),
  );

  function sortingofDAta(response) {
    if (response.data.data.Response.length > 3) {
      let finalData = response.data.data.Response.slice(0, 5);
      setOfferData(finalData);
    } else {
      setOfferData(response.data.data.Response);
    }
    const names = response.data.data.Response;
    let cat = [];
    names.forEach((element) => {
      cat.push({
        catName: element.category_name,
        catImage: element.category_image,
        catId: element.partyc_cat_code,
      });
    });
    const key = 'catName';
    let combineCat = [];
    let test = [...new Map(cat.map((item) => [item[key], item])).values()];

    test.forEach((e) => {
      combineCat.push(e.catId);
    });
    const cat_all = [];
    cat_all.push({
      catName: 'All',
      id: null,
    });
    SetCombinePartyCode(combineCat);
    return [...cat_all, ...test];
  }

  const apiOfferListing = async () => {
    const data = JSON.stringify({
      branch_code: authState?.mallDetails?.oko_Row_Code,
      oko_status: '1',
      offer_status: '1',
      approve_status: '0,1',
      pageUrl:'FetchApiOfferListingV2',
    });

    const config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL +
          'FetchApiOfferListingV2?' +
          OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL +
          'FetchApiOfferListingV2?' +
          OPEN_API_TENANT_ID,

      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'FetchApiOfferListingV2',
        event:'OfferScreen',
        action:'onLoadOffers'
      },
      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(async (response) => {
        //console.log("FetchApiOfferListingV2 response ",response.data.data);
        setofferDataForNavigation(response.data.data.Response);

        const newarray = await sortingofDAta(response);

        setData(newarray);
        //console.log("newarray ",newarray);
        
        setShowLoader(false);
      })
      .catch(() => {
        setShowLoader(false);
      });
  };
  const apiofferimages = () => {
    var data = JSON.stringify({
      ach_Desc: 'Hot offers image',
      ach_Prefix: '23004',
      entity_Name: 'Branch_MsT',
      row_Code: authState?.mallDetails?.oko_Row_Code,
      hdr_approve_Status: '0,1',
      hdr_acd_Status: '0,1',
      dtl_approve_Status: '0,1',
      dtl_acd_Status: '0,1',
      pageUrl:'Homescreen',
    });

    var config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'Homescreen?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'Homescreen?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'Homescreen',
        event:'OfferScreen',
        action:'onLoadOfferImages'
      },
      data: data,
    };
    // setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        //console.log("Homescreen config ",config);
        //console.log("Homescreen response ",response.data);

        let imageD = [];
        response?.data?.data?.Response.forEach((element) =>
          imageD.push('/' + element?.attribute_Value),
        );
        setCarouselActiveSlidedata(imageD);

        // setShowLoader(false);
      })
      .catch(function () {
        setShowLoader(false);
      });
  };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Offers'} />
      <RootView style={{bottom: '20%'}}>
        <ScrollView style={{flex: 1}}>
          {/* <CustomSlider data={carouselActiveSlidedata} /> */}
          <Loader isVisible={ShowLoader} />
          <SectionName title={'Offers by Category'} yellowpetalImg={true} />
          <View style={styles.Container}>
            <FlatList
              data={data}
              showsVerticalScrollIndicator={false}
              numColumns={4}
              contentContainerStyle={{
                paddingHorizontal: '2%',
              }}
              renderItem={({item}) =>
                item.catName == 'All' ? (
                  <CategoryCard
                    source={R.images.allCategory}
                    title={'All'}
                    onPress={() => {
                      CTA_firebaseAnalytics(
                        'Offers_Category',
                        'Offers',
                        authState?.userToken,
                        authState?.userId,
                        authState?.mallDetails?.oko_Row_Desc,
                        '',
                        'category : All',
                      )
                        .then(() => {})
                        .catch(() => {});
                      CleverTap.recordEvent('Offer Viewed', {
                        'Category Viewed': 'All',
                      });
                      navigation.navigate('OfferByCategory', {
                        data: offerDataForNavigation,
                        name: 'ALL',
                        partyCCatID: combinePartyCode,
                      });
                    }}
                  />
                ) : (
                  <CategoryCard
                    source={{
                      uri:
                        (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                        item.catImage,
                    }}
                    title={item.catName}
                    onPress={() => {
                      CTA_firebaseAnalytics(
                        'Offers_Category',
                        'Offers',
                        authState?.userToken,
                        authState?.userId,
                        authState?.mallDetails?.oko_Row_Desc,
                        '',
                        'category : ' + item.catName,
                      )
                        .then(() => {})
                        .catch(() => {});
                      CleverTap.recordEvent('Offer Viewed', {
                        'Category Viewed': item.catName,
                      });

                      navigation.navigate('OfferByCategory', {
                        data: offerDataForNavigation,
                        name: item.catName,
                        partyCCatID: item.catId,
                      });
                    }}
                  />
                )
              }
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={{marginTop: '3%'}}>
            <SectionName
              title={'Offers by Brand'}
              viewAll={true}
              pinkredpetalImg={true}
              onPress={() => {
                CTA_firebaseAnalytics(
                  'Offers_Brand_View_All',
                  'Offers',
                  authState?.userToken,
                  authState?.userId,
                  authState?.mallDetails?.oko_Row_Desc,
                  '',

                  '',
                )
                  .then(() => {})
                  .catch(() => {});

                navigation.navigate('BrandOffers', {
                  data: offerDataForNavigation,
                });
              }}
            />
          </View>
          <View
            style={{
              marginHorizontal: '2%',
              marginBottom: '20%',
            }}
          >
            <FlatList
              data={Offerdata}
              style={{marginVertical: '2%'}}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <OfferCard
                  onPress={() => {
                    CTA_firebaseAnalytics(
                      'Offers_Viewed',
                      'Offers',
                      authState?.userToken,
                      authState?.userId,
                      authState?.mallDetails?.oko_Row_Desc,
                      item.brand_name,

                      'Offer : ' + item['offer_mst.offer_name'],
                    )
                      .then(() => {})
                      .catch(() => {});
                    CleverTap.recordEvent('Offer Viewed', {
                      'Hot Offers': item.brand_name,
                    });

                    navigation.navigate('BrandDetails', {
                      Brand_Id: item.brand_id,
                    });
                  }}
                  source={{
                    uri:
                      (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                      item.brand_log,
                  }}
                  name={item.brand_name}
                  details={item['offer_mst.offer_name']}
                  customStyle={{
                    backgroundColor: R.themes.backgroundColor,
                    borderColor: R.themes.borderColor,
                    borderWidth: 1,
                  }}
                  customTextStyle={{
                    color: R.themes.borderColor,
                    fontWeight: 'bold',
                  }}
                  customSubTextStyle={{color: R.themes.borderColor}}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </ScrollView>
      </RootView>
    </>
  );
};
