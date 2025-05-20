import {StyleSheet, } from 'react-native';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  RectangleShapeView: {
    padding: scale(5),
    borderWidth: scale(1),
    alignContent: 'center',
    marginTop: scale(70),
    marginLeft: scale(25),
    marginRight: scale(25),
    borderRadius: scale(10),
    borderColor: 'white',
    backgroundColor: 'white',
    elevation: scale(20),
  },
  view7: {
    borderBottomWidth: scale(1),
    borderBottomColor: 'grey',
  },
  view8: {
    fontSize: scale(16),
    marginBottom: scale(10),
    marginTop: scale(15),
  },
  text6: {marginBottom: scale(10)},
  text7: {
    paddingBottom: scale(18),
    marginRight: scale(20),
    marginTop: scale(15),
  },
  view6: {
    color: 'grey',
    marginBottom: scale(5),
  },
  firstview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  view5: {
    borderBottomWidth: scale(1),
    borderBottomColor: 'grey',
  },
  text5: {
    color: 'grey',
  },
  secondview: {
    backgroundColor: 'ghostwhite',
    flex: 1,
  },
  textview: {
    fontWeight: 'bold',
    fontSize: scale(15),
    marginTop: scale(50),
    textAlign: 'center',
  },
  textview2: {
    fontSize: scale(13),
    color: 'grey',
    textAlign: 'center',
  },
  textview4: {
    marginTop: scale(20),
    fontWeight: 'bold',
    marginRight: scale(15),
    marginLeft: scale(20),
  },
  textview3: {
    fontWeight: 'bold',
    marginTop: scale(20),
    fontSize: scale(16),
    borderBottomColor: '#000000',
    borderStyle: 'solid',
    textAlign: 'left',
  },
});
