import {StyleSheet,} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R'
export default StyleSheet.create({
  Reactangle: {
    paddingBottom: scale(50),
    paddingTop: scale(50),
    height: scale(350),
    width: scale(350),
    borderRadius: scale(5),
    borderWidth: scale(1),
    color: 'white',
    marginTop: scale(150),
    marginBottom: scale(100),
    justifyContent: 'center',
    marginLeft: scale(12),
    marginRight: scale(20),
    borderColor: R.colors.black,
    backgroundColor: R.colors.white,
    elevation: 5,
  },
  text14: {
    marginBottom: scale(240),
    textAlign: 'center',
  },
  view4: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },

  text7: {
    fontSize: scale(16),
    color: R.colors.grey,
    textAlign: 'justify',
  },
  text6: {
    fontSize: scale(16),
    marginLeft: scale(30),
    color: R.colors.grey,
  },
  text12: {
    fontSize: scale(16),
    color: R.colors.black,
    textAlign: 'center',
    marginRight: scale(40),
  },
  text13: {
    fontSize: scale(16),
    marginLeft: scale(30),
    color: R.colors.black,
    textAlign: 'justify',
  },
  view1: {
    marginBottom: scale(130),
    marginTop: scale(120),
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  text1: {
    fontSize: scale(30),
    color: R.colors.red,
    marginRight: scale(10),
    textAlign: 'right',
    marginTop: scale(120),
  },
  text5: {
    color: R.colors.darkviolet,
    fontSize: scale(18),
    marginRight: scale(30),
  },
  text8: {
    fontSize: scale(16),
    marginRight: scale(30),
    color: R.colors.grey,
  },
  text2: {
    fontSize: scale(18),
    fontWeight: 'bold',
    marginTop: scale(5),
    marginBottom: scale(20),
    marginLeft: scale(20),
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(20),
  },
  text10: {
    fontSize: scale(16),
    color: R.colors.black,
    textAlign: 'justify',
  },
  text9: {
    fontSize: scale(16),
    marginLeft: scale(30),
    color: R.colors.black,
  },
  text11: {
    fontSize: scale(16),
    marginRight: scale(30),
    color: R.colors.black,
  },
  text3: {
    marginLeft: scale(30),
    fontSize: scale(18),
  },
  text4: {fontSize: scale(18)},
});
