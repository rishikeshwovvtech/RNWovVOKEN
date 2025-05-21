import React, {useState, useEffect, useRef} from 'react';
import {Modal} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import R from '../../../R';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {Animated} from 'react-native';

const DeleteProgressBar = (props) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const interpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-80%', '210%'],
  });

  const animatedStyle = {
    transform: [{translateX: interpolate}],
  };
  return (
    <Modal visible={props.isVisible} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        <View style={styles.mainView}>
          <Text style={styles.firsttext}>We're sad to see you go!</Text>

          <Text style={styles.secondText}>
            However, you are welcome to sign up again using the same personal
            details.
          </Text>

          <View
            style={{
              // overflow: 'hidden',
              marginVertical: 20,
              marginHorizontal: 20,
              width: '60%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <>
              {!props.isDeleted ? (
                <>
                  <View
                    style={{
                      overflow: 'hidden',
                      width: '100%',
                      height: 15,
                      borderRadius: 10,
                      marginVertical: 10,
                      backgroundColor: 'rgba(205, 68, 183, 0.2)',
                    }}
                  >
                    <Animated.View
                      style={{
                        borderRadius: 10,
                        width: '30%',
                        height: '100%',
                        backgroundColor: R.themes.boxBackgroundColour,
                        ...animatedStyle,
                      }}
                    />
                  </View>

                  <Text style={styles.label}>processing</Text>
                </>
              ) : (
                <>
                  <Text style={styles.labeld}>Your account is deleted!!!</Text>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={props.onPressClearAsync}
                    style={{
                      width: R.dimensions.wp(20),
                      height: R.dimensions.hp(5),
                      backgroundColor: R.themes.accountTextColour,
                      textAlign: 'center',
                      justifyContent: 'center',
                      alignSelf: 'center',
                      borderRadius: 5,
                      top: 20,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        color: R.themes.backgroundColor,
                        fontFamily: R.fonts.primaryBold,
                      }}
                    >
                      OK
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          </View>

          <View
            style={{
              justifyContent: 'center',
            }}
          >
            <Image
              source={R.images.middlePetal}
              style={{
                width: '45%',
                resizeMode: 'contain',
                end: '22%',
                bottom: -160,
                position: 'absolute',
              }}
            />
            <Image
              source={R.images.bottomPetal}
              style={{
                width: '60%',
                resizeMode: 'contain',
                end: '20%',
                bottom: -240,
                position: 'absolute',
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    borderRadius: 20,
    marginTop: '70%',
    backgroundColor: R.themes.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 30,
    overflow: 'hidden',
    paddingBottom: 30,
  },

  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },

  firsttext: {
    color: R.colors.black,
    alignSelf: 'center',
    fontSize: 27,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  secondText: {
    lineHeight: 19,
    fontWeight: '400',
    marginTop: 15,
    marginHorizontal: 15,
    color: R.colors.black,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  // container: {
  //   width: '100%',
  //   marginTop: 20,
  //   height: 20,
  //   backgroundColor: 'rgba(205, 68, 183, 0.2)',
  //   borderRadius: 10,
  //   overflow: 'hidden',
  // },
  // bar: {
  //   height: '100%',
  //   backgroundColor:  R.themes.boxBackgroundColour,
  //   borderRadius: 10,
  // },
  label: {
    marginTop: 10,
    color: R.colors.black,
    lineHeight: 14,
    fontWeight: '400',
  },
  labeld: {
    color: R.colors.black,
    lineHeight: 14,
    fontWeight: '500',
  },
});

export default DeleteProgressBar;
