import {StyleSheet, Platform} from 'react-native';
//local import
import R from '../../../R';

export default StyleSheet.create({
  container: {
    marginVertical: '2%',
    marginHorizontal: '3%',
    width: '94%',
    alignSelf: 'center',
    height: R.dimensions.hp('7%'),
    borderWidth: 0.5,
    borderColor: R.themes.backgroundColor,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: R.themes.backgroundColor,
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
  mainContainer: {
    marginVertical: '2%',
    marginHorizontal: '3%',
    width: '94%',
    alignSelf: 'center',
    height: R.dimensions.hp('5%'),
    borderWidth: 0.5,
    borderColor: R.colors.primaryBrand2,
    flexDirection: 'row',
    //borderRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: R.themes.backgroundColor,
  },
  searchImage: {
    alignSelf: 'center',
    height: R.dimensions.hp('3.5%'),
    width: R.dimensions.wp('6.5%'),
    marginHorizontal: '4%',
  },
  childView: {
    flexDirection: 'row',
    marginVertical: '5%',
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryBold,
    alignSelf: 'center',
    color: R.colors.black,
    paddingLeft: 25,
    fontWeight: 'bold',
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
    height: R.dimensions.hp('4%'),
    width: R.dimensions.wp('7%'),
  },
});
