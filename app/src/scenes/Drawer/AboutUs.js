import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
//local import
import {RootView} from '../../components/index';
import R from '../../R';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';
import {useFocusEffect} from '@react-navigation/native';
import {AuthContext} from '../../context/auth/AuthContext';

export const AboutUs = () => {
  const {authState, authAction} = useContext(AuthContext);

  const HeadingView = (props) => {
    return (
      <View style={{alignItems: props.center ? 'center' : 'flex-start'}}>
        <Text style={styles.heading}>{props.title}</Text>
        <View style={[styles.divider]} />
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('About_Us', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});
    }, []),
  );

  return (
    <RootView>
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}
      >
        <HeadingView title={'Who we are'} center={false} />
        <Text style={styles.contentText}>
          Being largest mall in Chandigarh and having over 11.5 Lakh Sq. Ft. of
          area, Elante is one of the hottest cultural hubs of the city it also
          caters to the largest catchment of over and around 300 Kms. Spread
          across 21 acres, Elante is located in ‘The City Beautiful’,
          Chandigarh. It is the first of its kind development that is equipped
          to cater to Business Stay & Entertainment for the classes & Masses in
          the region. Styled to perfection Elante houses 3 distinct facilities
          which includes a Mall, Office Complex, & Hyatt Regency hotel with a
          central courtyard connecting all three. The retail space hosts over
          250 premium International & National Brands which includes
          Hypermarket, Departmental Stores, Fashion and Designer Brands,
          Multiplex, Toy Store, Entertainment Zone and a host of Food & Beverage
          Options, many of which are a first in the region. Out of these 250
          brands Elante is a home to 60 exclusive brands which are available in
          Elante only in this region.
        </Text>
        <HeadingView title={'Mission'} center={true} />
        <Text style={styles.centerContent}>Touching Hearts</Text>
        <HeadingView title={'Vision'} center={true} />
        <Text style={styles.centerContent}>
          To create World Class Shopping Destinations & Transform Experiences
        </Text>
        <HeadingView title={'Our Values'} center={true} />
        <Text style={styles.centerContent}>
          Innovation, Customer Centricity, Caring, Excellence.
        </Text>
      </ScrollView>
    </RootView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingHorizontal: '5%',
    paddingBottom: '5%',
  },
  heading: {
    fontFamily: R.fonts.primaryBold,
    fontSize: R.dimensions.hp(3.4),
    marginTop: '5%',
    color: R.colors.primaryBrand,
  },
  divider: {
    borderColor: R.colors.secondryBrand,
    borderWidth: 1,
    width: R.dimensions.hp(18),
    borderRadius: 20,
    marginBottom: '4%',
    marginVertical: '1%',
    backgroundColor: R.colors.secondryBrand,
  },
  contentText: {
    fontSize: R.dimensions.hp(2),
    fontFamily: R.fonts.primaryRegular,
    marginVertical: '3%',
    textAlign: 'justify',
  },
  centerContent: {
    fontSize: R.dimensions.hp(2),
    fontFamily: R.fonts.primaryRegular,
    marginVertical: '3%',
    textAlign: 'center',
  },
});
