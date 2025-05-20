import {StyleSheet} from 'react-native';

import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  firstView: {
    padding: scale(5),
    borderWidth: scale(2),
    marginLeft: scale(15),
    marginTop: scale(30),
    borderRadius: scale(10),
    borderColor: R.colors.gainsboro,
  },
  padView: {
    paddingTop: scale(10),
    paddingBottom: scale(10),
    paddingLeft: scale(5),
  },
  oneView: {
    paddingBottom: scale(10),
    marginRight: scale(20),
    fontSize: scale(16),
    marginTop: scale(12),
  },
  priceView: {
    marginTop: scale(10),
    fontSize: scale(16),
    marginRight: scale(15),
    marginLeft: scale(20),
  },
  commonV: {
    flexDirection: 'row',
  },
  ptext: {
    fontSize: scale(14),
    marginRight: scale(25),
    marginLeft: scale(20),
  },
  stView: {
    fontWeight: '500',
    fontSize: scale(16),
    marginBottom: scale(10),
    marginTop: scale(10),
  },
  minView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
    marginTop: scale(5),
  },
  eView: {
    fontWeight: '500',
    fontSize: scale(11),
    marginBottom: scale(10),
    marginTop: scale(10),
    marginRight: scale(20),
  },
  dView: {
    color: R.colors.grey,
    marginTop: scale(10),
    fontSize: scale(10)
  },
  tView: {
    color: R.colors.grey,
    fontSize: scale(14),
  },
  viewView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: R.colors.lightgrey,
    padding: scale(10),
  },
  greyView: {color: R.colors.grey},
  vView: {
    borderBottomWidth: scale(2),
    borderBottomColor: R.colors.lightgrey,
  },
  midView: {
    borderBottomWidth: scale(1),
    borderBottomColor: R.colors.lightgrey,
  },
  donateV: {
    flexDirection: 'row',
  },
  pview: {
    marginTop: scale(10),
    fontWeight: 'bold',
    marginRight: scale(15),
    marginLeft: scale(20),
    fontSize: scale(14),
  },
  sview: {
    color: R.colors.grey,
    fontSize: scale(12),
    alignSelf: 'center',
  },

  mainView: {
    flex:1,
    backgroundColor: R.colors.gainsboro,
  },
  textView: {
    color: R.colors.white,
    fontSize: scale(14)
  },
  upperView: {
    justifyContent:'space-around',
    alignItems: 'center',
    padding: scale(8),
    flexDirection: 'row',
  },
  imgView: {
    height: scale(40),
    width: scale(80),
  },
  iview: {
    paddingLeft: scale(10),
    color: R.colors.grey,
    fontWeight: 'bold',
    fontSize: scale(12),
  },
  rView: {
    alignSelf: 'center',
    paddingLeft: scale(10),
    color: R.colors.blueviolet,
    fontWeight: 'bold',
    fontSize: scale(9),
  },
  insideView: {
    fontWeight: 'bold',
    marginTop: scale(10),
    fontSize: scale(14),
    borderBottomColor: R.colors.grey,
    borderStyle: 'solid',
    textAlign: 'left',
  },
  secondView: {
    marginTop: scale(120),
    width: scale(380),
    height: scale(60),
    backgroundColor: R.colors.ghostwhite,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: R.colors.lightgrey,
    borderWidth: scale(1),
  },
  theView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: R.colors.white,
    marginTop: scale(60),
    marginBottom: scale(20),
  },
  buttonView: {
    fontSize: scale(20),
    color: R.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingRight: scale(15),
    paddingLeft: scale(15),
    marginLeft: scale(15),
    marginRight: scale(15),
  },
  sameV: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    borderTopColor: R.colors.lightgrey,
    borderLeftWidth: scale(0),
    borderRightWidth: scale(0),
    borderBottomColor: R.colors.lightgrey,
    borderWidth: scale(1),
  },
  opacityView: {
    padding: scale(11),
    backgroundColor: R.colors.blueviolet,
    marginTop: scale(20),
    width: scale(250),
    height: scale(55),
    borderRadius: scale(25),
    borderColor: R.colors.blueviolet,
    borderWidth: scale(1),
    marginLeft: scale(50),
  },
  amtView: {
    fontSize: scale(16),
    paddingLeft: scale(20),
  },
  nView: {
    height: scale(50),
    width: scale(350),
    backgroundColor: R.colors.gainsboro,
  },

  fsizeV: {
    fontSize: scale(9)
  },
  xview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginBottom: scale(15),
  },
  oView: {flexDirection: 'row', justifyContent: 'space-between'},
  noView: {fontSize: scale(15), paddingRight: scale(15)},
  comView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
  cView: {color: R.colors.black},
  inputV: {
    borderColor: R.colors.white,
    borderWidth: scale(2),
    height: scale(29),
    fontSize: scale(9),
    width: scale(120),
    backgroundColor: R.colors.white,
    borderRadius: scale(15),
    color: R.colors.black,
    marginTop: scale(5),
    marginBottom: scale(2),
  },
  symbolV: {
    marginTop: scale(10),
    height: scale(10),
    width: scale(10),
  },
  infoLogoImg: {
    height: scale(14),
    width: scale(14),
    marginRight: scale(5),
    alignSelf: 'center',
  },
  logoImg: {
    height: scale(25),
    width: scale(25),
    alignSelf: 'center',
  },
  infoImg: {
    alignSelf: 'center',
    height: scale(12),
    width: scale(12),
    marginLeft: scale(10),
  },
  upiImg: {
    height: scale(30),
    width: scale(30),
    alignSelf: 'center',
  },
  sizeV: {fontSize: scale(11)},

  mView: {
    height: scale(200),
    width: scale(350),
    marginLeft: scale(10),
    backgroundColor: R.colors.gainsboro,
    marginTop: scale(30),
  },

  visaView: {
    height: scale(110),
    width: scale(240),
    alignSelf: 'center',
    backgroundColor: R.colors.green,
    marginTop: scale(10),
    borderRadius: scale(10),
  },
  lastView: {
    height: scale(45),
    width: '70%',
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
  initialView: {
    padding: 15,
    paddingRight: 15,
    height: scale(80), width: '70%',
    alignSelf: 'center',
    borderTopLeftRadius:scale(10),
    borderTopRightRadius:scale(10),
  },
});
