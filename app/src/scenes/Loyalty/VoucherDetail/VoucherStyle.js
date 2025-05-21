import {StyleSheet} from 'react-native';
import R from '../../../R';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000AA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    backgroundColor: R.themes.backgroundColor,
    width: R.dimensions.wp('92%'),
    paddingBottom: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: R.themes.boxBackgroundColour,
  },
  abstractBackground: {
    height: R.dimensions.wp('5%'),
    // width: '100%',
    //borderTopLeftRadius: 10,
    //borderTopRightRadius: 10,
  },

  aldoLogo: {
    height: R.dimensions.wp('20%'),
    width: R.dimensions.wp('26%'),
    alignSelf: 'center',
  },

  star1: {
    height: '5%',
    width: '5%',
    alignSelf: 'flex-end',
    paddingRight: '25%',
  },

  giftText: {
    fontFamily: R.fonts.primaryRegular,
    fontSize: 25,
    textAlign: 'center',
    paddingHorizontal: '2%',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1%',
  },

  star2: {
    height: R.dimensions.wp('8%'),
    width: R.dimensions.wp('8%'),
    //paddingBottom: '6%',
    //marginRight: '10%',
  },

  priceText: {
    color: R.themes.accountTextColour,
    fontFamily: R.fonts.primaryRegular,
    fontSize: 20,
    alignItems: 'center',
    marginTop: 5,
  },

  horizontalLine: {
    borderBottomWidth: 1,
    borderWidth: 0.42,
    width: '60%',
    // flex:0,
    // height:10,
    borderColor: R.themes.accountTextColour,
    alignSelf: 'center',
    marginTop: 5,
  },

  voucherText: {
    fontFamily: R.fonts.primaryLight,
    marginTop: '5%',
    marginHorizontal: '1%',
    alignSelf: 'center',
    fontSize: 20,
    color: R.colors.coolGrey,
  },

  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '8%',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#EAC583',
    borderRadius: 5,
    padding: '3%',
  },

  coinContainer: {
    marginVertical: '5%',
    flexDirection: 'row',
    width: '40%',

    marginHorizontal: '7%',
    backgroundColor: R.colors.primaryBrand2,
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: '2%',
  },
});

export {styles};
