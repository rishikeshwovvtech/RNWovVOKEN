import {StyleSheet} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';
import React from 'react';

export default StyleSheet.create({
  Home_screen_image: {
    height: scale(150),
    width: scale(375),
  },
  earnText: {
    fontSize: scale(15),
    fontWeight: 'bold',
    marginTop: scale(90),
    alignSelf: 'center',
    color: R.colors.white,
    position: 'absolute',
  },
  acrossText: {
    fontSize: scale(15),
    alignSelf: 'center',
    color: R.colors.white,
    marginTop: scale(115),
    position: 'absolute',
  },
  firstText: {
    fontSize: scale(10),
    fontWeight: 'bold',
    alignSelf: 'center',
    color: R.colors.white,
    marginTop: scale(50),
    position: 'absolute',
    backgroundColor: R.colors.green,
    borderRadius: scale(10),
    padding: scale(10),
    opacity: 0.6,
  },
  view: {
    flexDirection: 'row',
  },
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
    marginTop: scale(20),
    marginLeft: scale(15),
    color: R.colors.black,
  },
  customTxtStyle: {
    fontSize: scale(12),
    color: R.colors.white,
    opacity: scale(1),
  },
  customStyle: {
    marginLeft: scale(110),
    backgroundColor: R.colors.voilet,
    alignSelf: 'center',
    width: scale(70),
    height: scale(25),
    marginTop: scale(15),
  },
  text: {
    fontSize: scale(9),
    marginLeft: scale(15),
    color: R.colors.pink,
  },

  checkInMallView: {
    marginLeft: scale(20),
    backgroundColor: R.colors.white,
    borderRadius: scale(12),
    width: scale(100),
    height: scale(80),
    marginTop: scale(10),
  },
  checkInMallImage: {
    height: scale(60),
    width: scale(100),
  },
  heartImageView: {
    alignItems: 'flex-end',
    marginRight: scale(10),
    marginTop: scale(10),
  },
  checkInHeartImage: {
    height: scale(18),
    width: scale(18),
  },
  checkInHeartName: {
    fontSize: scale(12),
    alignSelf: 'center',
    color: R.colors.black,
  },
  timeText: {
    marginLeft: scale(45),
    fontSize: scale(12),
    color: R.colors.coolGrey,
  },
  loyaltyBackground: {
    height: scale(150),
    marginTop: scale(20),
    width: scale(375),
    marginBottom: scale(20),
  },
  feedbackText: {
    fontSize: scale(17),
    alignSelf: 'center',
    color: R.colors.white,
    marginLeft: scale(5),
  },
  coinImage: {
    height: scale(18),
    alignSelf: 'center',
    width: scale(18),
    marginLeft: scale(5),
  },
  feedbackButton: {
    backgroundColor: R.colors.white,
    alignSelf: 'center',
    width: scale(130),
    height: scale(40),
    marginTop: scale(30),
  },
  feedbackButtonText: {
    fontSize: scale(14),
    color: R.colors.voilet,
    opacity: scale(1),
  },
  eventsText: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginLeft: scale(20),
    color: R.colors.black,
  },
  availableText: {
    fontSize: scale(8),
    fontWeight: 'bold',
    marginTop: scale(10),
    marginLeft: scale(5),
    color: R.colors.black,
  },
  mallName: {
    fontSize: scale(10),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: scale(5),
    color: R.colors.coolGrey,
  },
  directionImage: {
    marginLeft: scale(35),
    width: scale(15),
    height: scale(15),
  },
  locationImage: {
    marginLeft: scale(10),
    width: scale(15),
    height: scale(15),
  },
  locationText: {
    fontSize: scale(10),
    marginLeft: scale(5),
    color: R.colors.coolGrey,
  },
  spinImage: {
    alignSelf: 'center',
    height: scale(130),
    marginTop: scale(20),
    width: scale(335),
    marginBottom: scale(20),
  },
  spinText: {
    fontSize: scale(6),
    fontWeight: 'bold',
    color: R.colors.black,
  },
  TS_Text: {
    fontSize: scale(6),
    fontWeight: 'bold',
    marginLeft: scale(10),
    marginTop: scale(10),
    color: R.colors.black,
    justifyContent: 'flex-end',
  },
  eventsView: {
    marginTop: scale(5),
    marginLeft: scale(20),
    alignSelf: 'center',
  },
  eventsImage: {
    height: scale(70),
    width: scale(110),
    marginLeft: scale(5),
  },
});
