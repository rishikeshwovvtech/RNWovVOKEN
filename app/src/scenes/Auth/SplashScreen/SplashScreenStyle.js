import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nexusImage: {
    height: R.dimensions.hp(8),
    width: R.dimensions.hp(8),
  },
  nexusView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: R.dimensions.hp(1.5),
    marginHorizontal: R.dimensions.hp(0.7),
  },
  oneContainer: {
    height: R.dimensions.hp(10),
    width: R.dimensions.hp(10),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: R.dimensions.hp('50%'),
    backgroundColor: R.themes.darkCardBackgroundColor,
  },
  nexusPrimaryText: {
    fontSize: R.dimensions.wp(14),
    fontFamily: R.fonts.primarySemiBold,
    color: R.themes.darkTextColor,
  },
  oneText: {
    fontSize: R.dimensions.wp(7),
    textAlign: 'center',
    color: R.themes.lightTextColor,
    fontFamily: R.fonts.primaryMedium,
  },
});
