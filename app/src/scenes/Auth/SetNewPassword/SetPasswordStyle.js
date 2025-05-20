import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  inputStylePwd: {
    marginBottom: '5%',
  },
  textInputView: {
    marginVertical: '5%',
    color: R.themes.backgroundColor,
  },
  subcontainer: {
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  text1: {
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp(3),
    color: R.themes.darkTextColor,
  },
  text2: {
    fontSize: R.dimensions.hp(2),
    marginTop: '3%',
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.darkTextColor,
  },

  container2: {
    flex: 1,
    marginHorizontal: '5%',
    marginTop: '3%',
  },
  button: {
    backgroundColor: R.themes.boxBackgroundColour,
    borderRadius: 15,
    padding: '5%',
    marginTop: '10%',
  },
  buttontext: {
    color: R.themes.backgroundColor,
    textAlign: 'center',
    fontFamily: R.fonts.primaryBold,
  },
});
