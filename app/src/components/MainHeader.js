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
import {useRoute} from '@react-navigation/native';
import RemixIcon from 'react-native-remix-icon';
import R from '../R';
import {DrawerActions} from '@react-navigation/native';

const statusBarHeight = StatusBar.currentHeight;
export const MainHeader = (props) => {
  const route = useRoute();
  const renderBackButtonHeader = () => {
    return (
      <View style={styles.mainContainerRenderBackButtonHeader}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            onPress={() =>
              props?.isFromDrawer
                ? props.navigation.goBack()
                : route?.name == 'HomePage'
                ? props.navigation.dispatch(DrawerActions.openDrawer())
                : props.navigation.navigate('HomePage')
            }
          >
            <RemixIcon
              name={
                route?.name == 'HomePage'
                  ? 'ri-menu-line'
                  : 'ri-arrow-left-line'
              }
              size={R.dimensions.wp(7)}
              color={R.themes.backgroundColor}
              style={{
                marginLeft: '1%',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.nexusLogo}>
          <Image
            resizeMode="contain"
            source={R.images.NexusOne}
            style={styles.imagesIconNexus}
          />
        </View>
        <View style={styles.searchandsnoti}>
          {props.isSearch && (
            <TouchableOpacity
              onPress={props.searchClicked}
              styles={[styles.rightIcon, {flex: 1}]}
            >
              <RemixIcon
                name={'ri-search-line'}
                size={R.dimensions.wp(6)}
                color={R.themes.backgroundColor}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          )}
          {props.isNotification && (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Notification')}
              styles={[styles.rightIcon, {flex: 1}]}
            >
              <RemixIcon
                name={'ri-notification-2-fill'}
                size={R.dimensions.wp(6)}
                color={R.themes.backgroundColor}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          )}
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
    height: R.dimensions.wp(12),
  },
  mainContainerRenderBackButtonHeader: {
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: '4%',
    width: '92%',
    height: '100%',
    flexDirection: 'row',
  },
  nexusLogo: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  searchandsnoti: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
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
