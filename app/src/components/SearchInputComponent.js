import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
//local imports
import R from '../R';
/* -------------------------------------------------------------------------- */
/*                               main component                               */
/* -------------------------------------------------------------------------- */
export const SearchInputComponent = (props) => {
  return (
    <View
      style={[styles.textInputStyleView, {...props.customTextInputStyleView}]}
    >
      <TouchableOpacity style={styles.seachIconView} onPress={props.onPress}>
        <Image
          source={R.images.search_double}
          style={{height: R.dimensions.wp(6), width: R.dimensions.wp(6)}}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TextInput
        textAlign="left"
        //selectionColor={R.themes.darkButtonColor}
        autoCompleteType={'email'}
        style={styles.textInputStyle}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        value={props.value}
        ref={props.ref}
        autoCapitalize={'none'}
        textAlignVertical={'top'}
        multiline={props.multiline}
        onEndEditing={props.onEndEditing}
        autoFocus={props.autoFocus}
        editable={props.editable}
        numberOfLines={props.numberOfLines}
        underlineColor="transparent"
        underlineColorAndroid="transparent"
        placeholderTextColor={R.colors.black}
        secureTextEntry={props.secureTextEntry ? HidePassword : false}
        maxLength={props.maxLength}
        minHeight={
          Platform.OS === 'ios' && props.numberOfLines
            ? 20 * props.numberOfLines
            : null
        }
        cursorColor={R.themes.accountTextColour}
        onSubmitEditing={props.onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyleView: {
    margin: '5%',
    borderColor: R.themes.borderColor,
    borderWidth: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  seachIconView: {
    alignSelf: 'center',
    marginLeft: '5%',
  },
  textInputStyle: {
    color: R.themes.darkTextColor,
    paddingTop: Platform.OS == 'ios' ? '4%' : '4%',
    paddingLeft: '5%',
    paddingBottom: Platform.OS == 'ios' ? '4%' : '2%',
    fontFamily: R.fonts.primaryMedium,
    width: R.dimensions.wp(70),
    // fontSize: R.dimensions.wp(4),
    // You can adjust the width as needed
    // You can adjust the height as needed
    overflow: 'hidden',
  },
});
