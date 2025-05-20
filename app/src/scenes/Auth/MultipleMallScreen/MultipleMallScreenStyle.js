import {Dimensions, StyleSheet} from 'react-native';
//local import
import R from '../../../R';
const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  itemMainContainer: {
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: R.themes.borderColor,
    padding: R.dimensions.hp('1%'),
    borderRadius: 2,
    margin: R.dimensions.hp('0.5%'),
    justifyContent: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp(1.6),
  },

  flatListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: '2%',
  },
});
