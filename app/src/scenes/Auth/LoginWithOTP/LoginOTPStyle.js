import {StyleSheet, Platform} from 'react-native';
//local import
import {horizontalScale} from '../../../../res/scale';
import R from '../../../R';

export default StyleSheet.create({
  text: {
    fontSize: R.dimensions.h3,
    color: R.themes.backgroundColor,

    alignSelf: 'center',
    marginTop: R.dimensions.hp(5),
    fontFamily: R.fonts.primaryBold,
  },
  mainContainer: {
    height: R.dimensions.hp(35),
    backgroundColor: R.colors.primaryBrand2,
  },
  textInputView: {
    marginTop: '2%',
  },
  signinBtn: {
    width: R.dimensions.wp(82),
    height: R.dimensions.hp(5),
    backgroundColor: R.themes.boxBackgroundColour,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginHorizontal: 27,
    marginTop: R.dimensions.hp(3),
    marginVertical: Platform.OS == 'ios' ? '2%' : '7%',
  },

  nextBtn: {
    width: R.dimensions.wp(87),
    height: R.dimensions.hp(7),
    backgroundColor: R.colors.darkorange,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 27,
    marginVertical: Platform.OS == 'ios' ? '2%' : '1%',
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

  inputStylePwd: {
    marginHorizontal: 30,
    borderBottomColor: R.colors.lightgrey,
    width: R.dimensions.wp('85%'),
    marginTop: R.dimensions.hp(5),
  },
  btntext: {
    textAlign: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
  },
  canceltext: {
    textAlign: 'center',
    color: R.colors.black,
    fontFamily: R.fonts.primaryBold,
  },
  textInputImage: {
    marginLeft: horizontalScale(25),
  },
  image: {
    height: horizontalScale(25),
    width: horizontalScale(25),
  },
  tickImage: {
    alignSelf: 'center',
    height: horizontalScale(25),
    width: horizontalScale(25),
    marginLeft: horizontalScale(10),
  },

  ButtonView: {
    marginTop: horizontalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.colors.darkorange,
  },
});
