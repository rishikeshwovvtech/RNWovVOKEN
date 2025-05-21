import {Platform, StyleSheet} from 'react-native';
import R from '../../../R';
import {horizontalScale} from '../../../../res/scale';

export default StyleSheet.create({
  nexusLogoView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5%',
  },
  socialLoginView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLoginButtonView: {
    width: R.dimensions.wp(12),
    height: R.dimensions.wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '2%',
    padding: '5%',
    borderRadius: 100,
    borderWidth: 1,
  },
  orMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  orViewDividerLine: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: 1,
    backgroundColor: R.themes.darkTextColor,
  },
  orViewText: {
    flex: 0.5,
    fontSize: R.dimensions.wp(3),
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryMedium,
    textAlign: 'center',
  },
  forgotPasswordText: {
    fontSize: R.dimensions.hp(2),
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryMedium,
    marginLeft: '10%',
    marginVertical: '3%',
  },
  dividerLine: {
    alignSelf: 'center',
    width: '80%',
    height: 1,
    backgroundColor: R.themes.darkTextColor,
    marginVertical: '5%',
  },
  signupContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: R.dimensions.hp(2),
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryRegular,
    alignSelf: 'center',
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
  loaderContainer: {
    flex: 1,
    marginTop: '65%',
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 10,
    backgroundColor: R.themes.backgroundColor,
    padding: '2%',
    borderRadius: 8,
    width: horizontalScale(300),
    alignItems: 'center',
  },
  loaderText: {
    marginTop: '5%',
    fontSize: horizontalScale(12),
    fontFamily: R.fonts.primaryRegular,
    textAlign: 'center',
  },
});
