import {StyleSheet} from 'react-native';
import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.blueviolet,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 3,
    flexDirection: 'column',
    height: scale(1020),
    width: scale(400),
  },
  imgView: {
    borderColor: R.colors.white,
    borderWidth: scale(1),
    margin: scale(10),
    height: scale(70),
    width: scale(108),
    borderRadius: scale(5),
    elevation: scale(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fview: {
    flexDirection: 'row',
  },
  labelView: {
    alignItems: 'center',
    borderTopLeftRadius: scale(15),
    borderBottomLeftRadius: scale(15),
    backgroundColor: R.colors.deeppink,
    height: scale(20),
    width: scale(60),
    marginLeft: scale(15),
    marginTop: scale(10),
  },
  dateText: {
    fontSize: scale(13),
    paddingLeft: scale(10),
  },
  termsText: {
    fontSize: scale(10),
    marginBottom: scale(10),
    color: R.colors.grey,
    marginLeft: scale(10),
  },
  eText: {
    color: R.colors.grey,
    paddingLeft: scale(10),
    marginTop: scale(15),
  },
  theView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: R.colors.white,
    marginTop: scale(10),
  },
  opacityView: {
    padding: scale(5),
    backgroundColor: R.colors.mediumslateblue,
    borderRadius: scale(25),
    borderColor: R.colors.blueviolet,
    borderWidth: scale(1),
    marginRight: scale(20),
    marginBottom: scale(45),
    flexDirection: 'row',
  },
  buttonView: {
    fontSize: scale(18),
    color: R.colors.white,
    fontWeight: 'bold',
    paddingRight: scale(15),
    paddingLeft: scale(5),
  },
  viewAndview: {
    flexDirection: 'row',

    flex: 1,
    backgroundColor: R.colors.white,
    justifyContent: 'space-between',
  },
  insideView: {
    flex: 2,
    backgroundColor: R.colors.white,
    height: scale(40),
    width: scale(420),
  },
  priceV: {
    fontSize: scale(20),
    fontWeight: 'bold',
  },

  inView: {
    flex: 0.9,
    backgroundColor: R.colors.mediumslateblue,
    height: scale(220),
    width: scale(420),
  },
  textView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: scale(44),
    fontWeight: '800',
    color: R.colors.white,
    marginTop: scale(15),
  },
  balaneStyle: {
    fontSize: scale(20),
    paddingBottom: scale(30),
    color: R.colors.white,
  },
  squareView: {
    backgroundColor: R.colors.white,
    height: scale(190),
    width: scale(290),

    borderRadius: scale(20),
    borderStyle: 'dotted',
    position: 'absolute',
    top: scale(150),
    left: scale(45),
    borderColor: R.colors.grey,
    borderWidth: scale(2),
  },
  secondView: {
    backgroundColor: R.colors.white,
    height: scale(180),
    width: scale(290),
    marginLeft: scale(55),
    borderRadius: scale(20),
    marginTop: scale(55),
    borderStyle: 'dotted',
    borderColor: R.colors.grey,
    borderWidth: scale(2),
  },
  logoImage: {
    width: scale(100),
    height: scale(60),
  },
  coinImage: {
    width: scale(25),
    height: scale(25),
    marginLeft: scale(15),
  },
  comText: {
    marginTop: scale(10),
    fontSize: scale(14)},
  leftV: {
    color: R.colors.white,
  },
  thirdView: {
    backgroundColor: R.colors.white,
    height: scale(180),
    width: scale(290),
    marginLeft: scale(55),
    borderRadius: scale(20),
    marginTop: scale(20),
    borderStyle: 'dotted',
    borderColor: R.colors.grey,
    borderWidth: scale(2),
  },
});
