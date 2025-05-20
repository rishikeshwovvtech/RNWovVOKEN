import React from 'react';
import {View, Text, Modal, ActivityIndicator, Image} from 'react-native';
//local imports
import R from '../R';
//TODO remove horizontal scale implmentation
import {horizontalScale} from '../../res/scale';

export const Loader = (props) => {
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
            padding: '5%',
            borderRadius: 8,
            width: horizontalScale(300),
            alignItems: 'center',
          }}
        >
          {/* <ActivityIndicator
            size={'large'}
            color={R.themes.boxBackgroundColour}
          />
          <Text
            style={{
              marginTop: '5%',
              fontSize: horizontalScale(12),
              fontFamily: R.fonts.primaryRegular,
              textAlign: 'center',
            }}
          ></Text> */}
          <Image
            source={R.images.loaderNexus}
            style={{width: 50, height: 50}}
          />
        </View>
      </View>
    </Modal>
  );
};
