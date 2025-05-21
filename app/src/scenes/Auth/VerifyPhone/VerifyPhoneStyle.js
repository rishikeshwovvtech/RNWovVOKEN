import {Platform, StyleSheet} from 'react-native';
//local import
import {horizontalScale} from '../../../../res/scale';
import R from '../../../R';

export default StyleSheet.create({
  mainHeadingText: {
    fontSize: R.dimensions.wp(4),
    fontFamily: R.fonts.primarySemiBold,
    color: R.themes.darkTextColor,
    textAlign: 'center',
    marginTop: '5%',
  },
  subHeadingText: {
    fontSize: R.dimensions.wp(3.5),
    fontFamily: R.fonts.primarySemiBold,
    color: R.themes.darkTextColor,
    textAlign: 'center',
    margin: '5%',
  },
  otpMainView: {
    marginVertical: '10%',
    height: R.dimensions.wp(10),
    marginHorizontal: '5%',
  },
  optInputBoxesView: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: R.themes.borderColor,
    borderBottomWidth: 1,
    color: R.themes.darkTextColor,
  },
  otpSecondsText: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.hp(1.7),
    alignSelf: 'center',
  },
  resendOtpText: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.hp(2),
    alignSelf: 'center',
    marginVertical: '5%',
  },
});
