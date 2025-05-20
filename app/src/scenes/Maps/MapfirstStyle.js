import {StyleSheet} from 'react-native';

import R from '../../R';
import scale from '../../utils/Scale';
export default StyleSheet.create({
  view: {
    backgroundColor: R.colors.coolGrey,
    flex: 4
  },
  headerView:{
    height: scale(45),
    width: scale(400),
    backgroundColor: R.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(10),
    paddingBottom: scale(25),
  },
  searchImage:{
    marginTop: scale(10),
    marginLeft: scale(10),
    width: scale(22),
    height: scale(22),
  },
  closeImage:{
      marginTop: scale(10),
      marginLeft: scale(10),
      width: scale(15),
      height: scale(15),
  },
  images:{
    flex: 9,
    width: scale(400),
  },
  bottomView1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textInput:{
    borderBottomWidth:scale(0.8),
    borderBottomColor: R.colors.coolGrey,
    marginLeft: scale(10),
    width:'65%',
    height:scale(45)
  },
  imgView: {
    backgroundColor: R.colors.white,
    position: 'absolute',
    borderRadius: scale(20),
    top: scale(480),
    left: scale(320),
  },

  locImg: {
    height: scale(25),
    width: scale(25),
    margin: scale(8),
  },
  bottomView: {
    backgroundColor: R.colors.white,
  },
  storeView: {
    backgroundColor: R.colors.blueviolet,
    margin: scale(10),
    borderRadius: scale(20),
  },
  storeText: {
    color: R.colors.white,
    paddingTop: scale(10),
    paddingBottom: scale(10),
    paddingLeft: scale(20),
    paddingRight: scale(20),
  },
  lastImg: {
    height: scale(15),
    width: scale(15),
    margin:scale(20)
  },
  shopImg: {
    alignSelf: 'center',
    width: scale(70),
    height: scale(45),
  },
  heartImg: {
    alignSelf: 'center',
    marginLeft: scale(80),
    width: scale(30),
    height: scale(30),
  },
  navigateImg: {
    alignSelf: 'center',
    marginLeft: scale(10),
    width: scale(30),
    height: scale(30),
  },
  nameText:{
    fontSize: scale(15),
    fontWeight: 'bold'
  },
  floorText:{
    fontSize: scale(12),
    color: R.colors.coolGrey
  },
  childView:{
    flexDirection: 'row',
    marginTop: scale(10),
    marginLeft: scale(20),
    paddingLeft: scale(15),
    paddingBottom: scale(25),
  }
});
