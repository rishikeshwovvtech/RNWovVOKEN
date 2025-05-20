import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React, {useContext} from 'react';
// import NetInfo from '@react-native-community/netinfo';

import {AuthContext} from '../context/auth/AuthContext';
import R from '../R';
import {RootView} from '../components';
import {StackActions, useFocusEffect} from '@react-navigation/native';
import isConnectionOn from './inConnectionOn';
import {useEffect} from 'react';
export const NewInternetScreen = ({navigation}) => {
  const {authState, authAction} = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        // Call your function here
        checkInternet();
      }, 2000);

      return () => clearInterval(interval);
    }, []),
  );

  const checkInternet = async () => {
    const isConnected = await isConnectionOn();
    if (isConnected) {
      // navigation.goBa
      // navigation.goBack();
      navigation.dispatch(StackActions.popToTop());
    }

    // const response = await NetInfo.fetch();

    // if (response.isConnected) {
    //   navigation.goBack();
    // }
  };

  return (
    <RootView customStyle={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 0.3}}>
          <Image source={R.images.NoInternet} style={styles.image} />
        </View>
        <View style={{flex: 0.25, paddingTop: 10}}>
          <Text style={styles.titleText}>No Internet Connection</Text>
          <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>
              Looks like there's a problem with the connection. Please check
              your network and try again!
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              checkInternet();
            }}
            style={styles.buttonView}
          >
            <Text style={styles.buttonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RootView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: R.fonts.primaryBold,
    color: R.themes.accountTextColour,
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  descriptionText: {
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.accountTextColour,
    alignSelf: 'center',
    textAlign: 'center',
  },
  buttonView: {
    height: 45,
    width: 130,
    backgroundColor: R.themes.accountTextColour,
    alignSelf: 'center',
    // borderRadius: 15,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: R.fonts.primaryBold,
  },
  image: {
    height: '80%',
    width: '80%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  descriptionView: {
    width: '60%',
    alignSelf: 'center',
    marginTop: 20,
  },
});
