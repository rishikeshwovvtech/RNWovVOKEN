import {StyleSheet} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  mainCardContainer: {
    height: R.dimensions.hp(6),
    backgroundColor: R.themes.darkCardBackgroundColor,
    width: R.dimensions.wp(42),
    marginBottom: R.dimensions.hp(3),
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    marginTop: '1%',
  },
  cardText: {
    fontSize: R.dimensions.hp('2.2%'),
    color: R.themes.lightTextColor,
    marginHorizontal: '5%',
    fontFamily: R.fonts.primaryBold,
    padding: R.dimensions.hp(1),
    alignSelf: 'center',
  },
});
