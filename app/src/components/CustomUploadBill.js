import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootView} from './index';
//TODO move this icon from remix to react native vector

import R from '../R';
import RemixIcon from 'react-native-remix-icon';

export const CustomUploadBill = ({onPressUpload, noDataText}) => {
  return (
    <>
      <RootView customStyle={{flex: 0}}>
        <View style={styles.container}>
          <Image
            source={R.images.UploadCaptureBill}
            // tintColor={ R.themes.boxBackgroundColour}
            resizeMode="contain"
            style={styles.logo}
          />
          <Text style={styles.title}>No Bills Uploaded yet !</Text>
          <Text style={styles.content}>{noDataText} </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btnContainer}
            onPress={onPressUpload}
            testID="uploadButton"
          >
            <RemixIcon
              name="ri-camera-line"
              size={R.dimensions.wp('7%')}
              color={R.themes.boxBackgroundColour}
            />
            <Text style={styles.uploadText}>Upload New Bills</Text>
          </TouchableOpacity>
        </View>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 2,
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: R.dimensions.hp('20%'),
    width: R.dimensions.wp('20%'),
  },

  title: {
    fontFamily: R.fonts.primaryBold,
    paddingBottom: '3%',
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.hp('2.1%'),
  },

  content: {
    fontFamily: R.fonts.primaryLight,
    textAlign: 'center',
    padding: 10,
    fontSize: R.dimensions.hp(2.1),
    color: R.themes.backgroundColor,
  },

  uploadText: {
    marginStart: R.dimensions.wp('2%'),
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp('2%'),
    color: R.themes.boxBackgroundColour,
  },

  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: R.themes.boxBackgroundColour,
    padding: '3%',
    borderWidth: R.dimensions.wp('0.3%'),
    borderRadius: R.dimensions.wp('2%'),
    marginVertical: '7%',
  },

  camera: {
    height: R.dimensions.hp('3%'),
    width: R.dimensions.wp('7%'),
  },
});
