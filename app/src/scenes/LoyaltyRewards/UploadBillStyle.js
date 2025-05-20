import {StyleSheet} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';

export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.white,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    height: scale(780),
    width: scale(420),
  },

  insideView: {
    backgroundColor: R.colors.white,
    marginBottom: scale(190),
    borderRadius: scale(10),
    borderWidth: scale(2),
    marginRight: scale(45),
    borderColor: R.colors.white,
    elevation: scale(5),
    paddingBottom:scale(10),
  },
  bigView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomColor: R.colors.lightgrey,
    borderBottomWidth: scale(1),
  },
  smallView: {
    flexDirection: 'row',
    backgroundColor: R.colors.white,
  },
  opacityView: {
    justifyContent: 'center',
    backgroundColor: R.colors.voilet,
    borderRadius: scale(25),
    borderColor: R.colors.blueviolet,
    borderWidth: scale(1),
    width: scale(150),
    height: scale(40),
    alignSelf: 'center',
  },
  gstText: {
    textAlign: 'right',
    color: R.colors.red,
    fontSize: scale(8),
  },
  tView: {
    marginTop: scale(10),
    fontSize: scale(14),
  },
  logoImage: {
    width: scale(70),
    height: scale(70),
    margin: scale(10),
    marginBottom: scale(25),
  },
  billText: {
    color: R.colors.grey,
    paddingLeft: scale(15),
    alignSelf: 'center',
  },

  TextinputStyle: {
    paddingLeft: scale(15),
    height: scale(40),
    width: scale(220),
    borderColor: R.colors.grey,
    borderWidth: scale(1),
    borderRadius: scale(15),
    marginRight: scale(10),
    margin: scale(10),
    color: R.colors.black,
  },
  inputStyling: {
    paddingLeft: scale(15),
    height: scale(40),
    width: scale(230),
    borderColor: R.colors.grey,
    borderWidth: scale(1),
    borderRadius: scale(15),
    marginRight: scale(10),
    marginTop: scale(10),
    color: R.colors.black,
  },
  upperView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  midView: {
    alignSelf: 'flex-end',
    marginBottom: scale(5),
    marginRight: scale(15),
  },
  theView: {
    alignSelf: 'center',
    backgroundColor: R.colors.white,
    marginTop: scale(10),
  },
  tview: {
    padding: scale(5),
    backgroundColor: R.colors.blueviolet,
    margin: scale(20),
    borderRadius: scale(25),
    borderColor: R.colors.blueviolet,
    borderWidth: scale(1),
  },
  buttonView: {
    fontSize: scale(18),
    color: R.colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: scale(30),
  },
  lastText: {
    marginTop: scale(10),
    fontSize: scale(10),
  },
});
