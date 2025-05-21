import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
//local imports
import R from '../R';
export const CategoryCard = ({
  title,
  source,
  onPress,
  customTextStyle = {},
}) => {
  return (
    <TouchableOpacity
      testID="categoryCard"
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.mainView}
    >
      <View style={styles.imgView}>
        <Image
          testID="image"
          source={source}
          style={styles.img}
          resizeMode={'contain'}
        />
      </View>
      <Text testID="title" style={[styles.text, customTextStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: R.themes.darkCardBackgroundColor,
    width: R.dimensions.wp(21),
    height: R.dimensions.wp(21),
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2%',
    margin: '1%',
    borderRadius: 5,
  },
  imgView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
    alignSelf: 'center',
  },
  img: {
    height: R.dimensions.wp(6),
    width: R.dimensions.wp(6),
    tintColor: R.themes.lightIconColor,
  },
  text: {
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.hp(1.4),
    color: R.themes.lightTextColor,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
