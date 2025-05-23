import {StyleSheet} from 'react-native';

import R from '../R';
import scale from '../utils/Scale';

export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.gainsboro,

    height: scale(960),
    width: scale(375),
  },
  btnText: {
    fontSize: scale(12),
    alignSelf: 'center',
    color: R.colors.white,
  },
  expText: {
    fontSize: scale(16),
    marginLeft: scale(25),
    marginTop: scale(20),
    marginBottom: scale(10),
    fontWeight: 'bold',
  },
  CategoriesText: {
    fontSize: scale(16),
    marginLeft: scale(25),
    marginTop: scale(10),
    marginBottom: scale(10),
    fontWeight: 'bold',
  },
  allView: {
    backgroundColor: R.colors.blueviolet,
    height: scale(20),
    width: scale(60),
    marginRight: scale(25),
    marginTop: scale(13),
    borderWidth: scale(),
    borderColor: R.colors.blueviolet,
    borderRadius: scale(15),
    opacity: scale(0.7),
  },
  mallText: {
    fontSize: scale(14),
    marginLeft: scale(10),
    marginTop: scale(15),
    marginBottom: scale(5),
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: scale(10),
    marginLeft: scale(3),
    color: R.colors.grey,
    marginBottom: scale(10),
  },
  parkImg1: {
    height: scale(55),
    width: scale(105),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
  },
  imgMainView: {
    height: scale(75),
    width: scale(105),
    backgroundColor: R.colors.white,
    borderRadius: scale(10),
    borderColor: R.colors.gainsboro,
    elevation: scale(5),
    borderWidth: scale(1),
    marginBottom: scale(15),
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: scale(23),
  },
  smallMainView: {
    height: scale(75),
    width: scale(105),
    backgroundColor: R.colors.white,
    borderRadius: scale(10),
    borderColor: R.colors.gainsboro,
    elevation: scale(5),
    borderWidth: scale(1),
    marginBottom: scale(15),
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: scale(13),
  },
  textView: {
    height: scale(20),
    width: scale(105),
    backgroundColor: R.colors.white,
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    borderWidth: scale(1),

    borderColor: R.colors.white,
    alignContent: 'center',
    alignItems: 'center',
  },
  twoText: {
    fontWeight: '800',
    fontSize: scale(10),
    color: R.colors.black,
  },
  locImg: {
    height: scale(15),
    width: scale(15),
    marginLeft: scale(10),
  },
  commonView: {flexDirection: 'row', justifyContent: 'space-between'},
  dirText: {
    fontSize: scale(9),
    marginLeft: scale(5),
    color: R.colors.grey,
    marginBottom: scale(10),
  },
  mainImg: {
    height: scale(90),
    width: scale(330),
    borderTopRightRadius: scale(10),
    borderTopLeftRadius: scale(10),
    alignSelf: 'center',
  },
  imgView: {
    borderColor: R.colors.white,
    borderWidth: scale(1),
    backgroundColor: R.colors.white,
    alignSelf: 'center',
    height: scale(180),
    width: scale(330),
    borderRadius: scale(10),
    elevation: scale(3),
    marginBottom: scale(12),
  },
  rate: {
    flexDirection: 'row',
    backgroundColor: R.colors.blueviolet,
    marginLeft: scale(10),
    paddingLeft: scale(3),
    paddingRight: scale(3),
    height: scale(15),
    alignItems: 'center',
    borderRadius: scale(4),
  },
  rateText: {
    fontSize: scale(9),
    fontWeight: 'bold',
    marginLeft: scale(5),
    color: R.colors.white,
    marginRight: scale(5),
  },
  rateImage: {
    width: scale(10),
    height: scale(10),
  },
  flexV: {flexDirection: 'row'},
});
