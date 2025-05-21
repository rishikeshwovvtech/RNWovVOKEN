import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {RootView} from '../../components';
import R from '../../R';
// import codePush from 'react-native-code-push';
// import codePush from 'react-native-code-push';
import {AuthContext} from '../../context/auth/AuthContext';

export const AppUpdateScreen = ({navigation}) => {
  const [downloadProgress, setDownloadProgress] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const {authState, authAction} = useContext(AuthContext);

  useEffect(() => {
    const backAction = () => {
      return true; // Disable back button
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return (
      () => backHandler.remove(),
      BackHandler.removeEventListener('hardwareBackPress', backHandler)
    );
  }, []);
  const updateIt = () => {
    // codePush.sync(
    //   {
    //     installMode: codePush.InstallMode.IMMEDIATE,
    //   },
    // codePush.sync(
    //   {
    //     installMode: codePush.InstallMode.IMMEDIATE,
    //   },

    //   codePushStatusDidChange,
    //   codePushDownloadDidProgress,
    //);
  };
  const codePushDownloadDidProgress = (progress) => {
    let percentage = (progress.receivedBytes / progress.totalBytes) * 100;
    setDownloadProgress(percentage.toFixed(2) + '%');
  };
  const codePushStatusDidChange = async (syncStatus) => {
    switch (syncStatus) {
      case await codePush.SyncStatus.CHECKING_FOR_UPDATE:
        setCurrentStatus('Checking for updates');
        break;
      case await codePush.SyncStatus.SYNC_IN_PROGRESS:
        setCurrentStatus('Sync in Progress');
        break;
      case await codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setCurrentStatus('Downloading package');
        break;
      case await codePush.SyncStatus.INSTALLING_UPDATE:
        setCurrentStatus('Installing update');
        break;
      case await codePush.SyncStatus.UP_TO_DATE:
        setCurrentStatus('Up-to-date');
        break;
      case await codePush.SyncStatus.UPDATE_INSTALLED:
        let userInfo = {
          ...authState,
          isUpdate: false,
        };

        await authAction.setData(userInfo);

        setCurrentStatus('Update installed');
        break;
      case await codePush.SyncStatus.UNKNOWN_ERROR:
        setCurrentStatus('Something went wrong!');
        break;
    }
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
          <Text style={styles.titleText}>We are getting better than ever!</Text>
          <View style={styles.descriptionView}>
            <Text style={styles.descriptionText}>{downloadProgress}</Text>
            <Text style={styles.descriptionText}>{currentStatus}</Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: '10%',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              updateIt();
            }}
            style={styles.buttonView}
          >
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.descriptionText}>
          Please stay on this screen, while the app updates.
        </Text>
      </View>
    </RootView>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontFamily: R.fonts.primaryBold,
    color: R.themes.backgroundColor,
    fontSize: 18,
    alignSelf: 'center',
  },
  descriptionText: {
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.backgroundColor,
    alignSelf: 'center',
    textAlign: 'center',
  },
  buttonView: {
    height: 45,
    width: 130,
    backgroundColor: R.themes.boxBackgroundColour,
    alignSelf: 'center',
    borderRadius: 15,
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
