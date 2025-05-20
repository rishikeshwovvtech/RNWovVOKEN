import {StyleSheet,} from 'react-native';
import scale from '../../utils/Scale'; 
import R from '../../R';
import React from 'react';

export default StyleSheet.create({


  image: {
    height: scale(22),
    width: scale(22),
  },
  textInputContainer: {
    marginTop: scale(20),
    alignSelf: 'center',
    width: scale(300),
  },
  textInput: {
    height: scale(55),
    flex: 1,
    fontSize: scale(15),
  },
  ButtonView: {
    alignSelf: 'center',
    width: scale(300),
  },
  view: {
    flexDirection: 'row',
    marginTop: scale(30),
    alignSelf: 'center',
  },
  viewText: {
    alignSelf: 'center',
    marginTop: scale(30),
    flexDirection: 'row',
  },
  accountText: {
    fontSize: scale(16),
    color: R.colors.white,
  },
  signUpText: {
    marginLeft: scale(5),
    fontSize: scale(16),
    color: R.colors.pink,
    fontWeight: 'bold',
  },
});
