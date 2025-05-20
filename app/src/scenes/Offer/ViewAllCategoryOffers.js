import React, {useEffect, useState, useContext} from 'react';
import {View, FlatList} from 'react-native';
//local import
import {RootView, OfferCard, BackHeader} from '../../components/index';

import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
} from '../../utils/Constants';
import {AuthContext} from '../../context/auth/AuthContext';

import {CTA_firebaseAnalytics} from '../../components/Analytics/CTAAnalytics';
import SubHeader from '../../components/SubHeader';
import R from '../../R';

export const BrandOffers = ({route, navigation}) => {
  const {data} = route.params;
  const [BrandList, setBrandList] = useState();
  const {authState} = useContext(AuthContext);

  useEffect(() => {
    let data1 = data.sort((a, b) =>
      a.brand_name.toLowerCase() > b.brand_name.toLowerCase() ? 1 : -1,
    );
    setBrandList([...data1]);
  }, []);

  return (
    <>
      <BackHeader title={'Offers'} navigation={navigation} />
      <SubHeader title={'Offers'} />
      <RootView>
        <View>
          <FlatList
            data={BrandList}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <OfferCard
                onPress={() => {
                  CTA_firebaseAnalytics(
                    'Offers_Viewed',
                    'Offers',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                    item.brand_name,

                    '',
                  )
                    .then((res) => {})
                    .catch((e) => {});

                  navigation.navigate('BrandDetails', {
                    Brand_Id: item.brand_id,
                  });
                }}
                source={{
                  uri:
                    (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                    item.brand_log,
                }}
                name={item.brand_name}
                details={item['offer_mst.offer_name']}
                customStyle={{
                  backgroundColor: R.themes.backgroundColor,
                  borderColor: R.themes.borderColor,
                  borderWidth: 1,
                }}
                customTextStyle={{
                  color: R.themes.borderColor,
                  fontWeight: 'bold',
                }}
                customSubTextStyle={{color: R.themes.borderColor}}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </RootView>
    </>
  );
};
