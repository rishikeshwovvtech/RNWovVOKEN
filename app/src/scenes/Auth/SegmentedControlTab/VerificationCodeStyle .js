import {StyleSheet} from 'react-native';
import scale from '../../../utils/Scale';
import R from '../../../R';
import React from 'react';

export default StyleSheet.create({
  container: {
    marginTop: scale(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: scale(17),
    fontWeight: 'bold',
    color: R.colors.white,
  },
  otpText: {
    fontSize: scale(15),
    marginTop: scale(25),
    color: R.colors.white,
  },
  numberText: {
    fontSize: scale(17),
    marginTop: scale(5),
    color: R.colors.white,
  },
  buttonView: {
    marginTop: scale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    borderRadius: 5,
    backgroundColor: R.colors.white,
    height: scale(45),
    width: scale(40),
  },
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(30),
  },
  validTextView: {
    marginTop: scale(40),
    alignItems: 'center',
  },
  validText: {
    fontSize: scale(12),
    color: R.colors.white,
  },
  resendOtpView:{
  flexDirection: 'row'
 },
  resendOtpTextOne:{
    fontSize: scale(15),
    marginTop: scale(25),
    color: R.colors.white,
    fontWeight: 'bold',
  },
  resendOtpTextTwo:{
    fontSize: scale(15),
    marginTop: scale(25),
    color: R.colors.white,
  },

});
