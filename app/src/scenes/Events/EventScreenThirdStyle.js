import {StyleSheet} from 'react-native';

import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.gainsboro,
    height: scale(900),
    width: scale(400),
  },
  OpaView: {
    backgroundColor: R.colors.white,
    borderRadius: scale(30),
    height: scale(20),
    width: scale(20),
    borderColor: R.colors.grey,
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'stretch',
    marginRight: scale(10),
  },

  lastView: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: scale(75),
    width: scale(300),
  },
  opacityView: {
    backgroundColor: R.colors.white,
    borderRadius: scale(30),
    height: scale(20),
    width: scale(20),
    borderColor: R.colors.blueviolet,
    borderWidth: scale(1),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(35),
  },
  btnView: {
    fontSize: scale(22),
    color: R.colors.grey,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  buttonView: {
    fontSize: scale(22),
    color: R.colors.blueviolet,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  bView: {
    fontSize: scale(22),
    color: R.colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 5,
  },
  insideView: {
    justifyContent: 'center',
    backgroundColor: R.colors.gainsboro,
    height: scale(40),
    padding: scale(20),
    width: scale(420),
  },
  proceedView: {
    backgroundColor: R.colors.blueviolet,
    borderRadius: scale(30),
    height: scale(40),
    width: scale(150),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(20),
  },
  marView: {
    marginTop: scale(10),
  },
  secondView: {
    backgroundColor: R.colors.white,
    height: scale(60),
    width: scale(420),
    flexDirection: 'row',
  },
  textView: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },

  entryText: {
    fontSize: scale(14),
    paddingLeft: scale(20),
    paddingTop: scale(5),
  },
  selectText: {
    fontSize: scale(14),
  },
  textStyle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    paddingLeft: scale(20),
  },

  thirdView: {
    backgroundColor: R.colors.gainsboro,
    height: scale(80),
    width: scale(420),
    flexDirection: 'row',
    marginTop: scale(420),
    borderWidth: scale(3),
    borderColor: R.colors.lightgrey,
  },
  tView: {
    fontSize: scale(15),

    paddingLeft: scale(25),
  },
  midView: {
    height: 60,
    width: 300,
    flexDirection: 'row',
    marginTop: scale(10),
    marginLeft: scale(140),
  },
});
