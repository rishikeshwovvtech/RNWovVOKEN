import React, {useContext, useRef, useState} from 'react';

import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import RemixIcon from 'react-native-remix-icon';
import crashlytics from '@react-native-firebase/crashlytics';

import {AuthContext} from '../context/auth/AuthContext';

import DeviceInfo from 'react-native-device-info';
import {DrawerActions} from '@react-navigation/native';

// import Icon from 'react-native-remix-icon'; //TODO remove following dependacny and shift that icon to ract native vector icon
//local imports
import R from '../R';
import {TextInput} from 'react-native-gesture-handler';
//TODO merge this file with main header and crate common component for both
const statusBarHeight = StatusBar.currentHeight;
export const HomeHeader = (props) => {
  const [searchOpen, setsearchOpen] = useState(false);

  const {authState} = useContext(AuthContext);

  const renderBackButtonHeader = () => {
    return (
      <View style={styles.mainContainerRenderBackButtonHeader}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() => {
              props.closed();
              searchOpen
                ? setsearchOpen(false)
                : props.navigation.dispatch(DrawerActions.openDrawer());
            }}
          >
            <RemixIcon
              name={!searchOpen ? 'ri-menu-line' : 'ri-arrow-left-line'}
              size={R.dimensions.wp(7)}
              color={R.colors.white}
              style={{
                marginLeft: '1%',
              }}
            />
          </TouchableOpacity>
        </View>
        {!searchOpen ? (
          <View style={styles.nexusLogo}>
            <Image
              resizeMode="contain"
              source={R.images.NexusOne}
              style={styles.imagesIconNexus}
            />
          </View>
        ) : (
          <View
            style={[
              styles.textInputStyleView,
              {...props.customTextInputStyleView},
            ]}
          >
            <TouchableOpacity
              style={styles.seachIconView}
              onPress={props.onPress}
            >
              <RemixIcon
                name={'ri-search-line'}
                size={R.dimensions.wp(6)}
                color={R.themes.statusBarColor}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
            <TextInput
              // selectionColor={R.themes.darkButtonColor}
              textAlign="left"
              autoCompleteType={'email'}
              style={styles.textInputStyle}
              defaultValue={props.defaultValue}
              onChangeText={props.onChangeText}
              placeholder={'Search brands'}
              keyboardType={props.keyboardType}
              value={props.values}
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
              placeholderTextColor={R.themes.statusBarColor}
              secureTextEntry={props.secureTextEntry ? HidePassword : false}
              onSubmitEditing={props.onSubmitEditing}
              maxLength={props.maxLength}
              minHeight={
                Platform.OS === 'ios' && props.numberOfLines
                  ? 20 * props.numberOfLines
                  : null
              }
              cursorColor={R.themes.accountTextColour}
            />
          </View>
        )}

        <View
          style={{
            flex: !searchOpen ? 1 : 1,
            flexDirection: 'row',

            alignSelf: 'center',
            justifyContent: 'space-around',
          }}
        >
          {!searchOpen && (
            <TouchableOpacity
              onPress={() => setsearchOpen(true)}
              styles={[styles.rightIcon, {flex: 1}]}
            >
              <RemixIcon
                name={'ri-search-line'}
                size={R.dimensions.wp(6)}
                color={R.colors.white}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          )}
          {props.isNotification && (
            <TouchableOpacity
              //   onPress={() => props.navigation.navigate('Notification')}
              onPress={() => {
                authState?.userId != null &&
                  crashlytics().setAttribute(
                    'UserID',

                    authState?.userId.toString(),
                  ),
                  crashlytics().setAttribute('Page ', 'Home'),
                  crashlytics().setAttribute(
                    'App Version ',

                    DeviceInfo.getVersion().toString(),
                  ),
                  crashlytics().recordError('TEST ERROR FROM HOME ');

                //crashlytics().crash();
              }}
              styles={[styles.rightIcon, {flex: 1}]}
            >
              <RemixIcon
                name={'ri-notification-2-fill'}
                size={R.dimensions.wp(6)}
                color={R.colors.white}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      setsearchOpen(props.sreachTextOorC);
    }, []),
  );
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      {Platform.OS === 'ios' ? (
        <SafeAreaView>{renderBackButtonHeader()}</SafeAreaView>
      ) : (
        <View style={styles.androidBackButton}>{renderBackButtonHeader()}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: R.colors.primaryBrand2,
    height:
      Platform.OS === 'ios'
        ? R.dimensions.hp('12%')
        : R.dimensions.hp('8%') + StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagesIconNexus: {
    width: R.dimensions.wp(50),
    height: R.dimensions.wp(12),
  },
  mainContainerRenderBackButtonHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '4%',
    width: '92%',
    height: '100%',
    flexDirection: 'row',
  },
  nexusLogo: {
    flex: 5,

    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  rightIcon: {
    alignSelf: 'center',
    height: R.dimensions.wp('4%'),
    width: R.dimensions.wp('7%'),
  },
  androidBackButton: {
    paddingTop: statusBarHeight + R.dimensions.hp('0.5%'),
  },

  //searchinput
  textInputStyleView: {
    backgroundColor: R.themes.lightCardBackgroundColor,
    borderColor: R.themes.statusBarColor,
    borderWidth: 1,
    flexDirection: 'row',
    flex: 7,
    borderRadius: 8,
  },
  seachIconView: {
    alignSelf: 'center',
    marginLeft: '5%',
  },
  textInputStyle: {
    color: R.themes.statusBarColor,
    paddingTop: Platform.OS == 'ios' ? '5%' : '5%',
    paddingLeft: '5%',
    paddingBottom: Platform.OS == 'ios' ? '5%' : '3%',
    fontFamily: R.fonts.primaryMedium,
    width: R.dimensions.wp(70),
    // fontSize: R.dimensions.wp(4),
    // You can adjust the width as needed
    // You can adjust the height as needed
    overflow: 'hidden',
    fontWeight: '400',
    fontSize: 14,
  },
});
