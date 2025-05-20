import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
//TODO change icon to react-native-vector-icon
//local imports
import R from '../R';
import RemixIcon from 'react-native-remix-icon';
//TODO move style to stylesheet within same file
export const SectionName = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.mainContainer,
        props.customMainstyle,
        {marginBottom: props.subTitle ? '3%' : '-1%'},
      ]}
    >
      <View style={styles.sectionmainContainer}>
        <View style={[styles.sectionFlex, props.sectionFlex]}>
          <View style={styles.sectionContainer}>
            <Text style={styles.searchMallText}>{props.title}</Text>
            <View style={styles.deviderContainer}>
              {/* <View style={styles.devider} /> */}
              <Image
                source={
                  props.yellowpetalImg
                    ? R.images.yellow_petel
                    : props.pinkredpetalImg
                    ? R.images.pinkred_petel
                    : R.images.group23
                }
              />
            </View>
          </View>
          <Text style={styles.text}>{props.subTitle}</Text>
        </View>
        <View style={styles.viewAllMainContainer}>
          {props.viewMore && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.viewMoreButton}
              onPress={props.onPress}
            >
              <Text style={styles.ViewMoreText}>View More</Text>
            </TouchableOpacity>
          )}

          {props.viewAll && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.viewAllButton}
              onPress={props.onPress}
            >
              <Text style={styles.ViewAllText}>View all</Text>
              <RemixIcon
                name="ri-arrow-right-line"
                size={R.dimensions.hp(1.6)}
                color={R.themes.accountTextColour}
              />
            </TouchableOpacity>
          )}
          {props.viewIcon && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.touchableOpacity}
              onPress={props.onPress}
            >
              <RemixIcon
                name={props.name}
                size={25}
                color={R.colors.primaryBrand2}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  searchMallText: {
    fontSize: R.dimensions.hp('2.2%'),
    fontFamily: R.fonts.primaryMedium,
    color: R.themes.darkTextColor,
    fontWeight: 'bold',
  },
  text: {
    fontSize: R.dimensions.hp('1.8%'),
    color: R.colors.primaryBrand2,
    fontFamily: R.fonts.primaryRegular,
  },
  mainContainer: {
    marginHorizontal: '3%',
    marginTop: '5%',
  },
  deviderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
  },
  devider: {
    borderWidth: 1,
    width: R.dimensions.wp('12%'),
  },
  viewAllMainContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  viewAllButton: {
    backgroundColor: R.themes.backgroundColor,
    paddingHorizontal: '5%',
    paddingVertical: '2%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 4,
    // borderColor: R.themes.accountTextColour,
    // borderWidth: 1,
  },
  viewMoreButton: {
    backgroundColor: R.themes.backgroundColor,
    paddingHorizontal: '5%',
    //paddingVertical: '2%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 4,
    // borderColor: R.themes.accountTextColour,
    // borderWidth: 1,
  },
  ViewAllText: {
    fontSize: R.dimensions.hp(1.5),
    color: R.themes.lightButtonTextColor,
    fontFamily: R.fonts.primaryBold,
    padding: 2,
  },
  ViewMoreText: {
    fontSize: R.dimensions.hp(1.8),
    color: '#580A5A',
    fontFamily: R.fonts.primaryBold,
    //padding: 2,
  },
  sectionmainContainer: {
    flexDirection: 'row',
  },
  sectionFlex: {
    flex: 1,
  },
  sectionContainer: {
    flexDirection: 'row',
  },
  touchableOpacity: {flex: 0.5, alignSelf: 'flex-end'},
});
