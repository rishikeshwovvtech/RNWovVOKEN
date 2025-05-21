import React, {useState, useContext, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import PhysicalVoucher from './PhysicalVoucher';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  OPEN_API_TENANT_ID,
  BASE_URL,
  AUTH_BASE_URL,
} from '../../../utils/Constants';
import QRCode from 'react-native-qrcode-svg';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';

// import ContactusController, { Props } from "./ContactusController";
import R from '../../../R';
import {AuthContext} from '../../../context/auth/AuthContext';

import {BackHeader, CModal, RootView} from '../../../components/index';
import {dimensions} from '../../../../res/dimensions';
import {horizontalScale} from '../../../../res/scale';

import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import SubHeader from '../../../components/SubHeader';
import {throttle} from '../../../utils/Helper';

const NewVoucherDetails = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const [dataAvail, setDataAvail] = useState([]);
  const [ShowVoucher, setShowVoucher] = useState(false);
  const {authState, authAction} = useContext(AuthContext);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [ShowLoader,setShowLoader] = useState(false);
  const [disabledButton] = useState(false);
  const voucherData = route.params.voucherData;

  const [pointsAvailed, setPointsAvailed] = useState("0");

  // console.log(
  //   '🚀 ~ file: NewVoucherDetail.js:48 ~ NewVoucherDetails ~ voucherData:',
  //   voucherData,
  // );

  const voucher_book_id = route.params.voucher_book_id;
  const promo_Code = route.params.promo_Code;
  const active_Category_Name = route.params.active_Category_Name;
  // console.log(
  //   '🚀 ~ NewVoucherDetails ~ active_Category_Name:',
  //   active_Category_Name,
  // );

  useFocusEffect(
    React.useCallback(() => {
      if (active_Category_Name == true) {
        ScreenAnalytics(
          'Voucher_Details_Screen_Available',
          authState?.userToken,
          authState?.userId,
        )
          .then(() => {})
          .catch(() => {});
        // apiAvailableVoucher();
      } else {
        ScreenAnalytics(
          'Voucher_Details_Screen_Collected',
          authState?.userToken,
          authState?.userId,
        )
          .then(() => {})
          .catch(() => {});
        // apiVoucherDetails();
      }
    }, [authState?.mallDetails?.oko_Row_Code, isFocused]),
  );



  const handlePress2 = useCallback(
    throttle(() => {
      setShowLoader(true);
      unlockVoucherJan2025();
    }, 1000),
    [],
  );



  const unlockVoucherJan2025 = () => {
    let data = JSON.stringify({
      partyCode: authState.partyCode.toString(),
      voucherTitle: voucherData?.voucherTitle,
      brandCode: voucherData.brandCode.toString(),
      voucherAmt: voucherData?.voucherAmt.toString(),
      mallCode: authState?.mallDetails?.oko_Row_Code.toString(),
      userId: authState.userId.toString(),
      voucherTypeCode: voucherData?.voucherType.toString(),
      promoCode: promo_Code.toString(),
      voucherCode: voucherData?.voucherCode.toString(),
      voucherId: voucher_book_id.toString(),
      voucherPoint: voucherData?.voucherPoint.toString(),
      pageUrl:'UnlockCouponRegularAndComplimentary',
    });

    // console.log(
    //   '🚀 ~ file: NewVoucherDetail.js:304 ~ unlockVoucherJan2025 ~ data:',
    //   data,
    // );

    let config = {
      method: 'post',
      url: AUTH_BASE_URL+'/ipos/rest/JRConversion/UnlockCouponRegularAndComplimentary?'+OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken,
        userid: authState.userId,
        'Content-Type': 'application/json',
        pageUrl:'UnlockCouponRegularAndComplimentary',
        event:'VoucherDetailsScreen',
        action:'onUnlockVoucher'
      },
      data: data,
    };

    // console.log(
    //   '🚀 ~ file: NewVoucherDetail.js:316 ~ unlockVoucherJan2025 ~ config:',
    //   config,
    // );

    fetchApiService(config, authAction,authState)
      .then((response) => {
        setShowLoader(false);
        // //console.log(
        //   '🚀 ~ file: NewVoucherDetail.js:316 ~ unlockVoucherJan2025 ~ response:',
        //   response?.data,
        // );
        if (response?.data?.message?.type === 'SUCCESS') {
          //console.log("setPointsAvailed ",voucherData?.voucherPoint.toString());
          
          setPointsAvailed(voucherData?.voucherPoint.toString());
          setShowVoucher(true);
        } else {
          //console.log("setPointsAvailed ",0);

          setPointsAvailed("0");
          setErrorModalMessage(response?.data?.message?.message),
            setShowErrorModal(true);
        }
        // console.log(
        //   '🚀 ~ file: NewVoucherDetail.js:320 ~ .then ~ response:',
        //   response,
        // );
      })
      .catch(() => {
        setShowLoader(false);
        //console.log(error);
      });
  };

  function FooterNote() {
    return (
      <View style={styles.linergradientinner}>
        <Image source={R.images.Infoicon} style={styles.infoicon} />

        {voucherData?.voucherType !== 3001 ? (
          <Text style={styles.cardSubtitle}>
            This is a physical coupon and needs to be collected from the Mall
            Customer Service Desk.
          </Text>
        ) : (
          <Text style={styles.cardSubtitle}>
            Please read the Terms & Conditions carefully.
          </Text>
        )}
      </View>
    );
  }
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

  const backAction = () => {
    setDataAvail([]);
     //route.params.onGoBack(pointsAvailed);
    navigation.goBack();
  };
  return (
    <>
      <BackHeader
        title={'Voucher Details'}
        //  extraStyle={{fontSize:13}}
        navigation={navigation}
        customOnPress={backAction}
      />
      <SubHeader title={'Voucher Details'} />
      <RootView>
        {ShowLoader ? (
          <LoaderView />
        ) : (
          <>
            <ScrollView style={{flexGrow: 1}}>
              <View style={styles.VoucherCardContainer}>
                <View>
                  <View style={styles.VerticalTextContainer}>
                    <Text style={styles.VerticalText}>Voucher</Text>
                    <Text style={styles.VerticalTextValue}>
                      {voucherData?.voucherAmt1.split('.')[0]}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderWidth: 1.5,
                    borderColor: R.themes.boxBackgroundColour,
                    height: '90%',
                    borderStyle: 'dashed',
                  }}
                />
                <View style={styles.giftvoucherContainer}>
                  <Text style={styles.giftVoucherText}>
                    {voucherData?.voucherTitle}
                  </Text>

                  <Image
                    style={{
                      width: '35%',
                      height: '35%',
                      marginTop: 20,
                      resizeMode: 'contain',
                      tintColor:
                        (voucherData?.voucherType === 3001 ||
                          voucherData?.voucherType === 5001 ||
                          voucherData?.voucherType === 6001) &&
                        R.themes.accountTextColour,
                    }}
                    source={
                      voucherData?.voucherType === 5001 ||
                      voucherData?.voucherType === 6001
                        ? R.images.GiftVoucher
                        : voucherData?.voucherType === 3001
                        ? R.images.CarVoucher
                        : voucherData?.voucherStatusDesc == 'Available'
                        ? {
                            uri:
                              (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                              voucherData?.brandLogo,
                          }
                        : {
                            uri:
                              (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                              voucherData?.brandLogo,
                          }
                    }
                  />
                  <Text style={styles.expiresOnText}>
                    Expires on{' '}
                    <Text style={styles.expireOnSubText}>
                      {voucherData?.validTo}
                    </Text>
                  </Text>
                  <Text style={styles.termandconditionText}>
                    Terms & Conditions Apply*
                  </Text>
                </View>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.abouttheVoucherContainer}>
                  <Text style={styles.abouttheVoucherText}>
                    About the Voucher
                  </Text>
                </View>

                <Text style={styles.congratesText}>
                  {voucherData?.offerRemark}
                </Text>

                {voucherData?.voucherType == 3001 ? (
                  <>
                    <View style={styles.voucherMaskcontainer}>
                      {active_Category_Name == false ? (
                        <Text style={styles.voucherMaskText}>
                          {voucherData?.voucherCode}
                        </Text>
                      ) : null}
                    </View>
                    <Text style={styles.congratesText}>Scan this QR Code</Text>

                    <View style={{alignSelf: 'center'}}>
                      <QRCode
                        style={{alignSelf: 'center'}}
                        value={voucherData?.voucherCode}
                        size={200}
                      />
                    </View>
                  </>
                ) : (
                  <View style={styles.voucherMaskcontainer}>
                    {active_Category_Name == false ? (
                      <Text style={styles.voucherMaskText}>
                        {voucherData?.voucherCode}
                      </Text>
                    ) : null}
                    <Text style={styles.voucherMaskText}>
                      {voucherData?.voucherAmt1.split('.')[0]}
                    </Text>
                  </View>
                )}

                <Text style={styles.termandconditioncontentText}>
                  Terms and Conditions:
                </Text>
                <Text style={styles.termandconditioncontentText}>
                  {voucherData?.voucherTc}
                </Text>
              </View>
              <View style={{paddingBottom: '2%'}}>
                <FooterNote />
              </View>
              {voucherData?.voucherStatusDesc == 'Available' && (
                <TouchableOpacity
                  enabled={disabledButton}
                  style={styles.signUpBtnSty}
                  onPress={() => {
                    handlePress2();
                  }}
                >
                  <Text style={styles.signUpBtntxtSty}>Claim</Text>
                </TouchableOpacity>
              )}
              <View style={{paddingBottom: '10%'}} />
            </ScrollView>
          </>
        )}
        <PhysicalVoucher



          showVal={ShowVoucher}
          ImgUrl={voucherData?.brandLogo}
          BrandName={voucherData?.voucherTitle}
          voucher_Amount={voucherData?.voucherAmt}
          Voucher_Code={voucherData?.voucherCode}
          Expire_Date={voucherData?.validTo}
          vType={
            voucherData?.voucherType != 5001
              ? voucherData?.voucherTypeDesc
              : 'GIFT VOUCHER'
          }
          vName={
            voucherData?.brandName
              ? voucherData?.brandName
              : voucherData?.voucherTitle
          }
          couponText={'Collect from the mall Customer Service desk'}
          onPressClose={() => {
            setShowVoucher(false);
            // navigation.dispatch(StackActions.pop(1));
            //route.params.onGoBack(pointsAvailed);
    navigation.goBack();
          }}
        />
        <CModal
          isVisible={ShowErrorModal}
          modalMsg={ErrorModalMessage}
          onPressModal={() => setShowErrorModal(!ShowErrorModal)}
          isForm={'Signup'}
        />
      </RootView>
    </>
  );
};

