import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//local imports
import R from '../../R';
import {Loader, MainHeader, RootView, BrandListCard} from '../../components';
import {AuthContext} from '../../context/auth/AuthContext';
import styles from './WishListStyle';
import {
  BASE_URL,
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
} from '../../utils/Constants';
import {fetchApiService} from '../../internetconnection/CommonApiService';
import {CTA_firebaseAnalytics} from '../../components/Analytics/CTAAnalytics';
import {SearchInputComponent} from '../../components/SearchInputComponent';
import SubHeader from '../../components/SubHeader';

export const FavouriteBrand = ({navigation}) => {
  const {authAction, authState} = useContext(AuthContext);
  const [favoriteBrand, setFavoriteBrand] = useState([]);
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState('');
  const [ShowLoader, setShowLoader] = useState(false);
  const [noData, setNoData] = useState(false);
  const [BrandName, setBrandName] = useState('');

  let timerid;
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = apiGetFavouriteBrand();

      authState?.userToken == null
        ? goForLogin()
        : authState?.mallDetails?.oko_Row_Code != null
        ? unsubscribe
        : null;
      const test = setFlag(false);
      // BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        clearTimeout(timerid);
        setBrandName('');
        unsubscribe, test;
        // BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, [authState?.mallDetails?.oko_Row_Code]),
  );
  const goForLogin = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'AuthNavigator',
          params: {
            screen: 'Login',
          },
        },
      ],
    });
  };
  const backAction = () => {
    navigation.goBack();
  };

  const apiGetFavouriteBrand = () => {
    let data = JSON.stringify({
      entityName: 'favoriteBrand',
      action: 'payload',
      pageUrl: 'FetchFavoriteBrand',
      event: 'replaceWithAuth',
      formList: [
        {
          oko_Cat_Desc: 'Brand',
          branch_Code_Id: authState?.mallDetails?.oko_Row_Code,
          pft_Status: '1',
          schd_Type_Desc: 'Daily',
          branch_code: authState?.userId,
        },
      ],
    });

    let config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl: 'FetchZoneDetails',
        event: 'Favouritescreen',
        action: 'onLoadFavouriteBrand',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then((response) => {
        setShowLoader(false);
        let data = response.data.data.Oken_Onboarding;
        data = data.sort((a, b) =>
          a.brand_name.toLowerCase() > b.brand_name.toLowerCase() ? 1 : -1,
        );
        const test = [];
        data.map((item) => (item?.is_favorite == 1 ? test.push(item) : null));
        //setNoData(test);
        setFavoriteBrand(test);
        setNoData(test);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const apiUpdateFavoriteStatus = (item) => {
    let userid = parseInt(authState?.userId);
    let data = JSON.stringify({
      pageUrl: 'ProcCall',
      entityName: 'Favourite_Status',
      action: 'payload',
      event: 'Proc_callfav_mark',
      procedureName: 'proc_fav_mark',
      procedureCallParameters: [
        {
          index: 0,
          javaType: 'java.lang.Long',
          parameterMode: 'IN',
          value: 5001, //Static
        },
        {
          index: 1,
          javaType: 'java.lang.Long',
          parameterMode: 'IN',
          value: userid, //Session User Code Dynamic
        },
        {
          index: 2,
          javaType: 'java.lang.Long',
          parameterMode: 'IN',
          value: item, //selected Brand Code Dynamic
        },
      ],
    });

    let config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl: 'ProcCall',
        event: 'Favouritescreen',
        action: 'onUpdataFavouriteStatus',
      },
      data: data,
    };
    setShowLoader(true);
    fetchApiService(config, authAction, authState)
      .then((response) => {
        setShowLoader(false);
        timerid = setTimeout(() => {
          setFlag(false);
        }, 5000);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const updateList = (item, index) => {
    CTA_firebaseAnalytics(
      'Brand Removed from Favorites',
      'Your_Favourite_Brands',
      authState?.userToken,
      authState?.userId,
      authState?.mallDetails?.oko_Row_Desc,
      item.brand_name,
      '',
    )
      .then((res) => {})
      .catch((e) => {}),
      setFlag(true),
      setName(item.brand_name);
    setNumber(item.brand_code);
    setCode(item.brand_code);

    const updatedData = [...noData];
    updatedData.forEach((t) => {
      if (t.brand_code === item.brand_code) {
        t.is_favorite = 0;
      }
    });
    setFavoriteBrand(updatedData);
    apiUpdateFavoriteStatus(item.brand_code);
  };
  const undoList = () => {
    setFlag(false);

    const updatedData = [...noData];
    updatedData.forEach((t) => {
      if (t.brand_code === number) {
        t.is_favorite = 1;
      }
    });
    setFavoriteBrand(updatedData);
    setNoData(updatedData);
    apiUpdateFavoriteStatus(code);
  };

  const handleSearch = (brandName) => {
    if (brandName != '') {
      var fData = noData.filter((a) => {
        return a.brand_name.toLowerCase().includes(brandName.toLowerCase());
      });
      setFavoriteBrand(fData);
    } else {
      setFavoriteBrand(noData);
    }
  };

  return (
    <>
      <MainHeader
        navigation={navigation}
        isTitle={true}
        title={'Your Favourite Brands '}
      />
      <SubHeader title={'Your Favourite Brands'} />
      <RootView>
        <Loader isVisible={ShowLoader} />

        <SearchInputComponent
          onPress={() => noData && handleSearch(BrandName)}
          onSubmitEditing={(event) =>
            noData && handleSearch(event.nativeEvent.text)
          }
          onChangeText={(BrandName) => {
            setBrandName(BrandName);
            noData && handleSearch(BrandName);
          }}
          value={BrandName}
          placeholder={'Search For Your Most Loved Brands'}
        />

        {favoriteBrand == 0 ? (
          <View style={styles.view}>
            <Image
              source={R.images.nofavroutebrandavail}
              resizeMode={'contain'}
              style={styles.image}
            />

            <Text style={styles.favouriteText}>No Favourite Brands!!</Text>
            <Text style={styles.text}>Show your favourite brand some love</Text>
          </View>
        ) : (
          <FlatList
            data={favoriteBrand}
            // ListEmptyComponent={_listEmptyComponent}
            renderItem={({item, index}) =>
              item.is_favorite == 1 ? (
                <BrandListCard
                  onPressBrand={() =>
                    navigation.navigate('BrandDetails', {
                      Brand_Id: item.brand_code,
                    })
                  }
                  source={{
                    uri:
                      (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                      item.brand_logo,
                  }}
                  brandName={item?.brand_name
                    ?.toLowerCase()
                    ?.split(' ')
                    ?.map(
                      (word) => word?.charAt(0).toUpperCase() + word?.slice(1),
                    )
                    ?.join(' ')}
                  like={() => {
                    updateList(item, index);
                  }}
                  name={
                    item.is_favorite != 0
                      ? 'ri-heart-3-fill'
                      : 'ri-heart-3-line'
                  }
                />
              ) : null
            }
            keyExtractor={(item) => item.id}
          />
        )}

        {flag ? (
          <TouchableOpacity style={styles.popUpView}>
            <View style={styles.popUpStyle}>
              <Text style={styles.popUpText}>
                {name} removed from favourite brand
              </Text>
              <Text style={styles.undoText} onPress={() => undoList()}>
                Undo
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}
      </RootView>
    </>
  );
};
