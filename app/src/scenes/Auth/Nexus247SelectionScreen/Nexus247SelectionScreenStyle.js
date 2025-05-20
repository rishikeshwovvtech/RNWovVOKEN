import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  welcomeText: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp(4),
    marginLeft: '3%',
    marginTop: '3%',
  },
  view: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
