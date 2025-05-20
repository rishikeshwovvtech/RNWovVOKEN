import React, {useState, useContext, useEffect} from 'react';
import {View, FlatList, StyleSheet, Image, Text} from 'react-native';

//local import
import {RootView, BackHeader, Loader, OfferCard} from '../../components/index';
import {AuthContext} from '../../context/auth/AuthContext';
import {fetchApiService} from '../../internetconnection/CommonApiService';
import R from '../../R';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  USER_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
  FCM_BASE_OPEN_API_URL,
} from '../../utils/Constants';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';
import {SearchInputComponent} from '../../components/SearchInputComponent';
import SubHeader from '../../components/SubHeader';
export const OfferByCategory = ({route, navigation}) => {
  const {data} = route.params;

  const {name} = route.params;
  const [BrandList, setBrandList] = useState();
  const [ShowLoader, setShowLoader] = useState(false);
  const [noData, setNoData] = useState(true);

  const {authAction, authState} = useContext(AuthContext);
  const [BrandName, setBrandName] = useState('');

  // useEffect(() => {
  //     // let datanew = data.find(data.category_name === 'Kids');
  //     //   let data1= data.sort((a, b) =>
  //     // a.brand_name.toLowerCase() > b.brand_name.toLowerCase() ? 1 : -1,
  //     // );

  //     let data1 = data;
  //     setBrandList(data1);

  // }, [data]);

  useEffect(() => {
    let data1;

    data1 = data.sort((a, b) =>
      a.brand_name.toLowerCase() > b.brand_name.toLowerCase() ? 1 : -1,
    );
    if (name === 'ALL') {
      setBrandList(data1);
    } else {
      data1 = data1.filter((e) => e.category_name == name);
      setBrandList(data1);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics(
        'Offers_By_Category',
        authState?.userToken,
        authState?.userId,
      )
        .then(() => {})
        .catch(() => {});
    }, []),
  );

  const apiSearchBrand = (item) => {
    // let name = 'Fashion';
    if (item.trim() == '') {
      return true;
    }

    let data = JSON.stringify({
      party_name: 'Mustard',
      partyc_cat_code: '972345649788106',
      branch_code: '678694593190113',
      offer_status: '1',
      pageUrl:'FetchSearchBrand',

    });

    let config = {
      method: 'post',

      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'FetchSearchBrand?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'FetchSearchBrand?' + OPEN_API_TENANT_ID,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'FetchSearchBrand',
        event:'OfferByCategoryScreen',
        action:'onSearchBrand'
      },
      data: data,
    };

    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then((response) => {
        setShowLoader(false);
        setBrandList(response.data.data.Response);
      })
      .catch(() => {
        setShowLoader(false);
        setNoData(false);
      });
  };

  return (
    <>
      <BackHeader
        title={name + ' ' + 'Brands Offers'}
        navigation={navigation}
      />
      <SubHeader title={name} />
      <RootView>
        <Loader isVisible={ShowLoader} />
        {/* <View style={styles.container}>
          <TextInput
                //selectionColor={R.themes.darkButtonColor}
            placeholder={'Look for your most loved brands'}
            placeholderTextColor={R.colors.black}
            style={{
              fontFamily: R.fonts.primaryRegular,
              alignSelf: 'center',
              paddingLeft: 10,
              width: '80%',
              //  backgroundColor: R.themes.backgroundColor,
            }}
            autoCorrect={false}
            onSubmitEditing={(event) => {
              apiSearchBrand(event.nativeEvent.text);
            }}
            onChangeText={(BrandName) => {
              setBrandName(BrandName);
            }}
            value={BrandName}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              paddingRight: 15,
            }}
            onPress={() => apiSearchBrand(BrandName)}
          >
            <Icon
              name="ri-search-line"
              size="25"
              color={ R.themes.boxBackgroundColour}
            />
          </TouchableOpacity>
        </View> */}

        <SearchInputComponent
          // customViewstyle={{marginHorizontal: '5%', marginTop: '5%'}}
          onPress={() => apiSearchBrand(BrandName)}
          onSubmitEditing={(event) => {
            apiSearchBrand(event.nativeEvent.text);
          }}
          onChangeText={(BrandName) => {
            setBrandName(BrandName);
          }}
          value={BrandName}
          placeholder={'Look For Your Most Loved Brands'}
        />

        <View>
          {/* <SectionName title={'Brands'} viewAll={false} /> */}
          <View style={{marginBottom: '20%'}}>
            {noData ? (
              <View>
                {name == 'ALL' ? (
                  <FlatList
                    data={BrandList}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <OfferCard
                        onPress={() =>
                          navigation.navigate('BrandDetails', {
                            Brand_Id: item.brand_id,
                          })
                        }
                        source={{
                          uri:
                            (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                            item.brand_log,
                        }}
                        name={item?.brand_name
                          ?.toLowerCase()
                          ?.split(' ')
                          ?.map(
                            (word) =>
                              word?.charAt(0).toUpperCase() + word?.slice(1),
                          )
                          ?.join(' ')}
                        // name = {item?.brand_name}
                        details={item['offer_mst.offer_name']}
                      />
                    )}
                    keyExtractor={(item) => item.brand_id}
                  />
                ) : (
                  <FlatList
                    data={BrandList}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) =>
                      item.category_name == name ? (
                        <OfferCard
                          onPress={() =>
                            navigation.navigate('BrandDetails', {
                              Brand_Id: item.brand_id,
                            })
                          }
                          source={{
                            uri:
                              (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                              item.brand_log,
                          }}
                          name={item?.brand_name
                            ?.toLowerCase()
                            ?.split(' ')
                            ?.map(
                              (word) =>
                                word?.charAt(0).toUpperCase() + word?.slice(1),
                            )
                            ?.join(' ')}
                          details={item['offer_mst.offer_name']}
                        />
                      ) : null
                    }
                    keyExtractor={(item) => item.brand_id}
                  />
                )}
              </View>
            ) : (
              <View style={styles.view}>
                <Image
                  source={R.images.NoBrand}
                  resizeMode={'contain'}
                  style={styles.image}
                />
                <Text style={styles.favouriteText}>No Brands Found!!</Text>
              </View>
            )}
          </View>
        </View>
      </RootView>
    </>
  );
};

