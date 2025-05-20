import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  headerss: {
    fontSize: R.dimensions.h2,
    fontFamily: R.fonts.primaryBold,
    alignSelf: 'center',
    paddingTop: 5,
  },
  textStyle: {
    backgroundColor: R.colors.orange,
    borderRadius: 15,
    color: R.themes.backgroundColor,
    width: '20%',
    fontSize: R.dimensions.h1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  textStyle: {
    backgroundColor: R.colors.orange,
    borderRadius: 15,
    color: R.themes.backgroundColor,
    width: '20%',
    fontSize: R.dimensions.h1,
    alignSelf: 'center',
    textAlign: 'center',
  },
  categoryList: {
    // justifyContent: 'space-evenly',
    marginLeft: R.dimensions.wp(3),
  },
  categoryMaincontainer: {
    padding: '5%',
  },
  textStyle: {
    color: R.colors.black,
    fontSize: 5,
  },
  seeAllbtn: {
    width: R.dimensions.wp(20),
    height: R.dimensions.hp(2.5),
  },
  btntext: {
    fontSize: 12,
  },
  Container: {
    // marginHorizontal: '4%',

    alignItems: 'center',
    marginVertical: '1%',
  },
  offerCategories: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  childView: {
    height: R.dimensions.wp('16%'),
    width: R.dimensions.wp('16%'),
    //borderRadius: 50,
    //borderColor: R.colors.secondryBrand,
    // borderWidth: 0.5,
    justifyContent: 'center',
  },
  header: {
    alignSelf: 'center',
    paddingTop: 5,
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('1.8%'),
  },
  cView: {
    height: R.dimensions.wp('16%'),
    width: R.dimensions.wp('16%'),
    //borderRadius: 50,
    //borderColor: R.colors.secondryBrand,
    //borderWidth: 0.5,
    justifyContent: 'center',
  },
  img: {
    alignSelf: 'center',
    height: R.dimensions.hp('4%'),
    width: R.dimensions.wp('8%'),
    // tintColor: R.colors.darkorange,
  },
  offerView: {
    marginHorizontal: 30,
    width: R.dimensions.wp(10),
    height: R.dimensions.hp(10),

    backgroundColor: R.themes.backgroundColor,
    borderRadius: 28,
    borderColor: R.colors.gainsboro,
    elevation: 5,
    borderWidth: 1,
  },
  shareImage: {
    marginVertical: 10,
    alignSelf: 'center',
    height: R.dimensions.hp(2.5),
    width: R.dimensions.wp(4.5),
  },
  hightlightView: {
    height: R.dimensions.hp(3),
    width: R.dimensions.wp(15),
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
  },
  hightlightText: {
    fontWeight: 'bold',
    fontSize: R.dimensions.hp('1.5%'),
    textAlign: 'center',
    color: R.themes.backgroundColor,
  },
  interestText: {
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primaryBold,
    marginTop: 2,
    color: R.colors.black,
    // marginLeft: 40,
    textAlign: 'center',
  },
  imageBackg: {
    height: R.dimensions.hp('8%'),
    width: R.dimensions.wp('18%'),
    alignSelf: 'center',
    backgroundColor: R.themes.backgroundColor,
  },
  text: {
    fontSize: R.dimensions.hp('1.2%'),
    fontFamily: R.fonts.primaryRegular,
    alignSelf: 'center',
    color: R.colors.coolGrey,
    width: '50%',
  },
  rootView: {
    // height: R.dimensions.wp('19%'),
    // width: R.dimensions.wp('19%'),
    //borderRadius: 50,
    //borderColor: R.colors.golden,
    //borderWidth: 1,
    // justifyContent: 'center',
  },

  slideImage: {
    alignSelf: 'center',
    height: R.dimensions.hp('30%'),
    width: R.dimensions.wp('95%'),
  },
  slideText: {
    color: R.themes.backgroundColor,
    width: R.dimensions.wp(75),
    paddingTop: 10,
  },
  slideTitle: {
    color: R.themes.backgroundColor,
    paddingTop: 10,
    fontFamily: R.fonts.primaryRegular,
  },
  changeBtn: {
    backgroundColor: R.colors.red,
  },
});
