import {StyleSheet, Platform} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  mainView: {
    flex: 1,
    //width: R.dimensions.wp(16),
    alignItems: 'center',
    marginTop: '3%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    // backgroundColor: 'white',
  },
  imgView: {
    height: R.dimensions.wp(14),
    width: R.dimensions.wp(14),
    borderRadius: 5,
    borderColor: R.themes.borderColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: R.themes.boxBackgroundColour,
  },
  img: {
    width: R.dimensions.wp(8),
    height: R.dimensions.wp(8),
    tintColor: R.themes.backgroundColor,
  },
  text: {
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp(1.4),
    // textAlign: 'center',
    color: R.themes.darkTextColor,
    marginLeft: '5%',

    // width: '70%',
    paddingRight: '10%',
  },
});
