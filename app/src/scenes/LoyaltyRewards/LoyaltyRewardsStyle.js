import React from 'react';
import { StyleSheet} from 'react-native';
import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  container: {
    flex:1,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: scale(40),

  },
  logoImage: {
    width: scale(60),
    height: scale(60),
    marginLeft: scale(30),
    paddingBottom:scale(15),
  },
  textContainer: {
    color: R.colors.white,
    fontSize: scale(20),
    fontWeight: 'bold',
  },
  text:{
    marginLeft:scale(2),
    color: R.colors.white,
    fontSize: scale(16),
    fontWeight: 'bold',
    alignSelf: 'center',

  },
  pointsText:{
    color: R.colors.white,
    fontSize: scale(16),
    alignSelf: 'center',

  },
  Text:{
    color: R.colors.white,
    fontSize: scale(12),
    marginTop:scale(5),

  },
  CoinMoney:{
    width: scale(16),
    height: scale(16),
    marginLeft: scale(35),
    alignSelf: 'center',
  },
  Vcontain: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  touchContainer: {
    marginTop: scale(20),
    marginBottom: scale(20),
    alignSelf: 'center',
    width: scale(140),
    borderRadius: scale(25),
    height: scale(30),
  },
  textcontaining: {
    color: R.colors.blueviolet,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: scale(14),
  },
  innerView1: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: R.colors.white,
    borderTopLeftRadius: scale(35),
    borderWidth: scale(1),
    borderColor: R.colors.white,
    borderTopRightRadius: scale(35),
    alignContent: 'center',
  },
  innerView2: {
    backgroundColor: R.colors.white,
    height: scale(130),
    width: scale(320),
    marginLeft: scale(25),
    elevation: scale(20),
    borderRadius: scale(25),
    borderWidth: 2,
    borderColor: R.colors.white,
  },
  LogoView: {
    width: scale(151),
    height: scale(80),
    marginLeft: scale(20),
    marginTop: scale(20),
  },

  tView: {
    flex: 1,
    color: R.colors.black,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  innerView3: {
    flex: 3,
    backgroundColor: R.colors.white,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tView1: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  innerView4: {
    height: scale(150),
    width: scale(180),
    backgroundColor: R.colors.white,
    elevation: scale(5),
    borderRadius: scale(15),
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: scale(10),
  },

  imgView: {
    width: scale(60),
    height: scale(60),
    margin: scale(10),
  },
  tView2: {
    fontSize: scale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tView3: {
    fontSize: scale(12),
    textAlign: 'center',
    marginTop: scale(5),
    color: R.colors.grey,
    textShadowColor: R.colors.white,
  },
  innerView5: {
    height: scale(150),
    width: scale(135),
    backgroundColor: R.colors.white,
    alignItems: 'center',
    borderRadius: scale(10),

    margin: scale(10),
    marginTop: scale(15),
    elevation: scale(10),
    marginLeft: scale(10),
  },

  imgView1: {
    width: scale(60),
    height: scale(60),
    margin: scale(10),
  },
  tView4: {
    fontSize: scale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tView5: {
    fontSize: scale(10),
    textAlign: 'center',
    marginTop: scale(5),
    textShadowColor: R.colors.lightgrey,

    color: R.colors.grey,
  },
  shopText: {
    fontSize: scale(10),
    textAlign: 'center',

    textShadowColor: R.colors.lightgrey,

    color: R.colors.grey,
  },
  innerView6: {
    flex: 3,
    backgroundColor: R.colors.white,
    paddingLeft: 10,
    paddingRight: scale(10),
  },


  tview6: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  touchableView1: {
    backgroundColor: R.colors.blueviolet,
    height: scale(25),
    width: scale(110),
    borderRadius: scale(15),
    borderWidth: scale(2),
    borderColor: R.colors.blueviolet,
    marginTop: scale(5),
    marginBottom: scale(5),
    marginRight: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },

  touchableView2: {
    backgroundColor: R.colors.blueviolet,
    height: scale(25),
    width: scale(70),
    borderRadius: scale(15),
    borderWidth: scale(2),
    borderColor: R.colors.blueviolet,
    marginTop: scale(85),
    marginRight: scale(35),
  },
  innerView7: {
    flexDirection: 'row',
    backgroundColor: R.colors.white,
    justifyContent: 'space-between',
    borderBottomColor: R.colors.lightgrey,
    borderBottomWidth: scale(1),
  },

  tView7: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },

  TextnView: {
    color: R.colors.black,
    backgroundColor: R.colors.white,
  },

  secondViewContainer: {
    backgroundColor: R.colors.white,
    borderTopLeftRadius: scale(35),
    borderWidth: scale(2),
    borderColor: R.colors.white,
    borderTopRightRadius: scale(35),
  },

  thirdView: {
    backgroundColor: R.colors.white,
    flexDirection: 'row',
    height: scale(110),
    width: scale(330),
    marginLeft: scale(25),
    elevation: scale(5),
    borderRadius: scale(15),
    borderWidth: scale(2),
    borderColor: R.colors.lightgrey,
    margin: scale(20),
  },
  theImage: {
    width: scale(175),
    height: scale(90),
    marginTop: scale(10),
    marginLeft: scale(10),
  },
  commonText: {
    color: R.colors.black,
    fontSize: scale(10),
    paddingLeft: scale(10),
  },
  shareText: {
    color: R.colors.black,
    textAlign: 'center',
  },

  fourthView: {
    marginTop: scale(15),
    marginLeft: scale(10),
    borderRadius: scale(20),
    borderWidth: scale(1),
    height: scale(25),
    width: scale(120),
    justifyContent: 'center',
    borderColor: R.colors.lightgrey,
  },
  buttonText: {
    color: R.colors.white,
    textAlign: 'center',
    fontSize: scale(8),
    opacity: 0.5,
  },
});
