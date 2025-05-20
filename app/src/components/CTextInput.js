import React, {useState} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
//local imports
import R from '../R';
import {TextInput} from 'react-native-gesture-handler';
import RemixIcon from 'react-native-remix-icon';

export const CTextInput = (props) => {
  const [HidePassword, setHidePassword] = useState(true);
  return (
    <View style={[styles.mainView, {...props.customMainViewStyle}]}>
      {props.title && <Text style={styles.textInputTitle}>{props.title}</Text>}
      <View
        style={[
          styles.textInputStyleView,
          {...props.customTextInputStyleView, flexDirection: 'row'},
        ]}
      >
        <TextInput
          // selectionColor={R.themes.darkButtonColor}
          textAlign="left"
          autoCompleteType={'email'}
          style={[
            styles.textInputStyle,
            props.secureTextEntry == true || props.greenCheck == true
              ? {width: '86%'}
              : {width: '100%'},
          ]}
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
          textBreakStrategy="simple"
        />
        {props.secureTextEntry && (
          <View
            style={[styles.secureTextEntry, {...props.customSecureTextEntry}]}
          >
            <RemixIcon
              name={HidePassword ? 'ri-eye-off-line' : 'ri-eye-line'}
              size={R.dimensions.hp('3%')}
              color={R.themes.darkIconColor}
              onPress={() => setHidePassword(!HidePassword)}
              style={{paddingHorizontal: '2%'}}
            />
          </View>
        )}
        {props.greenCheck && (
          <View
            style={[styles.secureTextEntry, {...props.customSecureTextEntry}]}
          >
            <RemixIcon
              name={'ri-check-line'}
              size={R.dimensions.hp('3%')}
              color={R.colors.green}
              onPress={() => setHidePassword(!HidePassword)}
              style={{paddingHorizontal: '2%'}}
            />
          </View>
        )}
      </View>
      {props.showErrorText && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: '5%',
    marginVertical: '2.5%',
  },
  textInputStyleView: {
    marginHorizontal: '5%',
    borderColor: R.themes.borderColor,
    borderWidth: 1,
  },
  textInputTitle: {
    fontSize: R.dimensions.wp(3.2),
    color: R.themes.darkTextColor,
    marginLeft: '1%',
    fontFamily: R.fonts.primaryRegular,
  },
  textInputStyle: {
    color: R.themes.darkTextColor,
    paddingTop: Platform.OS == 'ios' ? '5%' : '4%',
    paddingHorizontal: '5%',
    paddingBottom: Platform.OS == 'ios' ? '5%' : '2%',
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.wp(4),
  },
  errorText: {
    marginTop: '3%',
    marginHorizontal: '5%',
    color: R.themes.redColour,
    fontSize: R.dimensions.wp(3),
    fontFamily: R.fonts.primaryRegular,
  },
  secureTextEntry: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    justifyContent: 'center',
    end: 20,
  },
});
