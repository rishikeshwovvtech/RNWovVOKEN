import {Platform, StyleSheet} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  mainContainer: {
    margin: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText1: {
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.hp(3),
    color: R.themes.darkTextColor,
    marginTop: '5%',
  },
  mainText2: {
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp(2),
    color: R.themes.darkTextColor,
  },
});
