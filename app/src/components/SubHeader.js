import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import R from '../R';
import {dimensions} from '../../res/dimensions';
const SubHeader = (props) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>{props.title}</Text>
      {props.buttonText && (
        <TouchableOpacity
          onPress={() => props.navigation.navigate(props.routingName)}
          style={styles.sideButton}
        >
          <Image
            style={styles.sideButtonImage}
            source={R.images.Transactioncart}
          />
          <Text style={styles.sideButtonText}>{props.buttonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SubHeader;
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: R.themes.backgroundColor,
    width: R.dimensions.wp(100),
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
  },

  titleText: {
    fontFamily: R.fonts.primaryBold,
    fontWeight: 'bold',
    fontSize: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
    color: R.themes.darkCardBackgroundColor,
    textAlign: 'center',
  },
  sideButton: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: R.themes.bottomTabButtonColor,
    paddingVertical: 5,
    borderRadius: 5,
    end: '0%',
    right: '-5%',
  },
  sideButtonImage: {
    height: 16,
    width: 16,
    resizeMode: 'cover',
    paddingHorizontal: 5,
    marginVertical: 5,
    tintColor: R.themes.backgroundColor,
  },
  sideButtonText: {
    marginVertical: 5,
    paddingLeft: 10,
    color: R.themes.backgroundColor,
    fontWeight: '700',
    fontFamily: R.fonts.primaryRegular,
  },
});
