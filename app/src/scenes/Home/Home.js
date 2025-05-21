import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import R from '../../R';
import styles from './HomeStyle';
import {AuthContext} from '../../context/auth/AuthContext';
import {
  SimpleButton,
  RootView,
  SectionName,
  Loader,
  CustomSlider,
} from '../../components/index';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../utils/Constants';
import styless from '../Auth/MultipleMallScreen/MultipleMallScreenStyle';
import moment from 'moment';
import {horizontalScale} from '../../../res/scale';
import {fetchApiService} from '../../internetconnection/CommonApiService';
import {CTA_firebaseAnalytics} from '../../components/Analytics/CTAAnalytics';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';
import {HomeHeader} from '../../components/HomeHeader';
import {
  TourGuideZone, // Main wrapper of highlight component
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';
import {MultiMall} from '../../components/MultiMall';
import {Linking} from 'react-native';
//import {decode, sign} from 'react-native-pure-jwt';

export const Home = ({navigation}) => {
  // const signSync = createSigner({
  //   key: '03bddd7af2541ea5a6ae2c8aac08bd70',
  // });

  const [ShowLoader, setShowLoader] = useState(false);
  const [showLoaderHotOffers, setShowLoaderHotOffers] = useState(false);
  const [BrandSearchResults, setBrandSearchResults] = useState([]);
  const {authAction, authState} = useContext(AuthContext);
  console.log('🚀 ~ Home.js:53 ~ Home ~ authState:', authState);
  const [showmultiplemallDemo, setshowmultiplemallDemo] = useState(false);
  const [Offerdata, setOfferData] = useState([]);
  const [campaignData, setcampaignData] = useState({});
  const [parkingInfo, setparkingInfo] = useState('');
  const [parkingWId, setParkingWId] = useState('');
  const [carParked, setcarParked] = useState(false);
  const [BrandName, setBrandName] = useState('');
  const [mdata, setmdata] = useState('');
  const [mallDetails, setMallDetails] = useState({});
  const [showmodalLoader, setshowmodalLoader] = useState(false);
  const [MallName, setMallName] = useState('');
  const [Malldata, setMalldata] = useState('');
  var pwid = null;
  const [BrandlistviewBool, setBrandlistviewBool] = useState(false);

  const serviceList = [
    {id: 1, name: 'Bill Upload', image: R.images.bill_upload},
    {id: 2, name: 'My Rewards', image: R.images.rewards_gift},
    {id: 3, name: 'Hot Offers', image: R.images.offers},
    {id: 4, name: 'Amenities', image: R.images.amenities},
    {id: 5, name: 'Mall Maps', image: R.images.mall_map},
    {id: 6, name: 'Parking Spot', image: R.images.parking_spot},
    {id: 7, name: 'Social Feeds', image: R.images.social_feeds},
    {id: 8, name: 'Explore Stores', image: R.images.explore_stores},
    {id: 9, name: 'Bill History', image: R.images.bill_history},
  ];

  const CleverTap = require('clevertap-react-native');

  useFocusEffect(
    React.useCallback(() => {
      // console.log('authstate HOME ', authState?.userObject),
      ScreenAnalytics('Home', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});

      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []),
  );
  const backAction = () => {
    setshowmultiplemallDemo(false);
    BackHandler.exitApp();
    return true;
  };

  //////////////////////  offer, campaign banners  //////////////////////
  useFocusEffect(
    React.useCallback(() => {
      CleverTap.recordEvent('Home Page Loaded', {
        Mall: authState?.mallDetails?.oko_Row_Desc,
      });
    }, [authState?.mallDetails?.oko_Row_Code]),
  );

  useFocusEffect(
    React.useCallback(() => {
      getData();
      resetParking();
      setBrandName('');
      if (authState?.mallDetails?.oko_Row_Code != null) {
        setshowmodalLoader(true);
        //apiMultipleMallFetch();
        // apiMallDetails();
        apiCampaignFetch();
        // apiOfferListing();
      }
      return () => {
        setshowmultiplemallDemo(false);
      };
    }, [authState?.mallDetails?.oko_Row_Code, authState?.parkingDetails]),
  );

  const {
    canStart, // a boolean indicate if you can start tour guide`
    start, // a function to start the tourguide

    eventEmitter,
    tourKey, // an object for listening some events
  } = useTourGuideController();

  // Can start at mount 🎉
  // you need to wait until everything is registered 😁
  React.useEffect(() => {
    //console.log('Tourguide ', authState);

    if (canStart) {
      // 👈 test if you can start otherwise nothing will happen
      if (authState?.showTourGuide == true) {
        start();
      }
    }
  }, [canStart]); // 👈 don't miss it!

  const handleOnStart = () => {};
  const handleOnStop = () => {
    //console.log('TOURGUIDE Home');
    //console.log('TOURGUIDE handleOnStop Home ', authState);
    authAction.setData({
      ...authState,
      showTourGuide: false,
    });
  };
  const handleOnStepChange = () => {};

  useEffect(() => {
    eventEmitter.on('start', handleOnStart);
    eventEmitter.on('stop', handleOnStop);
    eventEmitter.on('stepChange', handleOnStepChange);

    return () => {
      eventEmitter.off('start', handleOnStart);
      eventEmitter.off('stop', handleOnStop);
      eventEmitter.off('stepChange', handleOnStepChange);
    };
  }, []);

  const getData = async () => {
    let parkingDetailsArray = authState?.parkingDetails;

    var value = null;

    if (parkingDetailsArray != null) {
      parkingDetailsArray.map((p) => {
        if (p.mallCode == authState?.mallDetails?.oko_Row_Code) {
          value = p?.parkingInfo;
          pwid = p?.parkingWId;
        }
      });
    }

    if (value != null && value != undefined) {
      // value previously stored
      setparkingInfo(value);
      setcarParked(true);
      if (pwid != null && pwid != undefined && pwid != '') {
        setParkingWId(pwid);
      } else {
        setParkingWId('');
      }
    } else {
      value = 'Nothing';
      setparkingInfo(value);
      setcarParked(false);
    }
  };

  const resetParking = async () => {
    let parkingDetailsArray = authState?.parkingDetails;
    if (parkingDetailsArray != null) {
      parkingDetailsArray.forEach((p, i) => {
        var parkingDateTime = p?.parkingTime;
        if (parkingDateTime != null) {
          const currentDate = moment(new Date()).format('MM/DD/YYYY');
          var actualPartkingDate = moment(new Date(parkingDateTime)).format(
            'MM/DD/YYYY',
          );

          var diffBetweenDates = moment(currentDate).diff(
            actualPartkingDate,
            'days',
          );

          if (diffBetweenDates === 0) {
            getData();
          } else {
            const now = new Date();
            const oneAM = new Date();
            oneAM.setHours(1, 0, 0, 0); // Set time to 1:00 AM
            var diffBetweenDates1 = now >= oneAM;
            if (diffBetweenDates1) {
              parkingDetailsArray.splice(i, 1);
            } else {
              getData();
            }
          }
        }
      });
    }

    parkingDetailsArray =
      parkingDetailsArray.length == 0 ? null : parkingDetailsArray;
    var userInfo = {
      ...authState,
      parkingDetails: parkingDetailsArray,
    };
    await authAction.setData(userInfo);
  };

  const apiOfferListing = () => {
    const data = JSON.stringify({
      branch_code: authState?.mallDetails?.oko_Row_Code,
      oko_status: '1',
      offer_status: '1',
      approve_status: '0,1',
      pageUrl: 'FetchApiOfferListingV2',
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
        pageUrl: 'FetchApiOfferListingV2',
        event: 'HomePage',
        action: 'onLoadOffersList',
      },
      data: data,
    };
    setShowLoaderHotOffers(true);

    fetchApiService(config, authAction, authState)
      .then((response) => {
        console.log('🚀 ~ Home.js:283 ~ .then ~ response:', response);
        // if (response.data.data.Offer_MsT.length > 3) {
        //   let finalData = response.data.data.Offer_MsT.slice(0, 3);
        //   setOfferData(finalData);
        // } else
        {
          setShowLoaderHotOffers(false);
          setOfferData(response.data.data.Response);
        }
      })
      .catch((error) => {
        setOfferData([]);
        setShowLoaderHotOffers(false);
      });
  };

  const apiCampaignFetch = () => {
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
        event: 'HomePage',
        action: 'onLoadCampaign',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then((response) => {
        setShowLoader(false);
        apiOfferListing();
        apiMallDetails();
        apiMultipleMallFetch();
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
        setShowLoader(false);
      });
  };
  const goForLogin = () => {
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
  };

  const handleSearch = (MallName) => {
    if (MallName != '') {
      CTA_firebaseAnalytics(
        'Mall_Explore',
        'Mall_Search',
        authState?.userToken,
        authState?.userId,
        '',
        '',
        'searched_query : ' + MallName,
      )
        .then((res) => {})
        .catch((e) => {});

      var MallData = Malldata.filter((a) => {
        return (
          a.oko_Row_Desc.toLowerCase().includes(MallName.toLowerCase()) ||
          a.branch_City_Name.toLowerCase().includes(MallName.toLowerCase())
        );
      });
      setMalldata(MallData);
    } else {
      setMalldata(mdata);
    }
  };
  const apiMultipleMallFetch = () => {
    const data = JSON.stringify({
      oko_Cat_Desc: 'Mall',
      oko_Status: 1,
      branch_Status: 1,
      pageUrl: 'FetchAllMallNew5',
    });

    const config = {
      method: 'post',
      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'FetchAllMallNew5?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'FetchAllMallNew5?' + OPEN_API_TENANT_ID,

      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'FetchAllMallNew5',
        event: 'HomePage',
        action: 'onLoadMallsList',
      },
      data: data,
    };

    fetchApiService(config, authAction, authState)
      .then(async (response) => {
        if (response?.data?.message?.type === 'SUCCESS') {
          // apiMallDetails();
          // apiCampaignFetch();
          // apiOfferListing();

          let data = response.data.data.Response;
          setmdata(data);
          setMalldata(data);
          setshowmodalLoader(false);
          let selectedMallFromApi = data.filter(
            (mall) =>
              mall?.oko_Row_Code == authState?.mallDetails?.oko_Row_Code,
          );
          console.log(
            '🚀 ~ Home.js:437 ~ .then ~ selectedMallFromApi:',
            selectedMallFromApi,
          );
          let userInfo = {
            ...authState,
            mallDetails: item,
          };

          await authAction.setData(userInfo);
          // const matches = (obj, source) =>
          //   Object.keys(source).every(
          //     (key) => obj.hasOwnProperty(key) && obj[key] === source[key],
          //   );

          // let isMatched = matches(authState?.mallDetails, selectedMallFromApi);
          // console.log('🚀 ~ Home.js:447 ~ .then ~ isMatched:', isMatched);
        } else {
          setshowmodalLoader(false);
        }
      })
      .catch((error) => {
        setshowmodalLoader(false);
      });
  };

  const onPressService = async (item) => {
    CTA_firebaseAnalytics(
      item.name + '_Clicked',
      'Home',
      authState?.userToken,
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
    )
      .then((res) => {})
      .catch((e) => {});

    if (item.id == 1) {
      //bill upload
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
    } else if (item.id == 2) {
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
        navigation.navigate('BottomTabsNavigator', {
          screen: 'Rewards',
        });
      }
    } else if (item.id == 3) {
      navigation.navigate('Offer');
    } else if (item.id == 4) {
      //amenities
      navigation.navigate('Amenities');
    } else if (item.id == 5) {
      navigation.navigate('MapNavigation', {
        screen: 'Navigate',
      });
    } else if (item.id == 6) {
      authState?.userToken == null
        ? goForLogin()
        : navigation.navigate('SmartParking');
    } else if (item.id == 7) {
      //social feeds

      navigation.navigate('SocialFeed', {data: mallDetails});
    } else if (item.id == 8) {
      navigation.navigate('BottomTabsNavigator', {
        screen: 'Explore',
      });
    } else if (item.id == 9) {
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
        //bill history
        navigation.navigate('DrawerNavigation', {
          screen: 'TopTabNavigation',
        });
      }
    }
  };

  const setMall_Details = async (item) => {
    CTA_firebaseAnalytics(
      'Mall_Explore',
      'Mall_Search',
      authState?.userToken,
      authState?.userId,
      '',
      '',
      'selected_mall : ' + item.oko_Row_Desc,
    )
      .then((res) => {})
      .catch((e) => {});

    let userInfo = {
      ...authState,
      mallDetails: item,
    };

    await authAction.setData(userInfo);
    setshowmultiplemallDemo(!showmultiplemallDemo);
  };

  //mallDetails
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
        event: 'HomePage',
        action: 'onLoadMallDetails',
      },
      data: data,
    };
    // setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then((response) => {
        setShowLoader(false);

        if (response?.data?.message?.type === 'SUCCESS') {
          var data = response.data.data.Response[0];

          var images = response.data.data.Response[0]?.images;
          var imagesArray = [];
          if (images.includes('<->')) {
            imagesArray = images?.split('<->');
          } else {
            imagesArray = [images];
          }
          let imageObject = {imageArray: imagesArray};

          let obj = {...data, ...imageObject};

          setMallDetails(obj);
        }
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styless.itemMainContainer}
      onPress={() => setMall_Details(item)}
    >
      <Text style={styless.itemText}>
        {item.oko_Row_Desc}
        {','} {item.branch_City_Name}
      </Text>
    </TouchableOpacity>
  );
  ////////////// brand list view and fuctionality with api call //////////////////////////////////////////
  const Brandlistview = () => {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 999,
          backgroundColor: R.themes.backgroundColor,
          width: '85%',
          alignSelf: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          borderColor: R.themes.accountTextColour,
          borderRadius: 8,
          borderWidth: 1,
          top: 110,
        }}
      >
        {BrandSearchResults.length > 0 ? (
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
              color: R.colors.black,
              alignSelf: 'center',
              margin: 20,
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
    if (
      BrandName &&
      BrandName.length >= 3 &&
      BrandName.length > previousData.length
    ) {
      apiSearchBrand(BrandName);
    } else if (BrandName.length === 0 || BrandName.length < 3) {
      setBrandSearchResults('');
    }
    // }
    previousData = BrandName || '';
  };

  const apiSearchBrand = (item) => {
    CTA_firebaseAnalytics(
      'Home_Screen_Search',
      'Home',
      authState?.userToken,
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
      '',
      'selected_item : ' + item.trim(),
    )
      .then((res) => {})
      .catch((e) => {});

    if (item.trim() == '') {
      return true;
    }

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
        'Content-Type': 'application/json',
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        pageUrl: 'SearchIntegration',
        event: 'HomePage',
        action: 'onSearchBrand',
      },
      data: data,
    };

    fetchApiService(config, authAction, authState)
      .then((response) => {
        // console.log("brand search config",config);
        // console.log("brand search ",response);
        // console.log("brand search response?.data ",response?.data);

        if (response?.data?.data?.Response) {
          setBrandSearchResults(response?.data?.data?.Response);
        }
      })
      .catch((error) => {
        // console.log("brand search error ",error);
        navigation.navigate('BrandListing', {
          bName: BrandName,
          bList: [],
        });
      });
  };

  return (
    <>
      {showmultiplemallDemo ? (
        // <>
        //   <BackHeader customOnPress={backAction} />
        //   <SubHeader title={'Choose your mall for exciting rewards'} />
        //   <RootView>
        //     <SearchInputComponent
        //       customViewstyle={{marginTop: '5%'}}
        //       onPress={() => handleSearch(MallName)}
        //       onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
        //       onChangeText={(MallName) => {
        //         setMallName(MallName);
        //         handleSearch(MallName);
        //       }}
        //       value={MallName}
        //       placeholder={'Search for your favourite Mall'}
        //     />
        //     <Loader isVisible={showmodalLoader} />

        //     <View
        //       style={{
        //         marginTop: '2%',
        //         borderColor: R.colors.primaryBrand2,
        //         marginHorizontal: '5%',
        //         marginBottom: '12%',
        //         flex: 1,
        //       }}
        //     >

        //       <FlatList
        //         data={Malldata}
        //         keyExtractor={(item) => item.id}
        //         renderItem={renderItem}
        //         contentContainerStyle={styless.flatListContainer}
        //       />
        //     </View>
        //   </RootView>
        // </>

        <MultiMall
          showBackHeader={true}
          backHeaderPress={backAction}
          mallData={Malldata}
          setSelectedMall={(item) => {
            //console.log('mall details ', item),
            setMall_Details(item);
          }}
        />
      ) : (
        <>
          {/* home screen main view starts from here */}
          <HomeHeader
            navigation={navigation}
            isNotification={false}
            onSubmitEditing={(event) => {
              CleverTap.recordEvent('App Search Bar', {
                'Keyword Searched': event.nativeEvent.text,
              });
              apiSearchBrand(event.nativeEvent.text);
            }}
            onChangeText={(BrandName) => {
              setBrandName(BrandName);
              smart_Search_Call(BrandName);
              setBrandlistviewBool(true);
            }}
            value={BrandName}
            sreachTextOorC={false}
            closed={() => [setBrandName(''), smart_Search_Call('')]}
          />
          {BrandName.length > 3 && BrandlistviewBool ? <Brandlistview /> : null}

          {ShowLoader ? (
            <RootView>
              <View
                style={{
                  flex: 1,
                  marginTop: '60%',
                  position: 'absolute',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  zIndex: 10,
                }}
              >
                <View
                  style={{
                    padding: '5%',
                    borderRadius: 8,
                    width: horizontalScale(300),
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
                  {/* <LottieView
                    source={require('./animated.json')}
                    autoPlay
                    loop
                    style={{height: 50, width: 50}}
                  />  */}

                  <Image
                    source={R.images.loaderNexus}
                    style={{width: 50, height: 50}}
                  />
                </View>
              </View>
            </RootView>
          ) : (
            <RootView>
              <View
                style={{
                  flexDirection: 'row',

                  paddingBottom: '2%',
                  marginVertical: '1.5%',
                  marginHorizontal: '3%',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{flex: 0.4, marginTop: '1.5%'}}>
                  {authState?.userObject?.fullName ? (
                    <Text
                      style={{
                        fontSize: R.dimensions.wp('4%'),
                        fontFamily: R.fonts.primaryBold,
                        color: R.themes.darkHeaderColor,
                        fontWeight: 'bold',
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      Hi, {authState?.userObject?.fullName.split(' ')[0]}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: R.dimensions.wp('4%'),
                        fontFamily: R.fonts.primaryBold,
                        color: R.themes.darkHeaderColor,
                        fontWeight: 'bold',
                      }}
                    >
                      Hi, Guest
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setshowmultiplemallDemo(true)}
                  style={{
                    marginVertical: '1.5%',
                    marginRight: '1.5%',
                    flex: 0.6,
                    alignItems: 'flex-end',
                  }}
                >
                  <View
                    style={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={R.images.LocationPin}
                      style={{
                        tintColor: R.themes.darkHeaderColor,
                        width: R.dimensions.wp(5),
                      }}
                      resizeMode="contain"
                    />
                    {/* <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 14,
                        paddingStart: '2%',
                        fontFamily: R.fonts.primaryMedium,
                        color: R.themes.darkHeaderColor,
                      }}
                    >
                      You are in{' '}
                    </Text> */}

                    {/* <Image
        source={require('./../../../res/images/download.gif')}

    /> */}

                    <Text
                      style={{
                        fontSize: R.dimensions.wp('3.5%'),
                        fontFamily: R.fonts.primaryBold,
                        color: R.themes.darkHeaderColor,
                        fontWeight: '500',
                        paddingStart: '2%',
                      }}
                    >
                      {authState?.mallDetails?.oko_Row_Desc}
                      {/* {authState?.mallDetails?.branch_City_Name} */}
                    </Text>

                    <Image
                      source={R.images.BottomArrow}
                      style={{
                        tintColor: R.themes.darkHeaderColor,
                        marginStart: '4%',
                        width: R.dimensions.wp(3),
                        height: R.dimensions.hp(1.8),
                      }}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>
              {authState?.mallDetails?.icon &&
                authState?.mallDetails?.FloatingIcon &&
                authState?.mallDetails?.FloatingIconLink && (
                  <View
                    style={{
                      flex: 1,
                      position: 'absolute',
                      bottom: -30,
                      zIndex: 1,
                      right: 10,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        CTA_firebaseAnalytics(
                          'Go_to_EditProfile',
                          'Home',
                          authState?.userToken,
                          authState?.userId,
                          authState?.mallDetails?.oko_Row_Desc,
                        )
                          .then((res) => {})
                          .catch((e) => {});

                        Linking.openURL(
                          authState?.mallDetails?.FloatingIconLink,
                        );
                      }}
                    >
                      <Image
                        style={{
                          height: R.dimensions.hp('20%'),
                          width: R.dimensions.wp('20%'),
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                        source={{
                          uri:
                            (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                            '/' +
                            authState?.mallDetails?.FloatingIcon,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              <ScrollView>
                <Loader isVisible={ShowLoader} />
                <CustomSlider data={campaignData} autoplay={true} />
                {authState?.mallDetails?.banner &&
                  authState?.mallDetails?.BannerImage &&
                  authState?.mallDetails?.BannerLink && (
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{marginTop: '-8%'}}
                      onPress={() => {
                        CTA_firebaseAnalytics(
                          'Go_to_EditProfile',
                          'Home',
                          authState?.userToken,
                          authState?.userId,
                          authState?.mallDetails?.oko_Row_Desc,
                        )
                          .then((res) => {})
                          .catch((e) => {});

                        Linking.openURL(authState?.mallDetails?.BannerLink);
                      }}
                    >
                      <Image
                        style={{
                          height: R.dimensions.hp('18%'),
                          width: R.dimensions.wp('100%'),
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                        source={{
                          uri:
                            (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                            '/' +
                            authState?.mallDetails?.BannerImage,
                        }}
                      />
                    </TouchableOpacity>
                  )}

                {showLoaderHotOffers ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: '5%',
                    }}
                  >
                    <Image
                      source={R.images.loaderNexus}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                ) : Offerdata?.length > 0 ? (
                  <>
                    <TourGuideZone
                      zone={4}
                      text={
                        'Hot Offers|Check the latest offers on your favourite brands!|4/4'
                      }
                      borderRadius={16}
                      tourKey={tourKey}
                    >
                      <SectionName
                        title={'Hot Offers'}
                        yellowpetalImg={true}
                        viewMore={true}
                        customMainstyle={{
                          marginTop: campaignData?.length == 1 ? '5%' : '0%',
                        }}
                        onPress={() => {
                          CTA_firebaseAnalytics(
                            'Hot_Offers_View_All',
                            'Home',
                            authState?.userToken,
                            authState?.userId,
                            authState?.mallDetails?.oko_Row_Desc,
                          )
                            .then((res) => {})
                            .catch((e) => {});

                          navigation.navigate('Offer');
                        }}
                      />

                      <FlatList
                        data={Offerdata}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) => (
                          <TouchableOpacity
                            style={styles.offerView}
                            onPress={() => {
                              CTA_firebaseAnalytics(
                                'Hot_Offers',
                                'Home',
                                authState?.userToken,
                                authState?.userId,
                                authState?.mallDetails?.oko_Row_Desc,
                                item?.brand_name
                                  ?.toLowerCase()
                                  ?.split(' ')
                                  ?.map(
                                    (word) =>
                                      word?.charAt(0).toUpperCase() +
                                      word?.slice(1),
                                  )
                                  ?.join(' '),
                                'Offer : ' + item['offer_mst.offer_name'],
                              )
                                .then((res) => {})
                                .catch((e) => {});
                              CleverTap.recordEvent('Offer Viewed', {
                                'Hot Offers': item?.brand_name
                                  ?.toLowerCase()
                                  ?.split(' ')
                                  ?.map(
                                    (word) =>
                                      word?.charAt(0).toUpperCase() +
                                      word?.slice(1),
                                  )
                                  ?.join(' '),
                              });

                              navigation.navigate('BrandDetails', {
                                Brand_Id: item.brand_id,
                              });
                            }}
                          >
                            <View
                              style={{
                                height: '50%',
                                marginHorizontal: '5%',
                              }}
                            >
                              <Image
                                source={{
                                  uri:
                                    (IS_CDN
                                      ? IMAGE_CDN_URL_TENANT_ID
                                      : IMAGE_URL) + item.brand_log,
                                }}
                                resizeMode={'contain'}
                                style={styles.offerImage}
                              />
                            </View>

                            <View
                              style={{
                                marginHorizontal: '10%',
                                marginTop: '10%',
                              }}
                            >
                              <Text
                                style={styles.offerText}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                              >
                                {item?.brand_name
                                  ?.toLowerCase()
                                  ?.split(' ')
                                  ?.map(
                                    (word) =>
                                      word?.charAt(0).toUpperCase() +
                                      word?.slice(1),
                                  )
                                  ?.join(' ')}{' '}
                              </Text>
                              <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={styles.discountText}
                              >
                                {item['offer_mst.offer_name']}
                              </Text>
                              <TouchableOpacity
                                activeOpacity={0.5}
                                style={styles.offerviewMoreButton}
                                onPress={() => {
                                  navigation.navigate('BrandDetails', {
                                    Brand_Id: item.brand_id,
                                  });
                                }}
                              >
                                <Text style={styles.offerViewMoreText}>
                                  View More
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </TourGuideZone>
                  </>
                ) : null}
                {(authState?.userObject?.data?.userDOA == 'null' ||
                  authState?.userObject?.data?.userDOA == null ||
                  authState?.userObject?.data?.userGender == 'null' ||
                  authState?.userObject?.data?.userGender == null ||
                  authState?.userObject?.data?.birthDate == 'null' ||
                  authState?.userObject?.data?.birthDate == null) &&
                  authState?.mallDetails?.attribute_Value1 && (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        CTA_firebaseAnalytics(
                          'Go_to_EditProfile',
                          'Home',
                          authState?.userToken,
                          authState?.userId,
                          authState?.mallDetails?.oko_Row_Desc,
                        )
                          .then((res) => {})
                          .catch((e) => {});

                        authState?.userToken == null
                          ? navigation.reset({
                              index: 0,
                              routes: [
                                {
                                  name: 'AuthNavigator',
                                  params: {
                                    screen: 'Login',
                                  },
                                },
                              ],
                            })
                          : navigation.navigate('EditProfile');
                      }}
                    >
                      <Image
                        style={{
                          height: R.dimensions.hp('18%'),
                          width: R.dimensions.wp('100%'),
                          resizeMode: 'contain',
                          alignSelf: 'center',
                        }}
                        source={{
                          uri:
                            (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                            '/' +
                            authState?.mallDetails?.attribute_Value1,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                <SectionName
                  title={'Services For You'}
                  yellowpetalImg={false}
                  pinkredpetalImg={true}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    // marginHorizontal: '0.5%',
                    marginBottom: '2%',
                  }}
                >
                  <FlatList
                    data={serviceList}
                    numColumns={3}
                    style={{
                      borderColor: 'rgba(0,0,0,0.1)',
                      borderWidth: 1,
                      borderRadius: 9,
                    }}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => {
                      return (
                        <View
                          style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                          }}
                        />
                      );
                    }}
                    // columnWrapperStyle={{justifyContent: 'space-around'}}
                    renderItem={({item, index}) => (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => onPressService(item)}
                        //disabled={onPress == null}
                        style={[
                          styles.servicemainView,

                          //borderTopLeftRadius: 8,
                          index % 3 !== 0 && {
                            borderRightWidth: 0.75,
                            borderRightColor: 'rgba(0,0,0,0.1)',
                            borderLeftWidth: 0.75,
                            borderLeftColor: 'rgba(0,0,0,0.1)',
                          },
                        ]}
                      >
                        <View style={styles.serviceimgView}>
                          <Image
                            source={item.image}
                            style={styles.serviceimg}
                            resizeMode={'contain'}
                          />
                        </View>
                        <Text style={styles.servicetext}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                  {/* </TourGuideZone> */}
                </View>
                {/* <TourGuideZone
                    zone={3}
                    // text={'Various services for you! 🎉'}
                    text={'Parking|park|3/4'}

                    borderRadius={16}
                  > */}
                <SectionName
                  title={'Parking'}
                  yellowpetalImg={true}
                  viewAll={false}
                  onPress={() => {
                    navigation.navigate('Offer');
                  }}
                />
                {/* </TourGuideZone> */}
                <View
                  style={{
                    backgroundColor: R.themes.darkCardBackgroundColor,
                    marginHorizontal: '3%',
                    paddingVertical: '1%',
                    marginBottom: '15%',
                    borderRadius: 5,
                  }}
                >
                  <View style={styles.parking}>
                    <View style={[styles.hotOfferView, {alignSelf: 'center'}]}>
                      <Image
                        source={R.images.parking_spot}
                        resizeMode={'contain'}
                        style={styles.parkingImg}
                      />
                    </View>
                    <View style={styles.offerTextView}>
                      <Text
                        style={[
                          styles.markparkingText,
                          {fontWeight: '700', marginHorizontal: '2.5%'},
                        ]}
                      >
                        Mark Parking Spot
                      </Text>
                      {carParked ? (
                        <Text style={styles.parkinginfoText}>
                          {parkingInfo}
                        </Text>
                      ) : null}

                      {carParked ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',

                            // marginLeft: '20%',
                            marginTop: '2%',
                          }}
                        >
                          {parkingWId != '' && (
                            <SimpleButton
                              onPress={() => {
                                navigation.navigate('MapNavigation', {
                                  brandid: parkingWId,
                                  brandName: parkingInfo,
                                });
                              }}
                              title={'Navigate'}
                              customTxtStyle={{
                                fontSize: R.dimensions.hp('1.2%'),
                                fontFamily: R.fonts.primaryMedium,
                                color: R.themes.boxBackgroundColour,
                              }}
                              customStyle={styles.pCustomStyle}
                            />
                          )}
                          <SimpleButton
                            onPress={() => navigation.navigate('SmartParking')}
                            title={'Change Parking Spot'}
                            customTxtStyle={{
                              fontSize: R.dimensions.hp('1.2%'),
                              fontFamily: R.fonts.primaryMedium,
                              color: R.themes.boxBackgroundColour,
                            }}
                            customStyle={styles.pCustomStyle}
                          />
                        </View>
                      ) : (
                        <SimpleButton
                          onPress={async () =>
                            authState?.userToken == null
                              ? goForLogin()
                              : (CTA_firebaseAnalytics(
                                  'Mark_Spot',
                                  'Home',
                                  authState?.userToken,
                                  authState?.userId,
                                  authState?.mallDetails?.oko_Row_Desc,
                                )
                                  .then((res) => {})
                                  .catch((e) => {}),
                                navigation.navigate('SmartParking'))
                          }
                          title={'Mark'}
                          customTxtStyle={styles.markText}
                          customStyle={styles.markCustomStyle}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </RootView>
          )}
        </>
      )}
    </>
  );
};
