import {StyleSheet} from 'react-native';

import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  firstView: {
    padding: scale(5),
    borderWidth: scale(2),
    marginLeft: scale(15),
    marginTop: scale(30),
    width: scale(340),
    borderRadius: scale(10),
    borderColor: R.colors.white,
    backgroundColor: R.colors.white,
    paddingLeft: scale(12),
    paddingBottom: scale(5),
    elevation: scale(8),
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
  eView: {
    fontWeight: '500',
    fontSize: scale(16),
    marginBottom: scale(10),
    marginTop: scale(10),
  },
  dView: {
    color: R.colors.grey,
    marginTop: scale(10),
  },
  tView: {
    color: R.colors.grey,
    fontSize: scale(12),
  },
  viewView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: scale(1),
    borderBottomColor: R.colors.lightgrey,
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
  pview: {
    marginTop: scale(10),
    fontWeight: 'bold',
    marginRight: scale(15),
    marginLeft: scale(20),
    fontSize: scale(14),
  },
  sview: {marginBottom: scale(10)},
  mainView: {
    height: scale(800),
    width: scale(400),
    backgroundColor: R.colors.gainsboro,
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
  },
  buttonView: {
    fontSize: scale(20),
    color: R.colors.white,
    fontWeight: 'bold',
    paddingRight: scale(25),
    paddingLeft: scale(25),
    marginLeft: scale(15),
    marginRight: scale(15),
  },
  opacityView: {
    padding: scale(11),
    backgroundColor: R.colors.blueviolet,
    margin: scale(20),

    borderRadius: scale(25),
    borderColor: R.colors.blueviolet,
    borderWidth: scale(1),
  },
  amtView: {
    fontSize: scale(16),
    paddingLeft: scale(20),
  },

  fview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
