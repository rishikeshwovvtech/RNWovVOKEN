import {StyleSheet} from 'react-native';
//local import
import {horizontalScale} from '../../../res/scale';
import R from '../../R';

export default StyleSheet.create({
  searchbar: {
    borderColor: R.themes.accountTextColour,
    backgroundColor: 'white',
    borderWidth: 1,
    marginVertical: '2%',

    paddingVertical: '4%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
  },
  currentfloor: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    marginTop: 10,
    marginRight: 10,

    // height: 50,
    // width: 50,
  },
  getdirTouchable: {
    borderRadius: 5,
    top: Platform.OS == 'ios' ? R.dimensions.hp('-0.6') : R.dimensions.hp('-1'),
    height: R.dimensions.hp('4.5%'),
    width: R.dimensions.wp('46%'),
    backgroundColor: R.colors.red,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.themes.darkCardBackgroundColor,
  },
  getdirText: {
    color: 'white',
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primaryBold,
  },
  nextCardbtn: {
    height: R.dimensions.hp('5%'),
    width: R.dimensions.wp('35%'),
    alignSelf: 'center',
    backgroundColor: R.themes.darkButtonColor,
  },
  descTxt: {
    fontSize: R.dimensions.hp('1.5%'),
    color: R.colors.black,
    fontFamily: R.fonts.primaryRegular,
  },
  img: {
    margin: 10,
    padding: 10,
    height: R.dimensions.wp(15),
    width: R.dimensions.wp(15),
    alignSelf: 'center',
  },
  nameTxt: {
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2.3%'),
  },

  NavigationItemStyle: {
    flexDirection: 'row',
    marginBottom: '4%',
    alignItems: 'center',
  },
  NavigationImageStyle: {
    height: 40,
    width: 40,
    tintColor: R.themes.darkIconColor,
  },
  startpoint: {
    alignSelf: 'center',
    paddingLeft: '3%',
    fontFamily: R.fonts.primaryBold,
    color: R.themes.darkCardBackgroundColor,
  },
  startpointdep: {
    alignSelf: 'center',
    fontFamily: R.fonts.primaryRegular,
    width: R.dimensions.wp(50),
    paddingHorizontal: 5,
    color: R.themes.darkCardBackgroundColor,
  },
  Avoidstairsstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '94%',
    alignSelf: 'center',
    marginTop: '8%',
    marginBottom: '5%',
  },
  Avoidstairstextstyle: {
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('1.8%'),
    color: R.themes.darkTextColor,
  },
  currentfloorstyle: {
    backgroundColor: R.themes.accountTextColour,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  currentfloortextstyle: {
    color: R.themes.backgroundColor,
    textAlign: 'center',

    fontSize: R.dimensions.hp(2.2),
  },
  resetstyle: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    marginTop: 100,
    marginRight: 15,
  },
  resetimage: {
    height: 30,
    width: 30,
    tintColor: R.themes.backgroundColor,
  },
  mainloaderview: {
    flex: 1,
    marginTop: '60%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 10,
  },
  Activityindicatorview: {
    backgroundColor: R.themes.backgroundColor,
    padding: '5%',
    borderRadius: 8,
    width: horizontalScale(300),
    alignItems: 'center',
  },
  ActivityindicatorText: {
    marginTop: '5%',
    fontSize: horizontalScale(12),
    fontFamily: R.fonts.primaryRegular,
    textAlign: 'center',
  },
});
