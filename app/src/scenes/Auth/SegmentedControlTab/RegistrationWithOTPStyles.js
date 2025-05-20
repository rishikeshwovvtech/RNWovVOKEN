import {StyleSheet,} from 'react-native';
import scale from '../../../utils/Scale';
import R from '../../../R';

export default StyleSheet.create({

  text:{
    fontSize: scale(16),
    color: R.colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: scale(60),
  },
  textInputView: {
    flexDirection: 'row',
    marginLeft: scale(60),
    marginTop: scale(20),
  },
  textInputImage: {
    marginLeft: scale(25),
  },
  image: {
    height: scale(25),
    width: scale(25),
  },
   tickImage:{
     alignSelf: 'center',
      height: scale(25),
       width: scale(25),
     marginLeft:scale(10),
  },

  ButtonView: {
    marginTop: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

});
