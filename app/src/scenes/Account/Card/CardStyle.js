import {StyleSheet} from 'react-native';
//local import
import {dimensions} from '../../../../res/dimensions';
import R from '../../../R';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  button: {
    marginVertical: '5%',
    width: dimensions.wp('40%'),
    height: dimensions.hp('7%'),
    backgroundColor: '#cc3300',
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    color: R.themes.backgroundColor,
  },
  buttontext: {
    color: R.themes.backgroundColor,
    fontSize: dimensions.h2,
    fontFamily: R.fonts.primaryBold,
    // fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '15%',
  },
});
