import {StyleSheet,} from 'react-native';
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
  customStyle: {
    alignSelf: 'center',
    height: scale(45),
    width: scale(260),
    marginTop: scale(45),
    borderRadius: scale(30),
    backgroundColor: R.colors.white,
  },
  customTxtStyle: {
    color: R.colors.voilet,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: scale(12),
  },
  imgStyle: {
    width: scale(20),
    height: scale(20),
  },
  view: {
    flexDirection: 'row',
    marginTop: scale(30),
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: scale(14),
    color: R.colors.white,
    marginRight: scale(10),
  },
  textStyle: {
    fontSize: scale(17),
    alignSelf: 'center',
    fontWeight: 'bold',
    color: R.colors.white,
    marginTop: scale(80),
  },
  messageText: {
    fontSize: scale(12),
    alignSelf: 'center',
    color: R.colors.white,
    marginTop: scale(25),
  },
  messageTextStyle: {
    fontSize: scale(12),
    alignSelf: 'center',
    color: R.colors.white,
  },
  image: {
    height: scale(20),
    width: scale(20),
  },
  customViewStyle: {
    backgroundColor: R.colors.voilet,
    borderWidth: scale(0.4),
    alignSelf: 'center',
    marginTop: scale(25),
    width: scale(260),
    borderColor: R.colors.white,
  },


  // eslint-disable-next-line no-dupe-keys
  buttonViewStyle: {
    marginTop: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: scale(14),
    alignSelf: 'center',
    color: R.colors.white,
    marginTop: scale(50),
  },
});
