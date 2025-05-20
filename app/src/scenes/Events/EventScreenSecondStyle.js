import {StyleSheet} from 'react-native';

import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  firstView: {
    width: scale(370),
    height: scale(50),
    backgroundColor: R.colors.white,
  },
  padView: {
    padding: scale(18),
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  SGC_Events: {
    width: scale(370),
    height: scale(150),
  },
  priceView: {
    marginTop: scale(10),
    fontSize: scale(16),
    marginRight: scale(15),
    marginLeft: scale(20),
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
    fontSize: scale(12),
  },
  tView: {
    color: R.colors.grey,
    fontSize: scale(10),
  },
  viewView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomWidth: scale(1),
    borderBottomColor: R.colors.lightgrey,
    padding: scale(10),
  },
  greyView: {
    color: R.colors.grey,
  },
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
  sview: {color: R.colors.grey, fontSize: scale(12)},

  mainView: {
    flex: 1,
    backgroundColor: R.colors.gainsboro,
  },
  iview: {
    paddingLeft: scale(10),
    color: R.colors.grey,
    fontWeight: 'bold',
    fontSize: scale(12),
  },
  rView: {
    paddingLeft: scale(10),
    color: R.colors.blueviolet,
    fontWeight: 'bold',
    fontSize: scale(10),
    paddingTop: scale(3),
  },
  insideView: {
    fontWeight: 'bold',
    marginTop: scale(10),
    fontSize: scale(14),
    borderBottomColor: R.colors.grey,
    marginLeft: scale(20),
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
  initialView: {
    flexDirection: 'row',
    borderBottomWidth: scale(3),
    borderBottomColor: R.colors.lightgrey,
    marginTop: scale(15),
    paddingBottom: scale(15),
  },
  calImg: {
    height: scale(25),
    width: scale(25),
    marginLeft: scale(20),
  },
  datetext: {
    color: R.colors.coolGrey,
    marginLeft: scale(5),
  },
  timetext: {
    color: R.colors.coolGrey,
    marginLeft: scale(5),
  },
  moreText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: scale(1),
    borderBottomColor: R.colors.lightgrey,
    marginTop: scale(15),
    paddingBottom: scale(10),
  },
  moreT: {
    marginLeft: scale(20),
    fontWeight: 'bold',
    fontSize: scale(14),
  },
  arrowV: {
    height: scale(8),
    width: scale(13),
    marginRight: scale(30),
    alignSelf: 'center',
  },
  commonV: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(10),
    marginLeft: scale(20),
  },
  logoView: {
    height: scale(16),
    width: scale(16),
    alignSelf: 'center',
  },
  commText: {
    marginLeft: scale(8),
    color: R.colors.grey,
    alignSelf: 'center',
    fontSize: scale(14),
  },
  clockV: {
    height: scale(25),
    width: scale(25),
    marginLeft: scale(20),
  },
  buttonView: {
    fontSize: scale(22),
    fontWeight: 'bold',
    marginLeft: scale(20),
    color: R.colors.black,
    alignSelf: 'center',
  },
  musictext: {
    fontSize: scale(11),
    color: R.colors.white,
    alignSelf: 'center',
  },
  booktext: {
    fontSize: scale(20),
    color: R.colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  sameV: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: R.colors.lightgrey,
    borderBottomColor: R.colors.lightgrey,
    borderWidth: scale(1),
  },
  twoView: {
    flexDirection: 'row',
    marginTop: scale(15),
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  opacityView: {
    backgroundColor: R.colors.grey,
    marginTop: scale(5),
    height: scale(20),
    width: scale(100),
    borderRadius: scale(15),
    marginLeft: scale(20),
    justifyContent: 'center',
  },
  bookView: {
    backgroundColor: R.colors.blueviolet,
    marginTop: scale(15),
    height: scale(40),
    width: scale(150),
    borderRadius: scale(25),
    marginLeft: scale(20),
    justifyContent: 'center',
  },
  amtView: {
    fontSize: scale(16),
    paddingLeft: scale(20),
  },

  text: {
    marginLeft: scale(10),
    fontSize: scale(12),
    color: R.colors.grey,
    paddingTop: scale(10),
  },
  belowImg: {
    height: scale(8),
    width: scale(13),
    marginRight: scale(30),
    alignSelf: 'center',
  },
  aboutView: {
    marginLeft: scale(20),
    fontWeight: 'bold',
    fontSize: scale(16),
  },
  topImg: {
    height: scale(8),
    width: scale(13),
    marginRight: scale(20),
    alignSelf: 'center',
  },
  fsizeV: {
    fontSize: scale(9),
  },
  noView: {
    fontSize: scale(15),
    paddingRight: scale(15),
  },
  cView: {
    color: R.colors.black,
  },
  inputV: {
    borderColor: R.colors.white,
    borderWidth: scale(2),
    height: scale(23),
    width: scale(120),
    backgroundColor: R.colors.white,
    borderRadius: scale(15),
    marginTop: scale(7),
  },
  symbolV: {
    paddingTop: scale(20),
    paddingRight: scale(15),
    fontSize: scale(15),
  },
  sizeV: {
    fontSize: scale(11),
  },
  ButtonView: {
    height: scale(40),
    borderRadius: scale(22),
    width: scale(120),
    alignSelf: 'center',
    marginRight: scale(20),
    backgroundColor: R.colors.voilet,
  },
});
