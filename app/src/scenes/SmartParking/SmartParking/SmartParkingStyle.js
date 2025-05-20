import {StyleSheet, Platform} from 'react-native';
import R from '../../../R';
//local import

export default StyleSheet.create({
  // mainContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: R.dimensions.wp(90),
  //   height: R.dimensions.hp(15),
  //   marginTop: '5%',
  //   elevation: 6,
  //   backgroundColor: R.themes.darkCardBackgroundColor,
  //   borderRadius: R.dimensions.hp(2),
  // },

  mainCardContainer: {
    // height: R.dimensions.hp(6),
    backgroundColor: R.themes.darkCardBackgroundColor,
    width: R.dimensions.wp(42),
    marginBottom: R.dimensions.hp(3),
    paddingVertical: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    width: '100%',
    marginTop: '1%',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  floorText: {
    textAlign: 'center',
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2%'),
    color: R.themes.lightTextColor,
  },
  cardText: {
    fontSize: R.dimensions.hp('2.2%'),
    color: R.themes.lightTextColor,
    marginHorizontal: '2%',
    fontFamily: R.fonts.primaryBold,
    padding: R.dimensions.hp(0.5),
    alignSelf: 'center',
  },
});
