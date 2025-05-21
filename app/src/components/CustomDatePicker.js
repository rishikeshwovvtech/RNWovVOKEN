import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
//local imports
import R from '../R';
import RemixIcon from 'react-native-remix-icon';

export const CustomDatePicker = (props) => {
  const colorScheme = useColorScheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setShowDatePicker(!showDatePicker)}
      style={[styles.mainView, {...props.customMainViewStyle}]}
    >
      <View
        style={[styles.textInputStyleView, {...props.customTextInputStyleView}]}
      >
        <Text style={styles.textInputStyle}>{props.text}</Text>
        <DatePicker
          maximumDate={new Date()}
          modal={true}
          style={{
            backgroundColor: R.themes.yellowPetalcolor,
          }}
          dividerHeight={20}
          androidVariant="nativeAndroid"
          textColor={R.themes.darkTextColor}
          open={showDatePicker}
          theme={'light'}
          mode="date"
          date={props.date}
          onConfirm={(d) => {
            props.onConfirm(d, 2);
          }}
          onCancel={() => {
            setShowDatePicker(false);
          }}
          borderColor={R.themes.accountTextColour}
        />
        <View style={styles.secureTextEntry}>
          <RemixIcon
            name={'ri-calendar-line'}
            size={R.dimensions.hp('3%')}
            color={R.themes.darkIconColor}
            style={{paddingHorizontal: '2%'}}
          />
        </View>
      </View>
      {props.showErrorText && (
        <Text style={styles.errorText}>{props.errorText}</Text>
      )}
    </TouchableOpacity>
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
    paddingBottom: Platform.OS == 'ios' ? '5%' : '4%',
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.wp(4),
  },
  errorText: {
    marginTop: '3%',
    marginHorizontal: '5%',
    color: R.themes.darkTextColor,
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
