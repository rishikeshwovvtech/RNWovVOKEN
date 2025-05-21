import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  BackHandler,
  Platform,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
//local import
import R from '../../../R';
import {RootView, BackHeader} from '../../../components/index';
import styles from './RewardsDetailStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {
  AUTH_BASE_URL,
  BASE_URL,
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  TENANT_ID,
  IMAGE_URL,
} from '../../../utils/Constants';
import {horizontalScale} from '../../../../res/scale';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import LinearGradient from 'react-native-linear-gradient';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {useIsFocused} from '@react-navigation/native';
import {SearchInputComponent} from '../../../components/SearchInputComponent';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const Reward_Data = [
  {
    Apicall: 1,
    ActiveTabUnlock: false,
    ActiveTabAvail: true,
    ActiveTabReedemed: false,
    ActiveSlabPromoCode: '',
  },
];

export const RewardsDetail = ({navigation, route}) => {
  const isFocused = useIsFocused();
  // const slabName = route.params.SlabName;
  //let slabPromo = route.params.SlabPromo;
  // const SlabDName = route.params.SlabDName;
  // const slabData = route.params.slabData;

  const [slabName, setSlabName] = useState(route.params?.SlabName || '');
  const [slabPromo, setSlabPromo] = useState(route.params?.SlabPromo || '');
  const [SlabDName, setSlabDName] = useState(route.params?.SlabDName || '');
  const [slabData, setSlabData] = useState(route.params?.slabData || null);

  // console.log(
  //   'ðŸš€ ~ file: RewardsDetail.js:55 ~ RewardsDetail ~ slabData:',
  //   slabData,
  // );

  const [userPoints, setUserPoints] = useState(0);
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowloader] = useState(false);
  const [ShowVoucehrLoader, setShowVoucherloader] = useState(false);
  const [IsActiveTabUnlock, setIsActiveTabUnlock] = useState(false);
  const [IsActiveTabAvail, setIsActiveTabAvail] = useState(false);
  const [IsActiveTabReedemed, setIsActiveTabReedemed] = useState(false);
  const [voucherType, setVoucherType] = useState('');
  const [VoucherStatusId, setVoucherStatusId] = useState(1);
  const [VType, setVType] = useState([]);
  const [VCategoryName, setVCategoryName] = useState('');
  const [AvailableData, setAvailableData] = useState('');
  const [voucherData, setVoucherData] = useState('');
  const [vouchersortedData, setVouchersortedData] = useState('');
  const [selectedVoucherItem, setselectedVoucherItem] = useState('');
  const [receivedInvBillData, setReceivedInvBillData] = useState('');
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false);

  const [checkBoxSelected, setcheckBoxSelected] = useState('Default');
  const [copyBrandList, setCopyBrandList] = useState();

  const [filtercheckBoxSelected, setFiltercheckBoxSelected] = useState('All');

  const [brandCategoryList, setBrandCategorylist] = useState();

  const [brandName, setBrandName] = useState('');
  const [allvoucherData, setAllVoucherData] = useState('');
  const [sortSelected, setSortSelected] = useState('Default');
  const [Malldata, setMalldata] = useState('');
  const [pointsDisplay, setPointsDisplay] = useState(
    slabData?.total_InvAmount1,
  );
  const [points, setPoints] = useState(slabData?.total_InvAmount);
  //console.log("POINTS ",points);

  const openPanel = () => {
    setIsFilterPanelVisible(false);
    setIsPanelVisible(true);
  };

  const closePanel = () => {
    setIsPanelVisible(false);
  };

  const dataSorted = [
    'Default',
    'A - Z Brand name',
    'High - low spends',
    'Low - high spends',
  ];

  const openFilterPanel = () => {
    setIsPanelVisible(false);
    setIsFilterPanelVisible(true);
  };

  const closeFilterPanel = () => {
    setIsFilterPanelVisible(false);
  };

  ///////////////////// useFocusEffect to call api functions //////////////

  useEffect(() => {
    Reward_Data[0].ActiveSlabPromoCode = slabPromo;

    if (!IsActiveTabAvail) {
      apiVouchersCategories(Reward_Data[0].Apicall);
    }

    setIsActiveTabReedemed(false);
    setIsActiveTabAvail(true);
    setIsActiveTabUnlock(false);
    setVoucherStatusId(1);
    Reward_Data[0].ActiveTabAvail = true;
    Reward_Data[0].ActiveTabUnlock = false;
    Reward_Data[0].ActiveTabReedemed = false;
    Reward_Data[0].Apicall = 1;

    return () => {
      setIsActiveTabReedemed(false);
      setIsActiveTabAvail(true);
      setIsActiveTabUnlock(false);
      setVoucherStatusId(1);
      Reward_Data[0].ActiveTabAvail = true;
      Reward_Data[0].ActiveTabUnlock = false;
      Reward_Data[0].ActiveTabReedemed = false;
      Reward_Data[0].Apicall = 1;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      //console.log("Daily monthly yearly ");

      ScreenAnalytics(
        'S&W_' + SlabDName,
        authState?.userToken,
        authState?.userId,
      )
        .then(() => {})
        .catch(() => {});
      // apiGetUserPoints(slabPromo);
      // const reedeem = apiVouchersCategories(Reward_Data[0].Apicall);
      setIsActiveTabAvail(Reward_Data[0].ActiveTabAvail);
      setIsActiveTabUnlock(Reward_Data[0].ActiveTabUnlock);
      setIsActiveTabReedemed(Reward_Data[0].ActiveTabReedemed);

      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
      authState?.userObject?.imageUrl,
      authState?.userObject,
      authState?.parkingDetails,
      isFocused,
    ]),
  );

  useFocusEffect(
    React.useCallback(() => {
      //console.log("Mall change usefocuseffect");
      Reward_Data[0].ActiveSlabPromoCode = slabPromo;

      //console.log("Reward_Data[0].Apicall ",Reward_Data[0].Apicall);
      if (IsActiveTabAvail) {
        setBrandName('');
        setFiltercheckBoxSelected('All');

        //console.log("slabdatadetails Reward_Data[0].Apicall ",Reward_Data[0].Apicall);

        apiVouchersCategories(Reward_Data[0].Apicall);
      } else if (Reward_Data[0].Apicall === 2) apiVouchers_C_R_Categories(2);
      else if (Reward_Data[0].Apicall === 3) apiVouchers_C_R_Categories(3);
    }, [isFocused]),
  );

  const backAction = () => {
    navigation.goBack();

    setVCategoryName('');
    setVType([]);
    setAvailableData('');
    setVoucherType('');

    setIsActiveTabReedemed(false);
    setIsActiveTabAvail(true);
    setIsActiveTabUnlock(false);
    setVoucherStatusId(1);
    Reward_Data[0].ActiveTabAvail = true;
    Reward_Data[0].ActiveTabUnlock = false;
    Reward_Data[0].ActiveTabReedemed = false;
    Reward_Data[0].Apicall = 1;
    return true;
  };

  const DailyMonthlyYearlySlabs = () => {
    let data = JSON.stringify({
      partyCode: authState.PartyCode || authState.partyCode,
      branchCode: authState?.mallDetails?.oko_Row_Code,
      pageUrl: 'spendCardV1',
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
        event: 'RewardsDetailPage',
        action: 'onLoadRewardsPoints&Messages',
      },
      data: data,
    };
    setShowloader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        //console.log('ðŸš€ ~ file: RewardsDetails.js: ~ response:', response);

        setShowloader(false);

        let slabDetails = response.data.data.Lpt_Promo_Dtl.find(
          (item) => item.RemarkNew === slabName,
        );
        setSlabData(slabDetails);
        setSlabName(slabDetails.RemarkNew);
        setSlabPromo(slabDetails.promo_code);
        setSlabDName(slabDetails.Remark);
        setPointsDisplay(slabDetails?.total_InvAmount1);
        setPoints(slabDetails?.total_InvAmount);
      })
      .catch(function (error) {
        //console.log('ðŸš€ ~ file: RewardsDetails.js: ~ error:', error);
        setShowloader(false);
      });
  };

  //////////////////////// API Call for Available vouchers list /////////////////////////
  const apiGet_Grouping_Vouchers = (Vtype) => {
    setselectedVoucherItem(Vtype);
    //console.log("changed mall malldetails apiGet_Grouping_Vouchers ",authState?.mallDetails);

    let data = JSON.stringify({
      pageUrl: 'FetchGroupingOfVoucherV5',
      entityName: 'Voucher_Book',
      action: 'payload',
      event: 'replaceWithAuth',
      formList: [
        {
          mallCode: authState?.mallDetails?.oko_Row_Code,
          voucherStatus: '1',
          promoCode: Reward_Data[0].ActiveSlabPromoCode,
          voucherType: Vtype,
        },
      ],
    });
    //console.log("response: grouping DATA passed ",data);

    let config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl: 'FetchGroupingOfVoucherv5',
        event: 'RewardsDetailPage',
        action: 'onLoadVouchersList',
      },
      data: data,
    };
    setShowVoucherloader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        // console.log('ðŸš€ ~ response: grouping', response);
        //console.log('ðŸš€ ~ response: grouping', response?.data?.data);

        //console.log('ðŸš€ ~ response: grouping', response?.data?.data?.Response);
        const data = response?.data?.data?.Response.slice().sort(
          (a, b) => a?.voucherPoint - b?.voucherPoint,
        );

        setAllVoucherData(data);

        setVoucherData(data);
        setVouchersortedData(data);
        setCopyBrandList(data);

        const filterCategoryData = Array.from(
          new Set(data.map((item) => item.categoryDesc)),
        );
        setBrandCategorylist([
          'All',
          ...filterCategoryData.filter(
            (category) =>
              category !== undefined &&
              category !== null &&
              category !== '' &&
              category !== 'null',
          ),
        ]);

        setShowVoucherloader(false);
      })
      .catch(function (error) {
        //console.log('ðŸš€ ~ response: grouping error ' , error);
        setShowVoucherloader(false);
      });
  };
  //////////////////////// API Call for Claimed and redeemed vouchers list /////////////////////////
  const apiGet_CR_Vouchers = (Vtype, VName, Vid, from) => {
    let lyl_TypeCode = Vid === 2 ? 90001 : 90002;
    setselectedVoucherItem(Vtype);

    var data = JSON.stringify({
      entityName: 'Shop&win_ListOfVoucher',
      action: 'payload',
      pageUrl: 'ListofVoucherS&W_V2',
      event: 'replaceWithAuth',
      formList: [
        {
          partyCode: authState?.PartyCode || authState.partyCode,
          mallCode: authState?.mallDetails?.oko_Row_Code,
          TransactionCode: lyl_TypeCode,
          Remark: `'${slabData.RemarkNew}'`,
          voucherCode: parseInt(Vtype),
        },
      ],
    });

    var config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl: 'ListofVoucherS&W_V2',
        event: 'RewardsDetailPage',
        action: 'onLoadClaimed&RedeemedVouchers',
      },
      data: data,
    };
    setShowVoucherloader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        console.log('ðŸš€ ~ RewardsDetail.js:385 ~ response:', response);
        //console.log('ðŸš€ ~ file: RewardsDetail.js:416 ~ response:', response);

        //console.log('ðŸš€ ~ file: RewardsDetail.js:416 ~ config:', config);
        // let data = response.data.data.Voucher_Book.sort((a, b) =>
        //   a.brandName.localeCompare(b.brandName),
        // );
        setVoucherData(response.data.data.Response);
        setVouchersortedData(response.data.data.Response);

        setShowVoucherloader(false);
        console.log('ðŸš€ ~ RewardsDetail.js:397 ~ false:', false);
      })
      .catch(function () {
        setShowVoucherloader(false);
      });
  };
  //////////////////////// API Call for vouchers /////////////////////////
  const apiVouchersCategories = async (Vid) => {
    //console.log("apiVouchersCategories");

    //console.log("changed mall malldetails authState?.mallDetails ",authState?.mallDetails);

    var data = JSON.stringify({
      pageUrl: 'GetUniqueVoucherCategoryNew',
      entityName: 'getCategory',
      action: 'payload',
      event: 'replace',
      formList: [
        {
          branch_Code: authState?.mallDetails?.oko_Row_Code,
          voucher_Status_Code: Vid,
          lptpd_Remark: slabName,
        },
      ],
    });
    //console.log("apiVouchersCategories DATA passed ",data);

    var config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl: 'GetUniqueVoucherCategoryNew',
        event: 'RewardsDetailPage',
        action: 'onLoadVoucherCategories',
      },
      data: data,
    };
    setShowloader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        //console.log('ðŸš€ ~ file: RewardsDetail.js:342 ~ response:', response);

        let temp = response?.data?.data?.Voucher_Type_MsT;
        //console.log('ðŸš€ ~ file: response?.data?.data?.Voucher_Type_MsT:', response?.data?.data?.Voucher_Type_MsT);
        const unique1 = [
          ...new Set(temp?.map((item) => item?.voucher_Type_Desc)),
        ];

        setShowloader(false);
        setVCategoryName(temp);

        setVType(unique1);
        //console.log('ðŸš€ ~ file: changed mall RewardsDetail.js:342 ~ temp?.[0]:', temp?.[0]);

        if (unique1.length > 0) {
          apiGet_Grouping_Vouchers(
            temp?.[0]?.voucher_Type_Prifix,
            temp?.[0]?.voucher_Type_Desc,
          );
        }
        setAvailableData(temp?.[0]?.vtm_Available_Info);

        setVoucherType(temp?.[0]?.voucher_Type_Desc);

        DailyMonthlyYearlySlabs();
      })
      .catch(function () {
        setShowloader(false);
      });
  };

  const apiVouchers_C_R_Categories = async (Vid) => {
    let Type_Code = '90001,90003';
    if (Vid != 2) {
      Type_Code = '90002';
    } else {
      Type_Code = '90001,90003';
    }
    var data = JSON.stringify({
      pageUrl: 'GetUniqueVoucherCategoryS&WV2',
      entityName: 'getCategory',
      action: 'payload',
      event: 'replaceWithAuth',
      formList: [
        {
          branch_Code: authState?.mallDetails?.oko_Row_Code,
          lptpd_Remark: `'${slabName}'`,
          party_Code: authState?.PartyCode || authState.partyCode,
          loyalty_Trns_Type_Code: Type_Code,
        },
      ],
    });

    var config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl: 'GetUniqueVoucherCategoryS&WV2',
        event: 'RewardsDetailPage',
        action: 'onLoadClaimed&RedeemedVoucherCategories',
      },
      data: data,
    };
    setShowloader(true);
    fetchApiService(config, authAction, authState)
      .then(function (response) {
        console.log('ðŸš€ ~ file: RewardsDetail.js:403 ~ response:', response);
        let temp = response?.data?.data?.Voucher_Type_MsT;

        const unique1 = [
          ...new Set(temp?.map((item) => item?.voucher_Type_Desc)),
        ];
        setShowloader(false);
        setVCategoryName(temp);
        setVType(unique1);
        if (unique1.length > 0) {
          apiGet_CR_Vouchers(
            temp?.[0]?.voucher_Type_Prifix,
            temp?.[0]?.voucher_Type_Desc.trim(),
            Vid,
            'api call categories',
          );
        }
        Vid == 2
          ? setAvailableData(temp?.[0]?.vtm_Claim_Info)
          : setAvailableData(temp?.[0]?.vtm_Redeem_Info);
        setVoucherType(temp?.[0]?.voucher_Type_Desc.trim());
      })
      .catch(function () {
        setShowloader(false);
      });
  };

  /////////////////// Vouchers categories View /////////////////////////////////

  const setDataandCallVoucherList = (item) => {
    {
      IsActiveTabAvail
        ? (apiGet_Grouping_Vouchers(
            item?.voucher_Type_Prifix,
            item?.voucher_Type_Desc.trim(),
          ),
          setAvailableData(item?.vtm_Available_Info))
        : (apiGet_CR_Vouchers(
            item?.voucher_Type_Prifix,
            item?.voucher_Type_Desc.trim(),
            VoucherStatusId,
            'callvoucherList',
          ),
          VoucherStatusId == 2
            ? setAvailableData(item?.vtm_Claim_Info)
            : setAvailableData(item?.vtm_Redeem_Info));
      setVoucherType(item.voucher_Type_Desc.trim());
    }
  };

  const renderCategoryList = ({item}) => {
    // console.log("Brand or gift image ",`${IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL}/logo/${
    //   item?.vtm_Image
    // }`);

    return item.voucher_Type_Prifix != null ? (
      <View
        style={{
          width: R.dimensions.wp(50),
          paddingVertical: '2%',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            selectedVoucherItem == item.voucher_Type_Prifix
              ? styles.voucher_AfterTouchableView
              : styles.voucher_TouchableView,
            {borderRadius: 5},
          ]}
          // onPress={props.onPress}
          onPress={() => {
            setFiltercheckBoxSelected('All');
            setBrandName('');
            CTA_firebaseAnalytics(
              item.voucher_Type_Desc.trim() + '_tab_Clicked',
              'S&W_' + SlabDName,
              authState?.userToken,
              authState?.userId,
              authState?.mallDetails?.oko_Row_Desc,
            )
              .then(() => {})
              .catch(() => {}),
              setDataandCallVoucherList(item);
          }}
        >
          <Image
            source={{
              uri: `${IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL}/logo/${
                item?.vtm_Image
              }`,
            }}
            // source={item?.icon}
            style={
              selectedVoucherItem == item.voucher_Type_Prifix
                ? [
                    styles.voucher_AfterImageStyle,
                    {
                      resizeMode: 'contain',
                      width: R.dimensions.wp(7),
                      height: R.dimensions.wp(10),
                    },
                  ]
                : [
                    styles.voucher_ImageStyle,
                    {
                      resizeMode: 'contain',
                      width: R.dimensions.wp(7),
                      height: R.dimensions.wp(10),
                    },
                  ]
            }
          />

          <Text
            style={
              selectedVoucherItem == item.voucher_Type_Prifix
                ? [styles.voucher_AfterTextStyle]
                : styles.voucher_TextStyle
            }
          >
            {item.voucher_Type_Desc.trim()}
          </Text>
          {/* )} */}
        </TouchableOpacity>
      </View>
    ) : null;
  };

  //update points
  const updatePoints = (data) => {
    //console.log("updatePoints ",data)

    if (slabName != 'HappynessCorner') {
      if (slabName === 'DailySlab1') {
        // console.log("updatePoints ",data)

        // console.log("updatePoints ",points - parseFloat(data) )

        let currentPoints = points - parseFloat(data);
        //console.log("points display ",currentPoints.toLocaleString("en-IN"));

        setPoints(currentPoints);

        setPointsDisplay('₹ ' + currentPoints.toLocaleString('en-IN'));
        //console.log("points display ",currentPoints.toLocaleString("en-IN"));
      } else {
        //console.log("updatePoints yearly ",data);
        //console.log("updatePoints points ",points);
        //console.log("updatePoints points type ",typeof(points))

        if (data === '0') {
          setPoints(points);

          setPointsDisplay('₹ ' + points.toLocaleString('en-IN'));
        } else {
          setPoints(0);

          setPointsDisplay('');
        }
      }
    }
  };

  //////////////////////////// All Voucher list view ///////////////////////////

  ////////////////////// function to compare current and voucher valid to date ///////////////////////
  function isDateInFuture(targetDate) {
    const currentDate = new Date();

    // Extract day, month, and year
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Note: months are zero-based
    const year = currentDate.getFullYear();

    // Format the date
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    return formattedDate > targetDate;
  }
  const renderList = (item) => {
    //console.log('ðŸš€ ~ file: RewardsDetail.js:567 ~ renderList ~ item:', item);
    const bookID =
      VoucherStatusId == 1 ? item.item?.voucherId : item.item?.voucherCode;

    const dateChecker = isDateInFuture(item.item?.validTo);
    // item.item.validTo;
    'dateChecker', dateChecker;
    return (
      <TouchableOpacity
        onPress={() => {
          item.item.brandName
            ? CTA_firebaseAnalytics(
                'Brand_Voucher',
                'S&W_' + SlabDName,
                authState?.userToken,
                authState?.userId,
                authState?.mallDetails?.oko_Row_Desc,
                item.item.brandName,
                IsActiveTabAvail
                  ? 'Available'
                  : IsActiveTabUnlock
                  ? 'Claimed'
                  : 'Collected',
              )
                .then(() => {})
                .catch(() => {})
            : CTA_firebaseAnalytics(
                'Gift',
                'S&W_' + SlabDName,
                authState?.userToken,
                authState?.userId,
                authState?.mallDetails?.oko_Row_Desc,
                'GIFT_' + item.item.voucherTitle,
                IsActiveTabAvail
                  ? 'Available'
                  : IsActiveTabUnlock
                  ? 'Claimed'
                  : 'Collected',
              )
                .then(() => {})
                .catch(() => {});

          Reward_Data[0].ActiveTabUnlock
            ? !dateChecker &&
              navigation.navigate('VoucherDetails', {
                active_Category_Name: VoucherStatusId == 1 ? true : false,

                dailyMonthlyYearly: slabName,

                voucher_Type_Code: item.item?.voucherType,
                voucher_Point: item.item?.voucherPoint,
                voucher_Amt: item.item?.voucherAmt,
                valid_To: item.item?.validTo,
                brand_Code: item.item?.brandCode,
                voucher_Code: item.item?.voucherCode,
                voucher_book_id: bookID,
                inv_Lpt_Id: receivedInvBillData?.['inv.Id'],
                promo_Code: Reward_Data[0].ActiveSlabPromoCode,
                voucherData: item.item,
                //onGoBack: updatePoints,
              })
            : navigation.navigate('VoucherDetails', {
                dailyMonthlyYearly: slabName,

                active_Category_Name: VoucherStatusId == 1 ? true : false,
                voucher_Type_Code: item.item?.voucherType,
                voucher_Point: item.item?.voucherPoint,
                voucher_Amt: item.item?.voucherAmt,
                valid_To: item.item?.validTo,
                brand_Code: item.item?.brandCode,
                voucher_Code: item.item?.voucherCode,
                voucher_book_id: bookID,
                inv_Lpt_Id: receivedInvBillData?.['inv.Id'],
                promo_Code: Reward_Data[0].ActiveSlabPromoCode,
                voucherData: item.item,
                //onGoBack: updatePoints,
              });
        }}
        style={{
          borderRadius: 6,
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: '5%',
        }}
      >
        {Reward_Data[0].ActiveTabUnlock && dateChecker && (
          <View
            style={{
              width: '90%',
              height: '100%',
              flexDirection: 'row',
              backgroundColor: 'grey',
              padding: '4%',
              opacity: 0.5,
              flex: 1,
              position: 'absolute',
              zIndex: 999,
            }}
          />
        )}
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            backgroundColor: R.themes.backgroundColor,
            padding: '4%',
            borderColor: R.themes.boxBackgroundColour,
            borderWidth: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // justifyContent: 'center',
              //  alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1.5,
                // justifyContent: 'center',
                // alignItems: 'center',
                // width: R.dimensions.wp(14),
                // height: R.dimensions.wp(14),
              }}
            >
              <View
                style={{
                  backgroundColor:
                    item.item?.voucherType === 5001 ||
                    item.item?.voucherType === 6001
                      ? R.themes.boxBackgroundColour
                      : null,
                  //padding: '2%',
                  flex: 1,
                  // width: R.dimensions.wp(14),
                  // height: R.dimensions.wp(14),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
              >
                <Image
                  style={{
                    tintColor:
                      item.item?.voucherType === 3001 &&
                      R.themes.accountTextColour,
                    width:
                      item.item?.voucherType !== 5001 &&
                      item.item?.voucherType !== 6001
                        ? R.dimensions.wp('12%')
                        : R.dimensions.wp('8%'),
                    height:
                      item.item?.voucherType !== 5001 &&
                      item.item?.voucherType !== 6001
                        ? R.dimensions.wp('12%')
                        : R.dimensions.wp('8%'),
                  }}
                  source={
                    item.item?.voucherType === 5001 ||
                    item.item?.voucherType === 6001
                      ? R.images.GiftClamiedVoucher
                      : item.item?.voucherType === 3001
                      ? R.images.CarVoucher
                      : {
                          uri:
                            (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                            item.item?.brandLogo,
                        }
                  }
                  resizeMode={
                    item.item?.voucherType === 5001 ||
                    item.item?.voucherType === 6001
                      ? 'contain'
                      : 'contain'
                  }
                />
              </View>
            </View>

            <View style={{flex: 5, paddingLeft: '2%', flexDirection: 'row'}}>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 3,
                  marginRight: '4%',
                }}
              >
                <View style={{flex: 1.5}}>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      flexWrap: 'wrap',
                      fontSize: R.dimensions.wp('4%'),
                      fontFamily: R.fonts.primaryBold,
                      color: R.themes.boxBackgroundColour,

                      fontWeight: 'bold',
                    }}
                  >
                    {item.item.brandName
                      ? item.item.brandName
                      : item.item.voucherTitle}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[styles.voucher_Remark]}
                  >
                    {item.item.offerRemark}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 3,
                }}
              >
                <View style={{flex: 1, flexDirection: 'column'}}>
                  <View
                    style={{
                      flexGrow: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={R.images.NexusLogo}
                      resizeMode="contain"
                      style={styles.point_Img}
                    />
                    <Text style={styles.voucherText}>
                      {item.item.voucherPoint1}
                    </Text>
                  </View>
                  {Reward_Data[0].ActiveTabAvail && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        flexDirection: 'row',
                        alignContent: 'flex-end',
                        marginLeft: '3%',
                        marginTop: '2%',
                        alignItems: 'center',
                      }}
                    >
                      <View style={[styles.left_count_container, {}]}>
                        <Text style={styles.claim_Text}>Claim</Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1.4,
                          //marginTop: '1.5%',
                          justifyContent: 'flex-end',
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: '2%',
                        }}
                      >
                        <View style={styles.triangle}></View>
                        <View style={styles.left_count_View}>
                          <Text style={styles.left_count_Text}>
                            {item.item.leftCount} left
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>

                <View style={{flex: 1, marginTop: '2%'}}>
                  <Text style={styles.valid_Text}>
                    Valid Till: {item.item.validTo1}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {Reward_Data[0].ActiveTabUnlock && dateChecker && (
          <ImageBackground
            source={R.images.Expiredshopcardmask}
            style={styles.expired_Voucher_Design}
            imageStyle={{
              resizeMode: 'stretch',
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  ///////////////////////////  Reward Page categories handling code /////////////////
  const Change_to_Avail_Rewards_Data = (props) => {
    setVoucherType('');
    if (props === 'avail') {
      setselectedVoucherItem('');
      setIsActiveTabReedemed(false);
      setIsActiveTabAvail(true);
      setIsActiveTabUnlock(false);
      setVoucherStatusId(1);
      setBrandName('');
      setFiltercheckBoxSelected('All');
      apiVouchersCategories(1);

      setVType([]);
      setVCategoryName('');
      setVoucherType('');

      Reward_Data[0].ActiveTabAvail = true;
      Reward_Data[0].ActiveTabUnlock = false;
      Reward_Data[0].ActiveTabReedemed = false;
      Reward_Data[0].Apicall = 1;
    } else if (props === 'unlock') {
      setVoucherData('');
      setVouchersortedData('');
      setVoucherStatusId(2);
      setselectedVoucherItem('');

      setReceivedInvBillData('');
      apiVouchers_C_R_Categories(2);

      setIsActiveTabReedemed(false);
      setIsActiveTabAvail(false);
      setIsActiveTabUnlock(true);

      Reward_Data[0].ActiveTabAvail = false;
      Reward_Data[0].ActiveTabUnlock = true;
      Reward_Data[0].ActiveTabReedemed = false;
      Reward_Data[0].Apicall = 2;
    } else {
      setVoucherData('');
      setVouchersortedData('');
      setselectedVoucherItem('');
      apiVouchers_C_R_Categories(3);

      setReceivedInvBillData('');
      setIsActiveTabReedemed(true);
      setIsActiveTabAvail(false);
      setIsActiveTabUnlock(false);
      setVoucherStatusId(3);

      Reward_Data[0].ActiveTabAvail = false;
      Reward_Data[0].ActiveTabUnlock = false;
      Reward_Data[0].ActiveTabReedemed = true;
      Reward_Data[0].Apicall = 3;
    }
  };

  ///////////////////////// Main Return VIew ////////////////////////////////

  function LoaderView() {
    return (
      <RootView>
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
      </RootView>
    );
  }

  function LoaderWithoutBGDesign() {
    return (
      <View
        style={{
          padding: '5%',
          borderRadius: 8,
          width: horizontalScale(300),
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: '10%',
        }}
      >
        {/* <ActivityIndicator
          size={'large'}
          color={R.themes.boxBackgroundColour}
        /> */}
        <Image source={R.images.loaderNexus} style={{width: 50, height: 50}} />
      </View>
    );
  }
  function ACRDesign() {
    return (
      <View>
        <View style={[styles.flexBox]}>
          <TouchableOpacity
            // disabled={ShowVoucehrLoader}
            activeOpacity={0.5}
            onPress={() => {
              CTA_firebaseAnalytics(
                'Available_Clicked',
                'S&W_' + SlabDName,
                authState?.userToken,
                authState?.userId,
                authState?.mallDetails?.oko_Row_Desc,
              )
                .then(() => {})
                .catch(() => {}),
                Change_to_Avail_Rewards_Data('avail');
            }}
            style={[IsActiveTabAvail ? styles.tabText : styles.tabTextInactive]}
          >
            <Text
              style={IsActiveTabAvail ? styles.heading : styles.headinginactive}
            >
              Available
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // disabled={ShowVoucehrLoader}
            activeOpacity={0.5}
            onPress={() => {
              CTA_firebaseAnalytics(
                'Claimed_Clicked',
                'S&W_' + SlabDName,
                authState?.userToken,
                authState?.userId,
                authState?.mallDetails?.oko_Row_Desc,
              )
                .then(() => {})
                .catch(() => {}),
                Change_to_Avail_Rewards_Data('unlock');
            }}
            style={[
              IsActiveTabUnlock ? styles.tabText : styles.tabTextInactive,
            ]}
          >
            <Text
              style={
                IsActiveTabUnlock ? styles.heading : styles.headinginactive
              }
            >
              Claimed
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            // disabled={ShowVoucehrLoader}
            activeOpacity={0.5}
            onPress={() => {
              CTA_firebaseAnalytics(
                'Collected_Clicked',
                'S&W_' + SlabDName,
                authState?.userToken,
                authState?.userId,
                authState?.mallDetails?.oko_Row_Desc,
              )
                .then(() => {})
                .catch(() => {}),
                Change_to_Avail_Rewards_Data('redeem');
            }}
            style={[
              IsActiveTabReedemed ? styles.tabText : styles.tabTextInactive,
            ]}
          >
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={
                IsActiveTabReedemed ? styles.heading : styles.headinginactive
              }
            >
              Collected
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 2,

            backgroundColor: 'white',
            width: '92%',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  }

  function GenerateCodeDesign() {
    return (
      <View>
        <View style={[styles.generatecode_flexBox]}>
          <View activeOpacity={0.5} style={[styles.tabGenerateCode]}>
            <Text style={styles.headingGenerateCode}>My Reward Code</Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GenerateRewardCode');
              }}
              style={styles.generateCode_container}
            >
              <Text style={styles.generateCode_Text}>Generate code</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            height: 2,

            backgroundColor: 'white',
            width: '92%',
            alignSelf: 'center',
          }}
        />
      </View>
    );
  }

  function CategoryViewDesign() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          marginTop: '2%',
        }}
      >
        <FlatList
          data={VCategoryName}
          numColumns={2}
          renderItem={renderCategoryList}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
        />

        {voucherType != '' && (
          <View
            style={{
              borderRadius: 10,
              flexDirection: 'row',
              marginTop: '2%',
              marginHorizontal: 25,
              paddingHorizontal: 2,
            }}
          >
            <Icon
              name="ri-information-line"
              size="25"
              color={R.themes.accountTextColour}
              style={{marginRight: '2%'}}
            />

            <Text
              style={{
                color: R.themes.accountTextColour,
                fontFamily: R.fonts.primaryBold,
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 12,
                alignSelf: 'center',
              }}
            >
              {AvailableData}
            </Text>
          </View>
        )}
      </View>
    );
  }

  const handleSearch = (brandName) => {
    if (brandName != '' && brandName != undefined) {
      if (copyBrandList != '' && copyBrandList != undefined) {
        var fData;

        fData = copyBrandList.filter((a) => {
          {
            return a.voucherType === 5001
              ? a.voucherTitle.toLowerCase().includes(brandName.toLowerCase())
              : a.brandName.toLowerCase().includes(brandName.toLowerCase());
          }
        });

        setVoucherData(fData);
        setVouchersortedData(fData);
      } else {
        setVoucherData(copyBrandList);
        setVouchersortedData(copyBrandList);
      }
    } else {
      setVoucherData(copyBrandList);
      setVouchersortedData(copyBrandList);
    }
  };

  function VoucherListDesign() {
    var n;
    return (
      <View style={{paddingBottom: '20%'}}>
        <View style={[styles.flex, styles.alignCenter, styles.headingTitle]}>
          <View style={{flexDirection: 'row', alignContent: 'center'}}>
            <Text style={styles.voucherheading}> {voucherType}</Text>

            <Image
              source={R.images.remotepetal1}
              style={{width: 20, height: 20}}
            />
          </View>
        </View>
        {Reward_Data[0].ActiveTabAvail == true && (
          <View style={{paddingLeft: '3%', paddingRight: '3%'}}>
            <View style={styles.filterBox}>
              {voucherType == 'BRAND VOUCHER' && (
                <TouchableOpacity
                  onPress={openFilterPanel}
                  style={styles.card_Filterby_Touchable}
                >
                  <Icon
                    name="ri-filter-3-line"
                    size={R.dimensions.wp(5)}
                    color={R.themes.darkCardBackgroundColor}
                  />
                  <Text style={styles.card_sortby_Text}>Filter by</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                onPress={openPanel}
                style={styles.card_Sortby_Touchable}
              >
                <Icon
                  name="ri-filter-3-line"
                  size={R.dimensions.wp(5)}
                  color={R.themes.darkCardBackgroundColor}
                />
                <Text style={styles.card_sortby_Text}>Sort by</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {Reward_Data[0].ActiveTabAvail == true && (
          <View style={{flex: 1}}>
            <SearchInputComponent
              editable={true}
              //onPress={() => handleSearch(brandName)}
              //onPress={() => null}
              // onEndEditing={() => {
              //   handleSearch(n);
              //   setBrandName(n);
              // }}

              onSubmitEditing={(event) => {
                setBrandName(event.nativeEvent.text);
                handleSearch(event.nativeEvent.text);
              }}
              onChangeText={(val) => {
                n = val;
              }}
              customTextInputStyleView={{marginBottom: 0}}
              placeholder={'Look For Your Most Loved Brands'}
              defaultValue={brandName === '' ? null : brandName}
            />
          </View>
        )}

        {/* {Reward_Data[0].ActiveTabAvail == true &&

        <Text>kjhbjb</Text>
        } */}

        <FlatList
          data={voucherData}
          keyExtractor={(item, index) => index}
          renderItem={renderList}
        />
      </View>
    );
  }

  const onSelectionChange = (item, vouchersortedData) => {
    setSortSelected(item);
    setBrandName('');
    if (item == 'Default') {
      let data = vouchersortedData.sort((a, b) =>
        a?.brandName != null
          ? a?.brandName.localeCompare(b?.brandName)
          : a?.voucherTitle.localeCompare(b?.voucherTitle),
      );
      setVoucherData(data);
      setCopyBrandList(data);
      closePanel();
    } else if (item == 'A - Z Brand name') {
      let data = vouchersortedData.sort((a, b) =>
        a?.brandName != null
          ? a?.brandName.localeCompare(b?.brandName)
          : a?.voucherTitle.localeCompare(b?.voucherTitle),
      );
      setVoucherData(data);
      setCopyBrandList(data);
      closePanel();
    } else if (item == 'High - low spends') {
      const sortedHighToLow = vouchersortedData
        .slice()
        .sort((a, b) => b?.voucherPoint - a?.voucherPoint);

      setVoucherData(sortedHighToLow);
      setCopyBrandList(sortedHighToLow);
      closePanel();
    } else if (item == 'Low - high spends') {
      const sortedLowToHigh = vouchersortedData
        .slice()
        .sort((a, b) => a?.voucherPoint - b?.voucherPoint);
      setVoucherData(sortedLowToHigh);
      setCopyBrandList(sortedLowToHigh);
      closePanel();
    }
  };

  const onFilterSelectionChange = (item) => {
    var data = allvoucherData.filter((a) => {
      {
        return item.item == 'All' ? a : a.categoryDesc == item.item;
      }
    });

    //  setVoucherData(data);
    setVouchersortedData(data);
    setCopyBrandList(data);
    //setcheckBoxSelected('Default');
    setBrandName('');

    //sort
    onSelectionChange(sortSelected, data), closeFilterPanel();
  };
  const renderFiltering = (item) => {
    return (
      <TouchableOpacity
        onPress={() => [
          setFiltercheckBoxSelected(item.item),
          onFilterSelectionChange(item),
        ]}
        style={{
          flexDirection: 'row',
          marginVertical: 12,
          width: R.dimensions.wp(80),
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: R.themes.backgroundColor,
            marginHorizontal: 15,
          }}
        >
          {item.item}
        </Text>
        {/* <CheckBox
          value={isSelected}
          // onValueChange={onSelectionChange}
          tintColors={{true: R.colors.gridRedColor}}
          onAnimationType={'fill'}
          offAnimationType={'fill'}
          onCheckColor={R.colors.gridRedColor}
          onTintColor={R.colors.gridOrangColor}
          style={{height: 18, marginTop: 5}}
          onFillColor={R.colors.gridRedColor}
        /> */}
        <View
          style={{
            marginHorizontal: 15,
            height: R.dimensions.hp(2.2),
            width: R.dimensions.wp(4.8),
            borderRadius: 50,
            backgroundColor:
              filtercheckBoxSelected == item.item
                ? R.colors.gridRedColor
                : '#5B215F',
            borderColor: R.colors.gridOrangColor,
            borderWidth: 2,
          }}
        />
      </TouchableOpacity>
    );
  };

  const renderSorting = (item) => {
    return (
      <TouchableOpacity
        onPress={() => [
          setcheckBoxSelected(item.item),
          onSelectionChange(item.item, vouchersortedData),
        ]}
        style={{
          flexDirection: 'row',
          marginVertical: 12,
          width: R.dimensions.wp(80),
          justifyContent: 'space-between',
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: R.themes.backgroundColor,
            marginHorizontal: 15,
          }}
        >
          {item.item}
        </Text>
        {/* <CheckBox
          value={isSelected}
          // onValueChange={onSelectionChange}
          tintColors={{true: R.colors.gridRedColor}}
          onAnimationType={'fill'}
          offAnimationType={'fill'}
          onCheckColor={R.colors.gridRedColor}
          onTintColor={R.colors.gridOrangColor}
          style={{height: 18, marginTop: 5}}
          onFillColor={R.colors.gridRedColor}
        /> */}
        <View
          style={{
            marginHorizontal: 15,
            height: R.dimensions.hp(2.2),
            width: R.dimensions.wp(4.8),
            borderRadius: 50,
            backgroundColor:
              checkBoxSelected == item.item ? R.colors.gridRedColor : '#5B215F',
            borderColor: R.colors.gridOrangColor,
            borderWidth: 2,
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <BackHeader navigation={navigation} />

      <RootView>
        <View pointerEvents={isPanelVisible ? 'none' : 'auto'}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={
              Platform.OS == 'android' ? 'handled' : 'always'
            }
          >
            {ShowLoader ? (
              <LoaderView />
            ) : (
              <View style={styles.mainContainer}>
                <View
                  style={{
                    marginTop: '2%',

                    backgroundColor: R.themes.backgroundColor,
                    //  /width: R.dimensions.wp(100),
                    flexDirection: 'row',
                    marginTop: '2%',
                    //marginHorizontal:"4%",
                    marginLeft: '4%',

                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{marginBottom: 5}}>
                    <Text
                      style={[
                        {
                          fontSize: 20,
                          color: R.colors.primaryBrand2,
                          fontWeight: 'bold',
                        },
                      ]}
                      numberOfLines={1}
                    >
                      My Rewards
                    </Text>

                    <View
                      style={{
                        marginBottom: '8%',
                        // marginRight: '1.5%',
                        flex: 2,
                        alignItems: 'flex-start',
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          // alignContent: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
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
                          style={{
                            fontSize: 12,
                            fontFamily: R.fonts.primaryBold,
                            color: R.themes.darkHeaderColor,
                            fontWeight: '500',
                            paddingStart: '1.5%',
                          }}
                        >
                          {authState?.mallDetails?.oko_Row_Desc}
                          {/* {authState?.mallDetails?.branch_City_Name} */}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('TransactionHistory')}
                      style={styles.sideButton}
                    >
                      <Image
                        style={styles.sideButtonImage}
                        source={R.images.Transactioncart}
                      />
                      <Text style={styles.sideButtonText}>
                        {'Transactions'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <LinearGradient
                  colors={['#651D60', '#651D60', '#BD44C5', '#BD44C5']}
                  start={{x: 0, y: -0.2}}
                  end={{x: 1, y: 1}}
                  locations={[0, 0.1613, 0.6798, 0.5456]}
                  style={[
                    styles.cardContainer,
                    {
                      height:
                        slabName === 'MonthlySlab1' ||
                        slabName === 'YearlySlab1' ||
                        slabName === 'DailySlab1'
                          ? R.dimensions.hp('17%')
                          : R.dimensions.hp('14%'),
                    },
                  ]}
                >
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <View
                      style={{
                        flexDirection: 'column',
                        flex:
                          slabName === 'MonthlySlab1' ||
                          slabName === 'YearlySlab1' ||
                          slabName === 'DailySlab1'
                            ? 0.7
                            : 0.6,
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}
                      >
                        <Text
                          style={{
                            fontFamily: R.fonts.primaryBold,
                            fontSize:
                              slabName === 'MonthlySlab1' ||
                              slabName === 'YearlySlab1' ||
                              slabName === 'DailySlab1'
                                ? R.dimensions.hp('1.8%')
                                : R.dimensions.hp('3%'),
                            color: R.themes.backgroundColor,
                            paddingRight: '2%',
                            fontWeight: 'bold',
                          }}
                        >
                          {slabData?.Remark}
                        </Text>
                        {slabName === 'MonthlySlab1' ||
                        slabName === 'YearlySlab1' ||
                        slabName === 'DailySlab1' ? (
                          <Image
                            source={R.images.NexusLogo}
                            style={styles.coinImage}
                            resizeMode="contain"
                          />
                        ) : null}
                      </View>
                      {slabName === 'MonthlySlab1' ||
                      slabName === 'YearlySlab1' ? (
                        points !== '' && (
                          <View style={styles.rewardContainer}>
                            <Image
                              source={R.images.NexusLogo}
                              style={styles.coinImage}
                              resizeMode="contain"
                            />

                            <Text style={[styles.pointText]}>
                              {pointsDisplay}
                            </Text>
                          </View>
                        )
                      ) : slabName === 'DailySlab1' ? (
                        <View style={styles.rewardContainer}>
                          <Image
                            source={R.images.NexusLogo}
                            style={styles.coinImage}
                            resizeMode="contain"
                          />

                          <Text style={[styles.pointText]}>
                            {pointsDisplay}
                          </Text>
                        </View>
                      ) : null}
                      {slabName === 'MonthlySlab1' ||
                      slabName === 'YearlySlab1' ||
                      slabName === 'DailySlab1' ? (
                        <Text
                          style={{
                            fontFamily: R.fonts.primaryRegular,
                            fontSize: 12,
                            color: R.themes.backgroundColor,
                            marginTop: '5%',
                            fontWeight: '700',
                            width: '70%',
                          }}
                        >
                          {slabData?.msg}
                        </Text>
                      ) : null}
                    </View>

                    <View
                      style={[
                        styles.cardImageContainer,
                        {
                          flex:
                            slabName === 'MonthlySlab1' ||
                            slabName === 'YearlySlab1' ||
                            slabName === 'DailySlab1'
                              ? 0.3
                              : 0.4,
                          alignItems: 'flex-end',
                        },
                      ]}
                    >
                      <Image
                        source={R.images.rewards_detail}
                        style={[styles.cardImage]}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </LinearGradient>

                {/* ************************** AVAILABLE CLAIMED REDEEMED ************************** */}

                <ACRDesign />

                {/* ************************** category list and voucher condition **************************  */}

                {IsActiveTabUnlock ? <GenerateCodeDesign /> : null}

                {VType.length !== 0 ? (
                  <>
                    {/* ************************** category list  ************************** */}
                    <CategoryViewDesign />

                    {voucherType == '' ? (
                      <View style={styles.select_CategoryView}>
                        <Text style={styles.select_CategoryText}>
                          Please select any category !
                        </Text>
                      </View>
                    ) : (
                      <>
                        {ShowVoucehrLoader ? (
                          <LoaderWithoutBGDesign />
                        ) : (
                          <VoucherListDesign />
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: '30%',
                        paddingHorizontal: '15%',
                      }}
                    >
                      <Image
                        source={
                          Reward_Data[0].Apicall === 1
                            ? R.images.nounpriceAvialableSection
                            : R.images.vouchernotavailableimage
                        }
                        style={{
                          height: 80,
                          width: 80,
                          marginVertical: '5%',
                          tintColor: R.themes.accountTextColour,
                        }}
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 15,
                          color: R.themes.accountTextColour,
                          fontFamily: R.fonts.primaryRegular,
                          paddingVertical: '3%',
                        }}
                      >
                        Shop with Nexus Malls and Get a chance to grab Exciting
                        Rewards !!!
                        {/* {Reward_Data[0].Apicall === 1
                          ? 'Shop with Nexus Malls and Get a chance to grab Exciting Rewards !!!'
                          : `We're not finding vouchers for you kindly check back later !!`} */}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )}
          </KeyboardAwareScrollView>
        </View>

        {isPanelVisible && (
          <View style={styles.panel}>
            {/* Your panel content */}
            <View
              style={{
                flexDirection: 'row',

                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: R.fonts.primaryRegular,
                  // fontSize: 25,
                  fontWeight: '900',
                  // paddingHorizontal: 5,
                  color: R.themes.backgroundColor,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginStart: 140,
                }}
              >
                Sort By
              </Text>
              <Image
                source={R.images.remotepetal1}
                style={{
                  width: 20,
                  height: 20,
                  transform: [{rotate: '45deg'}],
                }}
              />
              <TouchableOpacity
                onPress={closePanel}
                style={{marginLeft: 130, bottom: 5}}
              >
                <Image
                  source={R.images.CrossCancel}
                  style={{
                    width: 22,
                    height: 22,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderWidth: 1,
                width: '80%',
                marginTop: 20,
                borderColor: 'rgba(255, 255, 255, 0.33)',
              }}
            />
            <FlatList
              style={{marginTop: 15}}
              data={dataSorted}
              renderItem={renderSorting}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
        {isFilterPanelVisible && (
          <View style={styles.panel}>
            {/* Your panel content */}
            <View
              style={{
                flexDirection: 'row',

                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: R.fonts.primaryRegular,
                  //fontSize: 25,
                  fontWeight: '900',
                  // paddingHorizontal: 5,
                  color: R.themes.backgroundColor,
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginStart: 140,
                }}
              >
                Filter By
              </Text>
              <Image
                source={R.images.remotepetal1}
                style={{
                  width: 20,
                  height: 20,
                  transform: [{rotate: '45deg'}],
                }}
              />
              <TouchableOpacity
                onPress={closeFilterPanel}
                style={{marginLeft: 130, bottom: 5}}
              >
                <Image
                  source={R.images.CrossCancel}
                  style={{
                    width: 22,
                    height: 22,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderWidth: 1,
                width: '80%',
                marginTop: 20,
                borderColor: 'rgba(255, 255, 255, 0.33)',
              }}
            />
            <FlatList
              style={{marginTop: 15}}
              data={brandCategoryList}
              renderItem={renderFiltering}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      </RootView>
    </>
  );
};
