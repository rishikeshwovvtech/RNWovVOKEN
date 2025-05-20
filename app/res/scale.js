import {Dimensions, Platform} from 'react-native';
//TODO remove this implmentation move it percentage
//Screen Constatnts
const SCREEN_HEIGHT =
  Platform.OS === 'ios' || Dimensions.get('window').height > 550
    ? Dimensions.get('window').height
    : 667;
const SCREEN_WIDTH = 375;

const {height, width} = Dimensions.get('window');

const horizontalScale = (units = 1) => (width / SCREEN_WIDTH) * units;

const verticalScale = (size) => (height / SCREEN_HEIGHT) * size;

export {verticalScale, horizontalScale};
