import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
//local imports
import R from '../../../R';
import {horizontalScale} from '../../../../res/scale';
import {SimpleButton} from '../../../../src/components/SimpleButton';

export const CEditModal = (props) => {
  return (
    <Modal
      visible={props.isVisible}
      isName={props.isNameEdited}
      userPoints={props.userPoints}
      animationType="fade"
      transparent={true}
    >
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
            width: '80%',
            height: props.isNameEdited ? '15%' : '20%',
            backgroundColor: 'white',
            borderRadius: 10,
          }}
        >
          {props.isNameEdited ? (
            <Text
              style={{
                fontSize: horizontalScale(18),
                textAlign: 'center',
                fontFamily: R.fonts.primaryMed,
                marginTop: '5%',
              }}
            >
              Profile Updated {'\n'} Successfully
            </Text>
          ) : (
            <>
              {/* <Image
                source={R.images.VoucherClip}
                resizeMode="contain"
                style={{
                  width: '108%',
                  position: 'absolute',
                  tintColor: R.themes.accountTextColour,
                  marginTop: '-40%',
                }}
              /> */}

              <View
                style={{
                  width: '100%',
                  height: '30%',
                  backgroundColor: R.themes.darkCardBackgroundColor,
                  borderBottomLeftRadius: 120,
                  borderBottomRightRadius: 120,

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    // position: 'absolute',
                    // alignSelf: 'center',

                    fontSize: horizontalScale(22),
                    color: R.themes.backgroundColor,
                    fontFamily: R.fonts.primaryBold,
                  }}
                >
                  Congratulations!
                </Text>
              </View>

              <Text
                style={{
                  fontSize: horizontalScale(12),
                  textAlign: 'center',
                  fontWeight: '700',
                  marginTop: '5%',
                }}
              >
                Yay! You have earned ₹{props.userPoints}
                {'\n'} added to your yearly spends !!
              </Text>
            </>
          )}
          <TouchableOpacity
            onPress={props.onPressModal}
            style={{
              width: R.dimensions.wp(40),
              height: R.dimensions.hp(4),
              backgroundColor: R.themes.accountTextColour,
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              marginTop: '5%',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                color: R.themes.backgroundColor,
                fontFamily: R.fonts.primaryBold,
              }}
            >
              Ok
            </Text>
          </TouchableOpacity>
          {/* <SimpleButton
            title={'OK'}
            onPress={props.onPressModal}
            customStyle={{
              width: R.dimensions.wp(20),
            }}
          /> */}
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
