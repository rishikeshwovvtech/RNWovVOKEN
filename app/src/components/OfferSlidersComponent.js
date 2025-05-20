import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
//local imports
import R from '../R';
import {IMAGE_CDN_URL_TENANT_ID, IS_CDN, IMAGE_URL} from '../utils/Constants';
import {CTA_firebaseAnalytics} from './Analytics/CTAAnalytics';
import {AuthContext} from '../context/auth/AuthContext';

/* -------------------------------------------------------------------------- */
/*                               main component                               */
/* -------------------------------------------------------------------------- */
export const OfferSlidersComponent = (props) => {
  const {authState} = useContext(AuthContext);
  const CleverTap = require('clevertap-react-native');

  return (
    <View style={{backgroundColor: R.themes.darkCardBackgroundColor}}>
      {/* <Carousel
          layout={'default'}
          data={props.Offerdata}
          sliderWidth={R.dimensions.wp('100%')}
          itemWidth={R.dimensions.wp('50%')}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.offerView}
              onPress={() => {
                CTA_firebaseAnalytics(
                  'Hot_Offers',
                  'Home',
                  authState?.userToken,
                  authState?.userId,
                  authState?.mallDetails?.oko_Row_Desc,
                  item?.brand_name
                    ?.toLowerCase()
                    ?.split(' ')
                    ?.map(
                      (word) => word?.charAt(0).toUpperCase() + word?.slice(1),
                    )
                    ?.join(' '),
                  'Offer : ' + item['offer_mst.offer_name'],
                )
                  .then((res) => {})
                  .catch((e) => {});
                CleverTap.recordEvent('Offers', {
                  'Hot Offers': item?.brand_name
                    ?.toLowerCase()
                    ?.split(' ')
                    ?.map(
                      (word) => word?.charAt(0).toUpperCase() + word?.slice(1),
                    )
                    ?.join(' '),
                });

                props.navigation.navigate('BrandDetails', {
                  Brand_Id: item.brand_id,
                });
              }}
            >
              <View style={styles.hotOfferView}>
                <Image
                  source={{
                    uri: IMAGE_CDN_URL_TENANT_ID + item.brand_log,
                  }}
                  resizeMode={'contain'}
                  style={styles.offerImage}
                />
              </View>
              <View style={styles.offerTextView}>
                <Text style={styles.offerText}>
                  {item?.brand_name
                    ?.toLowerCase()
                    ?.split(' ')
                    ?.map(
                      (word) => word?.charAt(0).toUpperCase() + word?.slice(1),
                    )
                    ?.join(' ')}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.discountText}
                >
                  {item['offer_mst.offer_name']}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          loop={true}
          autoplay={true}
          autoplayInterval={5000}
          onSnapToItem={(index) => setCarouselActiveSlide(index)}
        /> */}
      <FlatList
        data={props.Offerdata}
        horizontal
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.offerView}
            onPress={() => {
              CTA_firebaseAnalytics(
                'Hot_Offers',
                'Home',
                authState?.userToken,
                authState?.userId,
                authState?.mallDetails?.oko_Row_Desc,
                item?.brand_name
                  ?.toLowerCase()
                  ?.split(' ')
                  ?.map(
                    (word) => word?.charAt(0).toUpperCase() + word?.slice(1),
                  )
                  ?.join(' '),
                'Offer : ' + item['offer_mst.offer_name'],
              )
                .then(() => {})
                .catch(() => {});
              CleverTap.recordEvent('Offer Viewed', {
                'Hot Offers': item?.brand_name
                  ?.toLowerCase()
                  ?.split(' ')
                  ?.map(
                    (word) => word?.charAt(0).toUpperCase() + word?.slice(1),
                  )
                  ?.join(' '),
              });

              props.navigation.navigate('BrandDetails', {
                Brand_Id: item.brand_id,
              });
            }}
          >
            <View style={styles.hotOfferView}>
              <Image
                source={{
                  uri:
                    (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                    item.brand_log,
                }}
                resizeMode={'contain'}
                style={styles.offerImage}
              />
            </View>
            <View style={styles.offerTextView}>
              <Text style={styles.offerText}>
                {item?.brand_name
                  ?.toLowerCase()
                  ?.split(' ')
                  ?.map(
                    (word) => word?.charAt(0).toUpperCase() + word?.slice(1),
                  )
                  ?.join(' ')}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.discountText}
              >
                {item['offer_mst.offer_name']}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  offerView: {
    flexDirection: 'row',
    marginVertical: '2%',
    //backgroundColor:R.themes.bannerBackgroundColour
  },
  offerTextView: {
    margin: '2%',
    justifyContent: 'center',
  },
  offerText: {
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.hp('2%'),
    fontFamily: R.fonts.primaryRegular,
  },
  discountText: {
    color: R.themes.backgroundColor,
    fontSize: R.dimensions.hp('1.6%'),
    fontFamily: R.fonts.primaryBold,
    marginTop: '1%',
    paddingRight: '20%',
    marginRight: '5%',
  },
  offerImage: {
    height: R.dimensions.hp('7%'),
    width: R.dimensions.wp('18%'),
    //backgroundColor: R.themes.backgroundColor,
  },
  hotOfferView: {
    overflow: 'hidden',
    marginLeft: '3%',
  },
  dotStyle: {
    width: 10,
    height: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: R.colors.darkorange,
  },
});
