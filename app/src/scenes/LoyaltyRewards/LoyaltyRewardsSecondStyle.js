import React from 'react';
import {StyleSheet} from 'react-native';
import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.blueviolet,
    justifyContent: 'center',
  },

  insideView: {
    alignSelf: 'center',
    borderRadius: scale(10),
    borderWidth: scale(2),
    height: scale(330),
    width: scale(250),
    backgroundColor: R.colors.white,
    borderColor: R.colors.white,
    padding: scale(10),
  },
  buttonView: {
    backgroundColor: R.colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  locImg: {
    height: scale(15),
    width: scale(15),
    margin: scale(10),
  },

  textView: {
    backgroundColor: R.colors.white,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  textStyle: {
    fontSize: scale(16),
  },
  middleStyle: {
    fontSize: scale(19),
    fontWeight: 'bold',
  },
  bibaStyle: {
    fontSize: scale(36),
    fontWeight: 'bold',
    marginTop: scale(20),
  },
  customTxtStyle: {
    color: R.colors.white,
    textAlign: 'center',

    fontSize: scale(14),
  },
  forButton: {
    backgroundColor: R.colors.blueviolet,
    borderRadius: scale(15),
    borderWidth: scale(2),

    borderColor: R.colors.white,
  },
  congoText: {
    color: R.colors.blueviolet,
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  innerButtons: {
    color: R.colors.white,
    textAlign: 'center',
    margin: scale(8),
    fontSize: scale(15),
  },
  lastView: {
    marginTop: scale(25),
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: R.colors.white,
    marginBottom: scale(15),
    justifyContent: 'space-between',
  },

  Xview: {
    color: R.colors.red,
    fontSize: scale(14),
  },
  customBtnStyle: {
    backgroundColor: R.colors.blueviolet,
    borderRadius: scale(18),
    borderWidth: scale(2),
    height: scale(40),
    width: scale(100),

    borderColor: R.colors.white,
  },
});
