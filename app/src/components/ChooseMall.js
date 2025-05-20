import React from 'react';
import {StyleSheet, View, Image, } from 'react-native';
import R from '../R';
import CustomTextInput from './TextInput';
import SimpleButton from './SimpleButton';
import scale from '../utils/Scale';

const ChooseMall = (props) => {
  return (
    <View style={styles.locationContainer}>
      <Image
        tintColor={R.colors.voilet}
        source={props.imgLeft}
        style={styles.targetLocationImage}
      />
      <CustomTextInput
          placeholder={props.placeholder}
          placeholderTextColor={R.colors.black}
      />

      <SimpleButton
        title={props.title}
        customTxtStyle={styles.customTextStyle}
        customStyle={styles.customStyle}
      />
    </View>
  );
};

export default ChooseMall;

const styles = StyleSheet.create({
  locationContainer: {
    height: scale(45),
    width: scale(400),
    backgroundColor: R.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(10),
  },
  customTextStyle: {
    fontSize: scale(12),
    color: R.colors.white,
    opacity: scale(1),
  },
  targetLocationImage: {
    margin: scale(10),
    width: scale(22),
    height: scale(22),
  },
  customStyle: {
    marginLeft: scale(10),
    backgroundColor: R.colors.voilet,
    alignSelf: 'center',
    width: scale(70),
    height: scale(30),
    marginTop: scale(10),
  },
});
