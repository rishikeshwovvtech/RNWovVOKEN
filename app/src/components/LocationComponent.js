import React from 'react';
import {StyleSheet,View, Image, TextInput} from 'react-native';
import R from '../R';
import SimpleButton from './SimpleButton';
import scale from '../utils/Scale';

const LocationComponent = (props) => {
  return (
    <View style={styles.locationContainer}>
      <Image
        tintColor={props.tintColor}
        source={props.imgLeft}
        style={styles.imgLeft}
      />
      <TextInput
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        secureTextEntry={props.secureTextEntry}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        style={[props.TextInputStyle,{
            borderBottomWidth: 1,
            borderBottomColor: R.colors.coolGrey,
            marginVertical: 10,
            width: '50%',
            marginLeft: scale(10),
            height: scale(45),
        }]}
      />
      <Image
        tintColor={R.colors.voilet}
        source={props.imgRight}
        style={styles.imgLeft}
      />
      <SimpleButton
        title={props.title}
        onPress={props.onPress}
        customTxtStyle={styles.customTextStyle}
        customStyle={[styles.customStyle,props.customStyle,]}
      />
    </View>
  );
};

export default LocationComponent;

const styles = StyleSheet.create({
  locationContainer: {
    height: scale(45),
    width: scale(400),
    backgroundColor: R.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: scale(20),
    paddingTop: scale(10),
  },
  customTextStyle: {
    fontSize: scale(10),
    color: R.colors.white,
    opacity: scale(0.7),
  },
  imgLeft: {
    marginLeft: scale(10),
    marginTop: scale(10),
    width: scale(22),
    height: scale(22),
  },
  customStyle: {
    marginLeft: scale(13),
    backgroundColor: R.colors.coolGrey,
    alignSelf: 'center',
    width: scale(70),
    height: scale(25),
    marginTop: scale(10),
  },
});
