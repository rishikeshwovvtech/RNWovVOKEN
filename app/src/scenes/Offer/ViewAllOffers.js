import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
//local import
import {RootView} from '../../components/index';
import R from '../../R';
import {BackHeader} from '../../components/BackHeader';
import {Image} from 'react-native';
import {
  IS_CDN,
  IMAGE_CDN_URL_TENANT_ID,
  IMAGE_URL,
} from '../../utils/Constants';
export const AllOffers = ({route, navigation}) => {
  const {data} = route.params;

  return (
    <>
      <BackHeader title={'Offers'} navigation={navigation} />
      <RootView>
        <View
          style={{
            marginVertical: '10%',
            alignItems: 'center',
          }}
        >
          <FlatList
            numColumns={2}
            style={{}}
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.offerCategories}>
                {/* <SmallCard
                  Title={item.sub_category_name}
                  source={{
                    uri: IMAGE_CDN_URL_TENANT_ID + item.Image,
                  }}
                  customStyle={styles.offerView}
                  Details={item['offer_mst.offer_Name']}
                /> */}

                <View style={{alignItems: 'center'}}>
                  <View style={[styles.imgMainView, styles.offerView]}>
                    <Image
                      source={{
                        uri:
                          (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                          item.Image,
                      }}
                      style={styles.parkImg1}
                      resizeMode={'contain'}
                    />
                    {/* <View style={styles.textView}>
        <Text style={styles.twoText}>{props.Title}</Text>
      </View> */}
                  </View>
                  <Text style={styles.twoText}>{item.sub_category_name}</Text>
                  <Text style={styles.detailsText}>
                    {item['offer_mst.offer_Name']}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  offerCategories: {
    marginVertical: '2%',
    marginHorizontal: '10%',
  },
  offerView: {
    marginHorizontal: 30,
    width: R.dimensions.wp(35),
    height: R.dimensions.hp(25),
  },

  //Smallcard
  textView: {
    backgroundColor: R.themes.backgroundColor,
    borderWidth: 1,
    borderColor: R.themes.backgroundColor,
    alignContent: 'center',
    alignItems: 'center',
  },
  detailsText: {
    color: R.colors.coolGrey,
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.hp('1.5%'),
  },
  twoText: {
    fontSize: R.dimensions.hp('2%'),
    color: R.colors.black,
    fontFamily: R.fonts.primaryBold,
  },
  parkImg1: {
    height: R.dimensions.hp(12),
    width: R.dimensions.wp(20),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imgMainView: {
    width: R.dimensions.wp(30),
    height: R.dimensions.hp(14),

    backgroundColor: R.themes.backgroundColor,
    borderRadius: 10,
    borderColor: R.colors.gainsboro,
    elevation: 5,
    borderWidth: 1,
    marginBottom: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
