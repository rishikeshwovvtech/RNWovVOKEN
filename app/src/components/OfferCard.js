import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
//local imports
import R from '../R';
//TODO remove inline styles
export const OfferCard = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.mainContainer, props.customStyle]}
      onPress={props.onPress}
      testID="card"
    >
      <View style={{flex: 1, margin: '3%'}}>
        <Image
          source={props.source}
          style={styles.offerImage}
          resizeMode={'contain'}
          testID="image"
        />
      </View>

      <View
        style={{
          flex: 5,
          paddingHorizontal: '2%',
          justifyContent: 'center',
        }}
      >
        {props.isFromBrandDetails ? (
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={[
              styles.offerBrandNameFromBrandDetails,
              props.customTextStyle,
            ]}
          >
            {props.name}
          </Text>
        ) : (
          <Text style={[styles.offerBrandName, props.customTextStyle]}>
            {props.name}
          </Text>
        )}

        <Text
          // numberOfLines={2}
          // ellipsizeMode="tail"
          style={[styles.offerDetails, props.customSubTextStyle]}
        >
          {props.details}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: '1%',
    width: R.dimensions.wp('90%'),
    backgroundColor: R.themes.darkCardBackgroundColor,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingVertical: '2%',
    alignItems: 'center',
  },
  offerBrandName: {
    color: R.themes.lightTextColor,
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryMedium,
  },
  offerBrandNameFromBrandDetails: {
    color: R.themes.lightTextColor,
    fontSize: R.dimensions.hp('1.8%'),
    fontFamily: R.fonts.primaryMedium,
    lineHeight: 18,
  },
  offerDetails: {
    fontSize: R.dimensions.hp('1.5%'),
    fontFamily: R.fonts.primaryRegular,
    color: R.themes.lightTextColor,
    marginTop: '2%',
  },
  offerImage: {
    height: R.dimensions.hp('7%'),
    width: R.dimensions.wp('15%'),
    alignSelf: 'center',
    backgroundColor: R.themes.backgroundColor,
    borderRadius: 5,
    flexDirection: 'column',
  },
});
