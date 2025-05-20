import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import R from '../R';
import RemixIcon from 'react-native-remix-icon';

export const BrandListCard = (props) => {
  return (
    <View style={styles.childView}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={{
          flexDirection: 'row',
        }}
        onPress={props.onPressBrand}
        testID="brandCard"
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: R.themes.imageborderColour,
            // backgroundColor:"red"
          }}
        >
          <Image
            source={props.source}
            resizeMode={'contain'}
            style={styles.shopImg}
          />
        </View>
        <Text style={styles.nameText}>{props.brandName}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={props.like}
        style={{
          borderLeftColor: R.themes.borderSideColour,
          borderLeftWidth: 0.3,
        }}
      >
        <RemixIcon
          name={props.name}
          size={33}
          color={R.themes.calenderFromToBackColour}
          style={{marginHorizontal: 15}}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  childView: {
    flexDirection: 'row',
    //marginTop: '3%',
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    borderBottomColor: R.themes.borderBottomColour,
    borderBottomWidth: 0.3,
    paddingVertical: '2.5%',
  },
  shopImg: {
    alignSelf: 'center',
    backgroundColor: R.themes.backgroundColor,
    height: R.dimensions.hp('7%'),
    width: R.dimensions.wp('18%'),
    margin: 10,
  },
  nameText: {
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryBold,
    alignSelf: 'center',
    color: R.themes.darkTextColor,
    paddingLeft: 25,
    fontWeight: '400',
    width: '60%',
  },
  heartImg: {
    alignSelf: 'center',
    // justifyContent: 'flex-end',
    height: R.dimensions.hp('4%'),
    width: R.dimensions.wp('7%'),
  },
});
