import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';
import {horizontalScale} from '../../../../res/scale';
import {dimensions} from '../../../../res/dimensions';

export default StyleSheet.create({
 
  mallsearchTextinput: {
    // fontFamily: R.fonts.primaryRegular,
    // paddingLeft: 10,
    // width: '90%',
    // fontSize: 14,
    // backgroundColor: 'green',

    fontFamily: R.fonts.primaryRegular,
    alignSelf: 'center',
    paddingLeft: 10,
    width: '80%',
    fontSize: 14,
    paddingVertical: 3,
  },
  maincard_design: {
    width: '100%',
    alignSelf: 'center',
    marginTop: '3%',
    borderRadius: 10,
    // backgroundColor:  R.themes.boxBackgroundColour,
  },
  card_Touchableopacity: {
    width: R.dimensions.wp(90),

    // height: R.dimensions.hp(30),
    alignSelf: 'center',
  },

  cardImage: {
    height: R.dimensions.wp('26%'),
    width: R.dimensions.wp('26%'),
    top: 20,
    left: 20,
  },

  cardtext_design: {
    color: 'white',
    fontFamily: R.fonts.primarySemiBold,
    fontWeight: '700',
    fontSize: R.dimensions.wp('4.2%'),
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginVertical: '3%',
    marginHorizontal: '8%',
  },

  coinImage: {
    width: R.dimensions.wp('8%'),
    height: R.dimensions.wp('8%'),
  },

  cardImageContainer: {
    position: 'absolute',
    right: '8%',
    top: -2,
    //bottom: '2%',
  },
  pointText: {
    fontFamily: R.fonts.primaryBold,
    marginHorizontal: '3%',
    fontSize: R.dimensions.hp('3%'),
    color: R.themes.backgroundColor,
    fontWeight: '900',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '5%',
  },
  couponBox: {
    padding: 15,
   // borderRadius: R.dimensions.hp('5%'),
    borderWidth: 0.5,
    borderColor: R.colors.lightgrey,
    backgroundColor: R.themes.backgroundColor,
    width: R.dimensions.hp('38%'),
    margin: R.dimensions.hp('1.5%'),
    elevation: 6,
    borderRadius: 6,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  alignRight: {
    //alignSelf: 'flex-end',
  },
  terms: {
    fontSize: R.dimensions.hp('1.5%'),
    fontFamily: R.fonts.primaryBold,
    color: R.colors.grey,
  },
  date: {
    fontSize: 11,
    fontFamily: R.fonts.primaryBold,
    color: R.colors.black,
  },
  aldo: {
    color: R.colors.black,
    fontSize: R.dimensions.hp('2.2%'),
    fontFamily: R.fonts.primaryBold,
  },
  space: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  Vovcher: {
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryBold,
  },
  coinBox: {
    borderRadius: R.dimensions.hp('3%'),
    backgroundColor: '#ddd',
    // width: R.dimensions.hp('8%'),
    alignSelf: 'flex-end',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
    alignItems: 'center',
  },
  filterBox: {
    borderRadius: R.dimensions.hp('2%'),
    backgroundColor: R.colors.lightCardGray,
    alignSelf: 'flex-end',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 6,
    alignItems: 'center',
  },
  trendcoinBox: {
    backgroundColor: 'transparent',
    padding: 0,
    width: R.dimensions.hp('10%'),
  },
  coinText: {
    paddingVertical: 1,

    alignSelf: 'center',
    color: R.themes.darkCardBackgroundColor,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: R.fonts.primaryBrand2,
    paddingHorizontal: '3%',
  },
  coinTextExpire: {
    color: R.colors.grey,
    fontSize: 13,
    fontFamily: R.fonts.primaryBold,
    paddingHorizontal: '2%',
  },
  filterText: {
    color: R.colors.black,
    fontSize: 13,
    fontFamily: R.fonts.primaryBold,
    marginRight: 5,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
  CoinMoney: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    paddingVertical: 10,
  },

  LocationPin: {
    width: 16,
    height: 16,
    marginLeft: 3,
    alignSelf: 'flex-start',

    tintColor: R.themes.darkCardBackgroundColor,
  },
  CoinMoneySize: {
    width: 15,
    height: 15,
    // margin:2,
  },
  silvrText: {
    fontSize: 14,
    fontFamily: R.fonts.primaryBold,

    // marginBottom:10,
    // marginTop:20
  },
  // heading: {
  //   paddingLeft: '4%',
  //   fontFamily: R.fonts.primaryBold,
  //   fontSize: R.dimensions.hp('2%'),
  //   color: R.themes.backgroundColor,
  //   // marginBottom:10,
  //   // marginTop:20
  // },
  giftVovcher: {
    fontSize: 13,
    fontFamily: R.fonts.primaryRegular,
    // fontWeight:'bold',
  },
  mainContainer: {
    paddingBottom: '20%',
    // marginHorizontal: '3%',
  },
  border: {
    height: 1,
    width: 50,
    backgroundColor: R.themes.boxBackgroundColour,
    marginTop: 5,
    marginLeft: 8,
  },
  trendingBox: {
    borderWidth: 2,
    borderColor: R.themes.darkCardBackgroundColor,
    marginBottom: R.dimensions.hp('1.4%'),
    // marginHorizontal: R.dimensions.wp('2%'),
    marginLeft: R.dimensions.wp('3%'),
    marginRight: R.dimensions.wp('3%'),
    alignItems: 'center',
    borderRadius: 8,
  },
  cardStyle: {
    alignItems: 'center',
  },
  trendingBoxParent: {
    // paddingHorizontal: 10,
    borderRadius: R.dimensions.hp('1.4%'),
    borderWidth: 2,
    borderColor: R.themes.darkCardBackgroundColor,
    backgroundColor: R.themes.backgroundColor,
    marginVertical: R.dimensions.hp('1.4%'),
    alignItems: 'center',
  },
  headerImg: {
    position: 'relative',
    left: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    justifyContent: 'center',
    height: horizontalScale(6),
    width: horizontalScale(11),
    tintColor: R.themes.backgroundColor,
  },
  voucherLeftCount: {
    paddingHorizontal: '2%',
    paddingVertical: '0.6%',
    // marginTop: 3,
    flexDirection: 'row',
    borderRadius: 3,
    marginRight: '2%',
    backgroundColor: R.themes.darkCardBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voucherLeftCountText: {
    fontSize: 11,
    paddingVertical: 2,
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.backgroundColor,
  },
  trendingBoxExpired: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: R.dimensions.hp('1%'),
    borderWidth: 1.5,
    borderColor: R.colors.grey,
    backgroundColor: R.themes.backgroundColor,
    // width: R.dimensions.hp('38%'),
    marginVertical: R.dimensions.hp('1.4%'),
    alignItems: 'center',
  },

  flexLeft: {
    flex: 1,

    // borderWidth:1
  },
  box: {
    height: R.dimensions.hp('2.6%'),
    width: R.dimensions.wp('26%'),
    marginLeft: '69%',
    // borderRadius: 5,
    //  marginVertical: 10,
    backgroundColor: R.themes.darkCardBackgroundColor,
    alignItems: 'center',
  },
  flexRight: {
    flex: 4,
    // borderWidth:1
  },
  lineHorizontal: {
    borderWidth: 0.5,
    borderColor: R.colors.orange,
    marginVertical: 5,
  },
  lineHorizontalExpired: {
    borderWidth: 0.5,
    borderColor: R.colors.grey,
    marginVertical: 5,
  },
  VovcherOrange: {
    color: R.themes.darkCardBackgroundColor,
  },
  VovcherGrey: {
    color: R.colors.grey,
  },
  alignCenter: {
    alignItems: 'center',
  },
  headingTitle: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoImage: {
    height: 50,
    width: 50,
  },
  cardBox: {
    paddingHorizontal: 15,
    paddingVertical: 40,
    borderRadius: R.dimensions.hp('2%'),
    borderWidth: 1,
    borderColor: R.colors.lightgrey,
    backgroundColor: R.themes.backgroundColor,
    justifyContent: 'center',
  },
  progress: {
    marginVertical: 10,
  },
  ArrowUpDown: {
    height: 13,
    width: 13,
  },
  tabBox: {
    paddingTop: 30,
  },
  // tabText: {
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  //   borderBottomColor: R.themes.boxBackgroundColour,
  //   borderBottomWidth: 2,
  // },
  // tabTextInactive: {
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  //   borderBottomColor: R.colors.lightgrey,
  //   borderBottomWidth: 1,
  // },
  inActiveCard: {
    backgroundColor: R.colors.lightCardGray,
    height: 10,
    width: 10,
  },
  activeCard: {
    backgroundColor: '#FFE1AC',
    height: 10,
    width: 10,
  },
  select_CategoryView: {
    marginVertical: '5%',
    marginHorizontal: '3%',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },

  select_CategoryText: {
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2.1%'),
    fontWeight: '700',
    paddingVertical: R.dimensions.hp('2.1%'),
  },
  voucher_TextStyle: {
    fontWeight: '400',
    fontSize: R.dimensions.hp('1.5%'),
    textAlign: 'center',
    marginTop: 5,
    // lineHeight: 9,
    color: 'white',
    fontFamily: R.fonts.primaryBold,
    textTransform: 'capitalize',
    flexWrap: 'wrap',
  },
  voucher_AfterTextStyle: {
    fontWeight: '700',
    fontSize: R.dimensions.hp('1.5%'),
    textAlign: 'center',
    marginTop: 5,
    // lineHeight: 9,
    color: 'white',
    fontFamily: R.fonts.primaryBold,
    textTransform: 'capitalize',
    flexWrap: 'wrap',
  },
  voucher_ImageStyle: {
    width: R.dimensions.wp(10),
    height: R.dimensions.wp(10),
    // marginTop: R.dimensions.wp('4%'),
    tintColor: 'white',
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  voucher_AfterImageStyle: {
    width: R.dimensions.wp(10),
    height: R.dimensions.wp(10),
    // marginTop: R.dimensions.wp('4%'),
    tintColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  voucher_TouchableView: {
    height: R.dimensions.hp('11%'),
    width: R.dimensions.wp('22%'),
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',

    backgroundColor: R.colors.purple,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    elevation: 6,
  },
  voucher_AfterTouchableView: {
    height: R.dimensions.hp('11%'),
    width: R.dimensions.wp('22%'),
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: R.colors.purple,
    borderWidth: 1,
    borderColor: R.themes.boxBackgroundColour,
  },

  tabText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    width: 120,
  },
  tabTextInactive: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderBottomColor: R.themes.darkCardBackgroundColor,
    borderBottomWidth: 1,
  },
  heading: {
    lineHeight: 17,
    fontWeight: '700',
    //paddingLeft: '4%',
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(14),
    color: R.themes.backgroundColor,
    textAlign: 'center',
  },
  headinginactive: {
    textAlign: 'center',
    //   paddingLeft: '4%',
    lineHeight: 17,
    fontWeight: '500',
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(14),
    color: R.colors.grey,
  },
  BillCardmaskContainer: {
    //height: R.dimensions.hp('5%'),
    width: R.dimensions.wp('95%'),
    alignSelf: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  billTextLeftDetails: {
    justifyContent: 'space-around',
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  billNumberText: {
    fontSize: 10,
    color: 'white',
    alignSelf: 'center',
  },
  billTextRightDetails: {
    flex: 1,
    alignItems: 'center',

    padding: 10,
  },

  voucherCardmaskContainer: {
    //height: R.dimensions.hp('5%'),
    width: R.dimensions.wp('95%'),
    alignSelf: 'center',
    marginVertical: 10,
    paddingVertical: '1%',

    // alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor:R.colors.backgroundColor,
   borderRadius:5,
    borderColor:R.themes.accountTextColour,
        borderWidth:0.5
  },
  voucherTextLeftDetails: {
    marginStart: '2%',
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: '2%',
  },
  voucherNumberText: {
    fontSize: 12,
    color: R.themes.accountTextColour,
    marginHorizontal: '0.8%',
  },
  tickImage: {
    marginLeft: '2%',
    width: 16,
    height: 16,
  },

  arrow_right: {
    alignSelf: 'flex-start',
    marginHorizontal: 3,
    marginVertical: 2,
  },

  dailyMonthlyYearlyView: {
   
    
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  dailyMonthlyYearlyText: {
    fontSize: horizontalScale(10),
   
    color: R.themes.accountTextColour,
    paddingHorizontal: 3,
    alignSelf: 'center',
    marginRight:"2%"
  },

  midleText: {fontSize: 12, color: 'white', marginBottom: 12},
  voucherTextRightDetails: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2.5%',
  },
  pointTextRightDetails: {
    flex: 1,
    flexDirection: 'row',

    padding: 10,
    //paddingHorizontal: '2%',

    paddingTop: '2%',
  },

  mallDropdownContainer: {
    backgroundColor: '#CD44B7',
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    paddingVertical: 0,
    borderRadius: 8,
    marginTop: 10,
  },

  pleaseselecttext: {
    color: R.themes.darkButtonColor,
    marginVertical: '2%',
    fontWeight: '500',
  },

  dropdown: {
    flex: 0.8,
    height: 50,
    borderColor: R.themes.accountTextColour,
    borderWidth: 1,
    backgroundColor: R.themes.darkTextColor,
    borderRadius:8
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: R.themes.accountTextColour,
  },

  dropdownContainer: {
    backgroundColor: R.themes.backgroundColor,
    marginHorizontal: 10,
    justifyContent: 'space-around',

    paddingVertical: 0,
    
  },

  dropdownListStyle: {
    backgroundColor: R.themes.backgroundColor,
    borderWidth: 1,
    borderColor: R.themes.accountTextColour,
    
  },
  itemListStyle: {
    backgroundColor: R.themes.backgroundColor,
  },

  selecteddropdownText: {
    flex: 0.5,
    alignSelf: 'center',
    color: R.themes.backgroundColor,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: R.fonts.primaryBold,
    marginVertical: 10,
    marginHorizontal: '5%',
  },

  selecteditemdropdownText: {
    flex: 0.5,
    alignSelf: 'center',
    color: R.themes.accountTextColour,
    fontSize: 12,
    fontWeight: '700',
    fontFamily: R.fonts.primaryBold,

    marginHorizontal: '5%',
  },

  dropdownText: {
    flex: 0.5,
    alignSelf: 'center',
    color: R.themes.accountTextColour,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: R.fonts.primaryBold,

    marginHorizontal: '5%',
  },
  downicon: {
    marginRight: '5%',
    resizeMode: 'contain',
    tintColor: R.themes.backgroundColor,
  },

  flatlistcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.themes.darkCardBackgroundColor,
    paddingHorizontal: 18,
  },
  defaultlistcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    //   paddingVertical: '30%',
    paddingHorizontal: '15%',
  },
  defaultListImage: {
    height: 80,
    width: 80,
    marginVertical: '5%',
  },
  defaultListText: {
    textAlign: 'center',
    fontSize: 15,
    color: R.colors.coolGrey,
    fontFamily: R.fonts.primaryRegular,
    paddingVertical: '3%',
  },

  calenderContainer: {
    backgroundColor: '#CD44B7',
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',

    padding: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginVertical: 10,
  },
  calenderText: {
    flex: 1,
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: R.fonts.primaryBold,
    paddingVertical: 10,
  },

  //calender modal

  cancelOkView: {
    backgroundColor: R.themes.boxBackgroundColour,
    padding: 15,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  contentContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: R.themes.boxBackgroundColour,
    marginHorizontal: 10,
    borderRadius: 8,

    //marginVertical: 70,
  },

  fromtoContainer: {
    flexDirection: 'row',
  },

  yearmonth: {
    padding: 10,
    flex: 0.5,
    alignContent: 'center',
  },

  calenderView: {
    backgroundColor: R.themes.boxBackgroundColour,
    margin: '5%',
  },
  calenderDate: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: horizontalScale(12),
    fontFamily: R.fonts.primaryBold,
  },
  calenderMonthYear: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: horizontalScale(16),
    fontFamily: R.fonts.primaryBold,
  },

  //my rewards list
  rewardCardmaskContainer: {
    //height: R.dimensions.hp('5%'),
    width: R.dimensions.wp('95%'),
    alignSelf: 'center',
    marginVertical: 10,

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rewardTextLeftDetails: {
    flex: 3,
    justifyContent: 'flex-start',

    alignItems: 'center',

    flexDirection: 'row',
  },
  rewardNumberText: {
    fontSize: 10,
    color: 'white',
    justifyContent: 'flex-start',
    top: 2,
    marginHorizontal: 5,
  },
  rewardTextRightDetails: {
    flex: 1,
  },
  cardRightText: {
    fontSize: 10,
    color: R.themes.accountTextColour,
    fontWeight: '800',
  },
  claimedRedeemedView: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'column',
    top: 0,
  },

  claimedRedeemText: {
    fontSize: horizontalScale(7),
    color: 'white',
    paddingHorizontal: 2,
    alignSelf: 'center',
  },

  //Footer
  linergradientwrapper: {
    position: 'absolute',
    bottom: 0,
    width: dimensions.wp(90),
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // borderRadius: 30,

    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    overflow: 'hidden',
  },
  linergradientinner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    marginHorizontal: 20,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    borderColor: R.themes.borderColorlight,
    // paddingVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderWidth: 1,
  },
  infoicon: {
    height: 15,
    width: 15,
    marginHorizontal: 5,
    resizeMode: 'contain',
    tintColor: R.themes.accountTextColour,
  },

  cardSubtitleFooter: {
    fontSize: horizontalScale(12),
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.accountTextColour,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'left',
    width: '100%',
    //flexWrap: 'wrap',
  },
  footermaskSubtext: {
    textDecorationLine: 'underline',
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(12),
    fontWeight: '700',
    lineHeight: 15,
    textAlign: 'left',
    letterSpacing: 0,
    color: R.themes.accountTextColour,
    top: 2,
  },

  piecontainer: {
    flexDirection: 'column',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-around',

    paddingVertical: 0,
    borderRadius: 8,
    marginTop: 10,
  },
});
