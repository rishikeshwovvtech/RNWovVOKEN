import {Platform, StyleSheet} from 'react-native';
//local import
import {horizontalScale} from '../../../../res/scale';
import R from '../../../R';

export default StyleSheet.create({
  nexusLogoView: {
    width: '80%',
    marginHorizontal: '2%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: R.themes.backgroundColor,
  },
  nexusLogo: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  welcomeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '5%',
  },
  welcomeText: {
    fontSize: R.dimensions.hp(4),
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryBold,
  },
  welcomeSubText: {
    marginTop: '2%',
    fontSize: R.dimensions.hp(2),
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryMedium,
    textAlign: 'center',
  },
  radioButtonText: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.wp(3.5),
    marginLeft: '2%',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  radioButtonMainContainer: {
    flexDirection: 'row',
    marginVertical: '5%',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  radioButtonText: {
    fontSize: R.dimensions.wp(3.5),
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryMedium,
  },
  radioButtonView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  genderSelectionMainContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    margin: '5%',
  },

  bottomNoteText: {
    fontSize: R.dimensions.wp(3),
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryRegular,
    textAlign: 'center',
    marginBottom: '5%',
    marginTop: '2%',
  },
  signInText: {
    fontSize: R.dimensions.hp(2),
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryRegular,
    marginVertical: '3%',
    textAlign: 'center',
  },
  ////////////////////////////////////////////
  image: {
    height: horizontalScale(22),
    width: horizontalScale(22),
  },
  textInputContainer: {
    marginTop: horizontalScale(20),
    alignSelf: 'center',
    width: horizontalScale(300),
  },
  textInput: {
    height: horizontalScale(55),
    flex: 1,
    fontSize: horizontalScale(15),
  },
  ButtonView: {
    alignSelf: 'center',
    width: horizontalScale(300),
    backgroundColor: R.themes.backgroundColor,
  },
  view: {
    flexDirection: 'row',
    marginTop: horizontalScale(30),
    alignSelf: 'center',
  },
  viewText: {
    alignSelf: 'center',
    marginTop: horizontalScale(30),
    flexDirection: 'row',
  },
  signUpText: {
    marginLeft: horizontalScale(5),
    fontSize: horizontalScale(16),
    color: R.colors.pink,
    fontWeight: 'bold',
  },
  mainContainer: {
    height: R.dimensions.hp(30),
    width: '100%',
    resizeMode: 'stretch',
    backgroundColor: R.colors.primaryBrand2,
  },
  welText: {
    fontSize: R.dimensions.h5,
    fontFamily: R.fonts.primaryBold,
    color: R.themes.backgroundColor,
  },
  texts: {
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.h1,
    fontFamily: R.fonts.primaryMed,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: R.dimensions.hp(2),
  },
  inputStyle: {
    marginHorizontal: 30,
  },
  inputStylePwd: {
    marginHorizontal: 30,
    borderBottomColor: R.colors.lightgrey,
    marginTop: 15,
  },
  signinBtn: {
    width: R.dimensions.wp(87),
    height: R.dimensions.hp(7),
    backgroundColor: R.themes.boxBackgroundColour,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 27,
    marginVertical: Platform.OS == 'ios' ? '2%' : '7%',
  },
  btntext: {
    textAlign: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
  },
  circleStyle: {
    backgroundColor: R.themes.boxBackgroundColour,
    borderRadius: 50,
    elevation: 10,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: R.themes.backgroundColor,
    // height: Platform.OS == 'ios' ? '55%' : '58%',
    shadowOffset: {
      height: 0.5,
      width: 0.5,
    },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  imageStyle: {
    // backgroundColor: R.colors.aquablue,
    // color: R.themes.backgroundColor,
    marginHorizontal: 20,
  },
  accountText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  text2: {
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.hp(1.8),
    fontFamily: R.fonts.primaryMed,
  },
  iconInput: {
    marginVertical: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  ///

  container: {
    marginTop: horizontalScale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: R.dimensions.h3,
    fontFamily: R.fonts.primaryBold,
    color: R.colors.black,
  },
  otpText: {
    fontFamily: R.fonts.primaryMed,
    marginTop: R.dimensions.hp(2),
    color: R.colors.black,
  },
  numberText: {
    fontFamily: R.fonts.primaryMed,
    marginTop: R.dimensions.hp(1),
    color: R.colors.black,
  },
  buttonView: {
    marginTop: horizontalScale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    borderRadius: 5,
    backgroundColor: R.themes.backgroundColor,
    height: horizontalScale(45),
    width: horizontalScale(40),
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: horizontalScale(30),
  },
  validTextView: {
    //marginTop: horizontalScale(20),
    alignItems: 'center',
  },
  validText: {
    fontSize: horizontalScale(12),
    color: R.themes.backgroundColor,
  },
  nextBtn: {
    width: R.dimensions.wp(87),
    height: R.dimensions.hp(7),
    backgroundColor: R.colors.darkorange,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 27,
    marginVertical: Platform.OS == 'ios' ? '2%' : '7%',
    marginTop: R.dimensions.hp(15),
  },
  cancelBtn: {
    width: R.dimensions.wp(87),
    height: R.dimensions.hp(7),
    backgroundColor: R.themes.backgroundColor,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 27,
    marginVertical: Platform.OS == 'ios' ? '2%' : '2%',
  },
  resendOtpView: {
    flexDirection: 'row',
  },
  resendOtpTextOne: {
    fontSize: horizontalScale(15),
    marginTop: horizontalScale(25),
    color: R.themes.backgroundColor,
    fontWeight: 'bold',
  },
  resendOtpTextTwo: {
    fontSize: horizontalScale(15),
    marginTop: horizontalScale(25),
    color: R.themes.backgroundColor,
  },
  underlineStyleBase: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 15,
    color: R.colors.black,
    //borderBottomWidth: 1,
    borderColor: R.colors.grey,
    backgroundColor: R.themes.backgroundColor,
  },
  underlineStyleHighLighted: {
    borderColor: 'grey',
    backgroundColor: 'white',
  },
  checkboxContainer: {
    flex: 0.5,
    marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    color: R.themes.boxBackgroundColour,
    alignSelf: 'center',
  },
  label: {
    margin: 7,
  },
  accountTextCheck: {
    marginTop: '0%',
    flex: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  text3: {
    marginTop: 4,
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primaryMed,
  },

  mobileContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    height: '6%',
    width: '81%',
    marginTop: 20,
    borderRadius: 10,
  },
  mobileView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: Platform.OS == 'ios' ? '5%' : '0%',
    height: Platform.OS == 'ios' ? 50 : 45,

    paddingHorizontal: Platform.OS == 'ios' ? '2%' : '0%',
    borderRadius: 10,
    width: '22%',
  },
  counrtySelectionText: {paddingLeft: 10, zIndex: 2, alignSelf: 'center'},
  mobileDropDownView: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: 'black',
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  mobileVerticalLine: {
    height: 20,
    width: 1.5,
    backgroundColor: 'black',
    alignSelf: 'center',
  },

  dateTextInputView: {
    flexDirection: 'row',
    marginTop: '5%',
    backgroundColor: R.themes.backgroundColor,
    borderRadius: 10,
    height: 50,
    width: '81%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  dateText: {
    start: -10,
    color: R.colors.black,
    width: ' 80%',
    marginHorizontal: '8%',
  },
  calendarImgView: {
    height: 23,
    end: 30,
  },
  datePickerView: {
    backgroundColor: 'white',
    width: '80%',
    alignSelf: 'center',
  },
  tandccheckboxView: {
    flexDirection: 'row',
    marginHorizontal: '8%',
    alignSelf: 'center',
    marginTop: '5%',
    marginStart: '11%',
  },
  signupButtonView: {
    padding: '3%',
    borderRadius: 10,
    backgroundColor: R.themes.boxBackgroundColour,
    marginTop: '5%',
    width: '80%',
    alignSelf: 'center',
  },
  signupButtonTextView: {
    fontSize: R.dimensions.hp(2),
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
    textAlign: 'center',
  },
  signInCointainer: {
    backgroundColor: '#610750',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
  },
  signInCText: {
    fontSize: R.dimensions.hp(2),
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryRegular,
  },
  signInButton: {
    padding: '3%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: R.themes.backgroundColor,
    marginTop: '5%',
    width: '80%',
  },
  skipTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%',
  },
  skipText: {
    fontSize: R.dimensions.hp(2),
    color: R.themes.boxBackgroundColour,
    fontFamily: R.fonts.primaryMedium,
    fontWeight: '700',
  },
});
