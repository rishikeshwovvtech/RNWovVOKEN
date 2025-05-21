import {StyleSheet} from 'react-native';
//local import
import {horizontalScale} from '../../../../res/scale';
import R from '../../../R';

export default StyleSheet.create({
  filterView: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: horizontalScale(35),
    marginTop: horizontalScale(15),
  },
  filterImage: {
    width: horizontalScale(25),
    height: horizontalScale(25),
  },
  filterText: {
    fontSize: horizontalScale(15),
    marginLeft: horizontalScale(10),
    color: R.colors.black,
  },
  cardView: {
    backgroundColor: R.themes.backgroundColor,
    width: horizontalScale(330),
    height: horizontalScale(130),
    padding: horizontalScale(5),
    alignSelf: 'center',
    marginTop: horizontalScale(15),
    borderRadius: horizontalScale(12),
  },
  cardContainer: {
    flexDirection: 'row',
    marginLeft: horizontalScale(10),
    marginTop: horizontalScale(10),
  },
  view: {
    borderBottomColor: R.colors.coolGrey,
    borderBottomWidth: 0.3,
    paddingBottom: horizontalScale(5),
  },
  coinImage: {
    width: horizontalScale(20),
    height: horizontalScale(20),
  },
  text: {
    fontSize: horizontalScale(10),
    marginLeft: horizontalScale(30),
    color: R.colors.black,
  },
  billImage: {
    width: horizontalScale(70),
    marginLeft: horizontalScale(50),
    height: horizontalScale(70),
  },
  billText: {
    fontSize: horizontalScale(10),
    marginLeft: horizontalScale(10),
    color: R.colors.coolGrey,
    opacity: horizontalScale(0.5),
  },
  customTxtStyle: {
    fontSize: horizontalScale(10),
    // fontWeight:'bold',
    color: R.themes.backgroundColor,
  },
});
