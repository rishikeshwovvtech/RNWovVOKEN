import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
//local imports
import R from '../R';
import {horizontalScale} from '../../res/scale';
import {SimpleButton} from './SimpleButton';

export const CModal = (props) => {
  return (
    <Modal visible={props.isVisible} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: R.colors.modalBlack,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: R.themes.backgroundColor,
            padding: '3%',
            borderRadius: 8,
            width: horizontalScale(300),
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              marginVertical: '5%',
              fontSize: horizontalScale(12),
              textAlign: 'center',

              fontFamily: R.fonts.primaryMed,
            }}
          >
            {props.modalMsg == null
              ? 'Please wait for few minutes before you try again!'
              : props.modalMsg}
          </Text>
          {/* <SimpleButton title={'Dismiss'} onPress={props.onPressModal} customStyle={{width:R.dimensions.hp(20)}}/> */}
          {props.modaldwg_point && (
            <Text
              style={{
                marginVertical: '5%',
                fontSize: horizontalScale(12),
                textAlign: 'center',

                fontFamily: R.fonts.primaryMed,
              }}
            >
              “Yay! You have earned {props.modaldwg_point} points! {'\n'}{' '}
              Exciting rewards await you on {'\n'} your special day.”
            </Text>
          )}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {props.isCancell && (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={props.onCancelPressModal}
                style={styles.okandcancelButton}
              >
                <Text style={styles.LoginButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}

            {props.isForm ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={props.onPressModal}
                style={
                  props.isOkModal
                    ? styles.okandcancelButton
                    : styles.LoginButton
                }
              >
                <Text style={styles.LoginButtonText}>OK</Text>
              </TouchableOpacity>
            ) : (
              <SimpleButton
                title={'OK'}
                onPress={props.onPressModal}
                customStyle={{width: R.dimensions.hp(30)}}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  LoginButton: {
    width: R.dimensions.wp(30),
    height: R.dimensions.hp(5),
    backgroundColor: R.themes.darkButtonColor,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  okandcancelButton: {
    width: R.dimensions.wp(18),
    height: R.dimensions.hp(5),
    backgroundColor: R.themes.darkCardBackgroundColor,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  LoginButtonText: {
    textAlign: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
  },
});
