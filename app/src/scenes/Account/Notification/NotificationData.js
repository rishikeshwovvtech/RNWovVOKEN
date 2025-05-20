import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {dimensions} from '../../../../res/dimensions';
import R from '../../../R';
export const NotificationData = (props) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          marginHorizontal: 15,
          marginTop: 10,
        }}
      >
        <Image
          style={{
            resizeMode: 'contain',
            width: 50,
            height: 50,
            alignSelf: 'center',
          }}
          source={R.images.Coin_Money}
        />
        <View style={{marginHorizontal: 10}}>
          <View style={styles.mainContainer}>
            <Text style={styles.titletext}>
              {props.title.length > 20
                ? props.title.substring(0, 20) + '...'
                : props.title}
            </Text>
            <Text style={styles.dayText}>{props.time}</Text>
          </View>
          <Text style={styles.messagetext}>{props.message}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  dayText: {
    fontSize: dimensions.h1,
    fontFamily: R.fonts.primaryBold,
    color: R.themes.boxBackgroundColour,
    paddingHorizontal: 10,
  },

  divider: {
    borderBottomColor: R.themes.backgroundColor,
    borderBottomWidth: 3,
    paddingTop: 20,
  },
  mainContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  titletext: {
    color: R.themes.backgroundColor,
    fontSize: dimensions.h2,
    fontWeight: '800',

    fontFamily: R.fonts.primaryRegular,
  },
  messagetext: {
    color: R.themes.backgroundColor,

    fontFamily: R.fonts.primaryRegular,
    flexWrap: 'wrap',
  },
});