const styles = StyleSheet.create({
  offerCategories: {
    marginVertical: '2%',
    width: R.dimensions.wp('90%'),
    height: R.dimensions.hp('12%'),
    borderColor: R.colors.golden,
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: R.dimensions.hp('2.2%'),
  },
  details: {
    fontSize: R.dimensions.hp('2.2%'),
    width: '75%',
  },
  img: {
    height: R.dimensions.hp('8%'),
    width: R.dimensions.wp('12%'),
    // tintColor: R.colors.darkorange,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  image: {
    height: R.dimensions.hp('25%'),
    width: R.dimensions.wp('50%'),
  },
  favouriteText: {
    fontSize: R.dimensions.hp('2.5%'),
    fontFamily: R.fonts.primaryBold,
    color: R.colors.coolGrey,
    marginTop: '10%',
  },
  childView: {
    flexDirection: 'row',

    alignSelf: 'center',
    width: R.dimensions.wp(80),
    alignItems: 'center',
  },
  searchImage: {
    alignSelf: 'center',
    height: R.dimensions.hp('3%'),
    width: R.dimensions.wp('5.8%'),
    marginHorizontal: '4%',
    tintColor: R.colors.darkorange,
  },
  offerView: {
    marginHorizontal: 30,
    width: R.dimensions.wp(35),
    height: R.dimensions.hp(25),
  },
  container: {
    marginVertical: '2%',
    marginHorizontal: '3%',
    width: '94%',
    alignSelf: 'center',
    height: R.dimensions.hp('6%'),
    borderWidth: 0.5,
    borderColor: R.themes.boxBackgroundColour,
    backgroundColor: R.themes.backgroundColor,
    flexDirection: 'row',
    borderRadius: 8,
    justifyContent: 'space-between',
  },

  // searchImage: {
  //   alignSelf: 'center',
  //   height: R.dimensions.hp('3.5%'),
  //   width: R.dimensions.wp('6.5%'),
  //   marginHorizontal: '4%',
  // },
});
