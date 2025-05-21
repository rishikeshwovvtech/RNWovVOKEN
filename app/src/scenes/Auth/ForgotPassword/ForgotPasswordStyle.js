import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp(3),
    color: R.themes.darkTextColor,
    marginTop: '5%',
  },
  helpingText: {
    textAlign: 'center',
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.hp(2),
    color: R.themes.darkTextColor,
    marginTop: '5%',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  radioButtonText: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.wp(3.5),
    fontWeight: 'bold',
  },
  radioButtonMainContainer: {
    flexDirection: 'row',
    marginVertical: '5%',
    justifyContent: 'space-between',
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
