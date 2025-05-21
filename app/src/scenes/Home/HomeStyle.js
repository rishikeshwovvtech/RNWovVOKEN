import {StyleSheet} from 'react-native';
import R from '../../R';

export default StyleSheet.create({
  textStyle: {
    color: R.themes.backgroundColor,
    textAlign: 'left',
    fontFamily: R.fonts.primaryRegular,
    marginTop: R.dimensions.hp(1),
  },
  newtextStyle: {
    color: R.themes.backgroundColor,
    textAlign: 'center',
    fontFamily: R.fonts.primaryRegular,
    marginTop: R.dimensions.hp(7),
    fontWeight: 'bold',
  },
  earnText: {
    fontSize: R.dimensions.hp('2.3%'),
    fontFamily: R.fonts.primaryBold,
    alignSelf: 'center',
    color: R.themes.backgroundColor,
    marginTop: '5%',
  },
  hotOfferView: {
    overflow: 'hidden',
    marginLeft: '3%',
  },
  acrossText: {
    fontSize: R.dimensions.hp('2%'),
    alignSelf: 'center',
    color: R.themes.backgroundColor,
    opacity: 0.7,
  },
  offerView: {
    flexDirection: 'column',
    marginBottom: '2%',
    width: R.dimensions.wp('25%'),
    marginLeft: R.dimensions.wp('2%'),
  },
  offerTextView: {
    margin: '2%',
    //justifyContent: 'center',
  },
  offerText: {
    color: 'black',
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primaryRegular,
    fontWeight: 'bold',
  },
  discountText: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: R.dimensions.hp('1.6%'),
    fontFamily: R.fonts.primaryBold,
    marginVertical: '5%',
  },
  offerImage: {
    height: R.dimensions.hp('10%'),
    width: R.dimensions.wp('18%'),
    //backgroundColor: R.themes.backgroundColor,
  },
  offerViewMoreText: {
    fontSize: R.dimensions.hp(1.6),
    color: '#045EC9',
    fontFamily: R.fonts.primaryBold,

    //padding: 2,
  },
  offerviewMoreButton: {
    backgroundColor: R.themes.backgroundColor,
  },
  container: {
    marginHorizontal: '2%',
    marginVertical: '5%',
  },
  greenView: {
    alignSelf: 'center',
    backgroundColor: '#02590d',
    borderRadius: 10,
    padding: '1%',
    opacity: 0.9,
    marginVertical: '2%',
    borderColor: '#00FF00',
    borderWidth: 1,
    // width: '90%',
    height: '18%',
    justifyContent: 'center',
  },
  gText: {
    fontSize: R.dimensions.hp('1.4%'),
    fontFamily: R.fonts.primaryBold,
    color: R.themes.backgroundColor,
    textAlign: 'center',
  },

  searchMallText: {
    fontSize: R.dimensions.hp('2.3%'),
    fontFamily: R.fonts.primaryBold,
  },

  text: {
    fontSize: R.dimensions.hp('1.8%'),
    color: R.colors.black,
    fontFamily: R.fonts.primaryRegular,
  },
  feedbackButtonText: {
    fontSize: R.dimensions.hp('2%'),
    color: R.colors.grey,
  },
  spinImage: {
    height: R.dimensions.hp('23%'),
    padding: '5%',
    backgroundColor: 'red',
  },
  spinText: {
    fontSize: R.dimensions.hp('2.5%'),
    fontFamily: R.fonts.primaryBold,
    color: R.themes.backgroundColor,
    textAlign: 'center',
  },
  winText: {
    fontSize: R.dimensions.hp('4%'),
    fontFamily: R.fonts.primaryBold,
    color: R.themes.backgroundColor,
    textAlign: 'center',
  },
  TS_Text: {
    fontSize: R.dimensions.hp('1%'),
    fontFamily: R.fonts.primaryBold,
    alignSelf: 'center',
    color: R.themes.backgroundColor,
    bottom: 0,
    position: 'absolute',
    paddingBottom: 2,
  },
  view: {
    flexDirection: 'row',
  },

  textBold: {
    fontSize: R.dimensions.hp('1.8%'),
    color: R.colors.black,
    fontFamily: R.fonts.primaryBold,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  feedbackButton: {
    backgroundColor: R.themes.backgroundColor,
    alignSelf: 'center',
    height: R.dimensions.hp('6%'),
    width: R.dimensions.wp('35%'),
    marginVertical: '2%',
  },

  parkingCardView: {
    alignSelf: 'center',
    height: R.dimensions.hp('20%'),
    width: R.dimensions.wp('95%'),
    borderRadius: 15,
    backgroundColor: R.colors.lightBlueGrey,
    marginBottom: '2%',
  },
  parkingView: {
    marginHorizontal: '4%',
    marginVertical: '4%',
    flexDirection: 'row',
  },
  parkingText: {
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primarySemiBold,
    color: R.themes.backgroundColor,

    alignSelf: 'center',
    marginTop: '5%',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  parkingSubText: {
    fontSize: R.dimensions.hp('1.4%'),

    width: '80%',
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.backgroundColor,
    flexWrap: 'wrap',
    alignItems: 'center',
    textAlign: 'center',
  },
  pCustomStyle: {
    backgroundColor: R.themes.parkingButtonbackground,
    height: R.dimensions.hp('4%'),
    width: R.dimensions.wp('30%'),
    marginTop: '1%',
  },
  pWidCustomStyle: {
    backgroundColor: R.colors.darkorange,
    height: R.dimensions.hp('4%'),
    width: R.dimensions.wp('30%'),
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: '3%',
  },
  markCustomStyle: {
    backgroundColor: R.themes.parkingButtonbackground,
    height: R.dimensions.hp('3%'),
    width: R.dimensions.wp('30%'),
    marginHorizontal: '0%',
    marginVertical: '10%',
  },
  nnavigateCustomStyle: {
    backgroundColor: R.themes.boxBackgroundColour,
    height: R.dimensions.hp('4%'),
    width: R.dimensions.wp('25%'),
    borderRadius: 10,
    marginRight: '4%',
  },
  parkingImage: {
    height: R.dimensions.hp('15%'),
    width: R.dimensions.wp('28%'),
  },
  mallImage: {
    height: R.dimensions.hp('19%'),
    width: R.dimensions.wp('40%'),
    alignSelf: 'flex-end',
    right: 0,
    top: 0,
    position: 'absolute',
  },
  orderImage: {
    height: R.dimensions.hp('19%'),
    width: R.dimensions.wp('40%'),
  },
  feedbackView: {
    height: R.dimensions.hp('18%'),
    width: R.dimensions.wp('100%'),
  },
  contactView: {
    flexDirection: 'row',
    marginHorizontal: '3%',
    justifyContent: 'space-between',
    marginBottom: '5%',
    alignItems: 'center',
  },

  contactText: {
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primaryRegular,
    color: R.colors.black,

    marginBottom: '5%',
  },
  fCustomStyle: {
    backgroundColor: R.colors.darkorange,
    height: R.dimensions.hp('4.5%'),
    width: R.dimensions.wp('30%'),
    marginVertical: '4%',
    borderRadius: 10,
  },
  markText: {
    fontSize: R.dimensions.hp('1.6%'),
    fontFamily: R.fonts.primaryBold,

    color: R.themes.boxBackgroundColour,
  },
  title: {
    paddingTop: '4%',
    fontFamily: R.fonts.primaryMed,
  },
  orderButtonStyle: {
    flexDirection: 'row',
    backgroundColor: R.themes.backgroundColor,
    height: R.dimensions.hp('4.5%'),
    width: R.dimensions.wp('30%'),
    marginTop: '7%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'space-between',
  },
  feedbackText: {
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primaryBold,

    textAlign: 'center',

    color: R.themes.backgroundColor,
  },
  discoverText: {
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primaryMedium,
    color: R.themes.backgroundColor,
  },

  imageCard: {
    flexDirection: 'row',
  },
  flatlist: {
    marginBottom: '2%',
    marginTop: '2%',
    width: '93%',
    alignSelf: 'center',
  },
  button: {
    fontSize: R.dimensions.hp('1.8%'),
    fontWeight: 'bold',
  },
  mainContainer: {
    marginVertical: '2%',
    marginHorizontal: '3%',
    width: '94%',
    alignSelf: 'center',
    height: R.dimensions.hp('5%'),
    borderWidth: 0.5,
    borderColor: R.themes.boxBackgroundColour,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: R.themes.backgroundColor,
  },
  mainContainersStyle: {
    overflow: 'hidden',
    marginVertical: '3%',
    marginHorizontal: '3%',
    width: R.dimensions.wp(75),
    alignSelf: 'flex-start',
    height: R.dimensions.hp(7),
    borderWidth: 0.5,
    borderColor: R.themes.darkCardBackgroundColor,
    flexDirection: 'row',
  },

  card: {
    backgroundColor: R.themes.backgroundColor,
    marginLeft: '5%',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    borderRadius: 10,
    height: R.dimensions.hp('2.8%'),
    justifyContent: 'center',
    alignItems: 'center',
    width: R.dimensions.wp('12%'),
  },
  mobView: {
    alignItems: 'flex-end',
    flex: 1,
  },
  dotStyle: {
    width: 10,
    height: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: R.colors.darkorange,
  },
  bImage: {
    alignSelf: 'center',
    height: R.dimensions.hp('30%'),
    width: R.dimensions.wp('95%'),
    borderRadius: 30,
    marginTop: '1%',
  },

  //Service List
  servicemainView: {
    width: R.dimensions.wp(30),
    height: R.dimensions.hp(15),
    alignItems: 'center',

    justifyContent: 'center',

    // borderColor:"#ecececec",
    // borderWidth:0.75
  },
  serviceimgView: {
    alignItems: 'center',
    justifyContent: 'center',

    padding: '4%',
    alignSelf: 'center',
  },
  serviceimg: {
    height: R.dimensions.wp(11),
    width: R.dimensions.wp(11),
    tintColor: R.themes.darkCardBackgroundColor,
  },
  servicetext: {
    //marginTop: '5%',
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp(1.8),

    color: '#000000',
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 5,
  },

  //parking
  parking: {
    flexDirection: 'row',
    marginVertical: '2%',
    paddingHorizontal: 10,
    //backgroundColor:R.themes.bannerBackgroundColour
  },
  parkingImg: {
    height: R.dimensions.hp('8%'),
    width: R.dimensions.wp('18%'),
    tintColor: R.themes.backgroundColor,
  },
  parkingTextView: {
    marginHorizontal: '2%',
    justifyContent: 'center',
  },
  markparkingText: {
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.hp('1.6%'),
    fontFamily: R.fonts.primaryRegular,
  },
  parkinginfoText: {
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.hp('1.6%'),
    fontFamily: R.fonts.primaryRegular,
    paddingRight: '20%',
    marginVertical: '2%',
    marginHorizontal: '2.5%',
  },
});
