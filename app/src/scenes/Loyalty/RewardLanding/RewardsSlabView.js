import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  FlatList,
  Image,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import {useRoute} from '@react-navigation/core';
import {useFocusEffect} from '@react-navigation/native';
//local import
import R from '../../../R';
import styles from './RewardsLandingStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {
  AUTH_BASE_URL,
  BASE_URL,
  Register_ID,
  Temp_Token,
  TENANT_ID,
} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {horizontalScale} from '../../../../res/scale';
import {dimensions} from '../../../../res/dimensions';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import LinearGradient from 'react-native-linear-gradient';
import {MultiMall} from '../../../components/MultiMall';
import {BackHeader} from '../../../components';
export const RewardsSlabView = ({navigation, route}) => {
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowloader] = useState(false);
  const [slabData, setSlabData] = useState(false);
  const routeName = useRoute();
  const [ShowDailySpends, setShowDailySpends] = useState(false);
  const [todaysSpendItem, settodaysSpendItem] = useState('');
  const [showmultiplemallDemo, setshowmultiplemallDemo] = useState(false);
  const [Malldata, setMalldata] = useState('');

  ///////////////////// useFocusEffect to call api functions //////////////

  useFocusEffect(
    React.useCallback(() => {
      //console.log("Mall change ");

      DailyMonthlyYearlySlabs();
      BackHandler.addEventListener('hardwareBackPress', backAction);
      // DeviceEventEmitter.emit('hardwareBackPress');
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
      authState?.userObject?.imageUrl,
      authState?.userObject,
      authState?.parkingDetails,
    ]),
  );

  const backAction = () => {
    //console.log("rewardsslabview");

    if (showmultiplemallDemo) {
      setshowmultiplemallDemo(false);
    } else if (routeName?.name != 'HomePage') {
      navigation.navigate('HomePage');
      return true;
    } else {
      BackHandler.exitApp();
      return true;
    }
  };

  const DailyMonthlyYearlySlabs = () => {
    //console.log("DailyMonthlyYearlySlabs ");

    let data = JSON.stringify({
      partyCode: authState.PartyCode || authState.partyCode,
      branchCode: authState?.mallDetails?.oko_Row_Code,
      invp_Status: 1,
      pageUrl: 'Spendcard',
    });

    let config = {
      method: 'post',
      url:
        AUTH_BASE_URL +
        `/ipos/rest/JRConversion/spendCardV1?tenantId=_${TENANT_ID}`,

      headers: {
        access_token: authState?.userToken,
        userId: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl: 'spendCardV1',
        event: 'RewardsSlabViewPage',
        action: 'onLoadRewardSlabs',
      },
      data: data,
    };
    setShowloader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        //console.log('🚀 ~ file: RewardsSlabView.js:83 ~ response:', response);

        setShowloader(false);
        setSlabData(response.data.data.Lpt_Promo_Dtl);
      })
      .catch(function (error) {
        //console.log('🚀 ~ file: RewardsSlabView.js:83 ~ error:', error);
        setShowloader(false);
      });
  };

  const ClamiBtn = () => {
    return (
      <View
        style={{
          backgroundColor: R.themes.yellowPetalcolor,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            paddingHorizontal: '7%',
            paddingVertical: '2%',
            color: R.themes.accountTextColour,
          }}
        >
          Claim
        </Text>
      </View>
    );
  };

  const CustomSlider = ({value = 80, min = 0, max = 100}) => {
    const fillPercentage = ((value - min) / (max - min)) * 100;

    return (
      <View style={[styles.container, {height: 20}]}>
        <View style={[styles.baseTrack, {backgroundColor: '#BB5BBB'}]} />

        <View
          style={[
            styles.filledTrack,
            {
              width: `${fillPercentage}%`,
              backgroundColor: '#FFBE3F',
              height: 5,
            },
          ]}
        />
      </View>
    );
  };
  function RenderSlabList({item, index}) {
    return (
      <View
        style={{
          backgroundColor: R.colors.white,
          borderRadius: 5,
          borderWidth: 0.5,
          marginTop: '2%',
          marginHorizontal: '5%',
          borderColor: R.colors.primaryBrand2,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            item?.promo_code == '2100009'
              ? (CTA_firebaseAnalytics(
                  'special rewards_card',
                  'ShopAndWin',
                  authState?.userToken,
                  authState?.userId,
                  authState?.mallDetails?.oko_Row_Desc,
                  '',
                  '',
                )
                  .then((res) => {})
                  .catch((e) => {}),
                navigation.navigate('SpecialReward'))
              : (item?.RemarkNew === 'DailySlab1'
                  ? CTA_firebaseAnalytics(
                      'todays spend_card',
                      'ShopAndWin',
                      authState?.userToken,
                      authState?.userId,
                      authState?.mallDetails?.oko_Row_Desc,
                      '',
                      '',
                    )
                      .then((res) => {})
                      .catch((e) => {})
                  : item?.RemarkNew === 'MonthlySlab1'
                  ? CTA_firebaseAnalytics(
                      'Monthly spends_card',
                      'ShopAndWin',
                      authState?.userToken,
                      authState?.userId,
                      authState?.mallDetails?.oko_Row_Desc,
                      '',
                      '',
                    )
                      .then((res) => {})
                      .catch((e) => {})
                  : CTA_firebaseAnalytics(
                      'yearly spends_card',
                      'ShopAndWin',
                      authState?.userToken,
                      authState?.userId,
                      authState?.mallDetails?.oko_Row_Desc,
                      '',
                      '',
                    )
                      .then((res) => {})
                      .catch((e) => {}),
                //console.log("slabview SlabPromo ",item.promo_code),

                navigation.navigate('RewardsDetail', {
                  SlabName: item?.RemarkNew,
                  SlabDName: item?.Remark,
                  SlabPromo: item?.promo_code,
                  slabData: item,
                }));
          }}
        >
          {item.RemarkNew === 'HappynessCorner' ? (
            // <View style={{paddingVertical:"2.5%"}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',

                paddingVertical: '2.5%',
              }}
            >
              <View
                style={{
                  //width: '50%',
                  marginTop: '2%',
                  flexDirection: 'row',
                  marginHorizontal: '2%',
                  flex: 1,
                }}
              >
                <View
                  style={{
                    justifyContent: 'center',

                    flex: 0.1,
                    alignItems: 'center',
                    marginLeft: '2%',
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={
                      item.RemarkNew === 'MonthlySlab1' ||
                      item.RemarkNew === 'HappynessCorner'
                        ? R.images.MonthlyRewardImg
                        : R.images.YearlyRewardImg
                    }
                    style={{marginHorizontal: '0.5%'}}
                  />
                </View>
                <View
                  style={{
                    flex: 0.5,
                    marginHorizontal: '0.5%',
                    marginLeft: '4%',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: R.fonts.primaryRegular,
                      fontSize: R.dimensions.wp('4%'),
                      fontWeight: 'bold',
                      color: R.themes.accountTextColour,
                    }}
                  >
                    {/* Monthly Spends */}
                    {item?.Remark}
                  </Text>

                  <Text
                    numberOfLines={2}
                    style={{
                      fontFamily: R.fonts.primaryBold,
                      fontSize: R.dimensions.wp('3%'),
                      color: R.themes.rewardsTextColor,
                      paddingRight: Platform.OS == 'ios' ? '2%' : '10%',
                      marginTop: Platform.OS == 'ios' ? '2%' : 0,
                    }}
                  >
                    {item?.msg}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 0.4,
                    justifyContent: 'center',
                    alignContent: 'flex-end',
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      alignContent: 'flex-end',
                      backgroundColor: R.themes.yellowPetalcolor,
                      marginRight: '9%',
                      marginLeft: '30%',
                      marginVertical: '2%',
                      borderRadius: 5,
                    }}
                  >
                    <Text
                      style={{
                        paddingVertical: '8%',
                        color: R.themes.accountTextColour,
                      }}
                    >
                      Claim
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : item?.RemarkNew !== 'DailySlab1' ? (
            <View source={R.images.YearlyRewardMask} style={styles.yearlymask}>
              {item?.specialNew !== 'SpecialRewards' ? (
                <View style={{paddingVertical: '2.5%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                    }}
                  >
                    <View
                      style={{
                        //width: '50%',
                        marginTop: '2%',
                        flexDirection: 'row',
                        marginHorizontal: '2%',
                        flex: 0.5,
                      }}
                    >
                      <View
                        style={{justifyContent: 'center', marginLeft: '2%'}}
                      >
                        <Image
                          resizeMode="contain"
                          source={
                            item.RemarkNew === 'MonthlySlab1' ||
                            item.RemarkNew === 'HappynessCorner'
                              ? R.images.MonthlyRewardImg
                              : R.images.YearlyRewardImg
                          }
                          style={{}}
                        />
                      </View>

                      <Text
                        style={{
                          fontFamily: R.fonts.primaryBold,
                          fontSize: R.dimensions.wp('3.5%'),
                          color: R.themes.rewardsTextColor,
                          marginLeft: '2%',

                          //textAlignVertical: 'center',
                        }}
                      >
                        {/* Shop for <Text style={{ fontWeight: 'bold', color: R.themes.yellowPetalcolor }}>₹ 10000</Text>  more & grab rewards! */}

                        {item?.msg}
                      </Text>
                    </View>

                    <View
                      style={{
                        alignItems: 'flex-end',
                        marginRight: '4%',
                        paddingTop: Platform.OS === 'ios' ? '4%' : '3%',
                        flex: 0.5,
                      }}
                    >
                      <View style={{alignItems: 'center'}}>
                        <Text
                          adjustsFontSizeToFit
                          numberOfLines={1}
                          style={{
                            fontFamily: R.fonts.primaryBold,
                            fontSize: horizontalScale(18),
                            fontWeight: 'bold',
                            color: R.themes.accountTextColour,
                            textAlign: 'right',
                          }}
                        >
                          {item?.total_InvAmount1}
                        </Text>
                      </View>
                      {item.RemarkNew != 'HappynessCorner' && (
                        <View>
                          <Text
                            style={{
                              fontFamily: R.fonts.primaryRegular,
                              fontSize: 15,
                              fontWeight: '400',
                              color: R.themes.accountTextColour,
                            }}
                          >
                            {/* Monthly Spends */}
                            {item?.Remark}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {item.RemarkNew != 'HappynessCorner' && (
                    <View style={{marginHorizontal: '5%', marginBottom: '1%'}}>
                      <CustomSlider
                        value={item?.Percentage}
                        min={0}
                        max={100}
                      />
                    </View>
                  )}
                </View>
              ) : (
                /* ///////////////////////////  Special Rewards ///////////////// */
                <View style={{flexDirection: 'row', paddingVertical: '2%'}}>
                  <View
                    style={{
                      width: '65%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginHorizontal: '2%',
                    }}
                  >
                    <View>
                      <Image
                        resizeMode="contain"
                        source={R.images.SpecialRewardImg}
                        style={{
                          alignSelf: 'center',
                        }}
                      />
                    </View>
                    <View>
                      <Text style={styles.SpecialcardTitle}>
                        {item?.special_Remark}
                      </Text>
                      <Text style={styles.cardSubtitle}>{item?.msg}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingBottom: '2%',

                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}
                  >
                    <ClamiBtn />
                  </View>
                </View>
              )}
            </View>
          ) : (
            /* ///////////////////////////  Daily Spends ///////////////// */
            (setShowDailySpends(true),
            // settodaysSpendText(item?.['lpd.lptpd_Remark']),
            // settodaysAmount(item?.['total_InvAmount1']),
            // settodaysSubText(item?.msg),
            settodaysSpendItem(item),
            null)
          )}
        </TouchableOpacity>
      </View>
    );
  }

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
  function FooterNote() {
    return (
      <View
        style={[
          styles.linergradientwrapper,
          {
            marginTop: 20,
            width:
              authState?.userToken == null
                ? dimensions.wp(95)
                : dimensions.wp(92),
          },
        ]}
      >
        <View style={styles.linergradientinner}>
          <Image source={R.images.Infoicon} style={styles.infoicon} />

          <Text style={styles.cardSubtitleFooter}>
            Want to check bill status?{' '}
            <TouchableOpacity
              onPress={() => {
                CTA_firebaseAnalytics(
                  'Go_to_bill_history_Clicked',
                  'ShopAndWin',
                  authState?.userToken,
                  authState?.userId,
                  authState?.mallDetails?.oko_Row_Desc,
                )
                  .then((res) => {})
                  .catch((e) => {});

                navigation.navigate('DrawerNavigation', {
                  screen: 'TopTabNavigation',
                });
              }}
            >
              <Text style={styles.footermaskSubtext}>Go to bill history</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* </ImageBackground> */}
      </View>
    );
  }
  const setMall_Details = async (item) => {
    CTA_firebaseAnalytics(
      'Mall_Explore',
      'ShopAndWin',
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

  return (
    <>
      {ShowLoader ? (
        <LoaderView />
      ) : (
        <ScrollView>
          <View
            style={[
              styles.mainContainer,
              {backgroundColor: R.colors.transparentWhite},
            ]}
          >
            <View
              style={{
                backgroundColor: 'white',
                borderBottomStartRadius: 30,
                borderBottomEndRadius: 30,
                // Shadow for iOS
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 10, // Moves shadow to bottom
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,

                // Shadow for Android
                elevation: 10,

                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  marginLeft: '4%',
                  marginTop: '5%',
                  flexDirection: 'row',
                }}
              >
                <View style={{flex: 0.6}}>
                  <Text
                    style={[
                      styles.titleText,
                      {fontSize: 26, color: R.colors.primaryBrand2},
                    ]}
                    numberOfLines={1}
                  >
                    Welcome, {authState?.userObject?.fullName}!
                  </Text>
                  <View style={{}}>
                    <Text
                      style={[
                        styles.subText,
                        {
                          color: R.colors.primaryBrand2,
                          fontSize: R.dimensions.wp('3.8%'),
                          fontWeight: '100',
                        },
                      ]}
                      numberOfLines={1}
                    >
                      You have selected
                    </Text>
                  </View>
                  {/* <Text style={[styles.subText,{color:R.colors.primaryBrand2,fontSize:12,marginTop:20}]} numberOfLines={1}>Mall name </Text> */}
                  <View
                    activeOpacity={0.5}
                    // onPress={() => setshowmultiplemallDemo(true)}
                    style={{
                      marginVertical: '1.5%',
                      marginRight: '1.5%',
                      flex: 0.7,
                      alignItems: 'flex-start',
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        width: '70%',
                      }}
                    >
                      <Image
                        source={R.images.LocationPin}
                        style={{
                          tintColor: R.themes.darkHeaderColor,
                          width: R.dimensions.wp(4),
                        }}
                        resizeMode="contain"
                      />

                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: R.dimensions.wp('3.3%'),
                          fontFamily: R.fonts.primaryBold,
                          color: R.themes.darkHeaderColor,
                          fontWeight: '500',
                          paddingStart: '1.5%',
                        }}
                      >
                        {authState?.mallDetails?.oko_Row_Desc}
                        {/* {authState?.mallDetails?.branch_City_Name} */}
                      </Text>

                      {/* <Image
                      source={R.images.BottomArrow}
                      style={{
                        tintColor: R.themes.darkHeaderColor,
                        marginStart: '2%',
                        width: R.dimensions.wp(2.5),
                        height: R.dimensions.hp(1.5),
                      }}
                      resizeMode="contain"
                    /> */}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    alignItems: 'flex-end',
                    flex: 0.4,
                    marginTop: '5%',
                  }}
                >
                  <Image
                    resizeMode="cover"
                    source={R.images.rewards_hand_gift}
                    style={{
                      height: R.dimensions.wp('50%'),
                      width: R.dimensions.wp('54%'),
                    }}
                  />
                </View>
              </View>
            </View>
            {ShowDailySpends == true && (
              <TouchableOpacity
                style={{marginTop: -20, marginHorizontal: '5%'}}
                onPress={() => {
                  CTA_firebaseAnalytics(
                    'todays spend_card',
                    'ShopAndWin',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                    '',
                    '',
                  )
                    .then((res) => {})
                    .catch((e) => {});
                  //console.log("slabview SlabPromo ",todaysSpendItem.promo_code),
                  navigation.navigate('RewardsDetail', {
                    SlabName: todaysSpendItem?.RemarkNew,
                    SlabDName: todaysSpendItem?.Remark,
                    SlabPromo: todaysSpendItem?.promo_code,
                    slabData: todaysSpendItem,
                  });
                }}
              >
                <LinearGradient
                  colors={['#651D60', '#BD44C5']}
                  start={{x: 0, y: -0.2}}
                  end={{x: 1, y: 1}}
                  locations={[0, 0.9]}
                  style={styles.todaysSpendCardContainer}
                >
                  <View style={{marginHorizontal: '5%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontFamily: R.fonts.primaryBold,
                          fontSize: R.dimensions.hp('1.8%'),
                          color: R.themes.backgroundColor,
                          paddingRight: '2%',
                          marginTop: '2%',
                        }}
                      >
                        {todaysSpendItem?.Remark}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',

                        //width: 320,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontFamily: R.fonts.primaryBold,
                            fontSize: 28,
                            fontWeight: 'bold',
                            color: R.themes.backgroundColor,
                            paddingRight: '2%',
                            marginTop: '2%',
                          }}
                        >
                          {todaysSpendItem?.total_InvAmount1}
                        </Text>
                      </View>
                      <View style={{}}>
                        <ClamiBtn />
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontFamily: R.fonts.primaryBold,
                          fontSize: 12,
                          color: R.themes.backgroundColor,
                          paddingRight: '2%',
                          marginVertical: '2%',
                        }}
                      >
                        {/* Shop for <Text style={{ fontWeight: 'bold', color: R.themes.yellowPetalcolor }}>₹ 10000</Text>  more & grab rewards! */}
                        {todaysSpendItem?.msg}
                      </Text>
                      {/* <Image
                        source={R.images.NexusLogo}
                        style={styles.coinImage}
                        resizeMode="contain"
                      /> */}
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
            <View style={{}}>
              <FlatList
                style={{}}
                data={slabData}
                renderItem={({item, index}) => (
                  <RenderSlabList item={item} index={index} />
                )}
              />
            </View>
            <FooterNote />
          </View>
        </ScrollView>
      )}
    </>
  );
};
