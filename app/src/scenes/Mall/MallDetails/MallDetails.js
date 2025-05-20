import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
//local import
import {useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {useRoute} from '@react-navigation/core';

import R from '../../../R';
import styles from './MallDetailsStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {
  SectionName,
  RootView,
  CModal,
  Loader,
  TimeList,
  CategoryCard,
  CustomSlider,
  BackHeader,
} from '../../../components/index';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {SearchInputComponent} from '../../../components/SearchInputComponent';

//TODO change location icon to remix icon
export const Directory = ({navigation}) => {
  const [campaignData, setcampaignData] = useState({});
  const {authAction, authState} = useContext(AuthContext);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [BrandSearchResults, setBrandSearchResults] = useState([]);
  const [BrandName, setBrandName] = useState('');
  // const [BrandList, setBrandList] = useState([]);
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
  const [mallData, setMallData] = useState({});
  const [CategoryList, setCategoryList] = useState([]);
  // const [SubCategoryList, setSubCategoryList] = useState([]);
  const [showTime, setShowTime] = useState(true);
  const [timeData, setTimeData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage] = useState(null);
  const [mallImage, setMallImage] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [mallName, setMallName] = useState();
  const routeName = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      ScreenAnalytics('Explore', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});
      if (authState?.mallDetails?.oko_Row_Code != null) {
        apiMallDetails();
      }
      setBrandName('');
      return () => {
        setShowTime(true);
        BackHandler.removeEventListener('hardwareBackPress', backAction);
        setShowLoader(false);
      };
    }, [authState?.userId, authState?.mallDetails?.oko_Row_Code]),
  );

  const backAction = () => {
    if (routeName?.name != 'HomePage') {
      navigation.navigate('HomePage');
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  };

  const openDialScreen = (phoneNo) => {
    let number = '';
    if (Platform.OS === 'android') {
      number = 'tel:${' + phoneNo + '}';
    } else {
      number = 'telprompt:${' + phoneNo + '}';
    }
    Linking.openURL(number);
  };

  //mallDetails
  const apiMallDetails = (params) => {
    //console.log('apiMallDetails ');

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
        event: 'MallDetailsScreen',
        action: 'onFetchMallDetails',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then((response) => {
       

        if (response?.data?.message?.type === 'SUCCESS') {
          apiCampaignFetch();
          apiGetCategories();
       
        var data = response.data.data.Response[0];
        setLatitude(data.latitude_val);
        setLongitude(data.longitude_val);
        setMallName(data.mall_name);
        navigation.setOptions({
          title: response.data.data.Response[0].mall_name,
        });

        var images = response.data.data.Response[0]?.images;
        var imagesArray = [];
        if (images.includes('<->')) {
          imagesArray = images?.split('<->');
        } else {
          imagesArray = [images];
        }
        var imageObject = {imageArray: imagesArray};
        var obj = {...data, ...imageObject};

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

        timeArray.map((item) =>
          dayName == item.day ? setCurrentData(item) : null,
        );

        setMallData(obj);
        setMallImage(obj.imageArray);
      }
      else
      {
        setShowLoader(false);
      }
      })
      .catch((error) => {
        //console.log('apiMallDetails error ');
        setShowLoader(false);
      });
  };
  //getCategories
  const apiGetCategories = (params) => {
    //console.log('apiGetCategories ');

    const data = JSON.stringify({
      schd_type_desc: 'Daily',
      oko_row_code: authState?.mallDetails?.oko_Row_Code,
      active_status: 1,
      pageUrl: 'FetchGetCategories',
    });

    const config = {
      method: 'post',

      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'FetchGetCategories?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'FetchGetCategories?' + OPEN_API_TENANT_ID,

      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'FetchGetCategories',
        event: 'MallDetailsScreen',
        action: 'onFetchCategories',
      },
      data: data,
    };

    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        setShowLoader(false);
        const names = response.data.data.Response;
        const cat = [];

        const newarray = [...cat, ...names];

        setCategoryList(newarray);
      })
      .catch(function (error) {
        //console.log('apiGetCategories error ');
        setShowLoader(false);
      });
  };

  //campaignImageApi
  const apiCampaignFetch = (params) => {
    //console.log('campaignfetch ');
    var data = JSON.stringify({
      campaingnType: 'Campaign',
      campStatus: 1,
      rowCode: authState?.mallDetails?.oko_Row_Code,
      pageUrl: 'FetchCampaingn',
    });

    const config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'FetchCampaingn?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'FetchCampaingn?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'FetchCampaingn',
        event: 'MallDetailsScreen',
        action: 'onFetchCampaign',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then((response) => {
        //console.log('apiMallDetails apiCampaignFetch apiGetCategories');
        setShowLoader(false);

        if (response.data.data == null) {
          setcampaignData([]);
        } else {
          let data = response.data.data.Response;
          let allImage1 = data.filter(
            (item) => item.Banner != null && item.Banner.trim().length > 1,
          );
          let allImage = [];
          allImage1.filter((item) => allImage.push(item.Banner));

          setcampaignData(allImage);
        }
      })
      .catch((error) => {
        //console.log('campaignfetch error ');
        setShowLoader(false);
      });
  };

  const openGps = (lat, lag, mnm) => {
    const latitude = lat;
    const longitude = lag;
    const label = mnm;

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

  const Mcard = (props) => {
    return (
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
        <View style={styles.containerMcard}>
          {props.image && (
            <Image
              source={props.img}
              style={styles.imageMcard}
              resizeMode={'contain'}
            />
          )}
          {/* {props.icon && (
            <Icon
              style={styles.imageMcard}
              name={props.source}
              size="33"
              color={R.colors.darkorange}
            />
          )} */}

          <Text style={styles.textMcard}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  ////////////// brand list view and fuctionality//////////////////////////////////////////
  const Brandlistview = () => {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 999,
          backgroundColor: R.themes.backgroundColor,
          width: '95%',
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          top: 60,
          borderRadius: 8,
        }}
      >
        {BrandSearchResults ? (
          <ScrollView style={{flexGrow: 1}}>
            <FlatList
              // horizontal={true}
              style={styles.flatlist}
              scrollEnabled={false}
              data={BrandSearchResults}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('BrandDetails', {
                      Brand_Id: item.partyC_Code,
                    })
                  }
                >
                  <View
                    style={{
                      paddingVertical: 10,
                      marginVertical: 5,
                      width: '95%',
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignSelf: 'center',
                      paddingHorizontal: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    <Text style={{}}>{item.party_Name}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => item + index}
            />
          </ScrollView>
        ) : (
          <Text
            style={{
              margin: 20,
              color: R.colors.black,
              alignSelf: 'center',
            }}
          >
            Brand not found
          </Text>
        )}
      </View>
    );
  };

  var previousData = '';
  const smart_Search_Call = (BrandName) => {
    var a = [3, 6, 9, 12, 15, 18];
    for (var i = 0; i < a.length; i++) {
      if (
        BrandName &&
        BrandName.length === a[i] &&
        BrandName.length > previousData.length
      ) {
        apiSearchBrand(BrandName);
      } else if (BrandName.length === 0 || BrandName.length < 3) {
        setBrandSearchResults('');
      }
    }
    previousData = BrandName || '';
  };

  const apiSearchBrand = (item) => {
    if (item.trim() == '') {
      return true;
    }
    CTA_firebaseAnalytics(
      'Store_Searched',
      'Explore',
      authState?.userToken,
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
      '',
      'selected_item : ' + item.trim(),
    )
      .then((res) => {})
      .catch((e) => {});

    let data = JSON.stringify({
      Search_Text: item.trim(),
      Mall_Code: (authState?.mallDetails?.oko_Row_Code).toString(),
      pageUrl: 'SearchIntegration',
    });

    let config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'SearchIntegration?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'SearchIntegration?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'SearchIntegration',
        event: 'MallDetailsScreen',
        action: 'onSearchBrand',
      },
      data: data,
    };

    fetchApiService(config, authAction, authState)
      .then((response) => {
        //console.log("response?.data ",response?.data?.data);

        if (response?.data?.data?.Response) {
          setBrandSearchResults(response?.data?.data?.Response);
        }
      })
      .catch((error) => {
        navigation.navigate('BrandListing', {
          bName: BrandName,
          bList: [],
        });
      });
  };

  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <BackHeader navigation={navigation} />
      {/* {ShowLoader ? (
        <RootView>
          <Loader isVisible={ShowLoader} />
        </RootView>
      ) : 
      ( */}
      <RootView>
        <SearchInputComponent
          onPress={() => apiSearchBrand(BrandName)}
          onSubmitEditing={(event) => {
            apiSearchBrand(event.nativeEvent.text);
          }}
          onChangeText={(BrandName) => {
            setBrandName(BrandName);
            smart_Search_Call(BrandName);
          }}
          value={BrandName}
          placeholder={'Look For Your Most Loved Brands'}
        />

        {BrandName ? <Brandlistview /> : null}

        <ScrollView>
          <View style={{marginBottom: '20%'}}>
            <CustomSlider data={mallImage} />

            <View style={{paddingBottom: 10}}>
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
                    currentData.Open_Ts != null &&
                    currentData.Open_Ts != undefined
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
                />
              ) : (
                <View style={{marginHorizontal: '2%', paddingTop: 0}}>
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
              <View style={styles.line} />
            </View>
            <View>
              <Modal
                animationType="fade"
                transparent={true}
                backdropOpacity={0.85}
                visible={contactModalVisible}
                onRequestClose={() => {
                  setContactModalVisible(!contactModalVisible);
                }}
              >
                <View style={styles.modelCard}>
                  <View style={styles.contactModalView}>
                    <Text style={styles.seaText}>
                      {authState?.mallDetails?.oko_Row_Desc}
                    </Text>

                    <Text style={styles.num}>
                      {mallData['bm.branch_mobno']}
                    </Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.cancelBtn}
                        onPress={() => setContactModalVisible(false)}
                      >
                        <Text style={styles.canceltext}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.callBtn}
                        onPress={() => {
                          CTA_firebaseAnalytics(
                            'Call_Button',
                            'Explore',
                            authState?.userToken,
                            authState?.userId,
                            authState?.mallDetails?.oko_Row_Desc,
                          )
                            .then((res) => {})
                            .catch((e) => {});
                          openDialScreen(mallData['bm.branch_mobno']);
                        }}
                      >
                        <Text style={styles.callText}>Call Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            <View style={styles.container}>
              <Mcard
                img={R.images.explore_call}
                name={'Contact'}
                image={true}
                onPress={() => {
                  CTA_firebaseAnalytics(
                    'Contact',
                    'Explore',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                  )
                    .then((res) => {})
                    .catch((e) => {});
                  setContactModalVisible(!contactModalVisible);
                }}
              />
              <Mcard
                img={R.images.explore_reachHere}
                name={'Reach Here'}
                image={true}
                onPress={() => {
                  CTA_firebaseAnalytics(
                    'Reach_Here',
                    'Explore',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                  )
                    .then((res) => {})
                    .catch((e) => {});
                  openGps(latitude, longitude, mallName);
                }}
              />
              <Mcard
                img={R.images.explore_amenities}
                name={'Amenities'}
                onPress={() => {
                  CTA_firebaseAnalytics(
                    'Amenities_Clicked',
                    'Explore',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                  )
                    .then((res) => {})
                    .catch((e) => {});
                  navigation.navigate('Amenities');
                }}
                image={true}
              />
              <Mcard
                img={R.images.explore_socialfeed}
                name={'Social Feeds'}
                onPress={() => {
                  CTA_firebaseAnalytics(
                    'Social_Feed',
                    'Explore',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                  )
                    .then((res) => {})
                    .catch((e) => {});
                  navigation.navigate('SocialFeed', {data: mallData});
                }}
                image={true}
              />
            </View>
            <View style={styles.line} />

            <SectionName title={'Category'} pinkredpetalImg={true} />
            <View style={{margin: '1%', alignItems: 'center'}}>
              <FlatList
                data={CategoryList}
                numColumns={4}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                  item.category_name == 'All' ? null : (
                    <CategoryCard
                      source={{
                        uri:
                          (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                          item.image,
                      }}
                      customTextStyle={{
                        fontSize: R.dimensions.hp(1.28),
                        fontWeight: '500',
                      }}
                      title={item.category_name}
                      onPress={() => {
                        CTA_firebaseAnalytics(
                          'Brand_Categories_Clicks',
                          'Explore',
                          authState?.userToken,
                          authState?.userId,
                          authState?.mallDetails?.oko_Row_Desc,
                          '',

                          'category : ' + item.category_name,
                        )
                          .then((res) => {})
                          .catch((e) => {});

                        navigation.navigate('BrandListing', {
                          cName: item.category_name,
                          cId: item.category_code,
                        });
                      }}
                    />
                  )
                }
                keyExtractor={(item) => item.id}
              />
            </View>

            <TouchableOpacity
              style={{
                padding: 20,
                marginVertical: '2%',
                marginHorizontal: '12%',
              }}
              onPress={() =>
                navigation.navigate('BrandListing', {
                  cId: null,
                })
              }
            >
              <View
                style={{
                  backgroundColor: '#EB600A',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: R.themes.backgroundColor,
                    fontFamily: R.fonts.primarySemiBold,
                    padding: 10,
                  }}
                >
                  Explore All Brands
                </Text>
              </View>
            </TouchableOpacity>

            <CustomSlider data={campaignData} />
            {campaignData?.length == 1 && (
              <View style={{marginBottom: '10%'}} />
            )}
          </View>
        </ScrollView>
        <Loader isVisible={ShowLoader} />
        <CModal
          isVisible={ShowErrorModal}
          modalMsg={ErrorModalMessage}
          onPressModal={() => setShowErrorModal(false)}
        />
      </RootView>
      {/* )} */}
    </>
  );
};