export default NewVoucherDetails;

// Customizable Area Start

////// Footer notes
const styles = StyleSheet.create({
  linergradientwrapper: {
    position: 'absolute',
    bottom: 0,
    width: dimensions.wp(90),
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    overflow: 'hidden',
  },
  linergradientinner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    borderWidth: 1,
    borderColor: R.themes.boxBackgroundColour,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  infoicon: {
    height: 15,
    width: 15,
    marginHorizontal: 5,
    resizeMode: 'contain',
    tintColor: R.themes.boxBackgroundColour,
  },
  cardSubtitle: {
    fontSize: horizontalScale(12),
    fontFamily: R.fonts.primaryRegular,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'left',
    width: '100%',
    flexWrap: 'wrap',
    color: R.themes.boxBackgroundColour,
  },
  footermaskSubtext: {
    textDecorationLine: 'underline',
    fontFamily: R.fonts.primaryBold,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
    textAlign: 'left',
    letterSpacing: 0,
  },
  ////// Footer notes end here
  container: {
    flex: 1,
    backgroundColor: R.themes.backgroundColor,
  },
  signUpBtnSty: {
    width: R.dimensions.wp('90%'),
    height: R.dimensions.hp('6.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: R.themes.darkCardBackgroundColor,
    flexDirection: 'row',
    marginTop: R.dimensions.hp('2%'),
    alignSelf: 'center',
    margin: 20,
  },
  signUpBtntxtSty: {
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(16),
    color: R.themes.backgroundColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerLogoViewSty: {alignItems: 'center', justifyContent: 'center'},

  createPasswordTitleTxtSty: {
    marginHorizontal: R.dimensions.wp('5%'),
  },
  cardStyle: {
    elevation: 5,
    backgroundColor: R.themes.backgroundColor,

    width: R.dimensions.wp('92%'),
    borderRadius: 10,

    overflow: 'hidden',
  },

  coinImage: {
    width: R.dimensions.wp(4),
    height: R.dimensions.hp(2.5),
    alignSelf: 'center',
  },
  expireText: {
    fontSize: R.dimensions.hp('1.3%'),
    fontFamily: R.fonts.primaryRegular,
    color: R.colors.primaryBrand2,
  },
  rupeesText: {
    color: R.colors.primaryBrand2,
    fontSize: R.dimensions.hp('2.5%'),

    fontFamily: R.fonts.primaryBrand2,
  },
  giftVouText: {
    fontSize: R.dimensions.hp('2.2%'),
    fontFamily: R.fonts.primaryBold,
    color: R.colors.primaryBrand2,
  },
  expDate: {
    fontSize: R.dimensions.hp('1.6%'),
    color: R.colors.primaryBrand2,
  },

  linearGradient: {
    width: R.dimensions.wp('2%'),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  box: {
    height: R.dimensions.hp('3%'),
    width: R.dimensions.wp('25%'),
    backgroundColor: R.themes.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: R.dimensions.hp('1.8'),
    fontFamily: R.fonts.primaryMed,
    color: R.themes.backgroundColor,
    textAlign: 'center',
    marginLeft: R.dimensions.hp('2'),
  },
  VoucherCardContainer: {
    flex: 1,
    width: R.dimensions.wp(90),
    height: R.dimensions.hp('20%'),
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: R.themes.boxBackgroundColour,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
  },
  VerticalTextContainer: {
    transform: [{rotate: '270deg'}],
    alignSelf: 'flex-start',
  },
  VerticalText: {
    color: R.themes.accountTextColour,
    fontWeight: 'bold',
    fontSize: 25,
  },
  VerticalTextValue: {
    color: R.themes.accountTextColour,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  dotedBorder: {
    width: 1,
    height: R.dimensions.hp('20%'),
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: '#CD44B7',
  },
  giftvoucherContainer: {
    marginLeft: 10,
    justifyContent: 'space-around',
    flex: 1,
    height: R.dimensions.hp('20%'),
  },
  giftVoucherText: {
    fontSize: 14,
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryBold,
    marginTop: 10,
  },
  expiresOnText: {
    fontSize: 10,
    color: R.themes.accountTextColour,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  expireOnSubText: {fontSize: 12, fontFamily: R.dimensions.primaryBold},
  termandconditionText: {
    fontSize: 10,
    color: R.themes.accountTextColour,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    width: R.dimensions.wp(90),
    alignSelf: 'center',
    marginTop: 60,
    borderRadius: 16,
    borderColor: R.themes.boxBackgroundColour,
    borderWidth: 1,
    overflow: 'visible',
  },
  abouttheVoucherContainer: {
    alignItems: 'center',
    padding: 15,
    width: R.dimensions.wp(65),
    alignSelf: 'center',
    borderRadius: 6,
    borderColor: R.themes.boxBackgroundColour,
    borderWidth: 1,
    top: -30,
    backgroundColor: R.themes.backgroundColor,
  },
  abouttheVoucherText: {
    color: R.themes.accountTextColour,
    fontSize: 16,
    fontWeight: 'bold',
  },
  congratesText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(13),
    margin: 10,
  },
  voucherMaskcontainer: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: R.themes.boxBackgroundColour,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  voucherMaskText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(16),
    margin: 10,
    fontWeight: 'bold',
  },
  termandconditioncontentText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(13),
    margin: 10,
  },

  FooterMask: {
    width: dimensions.wp(90),
    height: 60,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  infoIcon: {
    height: 25,
    width: 25,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },
  footerMastText: {
    fontSize: horizontalScale(12),
    // fontFamily: R.fonts.primaryRegular,
    width: R.dimensions.wp(75),
    color: R.themes.backgroundColor,
    flexWrap: 'wrap',
  },
  footerMastSubText: {
    textDecorationLine: 'underline',
    fontFamily: R.fonts.primaryBold,
  },
});
