import React, {useState, useContext} from 'react';
import {FlatList, TouchableOpacity, Text, Platform, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
/* -------------------------------------------------------------------------- */
/*                                local import                                */
/* -------------------------------------------------------------------------- */
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import styles from './MultipleMallScreenStyle';
import {
  TENANT_ID,
  AUTH_BASE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../../utils/Constants';
import {AuthContext} from '../../../context/auth/AuthContext';
import {BackHeader, RootView} from '../../../components/index';
import {fetchPartyCode} from '../API/CommonApiCalls';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {SearchInputComponent} from '../../../components/SearchInputComponent';
import R from '../../../R';
import {Image} from 'react-native';

/* -------------------------------------------------------------------------- */
/*                               main component                               */
/* -------------------------------------------------------------------------- */
export const MultipleMallScreen = ({navigation, route}) => {
  const CleverTap = require('clevertap-react-native');

  const [data, setdata] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [MallName, setMallName] = useState('');
  const [Malldata, setMalldata] = useState('');
  const {authState, authAction} = useContext(AuthContext);
  const isFromSkip = route.params.isFromSkip;
  var timerId;
  useFocusEffect(
    React.useCallback(() => {
      //console.log("Multimall isFromSkip ",isFromSkip);
      //console.log("Multimall authState ",authState);

      //console.log("Multimall authAction ",authAction);

      ScreenAnalytics('Mall_search', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});

      apiMultipleMallFetch();
      return clearTimeout(timerId);
    }, []),
  );
  /* -------------------------------------------------------------------------- */
  /*                             handle mall search                             */
  /* -------------------------------------------------------------------------- */
  const handleSearch = (MallName) => {
    if (MallName != '') {
      let MallData = data.filter((a) => {
        return (
          a.oko_Row_Desc.toLowerCase().includes(MallName.toLowerCase()) ||
          a.branch_City_Name.toLowerCase().includes(MallName.toLowerCase())
        );
      });
      setMalldata(MallData);
    } else {
      setMalldata(data);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                              set mall details                              */
  /* -------------------------------------------------------------------------- */
  const setMall_Details = async (item) => {
    setShowLoader(true);
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
    if (isFromSkip === 0) {
      let userInfo = {
        ...authState,
        mallDetails: item,
        isLogInSkipped: true,
      };
      await authAction.setData(userInfo);
      // setShowLoader(false);
      // setMalldata([]);
      if (item.splashScreenStatus) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'AuthNavigator',
              params: {
                screen: 'Nexus247SelectionScreen',
                params: {
                  mallDetails: item,
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
    } else if (isFromSkip === 1) {
      const userData = route.params.data;
      apiPushNotification(
        userData.userId,
        userData.accessToken,
        userData.userDetails,
        item,
      );
    } else if (isFromSkip === 2) {
      let userInfo = {
        ...authState,
        mallDetails: item,
        isLogInSkipped: false,
      };
      await authAction.setData(userInfo);
      // setShowLoader(false);
      //setMalldata([]);
      navigation.navigate('SignUp');
    } else if (isFromSkip === 3) {
      let userInfo = {
        ...authState,
        mallDetails: item,
        isLogInSkipped: false,
      };
      await authAction.setData(userInfo);
      // setShowLoader(false);
      //  setMalldata([]);
      navigation.navigate('AppleSignIn', {isfrommallSelection: true});
    } else if (isFromSkip === 4) {
      let userInfo = {
        ...authState,
        mallDetails: item,
        isLogInSkipped: false,
      };
      await authAction.setData(userInfo);
      // setShowLoader(false);
      //  setMalldata([]);
      navigation.navigate('GoggleSignIn', {isfrommallSelection: true});
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                         handle navigation function                         */
  /* -------------------------------------------------------------------------- */

  const handleNavigation = (item) => {
    if (isFromSkip === 0) {
      setMall_Details(item);
    } else if (isFromSkip === 1) {
      const userData = route.params.data;

      apiPushNotification(
        userData.userId,
        userData.accessToken,
        userData.userDetails,
        item,
      );
    } else if (isFromSkip === 2) {
      setMall_Details(item);
    } else if (isFromSkip === 3) {
      setMall_Details(item);
    } else if (isFromSkip === 4) {
      setMall_Details(item);
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                           get multi mall data api                          */
  /* -------------------------------------------------------------------------- */
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
        event: 'MultipleMallScreen',
        action: 'onLoadMallsList',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then((response) => {
        console.log(
          '🚀 ~ MultipleMallScreen.js:208 ~ .then ~ response:',
          response,
        );
        setShowLoader(false);

        let data = response.data.data.Response;

        setdata(data);
        setMalldata(data);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                             get party data api                             */
  /* -------------------------------------------------------------------------- */
  const getPartyData = async (
    userId,
    accessToken,
    userDetails,
    fcmToken,
    fcmTokenId,
    mallData,
    source,
    defaultMall,
  ) => {
    const {result} = await fetchPartyCode(
      userId,
      accessToken,
      authAction,
      authState,
    );

    let userInfo = {
      ...authState,
      userToken: accessToken,
      userId: userId,
      userObject: userDetails,
      PartyCode: result,
      partyCode: result,
      fcmTokenDetails: {fcmToken: fcmToken, fcmTokenId: fcmTokenId},
      mallDetails: mallData,
    };
    //console.log("multiple mall screen ",userInfo);

    await authAction.setData(userInfo);

    // CLEVERTAP
    var props = {
      identity: result?.toString(),
      Email: userDetails?.email,
      Phone: userDetails?.mobilePhone,
    };

    if (source != 'App Signup') {
      props['Default Mall'] = defaultMall;
      props['User Status'] = 'ACTIVE';
      props['MSG-whatsapp'] = true;
      props.Name = userDetails?.fullName;
      if (
        userDetails.data?.userGender.toString() &&
        userDetails.data?.userGender.toString() != 'null'
      ) {
        userDetails.data.userGender.toString() == '0'
          ? (props.Gender = 'F')
          : userDetails.data.userGender.toString() == '1'
          ? (props.Gender = 'M')
          : (props.Gender = 'O');
      }
      if (
        userDetails.data?.birthDate &&
        userDetails.data?.birthDate != 'null'
      ) {
        props['Date Of Birth'] = new Date(userDetails.data.birthDate);
      }
      if (userDetails.data?.userDOA && userDetails.data?.userDOA != 'null') {
        props['Anniversary Date'] = new Date(userDetails.data.userDOA);
      }
    }

    CleverTap.onUserLogin(props);
    //console.log("proceed to homescreen");

    // setShowLoader(false);
    timerId = setTimeout(() => {
      if (mallData.splashScreenStatus) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'AuthNavigator',
              params: {
                screen: 'Nexus247SelectionScreen',
                params: {
                  mallDetails: mallData,
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
      // setShowLoader(false);
    });
  };
  /* -------------------------------------------------------------------------- */
  /*                            push notification api                           */
  /* -------------------------------------------------------------------------- */
  const apiPushNotification = async (
    userId,
    accessToken,
    userDetails,
    item,
  ) => {
    const fcmToken = await messaging().getToken();
    let fcmTokenId = null;
    let useremail = userDetails.email;
    let deviceplatfrom = Platform.OS === 'ios' ? '2001' : '1001';

    let data = JSON.stringify({
      pageUrl: 'loginTimeActiveUserVersion2',
      entityName: 'User_Vs_Token',
      action: 'payloadRuleWithTid',
      event: 'JR_847_V2',
      formList: [
        {
          user_Code: userId,
          user_Email: useremail,
          fcm_Token: fcmToken,
          platform_Desc: deviceplatfrom,
          mall_Code: item?.oko_Row_Code,
          mall_Name: item?.oko_Row_Desc,
        },
      ],
    });
    let config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/bpm/process?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: accessToken,
        userid: userId,
        'Content-Type': 'application/json',
        pageUrl: 'loginTimeActiveUserVersion2',
        event: 'MultipleMallScreen',
        action: 'pushNotification',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        //console.log("apiPushNotification config ",config);
        //console.log("apiPushNotification config ",response.data);

        if (response.data.message.type == 'SUCCESS') {
          const userTokens = response?.data?.data?.User_Vs_Token;
          if (userTokens[0].id) {
            if (userTokens[0].fcm_Token == fcmToken) {
              fcmTokenId = userTokens[0]?.id;
            }
          } else if (userTokens[1].Id) {
            if (userTokens[1].fcm_Token == fcmToken) {
              fcmTokenId = userTokens[1]?.Id;
            }
          }
        }
        const userData = route.params.data;

        getPartyData(
          userData.userId,
          userData.accessToken,
          userData.userDetails,
          fcmToken,
          fcmTokenId,
          item,
          userData.source,
          userData.defaultMall,
        );
      })
      .catch(function (error) {
        //console.log("apiPushNotification error ",error);

        setShowLoader(false);
      });
  };
  /* -------------------------------------------------------------------------- */
  /*                             flatlist mall item                             */
  /* -------------------------------------------------------------------------- */
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.itemMainContainer}
        onPress={() => handleNavigation(item)}
      >
        <Text style={styles.itemText}>
          {item?.oko_Row_Desc}
          {','} {item.branch_City_Name}
        </Text>
      </TouchableOpacity>
    );
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity
  //       activeOpacity={0.5}
  //       style={styles.itemMainContainer}
  //       onPress={() => handleNavigation(item)}
  //     >
  //    <Text style={styles.itemText}>
  //           {item.oko_Row_Desc}
  //           {','} {item.branch_City_Name}
  //         </Text>
  //   </TouchableOpacity>
  // );

  function LoaderView() {
    return (
      <View
        style={{
          flex: 1,
          animationType: 'fade',
          transparent: true,
          justifyContent: 'center',
          alignItems: 'center',
          height: R.dimensions.hp('55%'),
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
        <Image source={R.images.loaderNexus} style={{width: 50, height: 50}} />
      </View>
    );
  }
  /* -------------------------------------------------------------------------- */
  /*                             main render method                             */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <BackHeader navigation={navigation} />
      <RootView>
        {showLoader ? (
          <LoaderView />
        ) : (
          <View style={{flex: 1}}>
            <SearchInputComponent
              onPress={() => handleSearch(MallName)}
              onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
              onChangeText={(MallName) => {
                setMallName(MallName);
                handleSearch(MallName);
              }}
              value={MallName}
              placeholder={'Search For Your Favourite Mall'}
            />
            {/* <FlatList
              data={Malldata}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            /> */}
            <View
              style={{
                //marginTop: '2%',
                borderColor: R.colors.primaryBrand2,
                marginHorizontal: '5%',
                marginBottom: '12%',
                flex: 1,
              }}
            >
              <FlatList
                data={Malldata}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                // numColumns={2}
                contentContainerStyle={styles.flatListContainer}
                // columnWrapperStyle={styles.row}
              />
            </View>
          </View>
        )}
        {/* <Loader isVisible={showLoader} /> */}
      </RootView>
    </>
  );
};
