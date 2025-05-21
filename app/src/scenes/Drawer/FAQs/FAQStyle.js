import {StyleSheet} from 'react-native';
import R from '../../../R';
import {horizontalScale} from '../../../../res/scale';
//TODO change font family import
export default StyleSheet.create({
  headerMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
  },
  container: {
    marginVertical: '2%',
    marginHorizontal: '3%',
    width: '94%',
    alignSelf: 'center',
    height: R.dimensions.hp('5%'),
    borderWidth: 0.5,
    borderColor: R.themes.boxBackgroundColour,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  searchImage: {
    alignSelf: 'center',
    height: R.dimensions.hp('3.5%'),
    width: R.dimensions.wp('6.5%'),
    marginHorizontal: '4%',
  },
  headerMainView2: {
    borderTopColor: R.themes.listDivider,
    borderTopWidth: 1,
    paddingTop: '5%',
    marginTop: '5%',
  },
  headerText: {
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2'),
    color: R.themes.darkTextColor,
  },
  headerImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    height: horizontalScale(8),
    width: horizontalScale(13),
    tintColor: R.themes.darkTextColor,
  },
  categoryList: {
    justifyContent: 'space-evenly',
    marginHorizontal: 5,
    // width: R.dimensions.wp(25),
    // height: R.dimensions.hp(4),
  },
  textStyle: {
    color: R.colors.black,
  },
  contentMainView: {
    //flexShrink: 1,
    //justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: '3%',
  },
  contentText: {
    fontSize: R.dimensions.hp(1.8),
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.darkTextColor,
  },
  otherQueryText: {
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp(2),
    alignSelf: 'center',
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    color: R.themes.darkTextColor,
  },
  divider: {
    borderWidth: 1,
    borderColor: R.colors.secondryBrand,
    marginVertical: '2%',
    marginHorizontal: '5%',
    marginTop: '5%',
  },
});
