import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {dimensions} from '../../res/dimensions';
import R from '../R';
import RemixIcon from 'react-native-remix-icon';
//TODO review it can we merge in CTextInput component
export const ProfileTextInput = (props) => {
  return (
    <View>
      {/* <Text style={styles.textView}>{props.title}</Text> */}
      <View
        cardElevation={6}
        cardMaxElevation={6}
        cornerRadius={10}
        style={styles.cardContainer}
      >
        <TextInput
          //selectionColor={R.themes.darkButtonColor}
          underlineColorAndroid="transparent"
          style={styles.textInputText}
          placeholder={props.placeholder}
          placeholderTextColor={R.colors.black}
          keyboardType={props.keyboardType}
          onChangeText={props.onChangeText}
          value={props.value}
          defaultValue={props.defaultValue}
          editable={props.editable}
          multiline={props.multiline}
          cursorColor={R.themes.accountTextColour}
        />

        {props.calenderTextEntry ? (
          <View
            style={[styles.secureTextEntry, {...props.customSecureTextEntry}]}
          >
            <Image
              source={R.images.calendarimg}
              style={{
                paddingHorizontal: '4%',
                height: 26,
                end: 10,
                position: 'absolute',
              }}
            />
          </View>
        ) : null}
        {props.correctValue && (
          <View style={styles.secureTextEntry}>
            <RemixIcon
              name={'ri-check-line'}
              size={R.dimensions.hp('3.5%')}
              //onPress={() => setHidePassword(!HidePassword)}
              style={{paddingHorizontal: '2%', color: R.colors.green}}
            />
          </View>
        )}
        {props.simplebutton && (
          <View style={styles.secureTextEntry}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={props.onPressButton}
              //style={{backgroundColor:R.colors.red}}
            >
              <Text style={{color: R.themes.boxBackgroundColour}}>
                Send Otp
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  secureTextEntry: {
    position: 'absolute',
    right: '5%',
    bottom: 0,
    top: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  cardContainer: {
    width: dimensions.wp(80),
    height: dimensions.hp(7),
    justifyContent: 'center',
    elevation: R.themes.theme == 'dark' ? 3 : null,
    backgroundColor: R.themes.backgroundColor,
    borderRadius: R.themes.theme == 'dark' ? 10 : null,
    // shadowOpacity: 0.1,
    // borderBottomWidth: 0.1,
    // borderBottomColor: R.colors.g,
    shadowOffset: {
      height: R.themes.theme == 'dark' ? 0.5 : null,
      width: R.themes.theme == 'dark' ? 0.5 : null,
    },
    shadowOpacity: R.themes.theme == 'dark' ? 0.2 : null,
    borderColor: R.themes.darkTextColor,
    borderWidth: R.themes.theme == 'dark' ? null : 1,
    marginVertical: '2%',
  },
  textView: {
    color: R.themes.darkTextColor,
    fontFamily: R.fonts.primaryBold,
    fontSize: dimensions.h1,
    marginVertical: '3%',
    fontWeight: 'bold',
  },
  textInputText: {
    marginHorizontal: '5%',
    fontFamily: R.fonts.primaryRegular,
    color: R.colors.black,
  },
});
