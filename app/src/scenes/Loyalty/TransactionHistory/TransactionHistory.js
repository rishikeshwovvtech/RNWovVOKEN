import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  BackHandler,
  Modal,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import moment from 'moment';
//local import
import R from '../../../R';
import {RootView, BackHeader} from '../../../components/index';
import styles from './TransactionHistoryStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {AUTH_BASE_URL, TENANT_ID} from '../../../utils/Constants';
import {horizontalScale} from '../../../../res/scale';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {Dropdown} from 'react-native-element-dropdown';
import {dimensions} from '../../../../res/dimensions';
import LinearGradient from 'react-native-linear-gradient';

import CalendarPicker from 'react-native-calendar-picker';

import {AnimatedCircularProgress} from 'react-native-circular-progress';
import SubHeader from '../../../components/SubHeader';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';

export const TransactionHistory = ({navigation}) => {
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowLoader] = useState(false);
  const [transactionhistoryData, settransactionHistoryData] = useState(false);
  const [MySpends_List, setMySpends_List] = useState(false);
  const [MyRewards_List, setMyRewards_List] = useState(false);
  const [IsActiveTabMySpends, setIsActiveTabMySpends] = useState(false);
  const [IsActiveTabMyRewards, setIsActiveTabMyRewards] = useState(false);
  const [dropdownselectedValue, setdropdownselectedValue] = useState(null);
  //calender

  const [showCalenderBar, setshowCalenderBar] = useState(false);
  const [selectedStartDate, setselectedStartDate] = useState(null);
  const [selectedEndDate, setselectedEndDate] = useState(null);

  const [Dailytab, setDailytab] = useState('0');
  const [Monthlytab, setMonthlytab] = useState('0');
  const [Specialrewardstab, setSpecialrewardstab] = useState('0');
  const [Yearlytab, setYearlytab] = useState('0');

  const [items] = useState([
    {label: 'Last 10 Transactions', value: 'Last 10 Transactions'},
    {label: 'Current Month', value: 'Current Month'},
    {label: 'Current Year', value: 'Current Year'},
    {label: 'Custom', value: 'Custom'},
  ]);

  ///////////////////// useFocusEffect to call api functions //////////////

  useEffect(() => {
    setshowCalenderBar(false);
    setIsActiveTabMyRewards(false);
    setIsActiveTabMySpends(true);
  }, [authState?.mallDetails]);

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics(
        'Transaction_History',
        authState?.userToken,
        authState?.userId,
      )
        .then((res) => {})
        .catch((e) => {});
      setdropdownselectedValue(items[0].value);
      setshowCalenderBar(false);
      apiTransactionhistory('1', null, null);

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [authState?.mallDetails?.oko_Row_Desc]),
  );

  /////////////////////////API Call for transactionhistory/////////////////////////
  const apiTransactionhistory = (remark, startDate, endDate) => {
    var data = JSON.stringify({
      branch_Code: authState?.mallDetails?.oko_Row_Code,
      party_Code: (authState.PartyCode || authState.partyCode).toString(),
      remark: remark,
      start_Date: startDate,
      end_Date: endDate,
      pageUrl: 'TransactionHistory',
    });

    var config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/JRConversion/TransactionHistory?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: authState.userToken,
        userid: authState.userId,
        'Content-Type': 'application/json',
        pageUrl: 'TransactionHistory',
        event: 'TransactionHistoryScreen',
        action: 'onLoadTransactions',
      },
      data: data,
    };
    setShowLoader(true);
    //  console.log(
    //       '🚀 ~ file: TransactionHistory.js:116 ~ config:',
    //       config,
    //     );
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        // console.log(
        //   '🚀 ~ file: TransactionHistory.js:116 ~ response:',
        //   response,
        // );
        setShowLoader(false);
        // console.log(
        //   '🚀 ~ file: TransactionHistory.js:122 ~ response:',
        //   response?.data,
        // );

        // console.log(
        //   '🚀 ~ file: TransactionHistory.js:127 ~ response:',
        //   response?.data?.data,
        // );
        settransactionHistoryData(response?.data?.data);

        setDailytab(response?.data?.data?.Dailytab);
        setMonthlytab(response?.data?.data?.Monthlytab);
        setYearlytab(response?.data?.data?.Yearlytab);
        setSpecialrewardstab(response?.data?.data?.['Special Rewardstab']);
        if (remark == '1') {
          //console.log("response?.data?.data?.['Special Rewardstab'] ",response?.data?.data?.['Special Rewardstab']);

          setMySpends_List(response?.data?.data?.data);
        } else setMyRewards_List(response?.data?.data?.data);
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  const backAction = () => {
    navigation.goBack();
    setIsActiveTabMyRewards(false);
    setIsActiveTabMySpends(true);
    return true;
  };

  //////////////////////////// All Voucher and Bills list view ///////////////////////////

  const renderList = ({item}) => {
    return (
      <View style={{borderRadius: 6}}>
        {item.brandName != null ? (
          //Vouchers
          <ImageBackground
            style={styles.voucherCardmaskContainer}
            imageStyle={{resizeMode: 'stretch'}}
          >
            <View style={{flexDirection: 'row'}}>
              <View style={styles.voucherTextLeftDetails}>
                <Text style={styles.voucherNumberText}>
                  {item.invoiceNumber}
                </Text>

                <Text style={styles.voucherNumberText}>|</Text>

                <Text style={styles.voucherNumberText}>{item.brandName}</Text>

                <Text style={styles.voucherNumberText}>|</Text>

                <Text style={styles.voucherNumberText}>{item.Date}</Text>
              </View>
            </View>
            <View style={styles.voucherTextRightDetails}>
              <Text style={styles.cardRightText}>
                Invoice Amount: {item.Amount}
              </Text>
              <Text style={[styles.cardRightText, {fontSize: 12}]}>
                Spends Earned: {item.Point}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '2%',
                justifyContent: 'space-between',
              }}
            >
              <View style={styles.dailyMonthlyYearlyView}>
                {Dailytab == '1' ? (
                  <>
                    {item.Daily == 1 ? (
                      <Image
                        source={R.images.circleTick}
                        style={styles.tickImage}
                      ></Image>
                    ) : (
                      <Image
                        source={R.images.circlePurple}
                        style={styles.tickImage}
                      ></Image>
                    )}
                    <Text style={styles.dailyMonthlyYearlyText}>Daily</Text>
                  </>
                ) : null}

                {Monthlytab == '1' ? (
                  <>
                    {item.Monthly == 1 ? (
                      <Image
                        source={R.images.circleTick}
                        style={styles.tickImage}
                      ></Image>
                    ) : (
                      <Image
                        source={R.images.circlePurple}
                        style={styles.tickImage}
                      ></Image>
                    )}
                    <Text style={styles.dailyMonthlyYearlyText}>Monthly</Text>
                  </>
                ) : null}

                {Yearlytab == '1' ? (
                  <>
                    {item.Yearly == 1 ? (
                      <Image
                        source={R.images.circleTick}
                        style={styles.tickImage}
                      ></Image>
                    ) : (
                      <Image
                        source={R.images.circlePurple}
                        style={styles.tickImage}
                      ></Image>
                    )}
                    <Text style={styles.dailyMonthlyYearlyText}>Yearly</Text>
                  </>
                ) : null}
              </View>
              <View>
                <Text style={styles.voucherNumberText}>{item?.mallName}</Text>
              </View>
            </View>
          </ImageBackground>
        ) : (
          //point category update
          <ImageBackground
            style={styles.voucherCardmaskContainer}
            imageStyle={{resizeMode: 'stretch'}}
          >
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.voucherTextLeftDetails,
                  {paddingVertical: '5%', flex: 0.5},
                ]}
              >
                <Text style={styles.voucherNumberText}>
                  {item.PointCategory}
                </Text>
                <Text style={styles.voucherNumberText}>|</Text>

                <Text style={styles.voucherNumberText}>{item.Date}</Text>

                {/**/}
                {/* <Text style={styles.voucherNumberText}>|</Text>

                <Text style={styles.voucherNumberText}>{item.Date}</Text> */}
              </View>

              <View
                style={[
                  styles.pointTextRightDetails,
                  {flex: 0.5, justifyContent: 'flex-end'},
                ]}
              >
                <Text style={[styles.cardRightText, {fontSize: 12}]}>
                  Spends Earned: {item.Amount}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: '2%',
                justifyContent: 'space-between',
              }}
            >
              <View style={styles.dailyMonthlyYearlyView}>
                {Dailytab == '1' ? (
                  <>
                    {item.Daily == 1 ? (
                      <Image
                        source={R.images.circleTick}
                        style={styles.tickImage}
                      ></Image>
                    ) : (
                      <Image
                        source={R.images.circlePurple}
                        style={styles.tickImage}
                      ></Image>
                    )}
                    <Text style={styles.dailyMonthlyYearlyText}>Daily</Text>
                  </>
                ) : null}

                {Monthlytab == '1' ? (
                  <>
                    {item.Monthly == 1 ? (
                      <Image
                        source={R.images.circleTick}
                        style={styles.tickImage}
                      ></Image>
                    ) : (
                      <Image
                        source={R.images.circlePurple}
                        style={styles.tickImage}
                      ></Image>
                    )}

                    <Text style={styles.dailyMonthlyYearlyText}>Monthly</Text>
                  </>
                ) : null}
                {Yearlytab == '1' ? (
                  <>
                    {item.Yearly == 1 ? (
                      <Image
                        source={R.images.circleTick}
                        style={styles.tickImage}
                      ></Image>
                    ) : (
                      <Image
                        source={R.images.circlePurple}
                        style={styles.tickImage}
                      ></Image>
                    )}
                    <Text style={styles.dailyMonthlyYearlyText}>Yearly</Text>
                  </>
                ) : null}
              </View>

              <View>
                <Text style={styles.voucherNumberText}>{item?.mallName}</Text>
              </View>
            </View>
          </ImageBackground>
        )}
      </View>
    );
  };

  ///////////////////////// All my rewards///////////////////////////////
  const renderRewards = ({item}) => {
    return (
      item?.titleCategory && (
        <View style={{borderRadius: 6}}>
          <ImageBackground
            source={R.images.vouchercardmask}
            style={[
              styles.rewardCardmaskContainer,
              {opacity: item.Status == 'Expired' ? 0.8 : 1},
            ]}
            imageStyle={{resizeMode: 'stretch'}}
            //blurRadius={item.Status == 'Redeem'?90:0}
          >
            <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
              <ImageBackground
                source={R.images.badge}
                resizeMode={'stretch'}
                style={{
                  width: 70,
                  height: item?.titleCategory?.split(' ').length > 1 ? 30 : 20,
                  top: 0,
                  paddingLeft: '2%',

                  justifyContent: 'center',
                }}
                tintColor={
                  item?.titleCategory == 'Daily'
                    ? '#F6A201'
                    : item?.titleCategory == 'Monthly'
                    ? '#F18101'
                    : item?.titleCategory == 'Yearly'
                    ? '#E6006C'
                    : '#CD44B7'
                }
              >
                <Text
                  style={{
                    color: R.themes.backgroundColor,
                    fontSize: 10,
                  }}
                >
                  {item?.titleCategory}
                </Text>
              </ImageBackground>

              <Text style={[styles.rewardNumberText, {marginHorizontal: '5%'}]}>
                {item.Date1}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={[styles.rewardTextLeftDetails, {marginStart: '4%'}]}>
                <Text style={styles.rewardNumberText}>
                  {item?.['ld.loyalty_type'] == 'PARKING' ||
                  item?.['ld.loyalty_type'] == 'FIRST SIGN-UP GIFT'
                    ? 'First Sign-Up Reward'
                    : item.titleCategory == 'Special Rewards' &&
                      item.voucherCategory == 'Welcome Back Reward'
                    ? 'First Sign-Up Reward'
                    : item.voucherCategory}
                </Text>

                <Text style={styles.rewardNumberText}>|</Text>

                <Text style={styles.rewardNumberText}>
                  {item.voucherCategory == 'GIFT'
                    ? item.voucherTitle
                    : item.brandName}
                </Text>
              </View>

              <View
                style={[
                  styles.rewardTextRightDetails,
                  //{ marginTop:item.Status == 'Claimed'?"5%":"0%"}
                  {marginTop: '3%'},
                ]}
              >
                <Text
                  style={[
                    styles.cardRightText,
                    {
                      fontSize: 12,
                      fontWeight: '500',

                      color: R.themes.backgroundColor,
                    },
                  ]}
                >
                  {item.Amount1}
                </Text>
              </View>

              <View style={styles.claimedRedeemedView}>
                {item.Status == 'Expired' ? (
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      marginTop: '20%',
                      marginBottom: '5%',
                    }}
                  >
                    <Text style={styles.claimedRedeemText}>Expired</Text>
                  </View>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Image
                        source={R.images.circleTick}
                        style={styles.tickImage}
                      ></Image>

                      <Text style={styles.claimedRedeemText}>Claimed</Text>
                    </View>
                    <Image
                      source={R.images.arrow_right}
                      style={[
                        styles.arrow_right,
                        {transform: [{rotate: '90deg'}]},
                      ]}
                    ></Image>
                    <View style={{flexDirection: 'row'}}>
                      {item.Status == 'Redeem' ? (
                        <Image
                          source={R.images.circleTick}
                          style={styles.tickImage}
                        ></Image>
                      ) : (
                        <Image
                          source={R.images.circlePurple}
                          style={styles.tickImage}
                        ></Image>
                      )}

                      <Text style={styles.claimedRedeemText}>Collected</Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
      )
    );
  };

  ///////////////////////// Main Return VIew ////////////////////////////////

  function LoaderView() {
    return (
      <RootView>
        <View
          style={{
            animationType: 'fade',
            transparent: true,
            justifyContent: 'center',
            alignItems: 'center',
            height: R.dimensions.hp('55%'),
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
            /> */}
            {/* <Text
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
      </RootView>
    );
  }
  ///////////////////////////My spends and my rewards tabs////////////////////////
  function TabsDesign() {
    return (
      <View style={[styles.tabBox, styles.flexBox, {paddingTop: 0}]}>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',

            margin: '5%',
            borderWidth: 1,

            //   borderTopColor:R.themes.boxBackgroundColour,
            //   borderBottomColor:R.themes.boxBackgroundColour,
            borderRadius: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              CTA_firebaseAnalytics(
                'MySpends_tab',
                'Transaction_History',
                authState?.userToken,
                authState?.userId,
                authState?.mallDetails?.oko_Row_Desc,
              )
                .then((res) => {})
                .catch((e) => {});
              setIsActiveTabMySpends(true), setIsActiveTabMyRewards(false);
              apiTransactionhistory('1', null, null);
            }}
            style={{
              flex: 0.5,
              backgroundColor: IsActiveTabMySpends
                ? R.themes.boxBackgroundColour
                : R.themes.backgroundColor,
              borderTopRightRadius: IsActiveTabMySpends ? 50 : 0,
              borderBottomRightRadius: IsActiveTabMySpends ? 50 : 0,

              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
              alignItems: 'center',
              padding: 12,

              borderRightWidth: 0,
              flexDirection: 'row',

              // borderColor:R.themes.boxBackgroundColour,

              //           backgroundColor: "#751f71",
              // shadowColor: "#000",
              // shadowOffset: { width: 0, height: 50 },
              // shadowOpacity: 0.2,
              // shadowRadius: 4,
            }}
          >
            <Image
              source={R.images.myspends}
              resizeMode="contain"
              style={{
                height: 14,
                tintColor: IsActiveTabMySpends ? '#FFFFFF' : '#5B215F',
              }}
            />

            <Text
              style={{
                color: IsActiveTabMySpends ? '#FFFFFF' : '#1C2324',
                fontFamily: R.fonts.primaryMedium,
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              My Spends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              CTA_firebaseAnalytics(
                'MyRewards_tab',
                'Transaction_History',
                authState?.userToken,
                authState?.userId,
                authState?.mallDetails?.oko_Row_Desc,
              )
                .then((res) => {})
                .catch((e) => {});
              setIsActiveTabMySpends(false),
                setIsActiveTabMyRewards(true),
                apiTransactionhistory('2', null, null);
            }}
            style={{
              flex: 0.5,
              backgroundColor: IsActiveTabMyRewards
                ? R.themes.boxBackgroundColour
                : R.themes.backgroundColor,
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              //borderWidth:1,
              borderTopLeftRadius: IsActiveTabMyRewards ? 50 : 0,
              borderBottomLeftRadius: IsActiveTabMyRewards ? 50 : 0,
              borderColor: R.themes.boxBackgroundColour,
              alignItems: 'center',
              padding: 12,
              borderLeftWidth: 0,
              flexDirection: 'row',
            }}
          >
            <Image
              source={R.images.myrewards}
              resizeMode="contain"
              style={{
                height: 20,
                tintColor: IsActiveTabMyRewards ? '#FFFFFF' : '#5B215F',
              }}
            />
            <Text
              style={{
                color: IsActiveTabMyRewards ? '#FFFFFF' : '#1C2324',
                fontFamily: R.fonts.primaryMedium,
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              My Rewards
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function MonthlyAndYearlyCircularDisplay() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <TouchableOpacity
          style={[styles.piecontainer, {marginTop: 20, flex: 0.5}]}
        >
          <AnimatedCircularProgress
            size={120}
            width={10}
            backgroundWidth={12}
            fill={transactionhistoryData?.MonthlyPoint}
            tintColor="#45C9A5"
            rotation={-120}
            arcSweepAngle={240}
            backgroundColor="#D9D9D9"
            lineCap="round"
            duration={700}
          >
            {(fill) => (
              <>
                <ImageBackground
                  style={{width: 50, height: 50, marginTop: '5%'}}
                  resizeMode={'cover'}
                  source={R.images.monthlygift}
                ></ImageBackground>
                <Text style={{alignSelf: 'center', fontWeight: '700'}}>
                  {transactionhistoryData?.MonthlyPoint}%
                </Text>

                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 10,
                    fontWeight: '700',
                  }}
                >
                  {' '}
                  {moment().utcOffset('+05:30').format('MMMM')}
                </Text>
              </>
            )}
          </AnimatedCircularProgress>
        </TouchableOpacity> */}

        <TouchableOpacity style={[styles.piecontainer, {flex: 0.5}]}>
          <AnimatedCircularProgress
            size={120}
            width={10}
            fill={transactionhistoryData?.Yearly}
            tintColor="#45C9A5"
            rotation={-120}
            arcSweepAngle={240}
            backgroundColor="#D9D9D9"
            lineCap="round"
          >
            {(fill) => (
              <>
                <ImageBackground
                  style={{width: 50, height: 50}}
                  resizeMode={'cover'}
                  source={R.images.yearlygift}
                ></ImageBackground>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: R.themes.darkButtonColor,
                    fontWeight: '700',
                  }}
                >
                  {transactionhistoryData?.Yearly}%
                </Text>

                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 14,
                    color: R.themes.darkButtonColor,
                    fontWeight: '700',
                  }}
                >
                  {' '}
                  {moment().utcOffset('+05:30').format('YYYY')}
                </Text>
              </>
            )}
          </AnimatedCircularProgress>
        </TouchableOpacity>
      </View>
    );
  }

  function SelectOptionDesign() {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.dropdownContainer, {flex: 1}]}>
          <Text style={styles.pleaseselecttext}>
            Please select the option to view your spends.
          </Text>

          <Dropdown
            style={[styles.dropdown]}
            selectedStyle={{backgroundColor: R.themes.accountTextColour}}
            selectedTextStyle={styles.selecteddropdownText}
            containerStyle={styles.dropdownListStyle}
            itemContainerStyle={styles.itemListStyle}
            itemTextStyle={styles.dropdownText}
            iconStyle={styles.iconStyle}
            activeColor={R.themes.backgroundColor}
            data={items}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={dropdownselectedValue}
            onChange={(item) => {
              setdropdownselectedValue(item.value);

              {
                item.label == 'Custom'
                  ? setshowCalenderBar(true)
                  : setshowCalenderBar(false);

                {
                  item.label == 'Current Month'
                    ? apiTransactionhistory(
                        '1',
                        moment().startOf('month').format('YYYY-MM-DD'),

                        moment().endOf('month').format('YYYY-MM-DD'),
                      )
                    : item.label == 'Current Year'
                    ? apiTransactionhistory(
                        '1',
                        moment().startOf('year').format('YYYY-MM-DD'),

                        moment().endOf('year').format('YYYY-MM-DD'),
                      )
                    : apiTransactionhistory('1', null, null);
                }
              }
            }}
            renderItem={(item) => {
              return (
                <View style={styles.item}>
                  <Text
                    style={
                      dropdownselectedValue == item.value
                        ? styles.selecteditemdropdownText
                        : styles.dropdownText
                    }
                  >
                    {item.label}
                  </Text>
                  {item.value == 'Custom' ? (
                    <Image
                      source={R.images.customcalender}
                      style={{width: 14, height: 14}}
                      resizeMode={'contain'}
                      tintColor={R.themes.accountTextColour}
                    />
                  ) : dropdownselectedValue == item.value ? (
                    <Icon
                      name="ri-check-fill"
                      size="22"
                      color={R.themes.accountTextColour}
                    />
                  ) : null}
                </View>
              );
            }}
            renderRightIcon={() => (
              <Image source={R.images.DownArrow} style={styles.downicon} />
            )}
          />
        </View>
      </View>
    );
  }

  function TransactionListDesign() {
    return (
      <View style={{paddingVertical: '2%'}}>
        <FlatList
          data={IsActiveTabMySpends ? MySpends_List : MyRewards_List}
          renderItem={IsActiveTabMySpends ? renderList : renderRewards}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  function FooterNote() {
    return (
      <View
        style={[
          styles.linergradientwrapper,
          {
            bottom: '0.2%',
            width:
              authState?.userToken == null
                ? dimensions.wp(95)
                : dimensions.wp(92),
          },
        ]}
      >
        <LinearGradient
          colors={[R.themes.backgroundColor, R.themes.backgroundColor]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          locations={[0, 0.0605, 1]}
        >
          <View style={styles.linergradientinner}>
            <Image source={R.images.Infoicon} style={styles.infoicon} />
            {authState.userToken != null ? (
              <Text style={styles.cardSubtitleFooter}>
                Want to check bill status?{' '}
                <TouchableOpacity
                  onPress={() => {
                    CTA_firebaseAnalytics(
                      'Go_to_bill_history_Clicked',
                      'Transaction_History',
                      authState?.userToken,
                      authState?.userId,
                      authState?.mallDetails?.oko_Row_Desc,
                    )
                      .then((res) => {})
                      .catch((e) => {});

                    navigation.navigate('TopTabNavigation');
                  }}
                >
                  <Text style={styles.footermaskSubtext}>
                    Go to bill history
                  </Text>
                </TouchableOpacity>
              </Text>
            ) : (
              <Text style={styles.cardSubtitleFooter}>
                Didn't earn a reward today? Don’t be sad , we have added your
                spends and you are still in the race to earn exciting monthly
                and yearly rewards. Keep shopping with Nexus Malls for
                #HarDinKuchNaya.{' '}
              </Text>
            )}
          </View>
        </LinearGradient>
        {/* </ImageBackground> */}
      </View>
    );
  }

  async function onDateChange(date, type) {
    if (type === 'END_DATE') {
      setselectedEndDate(date);
    } else {
      setselectedStartDate(date);

      setselectedEndDate(null);
    }
  }

  return (
    <>
      <BackHeader
        //  extraStyle={{fontSize:13}}
        navigation={navigation}
        showRightButton={false}
        customOnPress={backAction}
      />
      <SubHeader title={'Transaction History'} />
      <RootView>
        <View>
          <ScrollView>
            {ShowLoader ? (
              <LoaderView />
            ) : (
              <View style={styles.mainContainer}>
                {/* ************************** DAILY YEARLY MONTHLY ************************** */}

                <TabsDesign />

                {/* ************************** Mall and Last 10 transaction+ calender design **************************  */}
                {IsActiveTabMyRewards ? null : (
                  <MonthlyAndYearlyCircularDisplay />
                )}

                {IsActiveTabMyRewards ? null : <SelectOptionDesign />}

                {/* ************************** Calender Display **************************  */}

                {showCalenderBar && !IsActiveTabMyRewards ? (
                  <Modal
                    transparent
                    animationType="fade"
                    visible={showCalenderBar}
                    onRequestClose={() => {}}
                  >
                    <View style={styles.contentContainer}>
                      <View style={styles.content}>
                        {/* <View style={styles.fromtoContainer}>
                          <View style={styles.yearmonth}>
                            <Text
                              style={{
                                fontFamily: R.fonts.primaryBold,
                                fontWeight: '500',
                                fontSize: horizontalScale(14),
                                color: '#FFFFFF',
                                paddingTop: 10,
                              }}
                            >
                              From
                            </Text>
                            <Text
                              style={{
                                fontFamily: R.fonts.primaryBold,
                                fontWeight: '500',
                                fontSize: horizontalScale(16),
                                color: '#FFFFFF',
                                paddingTop: 20,
                              }}
                            >
                              {selectedStartDate == null
                                ? '----'
                                : moment(selectedStartDate).format('YYYY')}
                            </Text>
                            <Text
                              style={{
                                fontFamily: R.fonts.primaryBold,

                                fontWeight: '600',
                                fontSize: horizontalScale(18),
                                color: '#FFFFFF',
                                paddingVertical: 10,
                              }}
                            >
                              {selectedStartDate == null
                                ? '----'
                                : moment(selectedStartDate).format(
                                    'ddd, MMM DD',
                                  )}
                            </Text>
                          </View>
                          <View style={styles.yearmonth}>
                            <Text
                              style={{
                                fontFamily: R.fonts.primaryBold,
                                fontWeight: '500',
                                fontSize: horizontalScale(14),
                                color: '#FFFFFF',
                                paddingTop: 10,
                              }}
                            >
                              To
                            </Text>
                            <Text
                              style={{
                                fontFamily: R.fonts.primaryBold,
                                fontWeight: '500',
                                fontSize: horizontalScale(16),
                                color: '#FFFFFF',
                                paddingTop: 20,
                              }}
                            >
                              {selectedEndDate == null
                                ? '----'
                                : moment(selectedEndDate).format('YYYY')}
                            </Text>
                            <Text
                              style={{
                                fontFamily: R.fonts.primaryBold,

                                fontWeight: '600',
                                fontSize: horizontalScale(18),
                                color: '#FFFFFF',
                                paddingVertical: 10,
                              }}
                            >
                              {selectedEndDate == null
                                ? '----'
                                : moment(selectedEndDate).format('ddd, MMM DD')}
                            </Text>
                          </View>
                        </View> */}
                        <View style={styles.calenderView}>
                          <CalendarPicker
                            startFromMonday={false}
                            allowRangeSelection={true}
                            maxDate={moment()}
                            minDate={moment('01-01-1995', 'DD-MM-YYYY')}
                            weekdays={['S', 'M', 'T', 'W', 'TH', 'F', 'S']}
                            todayBackgroundColor={
                              R.themes.calenderselectedColour
                            }
                            selectedDayColor={R.themes.borderColorlight}
                            selectedDayTextColor={R.themes.backgroundColor}
                            maxRangeDuration={30}
                            onDateChange={onDateChange}
                            textStyle={styles.calenderDate}
                            monthTitleStyle={styles.calenderMonthYear}
                            yearTitleStyle={styles.calenderMonthYear}
                            previousComponent={
                              <Image
                                source={R.images.LeftArrow}
                                style={styles.downicon}
                              ></Image>
                            }
                            nextComponent={
                              <Image
                                source={R.images.RightArrow_calender}
                                style={[styles.downicon]}
                              ></Image>
                            }
                          />
                        </View>

                        <View style={styles.cancelOkView}>
                          <TouchableOpacity
                            style={{paddingHorizontal: 15}}
                            onPress={() => {
                              setshowCalenderBar(false);
                              setdropdownselectedValue(items[0].value);
                              apiTransactionhistory('1', null, null);
                            }}
                          >
                            <Text
                              style={{
                                color: 'white',
                                fontSize: horizontalScale(12),
                                fontFamily: R.fonts.primaryRegular,
                                fontWeight: '400',
                              }}
                            >
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              selectedEndDate == null
                                ? alert('Select End date')
                                : (setshowCalenderBar(false),
                                  setdropdownselectedValue(items[3].value),
                                  apiTransactionhistory(
                                    '1',
                                    selectedStartDate.format('YYYY-MM-DD'),
                                    selectedEndDate.format('YYYY-MM-DD'),
                                  ));
                            }}
                          >
                            <Text
                              style={{
                                color: 'white',
                                fontSize: horizontalScale(12),
                                fontFamily: R.fonts.primaryRegular,
                                fontWeight: '600',
                              }}
                            >
                              Ok
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                ) : null}

                <TransactionListDesign />

                {/* ************************** empty data **************************  */}

                {/* <>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: '30%',
                      paddingHorizontal: '15%',
                    }}>
                    <Image
                      source={R.images.vouchernotavailableimage}
                      style={{
                        height: 80,
                        width: 80,
                        marginVertical: '5%',
                        tintColor: R.themes.accountTextColour
                      }}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 15,
                        color: R.colors.coolGrey,
                        fontFamily: R.fonts.primaryRegular,
                        paddingVertical: '3%',
                      }}>
                      No data !!{' '}
                    </Text>
                  </View>
                </> */}
              </View>
            )}
            <FooterNote />
          </ScrollView>
        </View>
      </RootView>
    </>
  );
};
