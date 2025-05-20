import {Platform, StyleSheet} from 'react-native';
//local import
import R from '../../../R';
import {horizontalScale} from '../../../../res/scale';

export default StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#5B215F',
    // height: windowHeight * 0.3, // Set the height to 30% of the screen height
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: '5%',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 2,
  },
  cardContainer: {
    backgroundColor: R.themes.boxBackgroundColour,
    flexDirection: 'row',
    flex: 0.21,
    margin: '2%',
    marginTop: '0%',
    // borderRadius: R.dimensions.hp('2%'),
    alignItems: 'center',
    padding: '5%',
    marginHorizontal: '4%',
   
    borderRadius:5,
    
  },
  cardImage: {
    height: R.dimensions.wp(30),
    width: R.dimensions.wp(28),
    //top: 10,
  },
  coinImage: {
    width: R.dimensions.wp(6),
    height: R.dimensions.wp(6),
  },

  cardImageContainer: {
   
    right: '5%',
    //top: -2,
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
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // width: '100%',
  },
  generatecode_flexBox: {
    marginTop: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
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
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    alignItems: 'center',
    width: '100%',
  },
  trendcoinBox: {
    backgroundColor: 'transparent',
    padding: 0,
    width: R.dimensions.hp('10%'),
  },
  coinText: {
    paddingVertical: 1,

    alignSelf: 'center',
    color: R.colors.primaryBrand2,
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
    justifyContent: 'space-between',
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

    tintColor: R.colors.primaryBrand2,
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
  heading: {
    paddingLeft: '4%',
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2%'),
    color: R.themes.backgroundColor,
    // marginBottom:10,
    // marginTop:20
  },
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
    borderColor: R.colors.primaryBrand2,
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
    borderColor: R.colors.primaryBrand2,
    backgroundColor: R.themes.backgroundColor,
    marginVertical: R.dimensions.hp('1.4%'),
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
    backgroundColor: R.colors.primaryBrand2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headingTitle: {
    paddingTop: 20,
    paddingBottom: 10,
  },

  tabText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: R.themes.boxBackgroundColour,
    borderBottomWidth: 2,
  },
  tabTextInactive: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: R.colors.lightgrey,
    borderBottomWidth: 1,
  },
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
    fontWeight: '700',
    fontSize: R.dimensions.hp('1.5%'),
    textAlign: 'center',
    marginTop: 5,
    color: 'white',
    fontFamily: R.fonts.primaryBold,
    textTransform: 'capitalize',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
  voucher_AfterTextStyle: {
    fontWeight: '700',
    fontSize: R.dimensions.hp('1.5%'),
    textAlign: 'center',
    marginTop: 5,
    marginHorizontal: 10,
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
    resizeMode: 'contain',
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
    height: R.dimensions.hp(6),
    width: R.dimensions.wp(43),
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: R.colors.purple,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    alignContent: 'center',
    alignItems: 'center',
  },
  voucher_AfterTouchableView: {
    height: R.dimensions.hp(6),
    width: R.dimensions.wp(43),
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#921C81',
    borderWidth: 2,
    borderBottomColor: R.themes.boxBackgroundColour,
    borderRightColor: R.themes.boxBackgroundColour,
    borderLeftColor: '#921C81',
    borderTopColor: '#921C81',
    alignContent: 'center',
    alignItems: 'center',
  },

  tabGenerateCode: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: R.colors.primaryBrand2,
    borderWidth: 1,
    overflow: 'visible',
    width: '90%',
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  headingGenerateCode: {
    textAlign: 'left',
    //   paddingLeft: '4%',
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(16),
    color: R.themes.accountTextColour,
  },
  generateCode_container: {
    flex: 1,
    //marginTop: '3%',
    alignContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  generateCode_Text: {
    fontSize: horizontalScale(12),
    fontFamily: R.fonts.primaryMedium,
    color: R.themes.backgroundColor,
    textAlign: 'right',
    backgroundColor: R.themes.calenderselectedColour,
    paddingHorizontal: '10%',
    paddingVertical: '5%',
  },

  tabText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: R.colors.rewardsSlabSelect,
    borderBottomWidth: 5,
    overflow: 'visible',
    width: 120,
  },
  tabTextInactive: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderBottomColor: R.colors.primaryBrand2,
    borderBottomWidth: 1,
  },
  heading: {
    lineHeight: 18,
    fontWeight: '700',
    paddingLeft: '3%',
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(14),
    color: R.colors.rewardsSlabSelect,
    textAlign: 'center',
  },
  voucherheading: {
    lineHeight: 18,
    fontWeight: '700',
    paddingLeft: '3%',
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(14),
    color: R.themes.darkCardBackgroundColor,
    textAlign: 'center',
  },
  headinginactive: {
    textAlign: 'center',
    //   paddingLeft: '4%',
    lineHeight: 18,
    fontWeight: '500',
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(14),
    color: R.themes.accountTextColour,
  },

  cardtext_design: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: R.fonts.primaryBold,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginVertical: '3%',
    marginHorizontal: '8%',
  },
  card_Touchableopacity: {
    width: R.dimensions.wp(90),

    // height: R.dimensions.hp(30),
    alignSelf: 'center',
  },

  card_Filterby_Touchable: {
    borderWidth: 1,
    borderColor: R.themes.boxBackgroundColour,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: '2%',
  },

  card_Sortby_Touchable: {
    borderWidth: 1,
    borderColor: R.themes.boxBackgroundColour,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  card_sortby_Text: {
    paddingHorizontal: 5,
    color: R.themes.darkCardBackgroundColor,
    fontFamily: R.fonts.primaryRegular,
    fontSize: 13,
    fontWeight: '400',
  },

  expired_Voucher_Design: {
    height: R.dimensions.hp('11%'),
    width: R.dimensions.wp('90%'),
    alignSelf: 'center',
    position: 'absolute',
    opacity: 0.5,
    flex: 1,
  },
  valid_Text: {
    fontSize: R.dimensions.wp(2.5),
    fontFamily: R.fonts.primaryMedium,
    color: R.themes.boxBackgroundColour,
    textAlign: 'right',
    marginTop: '3%',
  },
  left_count_container: {
    flex: 1,
   
    flexDirection: 'row',

    backgroundColor: R.colors.gridYellowcolor,
    // paddingHorizontal: '18%',
     paddingVertical: '2%',
    borderRadius:5,
    justifyContent:"center"
   
  },
  left_count_View: {
   width:"80%",
    backgroundColor: R.colors.gridVioletColour,
    //paddingHorizontal: 8,
    paddingVertical: '2%',
    borderBottomRightRadius:5,
    borderTopRightRadius:5,
  
    overflow: Platform.OS=='ios' ? 'hidden': undefined

  },
  left_count_Text: {
    fontSize: Platform.OS=='ios' ? R.dimensions.wp("2.8%") : R.dimensions.wp("2.5%"),
    fontFamily: R.fonts.primaryBold,
    color: R.themes.backgroundColor,
    textAlign: 'center',
    // backgroundColor: R.colors.gridVioletColour,
    // paddingHorizontal: '10%',
    // paddingVertical: '5%',
    // borderBottomRightRadius:5,
    // borderTopRightRadius:5,
   
    // overflow: Platform.OS=='ios' ? 'hidden': undefined

  },
  triangle: {
    
    width: 0,
    height: 0,
   
     borderTopWidth: Platform.OS=="android"?8:8,
    borderBottomWidth: 8,
    borderRightWidth: Platform.OS=="android"?8:8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor:R.colors.gridVioletColour,
    marginRight: -0.5,
   
},






  claim_Text: {
    fontSize: Platform.OS=='android' ? R.dimensions.wp(3) : R.dimensions.wp(2.8),
    fontFamily: R.fonts.primaryBold,
    color: R.themes.accountTextColour,
    textAlign: 'center',
    
    overflow: Platform.OS=='ios' ? 'hidden': undefined

  },

  voucher_Remark: {
    flex: 2,
    flexWrap: 'wrap',
    fontSize: R.dimensions.wp("3%"),
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.boxBackgroundColour,
    marginTop: '4%',
   
  },
  voucherText: {
    fontSize: R.dimensions.wp(3.4),
    fontFamily: R.fonts.primaryMedium,
    color: R.themes.boxBackgroundColour,
    textAlign: 'right',
   fontWeight:"bold"
  },
  point_Img: {
    width: R.dimensions.wp(5),
    height: R.dimensions.wp(5),
    marginRight: '4%',
  },


  sideButton: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: R.themes.bottomTabButtonColor,
    paddingVertical: 5,
    borderRadius: 5,
    end: '0%',
    //right: '-5%',
    marginRight:"8%"
  },
  sideButtonImage: {
    height: 16,
    width: 16,
    resizeMode: 'cover',
    paddingHorizontal: 5,
    marginVertical: 5,
    tintColor: R.themes.backgroundColor,
  },
  sideButtonText: {
    marginVertical: 5,
    paddingLeft: 10,
    color: R.themes.backgroundColor,
    fontWeight: '700',
    fontFamily: R.fonts.primaryRegular,
  },
});
