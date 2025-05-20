import {StyleSheet} from 'react-native';

import R from '../../R';
import scale from '../../utils/Scale';
export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.ghostwhite,
    alignItems: 'center',
    height: scale(600),
    width: scale(380),
  },
  parkView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: scale(20),
    height: scale(45),
    width: scale(350),
    backgroundColor: R.colors.ghostwhite,
  },
  infoImg: {
    height: scale(23),
    width: scale(23),
    marginRight: scale(15),
  },

  carImg: {
    height: scale(160),
    width: scale(380),
  },
  parkImg2: {
    height: scale(55),
    width: scale(50),
    marginBottom: scale(7),
    marginTop: scale(3),
  },
  parkImg1: {
    height: scale(60),
    width: scale(65),
    marginBottom: scale(7),
    marginTop: scale(3),
    marginLeft: scale(15),
  },
  imgView: {
    marginTop: scale(20),
    height: scale(105),
    width: scale(150),
    backgroundColor: R.colors.white,
    borderRadius: scale(10),
    borderColor: R.colors.white,
    elevation: scale(10),
    borderWidth: scale(1),
    marginBottom: scale(15),
    alignContent: 'center',
    alignItems: 'center',
  },
  textView: {
    height: scale(35),
    width: scale(150),
    backgroundColor: R.colors.blueviolet,
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    borderWidth: scale(1),
    marginTop: scale(5),
    borderColor: R.colors.blueviolet,
    alignContent: 'center',
    alignItems: 'center',
  },
  lastView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scale(10),
  },
  lastText: {
    fontSize: scale(10),
  },
  refreshImg: {
    height: scale(18),
    width: scale(18),
    marginLeft: scale(10),
  },
  twoText: {
    fontWeight: '800',
    fontSize: scale(18),
    color: R.colors.white,
    padding: scale(5),
  },
  parkText: {
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});
