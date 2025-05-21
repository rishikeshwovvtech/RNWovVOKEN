import {StyleSheet} from 'react-native';
//local import
import R from '../../../../R';
export default StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: R.themes.backgroundColor,
  },

  searchBar: {
    // fontSize: R.dimensions.hp('2%'),
    // fontFamily:R.fonts.primaryLight,
    margin: 10,
    width: R.dimensions.wp('93%'),
    height: R.dimensions.hp('5%'),
    backgroundColor: R.themes.backgroundColor,
    borderRadius: 10,
    borderColor: R.colors.orange,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTextStyle: {
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryLight,
    marginLeft: R.dimensions.hp('2%'),
    color: R.colors.grey,
  },
  cardStyle: {
    elevation: 5,
    backgroundColor: R.colors.primaryBrand2,
    //  padding: 10,
    width: R.dimensions.wp('100%'),
    // borderRadius: 3,
    margin: R.dimensions.hp('1.3%'),
    // flexDirection: 'row',
    // justifyContent: 'space-between',

    // borderWidth:0.5,
    // borderColor:R.colors.orange
  },
  imgStyle: {
    height: R.dimensions.hp('11%'),
    width: R.dimensions.wp('20%'),
    borderRadius: 10,
  },

  bImage: {
    alignSelf: 'center',
    height: R.dimensions.hp('70%'),
    width: R.dimensions.wp('75%'),
    //borderRadius: 30,
    marginTop: '1%',
  },
  modalContainer: {
    //backgroundColor: '#ffffff',
    width: R.dimensions.wp('65%'),
    position: 'absolute',
    top: '20%',
    height: R.dimensions.wp('120%'),
    borderRadius: 10,
  },
  Mcontainer: {
    flex: 1,
    backgroundColor: '#ffffff00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinImage: {
    width: R.dimensions.wp(4),
    height: R.dimensions.hp(2.5),
    alignSelf: 'center',
  },
  idTextStyle: {
    color: R.themes.accountTextColour,
    fontSize: R.dimensions.hp('1.4%'),
    fontFamily: R.fonts.primaryMedium,
    marginTop: R.dimensions.wp('2%'),
  },
  linearGradient: {
    width: '100%',
    marginVertical: '2%',
    borderColor: R.themes.accountTextColour,
  },
});
