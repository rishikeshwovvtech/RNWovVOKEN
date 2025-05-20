import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
// import Icon from 'react-native-remix-icon'; //TODO remove following dependacny and shift that icon to ract native vector icon
//local imports
import R from '../R';
import RemixIcon from 'react-native-remix-icon';

//TODO merge this file with main header and crate common component for both
const statusBarHeight = StatusBar.currentHeight;
export const BackHeader = (props) => {
  const showBackButton = props.showBackButton ?? true;
  const showNexus247Logo = props.showNexus247Logo ?? false;
  const renderBackButtonHeader = () => {
    return (
      <View style={styles.mainContainerRenderBackButtonHeader}>
        {showBackButton ? (
          <View style={{flex: 1}}>
            <TouchableOpacity
              onPress={
                props.customOnPress
                  ? props.customOnPress
                  : () => props.navigation.goBack()
              }
            >
              {/* ri-arrow-left-line */}
              <RemixIcon
                name={'ri-arrow-left-line'}
                size={R.dimensions.wp(7)}
                color={R.themes.backgroundColor}
                style={{alignSelf: 'flex-start', marginLeft: '1%'}}
              />

              {/* <Icon
              name="arrow-back"
              size={R.dimensions.wp(7)}
              color={R.themes.backgroundColor}
              style={{
                marginLeft: '1%',
              }}
            /> */}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flex: 1}}></View>
        )}
        <View style={styles.nexusLogo}>
          <Image
            resizeMode="contain"
            source={
              showNexus247Logo ? R.images.nexus247Logo : R.images.NexusOne
            }
            style={styles.imagesIconNexus}
          />
        </View>
        <View style={{flex: 1}}>
          {/* {props.showRightIcon && (
            <TouchableOpacity
              onPress={props.rightIconOnPress}
              styles={styles.rightIcon}
            >
              <Icon
                name={props.name}
                size={R.dimensions.wp(7)}
                color={props.color}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    );
  };

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
});
