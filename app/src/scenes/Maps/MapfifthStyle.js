import {StyleSheet} from 'react-native';
import R from '../../R';
import scale from '../../utils/Scale';
export default StyleSheet.create({
  fourthView: {
    marginTop: scale(15),
    marginLeft: scale(10),
    borderRadius: scale(20),
    borderWidth: scale(1),
    height: scale(25),
    width: scale(90),
    justifyContent: 'center',
    borderColor: R.colors.lightgrey,
    marginBottom: scale(15),
  },
  shareText: {
    color: R.colors.black,
    textAlign: 'center',
    fontSize: scale(10),
    padding: scale(10),
  },
  text: {
    fontSize: scale(9),
    margin: scale(20),
  },
  image: {
    height: scale(600),
    width: scale(400),
  },
  view: {
    flexDirection: 'row',
    borderBottomColor: R.colors.black,
    borderWidth: 1,
  },
});
