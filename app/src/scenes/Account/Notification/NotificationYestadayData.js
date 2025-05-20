import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {dimensions} from '../../../../res/dimensions';
import R from '../../../R';

//TODO move this to its own component
export const NotificationYestadayData = (props) => {
  return (
    <View>
      <View>
        <View style={styles.divider} />
        <View style={styles.mainContainer}>
          <Text style={styles.titletext}>{props.title}</Text>
          <Text>{props.time}</Text>
        </View>
        <Text style={styles.messagetext}>{props.message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayText: {
    fontSize: dimensions.h2,
    fontWeight: 'bold',
    color: R.colors.black,
    padding: 5,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    opacity: 0.1,
    padding: 5,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
  titletext: {
    color: R.colors.red,
    fontSize: dimensions.h1,
  },
  messagetext: {
    width: dimensions.wp(60),
    color: R.colors.grey,
    marginHorizontal: '5%',
  },
});
