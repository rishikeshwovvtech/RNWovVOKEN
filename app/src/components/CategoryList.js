import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import R from '../R';

export const CategoryList = (props) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.onPress}
        disabled={props.disabled}
        style={[styles.mainContainer, props.customStyle]}
      >
        <Text style={[styles.text, props.customTxtStyle]}>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: R.colors.red,
    borderRadius: 20,
    // width: R.dimensions.wp(22),

    paddingHorizontal: 25,
    height: R.dimensions.hp(3.3),
    justifyContent: 'center',
  },

  text: {
    textAlign: 'center',
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.h1,
    fontFamily: R.fonts.primaryBold,
  },
});
