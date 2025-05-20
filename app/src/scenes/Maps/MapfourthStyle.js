import {StyleSheet} from 'react-native';
import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  storeView: {
    backgroundColor: R.colors.blueviolet,
    margin: scale(10),
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: scale(20),
  },
  startView: {
    backgroundColor: R.colors.blueviolet,
    margin: scale(10),
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: scale(20),
    width: scale(160),
    marginTop: scale(180),
  },
  startText: {
    color: R.colors.white,
    padding: scale(10),
    fontSize: scale(14),
    fontWeight: 'bold',
  },
  storeViewB: {
    backgroundColor: R.colors.blueviolet,
    margin: scale(10),
    marginTop: scale(120),
    borderRadius: scale(20),
  },
  storeText: {
    color: R.colors.white,
    padding: scale(10),
    paddingLeft: scale(15),
    paddingRight: scale(15),
    fontSize: scale(15),
    fontWeight: 'bold',
  },
  initialView: {
    flex: 1,
    flexDirection: 'row',
  },
  smallText: {fontSize: scale(10), marginTop: scale(10)},
  routeText: {fontSize: scale(15), fontWeight: 'bold'},
  lastImg: {
    marginTop: scale(155),
    height: scale(200),
    width: scale(15),
    margin: scale(20),
  },
  mainText: {fontSize: scale(11), marginTop: scale(20)},
  fourthView: {
    marginTop: scale(15),
    marginLeft: scale(10),
    borderRadius: scale(20),
    borderWidth: scale(1),
    height: scale(30),
    width: scale(120),
    justifyContent: 'center',
    borderColor: R.colors.lightgrey,
  },
  shareText: {
    color: R.colors.black,
    textAlign: 'center',
  },
});
