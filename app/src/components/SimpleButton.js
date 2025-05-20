import React from 'react';
import {StyleSheet, Text, } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import R from '../R';
import scale from '../utils/Scale';

const SimpleButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.LoginButton, props.customStyle]}>
      <Text style={[styles.LoginButtonText, props.customTxtStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default SimpleButton;

const styles = StyleSheet.create({
  LoginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.white,
    height: scale(50),
    borderRadius: scale(22),
    width: scale(250),
  },
  LoginButtonText: {
    alignItems: 'center',
    color: R.colors.voilet,
    fontSize: scale(22),
    fontWeight: 'bold',
  },
});
