import {StyleSheet} from 'react-native';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoImage: {
    height: scale(150),
    width: scale(150),
  },
  logoTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoText: {
    height: scale(80),
    width: scale(200),
  },
});
