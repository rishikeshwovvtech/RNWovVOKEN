import {StyleSheet} from 'react-native';
//local import
import {dimensions} from '../../../../res/dimensions';
import R from '../../../R';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dayText: {
    fontSize: dimensions.h2,
    fontFamily: R.fonts.primaryBold,
    color: R.colors.black,
    padding: '1%',
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    opacity: 0.1,
    padding: '1%',
  },
  titletext: {
    color: R.colors.red,
    fontSize: dimensions.h2,
    fontFamily: R.fonts.primaryBold,
    textAlign: 'center',
    padding: '6%',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  image: {
    height: R.dimensions.hp('25%'),
    width: R.dimensions.wp('50%'),
  },
  favouriteText: {
    fontSize: R.dimensions.hp('2.5%'),
    fontFamily: R.fonts.primaryBold,
    color: R.colors.coolGrey,
    marginTop: '10%',
  },
  text: {
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryBold,
    marginTop: '5%',
  },
});
