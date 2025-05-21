/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import R from '../../R';
import {horizontalScale} from '../../../res/scale';
export const DownScreen = () => {
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDatabaseValue();
  }, []);

  const getDatabaseValue = () => {
    setLoading(true);
    database()
      .ref('nexusone')

      .once('value')
      .then((snapshot) => {
        const data = snapshot.toJSON().appConfig.downTimeMessage;
        const splitted = data.split('.');
        setMessage(splitted[0]);
        const splitted3 = splitted[1].split('from');
        setMessage1(splitted3[0] + 'from');
        setMessage2(splitted3[1]);
        setLoading(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
      <StatusBar
        backgroundColor={R.colors.primaryBrand2}
        barStyle="light-content"
      />
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Image source={R.images.nexusLogoWhiteBackground} style={styles.headerLogo} />
          <View style={styles.curveLine} />
          {/* <View style={styles.curveLine} /> */}
        </View>
      </View>

      {/* {//////flex 2 } */}
      <View style={{flex: 3}}>
        <View style={styles.bottomView}>
          <View
            style={{
              flex: 5,
            }}
          >
            <Image
              source={R.images.remotepetal2}
              style={{
                width: '12%',
                resizeMode: 'contain',
                position: 'absolute',
                start: '10%',
                tintColor: R.themes.boxBackgroundColour,
                top: '-15%',
              }}
            />
            <Image
              source={R.images.remotepetal2}
              style={{
                width: '8%',
                resizeMode: 'contain',
                position: 'absolute',
                end: '10%',
                tintColor: R.themes.boxBackgroundColour,
                top: '10%',
              }}
            />
            <Image
              source={R.images.remotepetal2}
              style={{
                width: '8%',
                resizeMode: 'contain',
                position: 'absolute',
                start: '1%',
                top: '90%',
              }}
            />

            <Image
              source={R.images.remotebpetal3}
              style={{
                width: '8%',
                resizeMode: 'contain',
                position: 'absolute',
                end: '20%',
                top: '30%',
              }}
            />
            <Image
              source={R.images.remotebpetal3}
              style={{
                width: '12%',
                resizeMode: 'contain',
                position: 'absolute',
                end: '6%',
                top: '75%',
              }}
            />
          </View>

          {loading ? (
            <View
              style={{
                flex: 1,
                marginTop: '60%',
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
                zIndex: 10,
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
                >
                  Loading
                </Text> */}

                <Image
                  source={R.images.loaderNexus}
                  style={{width: 50, height: 50}}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 10,
              }}
            >
              <View style={styles.boxView}>
                <Text style={styles.text1}>
                  {message}
                  {'.\n'}
                </Text>
                <Text style={styles.text1}>{message1}</Text>
                <Text style={styles.text2}>{message2}</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* {///// flex 3} */}
      <View style={{flex: 2}}>
        <View
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            source={R.images.remotebpetal3}
            style={{
              width: '8%',
              resizeMode: 'contain',
              position: 'absolute',
              end: '10%',
            }}
          />
          <Image
            source={R.images.remotebpetal4}
            style={{
              width: '10%',
              resizeMode: 'contain',
              position: 'absolute',
              end: '45%',
              top: '35%',
            }}
          />

          <Image
            source={R.images.middlePetal}
            style={{
              width: '120%',
              resizeMode: 'contain',
              top: '17%',
              alignSelf: 'flex-start',
              end: '24%',
              position: 'absolute',
            }}
          />
          <Image
            source={R.images.bottomPetal}
            style={{
              width: '170%',
              resizeMode: 'contain',
              alignSelf: 'flex-start',
              top: '10%',
              end: '80%',
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: R.colors.primaryBrand2,
  },
  headerLogo: {
    position: 'absolute',
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '40%',
    bottom: '-20%',
  },
  curveLine: {
    height: R.dimensions.hp(32),
    alignSelf: 'center',
    position: 'absolute',
    width: R.dimensions.wp(120),
    position: 'absolute',
    alignSelf: 'center',
    top: '-115%',
    backgroundColor: 'transparent',
    borderRadius: 30,
    borderBottomWidth: Platform.OS === 'ios' ? 10 : 8,
    borderRightWidth: Platform.OS === 'ios' ? 0.4 : 0.2,
    borderLeftWidth: Platform.OS === 'ios' ? 0.4 : 0.2,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: R.themes.boxBackgroundColour,
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
  },

  bottomView: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  boxView: {
    width: '85%',
    height: '90%',
    backgroundColor: R.themes.backgroundColor,
    alignSelf: 'center',
    zIndex: 100,
    paddingVertical: 30,
    borderRadius: 20,
    overflow: 'visible',
    justifyContent: 'center',
    borderColor: '#F5BA14',
    borderWidth: 2,
  },

  text1: {
    alignSelf: 'center',
    color: '#000000',
    fontFamily: R.fonts.primaryMedium,
    fontSize: R.dimensions.h3,
    paddingHorizontal: '5%',
    textAlign: 'center',
  },

  text2: {
    marginTop: 10,
    alignSelf: 'center',
    color: '#000000',
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.h3,
    paddingHorizontal: '5%',
    textAlign: 'center',
  },
});
