import {StyleSheet} from 'react-native';
import R from '../../R';
import scale from '../../utils/Scale';
import React from 'react';

export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.gainsboro,
    height: scale(900),
    width: scale(400),
  },
  mainView: {
    flex: 1,
    backgroundColor: R.colors.lightBlueGrey,
  },
  feedbackText: {
    fontSize: scale(15),
    marginTop: scale(20),
    marginLeft: scale(20),
    fontWeight: 'bold',
    color: R.colors.black,
  },
  thankText: {
    fontSize: scale(10),
    marginTop: scale(10),
    marginLeft: scale(20),
    borderBottomWidth: scale(0.3),
    color: R.colors.coolGrey,
    paddingBottom: scale(10),
    borderBottomColor: R.colors.coolGrey,
    opacity: scale(0.8),
    alignSelf: 'center',
  },
  text: {
    fontSize: scale(18),
    marginLeft: scale(15),
    color: R.colors.white,
  },
  shareText: {
    fontSize: scale(18),
    marginTop: scale(20),
    marginLeft: scale(20),
    fontWeight: 'bold',
    color: R.colors.voilet,
    alignSelf: 'center',
  },
  touchableView: {
    marginTop: scale(20),
    backgroundColor: R.colors.green,
    alignSelf: 'center',
    justifyContent: 'center',
    height: scale(45),
    width: scale(300),
    borderRadius: scale(18),
  },
  customTxtStyle: {
    fontSize: scale(17),
    fontWeight: 'bold',
    color: R.colors.white,
  },
  customStyle: {
    marginRight: scale(30),
    backgroundColor: R.colors.voilet,
    height: scale(35),
    marginTop: scale(25),
    width: scale(100),
    alignSelf: 'flex-end',
  },
});
