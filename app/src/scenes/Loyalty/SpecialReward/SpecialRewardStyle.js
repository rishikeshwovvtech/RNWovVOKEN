import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';
import {horizontalScale} from '../../../../res/scale';
import {dimensions} from '../../../../res/dimensions';

export default StyleSheet.create({
  mainContainer: {
    // height: R.dimensions.hp(100),
    // marginBottom: 50,
    backgroundColor: R.colors.primaryBrand2,
  },

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
    borderRadius: R.dimensions.hp('5%'),
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
    flex: 1,
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
  rewardLeftCount: {
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
  rewardLeftCountText: {
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
    backgroundColor: R.colors.primaryBrand2,
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
    color: R.colors.primaryBrand2,
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
  reward_TextStyle: {
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
  reward_AfterTextStyle: {
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
  reward_ImageStyle: {
    width: R.dimensions.wp(10),
    height: R.dimensions.wp(10),
    // marginTop: R.dimensions.wp('4%'),
    tintColor: 'white',
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  reward_AfterImageStyle: {
    width: R.dimensions.wp(10),
    height: R.dimensions.wp(10),
    // marginTop: R.dimensions.wp('4%'),
    tintColor: 'white',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  reward_TouchableView: {
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
  reward_AfterTouchableView: {
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
    borderBottomColor: R.colors.primaryBrand2,
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
  midleText: {fontSize: 12, color: 'white', marginBottom: 12},
  billTextRightDetails: {
    flex: 1,
    alignItems: 'center',

    padding: 10,
  },

  rewardCardmaskContainer: {
    //height: R.dimensions.hp('5%'),
    width: R.dimensions.wp('95%'),
    alignSelf: 'center',
    marginVertical: 10,

    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rewardTextLeftDetails: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  rewardNumberText: {
    fontSize: 10,
    color: 'white',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
  tickImage: {
    width: 16,
    height: 16,
  },

  arrow_right: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },

  claimedRedeemedView: {
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  claimedRedeemText: {
    fontSize: horizontalScale(7),
    color: 'white',
    paddingHorizontal: 2,
    alignSelf: 'center',
  },

  midleText: {fontSize: 12, color: 'white', marginBottom: 12},
  rewardTextRightDetails: {
    flex: 1,
    alignItems: 'center',

    padding: 10,
  },

  cardRightText: {
    fontSize: 10,
    color: 'white',
    fontFamily: R.fonts.primaryRegular,
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
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

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropdownContainer: {
    backgroundColor: '#CD44B7',
    marginHorizontal: 10,
    justifyContent: 'space-around',

    paddingVertical: 0,
    borderRadius: 8,
    marginTop: 10,
  },

  dropdownListStyle: {
    backgroundColor: '#CD44B7',

    paddingVertical: 0,
    borderRadius: 8,
  },

  dropdownText: {
    flex: 1,
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: R.fonts.primaryBold,
    marginVertical: 10,
  },
  downicon: {height: 15, width: 15, resizeMode: 'contain'},

  flatlistcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.primaryBrand2,
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
    backgroundColor: '#CD44B7',
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
    backgroundColor: '#5B215F',
    marginHorizontal: 10,
    borderRadius: 8,
    //marginVertical: 70,
  },

  yearmonth: {
    padding: 10,

    alignContent: 'center',
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
    marginVertical: 10,
    marginHorizontal: 10,
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,

    // paddingVertical: 10,
    paddingHorizontal: 20,
  },
  infoicon: {
    height: 15,
    width: 15,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },

  cardSubtitleFooter: {
    fontSize: horizontalScale(12),
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.backgroundColor,
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
    color: R.themes.backgroundColor,
  },
});
