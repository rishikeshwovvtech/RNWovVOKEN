import {StyleSheet, Platform} from 'react-native';
//local import
import {dimensions} from '../../../../res/dimensions';
import R from '../../../R';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  profileImageContainer: {
    height: Platform.OS == 'ios' ? R.dimensions.hp(18) : R.dimensions.hp(20),
    width: Platform.OS == 'ios' ? R.dimensions.wp(39) : R.dimensions.wp(40),

    marginVertical: '10%',
    alignSelf: 'center',
  },
  profileDetailsContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  detailsView: {
    marginVertical: '1%',
  },
  saveButton: {
    width: dimensions.wp(80),
    height: dimensions.hp('5%'),
    backgroundColor: R.themes.boxBackgroundColour,
    borderRadius: R.themes.theme == 'dark' ? 13 : null,
    alignItems: 'center',
    justifyContent: 'center',
    color: R.themes.backgroundColor,
  },
  buttontext: {
    color: R.themes.backgroundColor,
    fontSize: dimensions.h3,
    fontFamily: R.fonts.primaryBold,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
  },
  imageContainer: {
    height: Platform.OS == 'ios' ? R.dimensions.hp(18) : R.dimensions.hp(20),
    width: Platform.OS == 'ios' ? R.dimensions.wp(39) : R.dimensions.wp(40),
    borderRadius: 80,
  },
  reset: {
    color: R.themes.boxBorderColour,
    fontFamily: R.fonts.primaryBold,
    fontSize: dimensions.h1,
    marginVertical: '3%',

    alignSelf: 'center',
    marginTop: R.dimensions.h5,
    marginBottom: '10%',
  },
  cameraImage: {
    height: R.dimensions.hp(3),
    width: R.dimensions.wp(6),
    tintColor: R.themes.cameraTint,
  },
  circleStyle: {
    backgroundColor: R.themes.darkTextColor,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    bottom: 10,
    right: 130,
    position: 'absolute',
    borderColor: R.colors.primaryBlack,
    borderWidth: 1,
  },
});
