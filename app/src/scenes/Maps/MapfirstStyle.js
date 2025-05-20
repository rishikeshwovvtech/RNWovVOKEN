import {StyleSheet} from 'react-native';
//local import
import {dimensions} from '../../../res/dimensions';
import R from '../../R';

export default StyleSheet.create({
  imageBackgroundContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: R.dimensions.wp(30),
    width: R.dimensions.wp(60),
  },
  text1: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp('1.6%'),
    textAlign: 'center',
    lineHeight: 15,
    fontWeight: '400',
    flex: 0.3,
  },
  text2: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2.2%'),
    marginTop: '5%',
    textAlign: 'center',
    flex: 0.2,
  },
  text3: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2.2%'),
    textAlign: 'center',
    flex: 0.2,
  },

  servicemainView: {
    flexDirection: 'row',
    marginVertical: '4%',
    width: R.dimensions.wp(30),
  },
  serviceimgView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
    alignSelf: 'center',
  },
  serviceimg: {
    height: R.dimensions.wp(5),
    width: R.dimensions.wp(5),
    tintColor: R.themes.darkButtonColor,
  },
  servicetext: {
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.wp(4),
    color: R.themes.darkButtonColor,
    marginStart: '10%',
  },
  navigateButtonContainer: {
    backgroundColor: R.themes.darkCardBackgroundColor,
    margin: '5%',
    // width: R.dimensions.wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    flexDirection: 'row',
    borderRadius: 3,
  },
  navigateButtonText: {
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.wp(3.5),
    color: R.themes.darkTextColor,
  },
});
