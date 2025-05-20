import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

import R from '../R';
import scale from '../utils/Scale';

const SmallCard = (props) => {
  return (
    <View style={styles.imgMainView}>
      <Image source={props.source} style={styles.parkImg1} />
      <View style={styles.textView}>
        <Text style={styles.twoText}>{props.Title}</Text>
      </View>
    </View>
  );
};

export default SmallCard;

const styles = StyleSheet.create({
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
    marginLeft: scale(13),
  },
});
