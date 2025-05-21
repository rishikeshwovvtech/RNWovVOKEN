import React from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
//local imports
import R from '../../../R';
import {horizontalScale} from '../../../../res/scale';
import {SimpleButton} from '../../../components/SimpleButton';
//TODO move to the parent component as used once
export const CModalForProfile = (props) => {
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
            {props?.modalMsg}
          </Text>
          {/* <SimpleButton title={'Dismiss'} onPress={props.onPressModal} customStyle={{width:R.dimensions.hp(20)}}/> */}

          {props.isForm ? (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={props.onPressModal}
              style={styles.LoginButton}
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
    </Modal>
  );
};
const styles = StyleSheet.create({
  LoginButton: {
    width: R.dimensions.wp(30),
    height: R.dimensions.hp(5),
    backgroundColor: R.themes.boxBackgroundColour,
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  LoginButtonText: {
    textAlign: 'center',
    color: R.themes.backgroundColor,
    fontFamily: R.fonts.primaryBold,
  },
});
