import {StyleSheet} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';
import React from 'react';

export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.voilet,
    flex: 1,
  },
  logoImage: {
    marginTop: scale(35),
    alignSelf: 'center',
    height: scale(35),
    width: scale(120),
  },
  passwordContainer: {
    marginTop: scale(20),
    alignSelf: 'center',
    width: scale(300),
  },
  image: {
    height: scale(22),
    width: scale(22),
  },
  nameContainer: {
    marginTop: scale(50),
    alignSelf: 'center',
    width: scale(300),
  },
  passwordText: {
    alignSelf: 'flex-end',
    marginTop: scale(10),
    fontSize: scale(14),
    color: R.colors.white,
    marginRight: scale(30),
  },
  LoginButtonView: {
    marginTop: scale(20),
    alignSelf: 'center',
    width: scale(300),
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
    marginLeft: scale(3),
    fontSize: scale(16),
    color: R.colors.pink,
    fontWeight: 'bold',
  },
});
