import {StyleSheet, Platform} from 'react-native';
//local import
import R from '../../R';

export default StyleSheet.create({
  popUpView: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: '#FFE1AC',
    width: R.dimensions.wp('95%'),
    height: R.dimensions.hp('8%'),
    alignSelf: 'center',
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  mainContainer: {
    marginVertical: '2%',
    marginHorizontal: '3%',
    width: '94%',
    alignSelf: 'center',
    height: R.dimensions.hp('5%'),
    borderWidth: 0.5,
    borderColor: R.themes.boxBackgroundColour,
    flexDirection: 'row',
    borderRadius: 8,
    //justifyContent: 'space-between',
    backgroundColor: R.themes.backgroundColor,
  },
  popUpStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
  },
  popUpText: {
    width: R.dimensions.wp('70%'),
    textAlign: 'center',
  },
  undoText: {
    color: R.themes.boxBackgroundColour,
    alignSelf: 'center',
    paddingRight: 10,
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
    color: R.themes.backgroundColor,
    marginTop: '10%',
  },
  text: {
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryBold,
    color: R.themes.backgroundColor,
    marginTop: '5%',
  },
});
