import {StyleSheet,} from 'react-native';
import scale from '../../../utils/Scale';
import R from '../../../R';
import React from 'react';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(35),
  },
  logoImage: {
    height: scale(35),
    width: scale(120),
  },
  phoneNumberText: {
    fontSize: scale(17),
    fontWeight: 'bold',
    marginTop: scale(70),
    alignSelf: 'center',
  },
  numberText:{
    fontSize: scale(17),
    fontWeight: 'bold',
    marginTop: scale(20),
    alignSelf: 'center',
  },
  codeText:{
    fontSize: scale(14),
    marginTop: scale(50),
    alignSelf: 'center',
  },
  text: {
    fontSize: scale(14),
    alignSelf: 'center',
  },
  continueText:{
    fontSize: scale(14),
    marginTop: scale(35),
    alignSelf: 'center',
  },
  buttonView:{
    marginTop: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton:{
    backgroundColor: 'rgba(26,20,24,0.43)',
    height: scale(50),
    borderRadius: scale(22),
    width: scale(160),
    alignSelf: 'center',
  },
  nextButton:{
    backgroundColor: R.colors.voilet,
    height: scale(50),
    borderRadius: scale(22),
    width: scale(160),
    alignSelf: 'center',
  },

});
