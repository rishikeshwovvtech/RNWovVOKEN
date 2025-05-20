import {StyleSheet, Platform} from 'react-native';
//local import
import R from '../../R';

export default StyleSheet.create({
  childView: {
    flexDirection: 'row',
    flex: 1,
    marginVertical: '5%',
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryBold,
    paddingLeft: 25,
    alignSelf: 'center',
  },
  shopImg: {
    alignSelf: 'center',
    backgroundColor: R.themes.backgroundColor,
    height: R.dimensions.hp('7%'),
    width: R.dimensions.wp('18%'),
  },
  heartImg: {
    alignSelf: 'center',
    // justifyContent: 'flex-end',
    height: R.dimensions.hp('8%'),
    width: R.dimensions.wp('13%'),
  },
});
