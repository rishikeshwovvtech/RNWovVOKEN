import {StyleSheet, Platform} from 'react-native';
//local import
import {horizontalScale} from '../../../../res/scale';
import R from '../../../R';

export default StyleSheet.create({
  phoneNumberText: {
    fontSize: horizontalScale(17),
    fontFamily: R.fonts.primaryBold,
    // marginTop: horizontalScale(2),

    alignSelf: 'center',
    color: R.themes.backgroundColor,
  },
  mainContainer: {
    height: R.dimensions.hp(30),
  },
  nextBtn: {
    width: R.dimensions.wp(87),
    height: R.dimensions.hp(7),
    backgroundColor: R.themes.boxBackgroundColour,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 27,
    marginVertical: Platform.OS == 'ios' ? '2%' : '1%',
  },
  btntext: {
    textAlign: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
  },
  nexttext: {
    textAlign: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
  },
  canceltext: {
    textAlign: 'center',
    color: R.colors.primaryBrand2,
    fontFamily: R.fonts.primaryBold,
  },
  cancelBtn: {
    width: R.dimensions.wp(87),
    height: R.dimensions.hp(7),
    backgroundColor: R.themes.backgroundColor,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 27,
    marginVertical: Platform.OS == 'ios' ? '2%' : '5%',
  },
  numberText: {
    fontSize: horizontalScale(17),
    fontFamily: R.fonts.primaryBold,
    marginTop: horizontalScale(20),
    alignSelf: 'center',
    color: R.themes.backgroundColor,
  },
  codeText: {
    fontSize: horizontalScale(14),
    marginTop: horizontalScale(50),
    alignSelf: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryRegular,
  },
  text: {
    fontSize: horizontalScale(14),
    alignSelf: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryRegular,
  },
  continueText: {
    fontSize: horizontalScale(14),
    marginTop: R.dimensions.hp(15),
    alignSelf: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
  },
  buttonView: {
    marginTop: horizontalScale(50),
  },
  cancelButton: {
    backgroundColor: R.colors.coolGrey,
    height: horizontalScale(50),
    borderRadius: horizontalScale(22),
    width: horizontalScale(160),
    alignSelf: 'center',
  },
  nextButton: {
    height: horizontalScale(50),
    borderRadius: horizontalScale(22),
    width: horizontalScale(160),
    alignSelf: 'center',
  },
});
