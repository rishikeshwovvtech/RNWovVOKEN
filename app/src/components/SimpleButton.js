import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity} from 'react-native';
//local import
import R from '../R';

export const SimpleButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.mainContainer, props.customStyle]}
    >
      <Text style={[styles.buttonText, props.customTxtStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: R.dimensions.wp(80),
    backgroundColor: R.themes.darkButtonColor,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5%',

    padding: Platform.OS == 'ios' ? '3%' : '1.5%',
    alignSelf: 'center',
  },
  buttonText: {
    color: R.themes.lightTextColor,
    fontFamily: R.fonts.primaryBold,
  },
});
