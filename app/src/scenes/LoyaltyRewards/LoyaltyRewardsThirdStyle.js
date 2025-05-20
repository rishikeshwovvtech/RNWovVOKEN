import React from 'react';
import { StyleSheet} from 'react-native';

import R from '../../R';
import scale from '../../utils/Scale';

export default StyleSheet.create({
  container: {
    backgroundColor: R.colors.blueviolet,
     flex:1,justifyContent:'center',
  },

  rootView: {
    alignSelf:'center',
    borderRadius: scale(10),
    borderWidth: scale(2),
    height: scale(330),
    width: scale(250),
    backgroundColor: R.colors.white,
    borderColor: R.colors.white,
    padding: scale(10),
  },
  closeImage: {
    alignSelf: 'flex-end',
    height: scale(15),
    width: scale(15),
  },
  congoText: {
    marginTop:scale(5),
    alignSelf: 'center',
    color: R.colors.blueviolet,
    fontSize: scale(18),
    fontWeight: 'bold',
  },
  childView: {
    borderColor: R.colors.white,
    borderWidth: scale(1),
    alignSelf: 'center',
    height: scale(70),
    width: scale(130),
    borderRadius: scale(5),
    elevation: scale(3),
    padding:  scale(5),
    marginTop:scale(10),
    marginBottom:scale(15),
  },
  bibaImage: {
    alignSelf: 'center',
    width: scale(110),
    height: scale(70),
  },
  commontext: {
    alignSelf: 'center',
    fontSize: scale(10),
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: scale(15),
  },
  smallView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom:scale(15),
  },
  middleStyle: {
    fontSize: scale(19),
    fontWeight: 'bold',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(2),
  },
  dateText: {
    fontSize: scale(12),
    paddingLeft: scale(5),
  },
  eText: {
    color: R.colors.grey,
    marginTop: scale(15),
    paddingLeft: scale(5),
  },
  termsText: {
    fontSize: scale(9),
    color: R.colors.grey,
    paddingRight: scale(5),
  },

  priceText: {
    fontWeight: 'bold',
    fontSize: scale(18),
  },
});
