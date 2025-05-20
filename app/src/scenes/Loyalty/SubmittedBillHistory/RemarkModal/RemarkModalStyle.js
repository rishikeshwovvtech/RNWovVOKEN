import {StyleSheet} from 'react-native';
//local import
import R from '../../../../R';

export default StyleSheet.create({
  applyBtn: {
    backgroundColor: R.colors.redLight,
    width: R.dimensions.hp('30%'),
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
  },

  viewContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: R.dimensions.wp('100%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textStyle: {
    color: R.colors.black,
    fontFamily: R.fonts.primaryBold,
    // fontWeight: 'bold',
    fontSize: R.dimensions.hp('2.1%'),
    marginVertical: 5,
    marginTop: R.dimensions.hp('2%'),
  },
  radioText: {
    marginLeft: 10,
    fontFamily: R.fonts.primaryBold,
    color: R.colors.lightblack,
    // fontWeight: 'bold',
  },
  btnText: {
    textAlign: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
    //  fontWeight: 'bold',
    fontSize: R.dimensions.wp('4%'),
  },
  remarkContainer: {
    backgroundColor: '#F2F3F5',
    // position: 'absolute',
    //  bottom: 0,
    width: R.dimensions.wp('90%'),
    //   marginHorizontal: 5
  },
  RemarkText: {
    color: R.colors.black,
    fontFamily: R.fonts.primaryRegular,
    // fontWeight: 'bold',
    fontSize: R.dimensions.hp('1.8%'),
    marginVertical: 5,
    marginHorizontal: 5,
    //  marginTop: R.dimensions.hp('2%')
  },
  BulletText: {
    color: R.colors.black,
    fontFamily: R.fonts.primaryRegular,
    // fontWeight: 'bold',
    fontSize: R.dimensions.hp('1.8%'),
    marginHorizontal: 5,
    //  marginTop: R.dimensions.hp('2%')
  },
  BulletStyle: {
    color: '#DADADA',
    fontFamily: R.fonts.primaryRegular,
    // fontWeight: 'bold',
    fontSize: R.dimensions.hp('1.6%'),
    marginHorizontal: 5,
    //  marginTop: R.dimensions.hp('2%')
  },
  logo: {
    height: R.dimensions.hp('15%'),
    width: R.dimensions.wp('15%'),
  },
});
