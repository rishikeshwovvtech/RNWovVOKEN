import React from 'react';
import {TextInput, View, Image, StyleSheet} from 'react-native';
import R from '../R';
import scale from '../utils/Scale';

const SimpleTextInput = (props) => {
  return (
    <React.Fragment>
      <View style={[styles.viewStyle, props.customViewStyle]}>
        <View style={styles.textInputView}>
          <Image source={props.img} tintColor={props.tintColor} style={props.imgStyle} />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            secureTextEntry={props.secureTextEntry}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor}
            style={[styles.textInputStyle, props.textInputStyle]}
          />
        </View>
      </View>
    </React.Fragment>
  );
};
export default SimpleTextInput;

const styles = StyleSheet.create({
  textInputStyle:{
    marginLeft: scale(15),
    fontSize: scale(16),
    color: R.colors.white ,
  },
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,221,250,0.79)',
    height: scale(50),
    borderRadius: scale(22),
    width: scale(250),
  },
  textInputView: {
    marginLeft: scale(15),
  },
  textInputContainer: {
    marginLeft: scale(0),
  },
});
