import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  FlatList,
} from 'react-native';

import Icon from 'react-native-remix-icon';
import moment from 'moment';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
//local import
import R from '../../../R';
import {AuthContext} from '../../../context/auth/AuthContext';
import {
  RootView,
  CModal,
  Loader,
  OfferCard,
  SectionName,
  TimeList,
  CustomSlider,
} from '../../../components';
import styles from './BrandDetailsStyles';
import {BackHeader} from '../../../components/BackHeader';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../../utils/Constants';
import analytics from '@react-native-firebase/analytics';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {useFocusEffect} from '@react-navigation/native';
import SubHeader from '../../../components/SubHeader';

export const BrandDetails = ({navigation, route}) => {
  const {authAction, authState} = useContext(AuthContext);

  const {Brand_Id} = route.params;

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayName = days[new Date().getDay()];
  const [flag, setFlag] = useState(false);
  const [ShowLoader, setShowLoader] = useState(false);
  const [, setImage] = useState('');
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage] = useState(null);
  const [OfferData, setOfferData] = useState([[]]);
  const [showTime, setShowTime] = useState(true);
  const [timeData, setTimeData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [brandImage, setBrandImage] = useState([]);

  const [BrandDetails, setBrandDetails] = useState({
    'pft.tenant_Name': null,
  });
  useEffect(() => {
    apiGetBrandDetails();
    apiGetOffer();
    // analyticsdata();
  }, [Brand_Id]);

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('Brand_Details', authState?.userToken, authState?.userId)
        .then(() => {})
        .catch(() => {});
    }, []),
  );

  const analyticsdata = async (name) => {
    var brandname = name.length > 40 ? name.slice(0, 39) : name;
    await analytics().logEvent(
      `${brandname}-${authState?.mallDetails?.oko_Row_Desc}`,
      {
        Brandname: brandname,
        // spotnumber: 'new data',
      },
    );
  };

  const apiGetOffer = () => {
    const item = Brand_Id;

    let data = JSON.stringify({
      schd_type_desc: 'Daily',
      branch_code: authState?.mallDetails?.oko_Row_Code,
      partyc_code: item,
      offer_status: '1',
      pageUrl:'FetchOfferDetails',

    });

    let config = {
      method: 'post',

      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'FetchOfferDetails?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'FetchOfferDetails?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'FetchOfferDetails',
        event:'BrandDetailsScreen',
        action:'onLoadOffers'
      },
      data: data,
    };
    // setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then((response) => {
        //  setShowLoader(false);
        if (
          response?.data?.data?.Response != null &&
          response?.data?.data?.Response.length > 0
        ) {
          setFlag(true);
          setOfferData(response?.data?.data?.Response);
        } else {
          setFlag(false);
        }
      })
      .catch(() => {
        //   setShowLoader(false);
      });
  };
  const apiGetBrandDetails = () => {
    const item = Brand_Id;

    let data = JSON.stringify({
      Item: item,
      Status: 1,
      pageUrl:'FetchBrandDetails',
    });

    let config = {
      method: 'post',

      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'FetchBrandDetails?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'FetchBrandDetails?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'FetchBrandDetails',
        event:'BrandDetailsScreen',
        action:'onFetchBrandDetails'
      },
      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then((response) => {
        setShowLoader(false);
        //console.log("FetchBrandDetails config ",config);

        //console.log("FetchBrandDetails response ",response.data.data.Response[0]);

        setBrandDetails(response.data.data.Response);
        var data = response.data.data.Response[0];

        var images = response.data.data.Response[0].brand_Images;
        var imagesArray = images.split('<->');
        var imageObject = {imageArray: imagesArray};
        var obj = {...data, ...imageObject};

        analyticsdata(response.data.data.Response[0].brand_name);
        setBrandDetails(obj);

        setBrandImage(obj.imageArray);
        let timeArray = [
          {
            day: 'Monday',
            Open_Ts: obj.mon_Open_Ts,
            Close_Ts: obj.mon_Close_Ts,
          },
          {
            day: 'Tuesday',
            Open_Ts: obj.tuesday_Open_Ts,
            Close_Ts: obj.tuesday_Close_TS,
          },
          {
            day: 'Wednesday',
            Open_Ts: obj.wed_Open_Ts,
            Close_Ts: obj.wed_Close_Ts,
          },
          {
            day: 'Thursday',
            Open_Ts: obj.thursday_Open_Ts,
            Close_Ts: obj.thursday_Close_TS,
          },
          {
            day: 'Friday',
            Open_Ts: obj.friday_Open_Ts,
            Close_Ts: obj.friday_Close_Ts,
          },
          {
            day: 'Saturday',
            Open_Ts: obj.saturday_Open_Ts,
            Close_Ts: obj.saturday_Close_Ts,
          },
          {
            day: 'Sunday',
            Open_Ts: obj.sun_Open_Ts,
            Close_Ts: obj.sun_Close_TS,
          },
        ];
        setTimeData(timeArray);

        setImage(obj.imageArray[0]);

        timeArray.map((item) =>
          dayName == item.day ? setCurrentData(item) : null,
        );

        navigation.setOptions({title: obj?.brand_name});
      })
      .catch(() => {
        setShowLoader(false);
      });
  };

  const openDialScreen = () => {
    const phoneNo = BrandDetails.brand_phoneno;

    let number = '';
    if (Platform.OS === 'android') {
      number = `tel:${phoneNo}`;
    } else {
      number = `telprompt:${phoneNo}`;
    }
    Linking.openURL(number);
  };
  // const camelize = (str) => {
  //   return str.replace(/\W+(.)/g, function (match, chr) {
  //     return chr.toUpperCase();
  //   });
  // };
  // const brandNaming =(Bname)=>{
  //   let name = Bname;
  // let pieces = name?.split(' ');
  // pieces = pieces?.map((word, index) => word.charAt(0)[index===0 ? 'toUpperCase' :'toUpperCase']() + word.toLowerCase().slice(1));
  // setBrandName(pieces)
  // BrandDetails?.brand_Name?.split(' ')?.map((word, index) => word.charAt(0)[index===0 ? 'toUpperCase' :'toLowerCase']() + word.toLowerCase().slice(1))
  // }.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  //words.map((word) => { word[0].toUpperCase() + word.substring(1)}).join(" ")

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={BrandDetails.brand_name} />
      {ShowLoader ? (
        <RootView>
          <Loader isVisible={ShowLoader} />
        </RootView>
      ) : (
        <RootView>
          <ScrollView>
            <CustomSlider
              data={brandImage}
              // isMiddleLogo={true}
              source={{
                uri:
                  (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                  BrandDetails.brand_logo,
              }}
            />

            <TouchableOpacity onPress={openDialScreen}>
              <View style={styles.view}>
                <Text style={styles.name}>Call</Text>

                {BrandDetails.brand_phoneno == null ||
                BrandDetails.brand_phoneno == '' ? (
                  <Text style={styles.value}>NA</Text>
                ) : (
                  <Text style={styles.value}>{BrandDetails.brand_phoneno}</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.view}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', width: '65%'}}>
                  <Text style={styles.name}>Level</Text>

                  <Text style={[styles.value]}>{BrandDetails.brand_floor}</Text>
                </View>
              </View>
              {/* <Text style={[styles.value]}>{BrandDetails.brand_floor}</Text> */}

              {BrandDetails.brand_id && (
                <TouchableOpacity
                  style={styles.LoginButton}
                  onPress={() => {
                    // navigation.navigate('MapNavigation',
                    // {
                    //   brandid: BrandDetails.brand_Id
                    // });
                    navigation.navigate('MapNavigation', {
                      brandid: BrandDetails.brand_id,
                      brandName: BrandDetails.brand_name,
                    });
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      padding: 5,
                    }}
                  >
                    <Text style={styles.LoginButtonText}>Navigate</Text>
                    <Icon
                      name="ri-map-pin-line"
                      size="20"
                      color={R.themes.accountTextColour}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View style={{paddingBottom: 20, paddingLeft: 14}}>
              <SectionName
                title={'Timings'}
                yellowpetalImg={true}
                viewIcon={true}
                name={showTime ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line'}
                onPress={() => setShowTime(!showTime)}
              />

              {showTime ? (
                <TimeList
                  startTime={
                    currentData.Open_Ts != null
                      ? moment(currentData.Open_Ts, 'hh:mm A').format('hh:mm A')
                      : '--'
                  }
                  endTime={
                    currentData.Close_Ts != null
                      ? moment(currentData.Close_Ts, 'hh:mm A').format(
                          'hh:mm A',
                        )
                      : '--'
                  }
                  day={'Today'}
                  dash={{paddingRight: 5}}
                />
              ) : (
                <View style={{paddingTop: 5}}>
                  <FlatList
                    data={timeData}
                    renderItem={({item}) => (
                      <TimeList
                        container={styles.timeView}
                        time={{
                          color:
                            dayName == item.day
                              ? R.themes.accountTextColour
                              : R.themes.darkCardBackgroundColor,

                          fontFamily:
                            dayName == item.day
                              ? R.fonts.primaryBold
                              : R.fonts.primaryRegular,
                        }}
                        dash={{
                          color:
                            dayName == item.day
                              ? R.themes.accountTextColour
                              : R.themes.darkCardBackgroundColor,

                          fontFamily:
                            dayName == item.day
                              ? R.fonts.primaryBold
                              : R.fonts.primaryRegular,
                        }}
                        day={item.day}
                        startTime={
                          item.Open_Ts != null
                            ? moment(item.Open_Ts, 'hh:mm A').format('hh:mm A')
                            : '--'
                        }
                        endTime={
                          item.Close_Ts != null
                            ? moment(item.Close_Ts, 'hh:mm A').format('hh:mm A')
                            : '--'
                        }
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              )}
            </View>

            {flag ? (
              <View style={{paddingLeft: 15}}>
                <SectionName
                  title={'Offers'}
                  pinkredpetalImg={true}
                  viewAll={true}
                  onPress={() => navigation.navigate('Offer')}
                />
                {OfferData.map((item) => {
                  return (
                    <OfferCard
                      source={{
                        uri:
                          (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                          item.brand_logo,
                      }}
                      name={item['offer_mst.offer_name']}
                      details={item.offer_short_desc}
                      isFromBrandDetails={true}
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
                  );
                })}
              </View>
            ) : null}

            <View
              style={{
                marginVertical: '1%',
                paddingLeft: 15,
                marginBottom: '10%',
              }}
            >
              <SectionName title={'About Company'} yellowpetalImg={true} />

              {/* <Text style={styles.aboutText}>About Company</Text> */}
              <Text style={styles.aboutSubText}>
                {BrandDetails.About_Brand}
              </Text>
            </View>

            {/* <View style={styles.bottomView}>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <TouchableOpacity style={styles.button}>
              <Image
                tintColor={R.themes.backgroundColor}
                source={R.images.Add_1}
                style={styles.image}
              />
              <Text style={styles.bText}>Add To Wish List</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  marginLeft: '5%',
                  backgroundColor: R.themes.backgroundColor,
                  borderWidth: horizontalScale(0.3),
                  borderColor: R.colors.orange,
                },
              ]}>
              <Image
                // tintColor={R.colors.black}
                source={R.images.Heart}
                style={styles.image}
              />
              <Text style={styles.text}>Save For Later</Text>
            </TouchableOpacity>
          </View>
        </View> */}

            {/* {OfferData.length > 0 && (
            <View>
              <SectionName
                title={'Offers'}
                viewAll={true}
                onPress={() => navigation.navigate('Offer')}
              />
              {OfferData.map((item) => {
                return (
                  <View style={styles.offerCardView}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.offerLogoView}>
                        <Image
                          source={{
                            uri:
                              'https://sandboxapi.wovvipos.com/ImagePath/_1011212111066' +
                              item.brand_logo,
                          }}
                          resizeMode={'center'}
                          style={styles.offerLogo}
                        />
                      </View>
                      <View
                        style={{justifyContent: 'center', marginLeft: '2%'}}>
                        <Text
                          style={{
                            fontSize: R.dimensions.hp('2%'),
                            fontWeight: 'bold',
                            fontFamily: R.fonts.primaryBold,
                          }}>
                          {item['offer_mst.offer_Name']}
                        </Text>
                        <Text
                          style={{
                            fontSize: R.dimensions.hp('1.8%'),
                            fontFamily: R.fonts.primaryRegular,
                          }}>
                          {item.offer_Short_Desc}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          )} */}

            {/* <SectionName title={'Ratings'} viewAll={false} />
        <View
          style={{
            marginHorizontal: '3%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Image
              source={R.images.Star}
              style={{
                height: R.dimensions.hp('3%'),
                width: R.dimensions.wp('5%'),
                tintColor: R.colors.darkorange,
                paddingLeft: 5,
              }}
            />
            <Image
              source={R.images.Star}
              style={{
                height: R.dimensions.hp('3%'),
                width: R.dimensions.wp('5%'),
                tintColor: R.colors.darkorange,
                marginHorizontal: '3%',
              }}
            />
            <Image
              source={R.images.Star}
              style={{
                height: R.dimensions.hp('3%'),
                width: R.dimensions.wp('5%'),
                tintColor: R.colors.darkorange,
              }}
            />
            <Image
              source={R.images.Star}
              style={{
                height: R.dimensions.hp('3%'),
                width: R.dimensions.wp('5%'),
                tintColor: R.colors.darkorange,
              }}
            />
            <Image
              source={R.images.Star_Rating_Inactive}
              style={{
                height: R.dimensions.hp('3%'),
                width: R.dimensions.wp('5%'),
                tintColor: R.colors.black,
              }}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: R.dimensions.hp('2.5%'),
                textAlign: 'center',
              }}>
              4.5
            </Text>
            <Text
              style={{
                fontSize: R.dimensions.hp('1.8%'),
                marginHorizontal: '3%',
                alignSelf: 'flex-end',
                color: R.colors.coolGrey,
              }}>
              31 ratings
            </Text>
          </View>
        </View>
        <View
          style={{
            //justifyContent: 'center',
            height: R.dimensions.hp('12%'),
            width: R.dimensions.wp('95%'),
            borderRadius: 5,
            borderColor: R.colors.golden,
            marginBottom: '3%',
            borderWidth: 0.5,
            alignSelf: 'center',
            elevation: 1.2,
            marginVertical: '5%',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: R.dimensions.hp('2.5%'),
              paddingLeft: 10,
              paddingTop: 7,
            }}>
            Add your rating
          </Text>
          <View style={{flexDirection: 'row', paddingLeft: 10, paddingTop: 10}}>
            <Image
              source={R.images.Star}
              style={{
                height: R.dimensions.hp('4%'),
                width: R.dimensions.wp('7%'),
                tintColor: R.colors.darkorange,
              }}
            />
            <Image
              source={R.images.Star}
              style={{
                height: R.dimensions.hp('4%'),
                width: R.dimensions.wp('7%'),
                tintColor: R.colors.darkorange,
                marginLeft: '2%',
              }}
            />
            <Image
              source={R.images.Star}
              style={{
                height: R.dimensions.hp('4%'),
                width: R.dimensions.wp('7%'),
                tintColor: R.colors.darkorange,
                marginLeft: '2%',
              }}
            />
            <Image
              source={R.images.Star}
              style={{
                height: R.dimensions.hp('4%'),
                width: R.dimensions.wp('7%'),
                tintColor: R.colors.darkorange,
                marginLeft: '2%',
              }}
            />
            <Image
              source={R.images.Star_Rating_Inactive}
              style={{
                height: R.dimensions.hp('4%'),
                width: R.dimensions.wp('7%'),
                tintColor: R.colors.black,
                marginLeft: '2%',
              }}
            />
          </View>
        </View> */}
            {/* <TouchableOpacity
            style={{
              height: R.dimensions.hp('8%'),
              width: R.dimensions.wp('70%'),
              alignItems: 'center',
              borderRadius: 5,
              borderColor: R.colors.golden,
              marginBottom: '3%',
              borderWidth: 0.5,

              flexDirection: 'row',
              marginHorizontal: '5%',
              alignSelf: 'center',
              paddingHorizontal: '10%',
              justifyContent: 'space-evenly',
            }}
            onPress={() => updateList(BrandDetails)}>
            {BrandDetails.is_Favorite != 0 ? (
              <Icon name="ri-heart-fill" size="32" color={R.colors.red} />
            ) : (
              <Icon name="ri-heart-line" size="32" color={R.colors.black} />
              +
            )}
            <Text style={{}}>Add To Favourite</Text>
          </TouchableOpacity> */}
            {/* {ShowLoader && (
              <RootView>
                <Loader isVisible={ShowLoader} />
              </RootView>
            )} */}
            <CModal
              isVisible={ShowErrorModal}
              modalMsg={ErrorModalMessage}
              onPressModal={() => setShowErrorModal(false)}
            />
          </ScrollView>
        </RootView>
      )}
    </>
  );
};
