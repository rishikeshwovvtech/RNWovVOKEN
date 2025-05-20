import React from 'react';
import {Text, View, Image,TouchableOpacity, StyleSheet} from 'react-native';

import R from '../R';
import scale from '../utils/Scale';

const SimpleExploreScreenView = (props) => {
  return (
    <TouchableOpacity style={styles.imgView} onPress={props.onPress}>
      <Image source={props.source} style={styles.mainImg} />
      <Text style={styles.mallText}>{props.mainTitle}</Text>

      <View style={styles.flexV}>
        <Image source={R.images.Location} style={styles.locImg} />

        <Text style={styles.textStyle}>{props.locTitle}</Text>
      </View>

      <View style={styles.flexV}>
        <Image source={R.images.Directions} style={styles.locImg} />

        <Text style={styles.dirText}>Get Directions</Text>

        <View style={styles.rate}>
          <Image source={R.images.Star} style={styles.rateImage} />
          <Text style={styles.rateText}>4.0</Text>
        </View>

        <Text style={styles.dirText}>179 Ratings</Text>

        <Image source={R.images.Reviews} style={styles.locImg} />

        <Text style={styles.dirText}>300 Reviews</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleExploreScreenView;

const styles = StyleSheet.create({
  mallText: {
    fontSize: scale(14),
    marginLeft: scale(10),
    marginTop: scale(12),
    marginBottom: scale(5),
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: scale(10),
    marginLeft: scale(3),
    color: R.colors.grey,
    marginBottom: scale(10),
  },

  locImg: {
    height: scale(15),
    width: scale(15),
    marginLeft: scale(10),
  },
  commonView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
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
  flexV: {
    flexDirection: 'row'
  },
});
