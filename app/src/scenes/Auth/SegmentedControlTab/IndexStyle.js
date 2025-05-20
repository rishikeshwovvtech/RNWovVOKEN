import {StyleSheet,} from 'react-native';
import scale from '../../../utils/Scale';
import R from '../../../R';
import React from 'react';

export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.voilet,
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: scale(35),
  },
  logoImage: {
    height: scale(35),
    width: scale(120),
  },
  tabStyle: {
    backgroundColor: R.colors.voilet,
    borderWidth: 0,
    marginTop: scale(35),
  },
  activeTabStyle: {
    borderBottomWidth: scale(5),
    borderBottomColor: R.colors.yellow,
    backgroundColor: R.colors.voilet,
  },
  activeTabTextStyle: {
    color: R.colors.white,
    opacity: scale(1),
  },
  tabTextStyle: {
    opacity: scale(0.5),
    color: R.colors.white,
    fontWeight: 'bold',
    fontSize: scale(15),
  },
  view: {
    marginTop: scale(30),
  },
});
