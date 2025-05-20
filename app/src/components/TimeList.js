import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import R from '../R';

export const TimeList = (props) => {
  return (
    <View style={[styles.headerView, props.container]}>
      <View style={{flex: 0}}>
        <Text style={[styles.day, props.time]}>{props.day}</Text>
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.2}} />
          <Text style={[styles.timeContent, props.time]}>
            {props.startTime}
          </Text>
          <Text style={[styles.dash, props.dash]}>to</Text>
          <Text style={[styles.endTime, props.time]}>{props.endTime}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '3%',
  },
  dash: {
    paddingHorizontal: 2,
    flex: 0.25,
    color: R.colors.primaryBrand2,
    fontFamily: R.fonts.primaryRegular,
    alignSelf: 'center',
  },
  day: {
    fontSize: R.dimensions.hp('1.8%'),
    width: R.dimensions.wp(25),
    fontFamily: R.fonts.primaryRegular,
    color: R.colors.primaryBrand2,
    flex: 1,
  },
  dot: {
    fontSize: R.dimensions.hp('1.8%'),
    color: R.colors.grey,
    fontFamily: R.fonts.primaryRegular,
    alignSelf: 'center',
    flex: 0.2,
  },
  timeContent: {
    fontFamily: R.fonts.primaryRegular,
    color: R.colors.primaryBrand2,
    fontSize: R.dimensions.hp('1.8%'),
    flex: 0.5,
  },
  endTime: {
    color: R.colors.primaryBrand2,
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp('1.8%'),
    alignSelf: 'center',
    flex: 0.5,
  },
  arrow: {
    marginLeft: '2%',
    height: R.dimensions.hp('3%'),
    width: R.dimensions.wp('5%'),
  },
});
