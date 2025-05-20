import React, {useState, useContext} from 'react';
import {View, FlatList, Image, Text} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
//local imports
import R from '../../../R';
import {Loader, RootView, BrandListCard, BackHeader} from '../../../components';
import {AuthContext} from '../../../context/auth/AuthContext';
import styles from './BrandListingStyle';
import {
  BASE_URL,
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
  USER_BASE_OPEN_API_URL,
  FCM_BASE_OPEN_API_URL,
  OPEN_API_TENANT_ID,
} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';

//TODO remove unwanted commented code

import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {SearchInputComponent} from '../../../components/SearchInputComponent';
import SubHeader from '../../../components/SubHeader';
export const BrandListing = ({navigation, route}) => {
  const {bList, cId, cName} = route?.params;

  const {authAction, authState} = useContext(AuthContext);
  const [brandList, setBrandList] = useState(bList);
  const [copyBrandList, setCopyBrandList] = useState(bList);
  const [brandName, setBrandName] = useState('');
  const [ShowLoader, setShowLoader] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      bList == undefined && apiGetBrandListing(cId);
    }, [authState?.userId]),
  );

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics('Brand_listing', authState?.userToken, authState?.userId)
        .then((res) => {})
        .catch((e) => {});
    }, []),
  );

  //   if (item === null || item === undefined || item.trim() == '') {
  //     setBrandList(copyBrandList);
  //     return true;
  //   }
  //   var filterObject;
  //   if (cId == null) {
  //     filterObject = [
  //       {
  //         filterKey: 'pft.schd_Type_Prefix',
  //         filterValue: '1002',
  //         relation: '=',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'Oken_Onboarding.oko_Type_Desc',
  //         filterValue: 'Brand',
  //         relation: '=',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'phm.party_name',
  //         filterValue: '%' + item.trim() + '%',
  //         relation: 'LIKE',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'oken_onboarding.oko_Status',
  //         filterValue: 1,
  //         relation: '=',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'pft.branch_Code',
  //         filterValue: authState?.mallDetails?.oko_Row_Code,
  //         relation: 'IN',
  //         condition: '',
  //       },
  //     ];
  //   } else {
  //     filterObject = [
  //       {
  //         filterKey: 'pft.schd_Type_Prefix',
  //         filterValue: '1002',
  //         relation: '=',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'Oken_Onboarding.oko_Type_Desc',
  //         filterValue: 'Brand',
  //         relation: '=',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'phm.party_name',
  //         filterValue: '%' + item.trim() + '%',
  //         relation: 'LIKE',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'oken_onboarding.oko_Status',
  //         filterValue: 1,
  //         relation: '=',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'pft.partyC_Cat_Code',
  //         filterValue: cId,
  //         relation: 'IN',
  //         condition: 'AND',
  //       },
  //       {
  //         filterKey: 'pft.branch_Code',
  //         filterValue: authState?.mallDetails?.oko_Row_Code,
  //         relation: 'IN',
  //         condition: '',
  //       },
  //     ];
  //   }

  //   let data = JSON.stringify({
  //     pageUrl: 'Brand_Code',
  //     entityName: 'Party_Head_MsT',
  //     action: 'view',
  //     event: 'WAV_getMultiFiltData',
  //     multiFilters: [
  //       {
  //         mainEntity: 'Oken_Onboarding',
  //         childEntity: 'Party_Child_MsT pcm',
  //         alias: 'Oken_Onboarding.oko_Row_Code',
  //         fk: 'pcm.Id',
  //       },
  //       {
  //         mainEntity: 'Oken_Onboarding',
  //         childEntity: 'Branch_MsT brm',
  //         alias: 'pcm.branch_Code_Id',
  //         fk: 'brm.id',
  //       },
  //       {
  //         mainEntity: 'Oken_Onboarding',
  //         childEntity: 'Party_Head_MsT phm',
  //         alias: 'pcm.party_Head_MsT_Id ',
  //         fk: 'phm.id',
  //       },
  //       {
  //         mainEntity: 'Oken_Onboarding',
  //         childEntity: 'Party_File_Tmpl pft',
  //         alias: 'Oken_Onboarding.oko_Row_Code',
  //         fk: 'pft.partyC_Code',
  //       },
  //     ],
  //     whereClause: filterObject,

  //     selectFields: [
  //       {
  //         fieldName: 'partyC_Code as tenant_id',
  //       },
  //       {
  //         fieldName: 'pft.partyC_SubCat_Code',
  //       },
  //       {
  //         fieldName: 'phm.party_name as brand_Name',
  //       },
  //       {
  //         fieldName: 'pft.partyC_SubCat_Desc as subcategory',
  //       },

  //       {
  //         fieldName: 'phm.party_Thumnil as brand_logo',
  //       },
  //       {
  //         fieldName: 'pft.party_Phone as phone_Number',
  //       },
  //       {
  //         fieldName: `IFNULL(FNGETFEVS(5001, ${authState.userId}, oko_Row_Code), 0) as is_Favorite`,
  //       },
  //     ],
  //     groupBy: ['group by phm.party_Name'],
  //   });

  //   let config = {
  //     method: 'post',
  //     url: BASE_URL,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data: data,
  //   };

  //   fetchApiService(config, authAction,authState)
  //     .then((response) => {
  //
  //       if (response.data.data === null) {
  //         setBrandList([]);
  //       } else {
  //         setBrandList(response.data.data.Party_Head_MsT);
  //         setCopyBrandList(response.data.data.Party_Head_MsT);
  //       }
  //       setShowLoader(false);
  //     })
  //     .catch((error) => {
  //       setShowLoader(false);
  //     });
  // };

  const handleSearch = (brandName) => {
    if (brandName != '') {
      if (copyBrandList != '' && copyBrandList != undefined) {
        var fData = copyBrandList.filter((a) => {
          return a.brand_Name.toLowerCase().includes(brandName.toLowerCase());
        });

        setBrandList(fData);
      } else {
        setBrandList(copyBrandList);
      }
    } else {
      setBrandList(copyBrandList);
    }
  };

  const apiGetBrandListing = (category) => {
    let userId = authState.userId ? authState.userId : '';
    let categorylist = category ? category : '';
    setShowLoader(true);

    let data = JSON.stringify({
      branch_Code: authState?.mallDetails?.oko_Row_Code,
      category: categorylist,
      userId: userId,
    });

    let config = {
      method: 'post',

      url: authState.userToken
        ? USER_BASE_OPEN_API_URL + 'BrandDbCallConvertion?' + OPEN_API_TENANT_ID
        : FCM_BASE_OPEN_API_URL + 'BrandDbCallConvertion?' + OPEN_API_TENANT_ID,

      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl:'BrandDbCallConvertion',
        event:'BrandListingScreen',
        action:'onFetchBrandDetails'
      },
      data: data,
    };
   fetchApiService(config, authAction,authState)
      .then((response) => {
        setShowLoader(false);
        let data = response.data.data.Response;

        const sortedData = data.filter(
          (item) => item.brand_Name != null && {...item},
        );

        let data1 = sortedData
          .map((item) => ({
            ...item,
            brand_Name: item.brand_Name.toLowerCase(),
          }))
          .sort((a, b) => (a.brand_Name > b.brand_Name ? 1 : -1));

        setBrandList(data1);
        setCopyBrandList(data1);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const apiUpdateFavoriteStatus = (item) => {
    let userid = parseInt(authState.userId);
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
          value: userid, //Session User Code Dynamic
        },
        {
          index: 2,
          javaType: 'java.lang.Long',
          parameterMode: 'IN',
          value: item, //selected Brand Code Dynamic
        },
      ],
    });

    let config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState.userToken,
        userid: authState.userId,
        'Content-Type': 'application/json',
        pageUrl:'ProcCall',
        event:'BrandListingScreen',
        action:'onUpdateFavouriteStatus'
      },
      data: data,
    };
    // setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then((response) => {
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  const updateList = (item, index) => {
    var updatedData = [...copyBrandList];
    const targetBrandName = item.brand_Name;
    const index11 = copyBrandList.findIndex(
      (item) => item.brand_Name === targetBrandName,
    );
    if (item.is_Favorite === 0) {
      CTA_firebaseAnalytics(
        'Brand_Added_to_Favorites',
        'Brand_listing',
        authState?.userToken,
        authState?.userId,
        authState?.mallDetails?.oko_Row_Desc,
        item?.brand_Name
          ?.toLowerCase()
          ?.split(' ')
          ?.map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
          ?.join(' '),
        '',
      )
        .then((res) => {})
        .catch((e) => {}),
        (updatedData[index11].is_Favorite = 1);
    } else {
      CTA_firebaseAnalytics(
        'Brand_Removed_from_Favorites',
        'Brand_listing',
        authState?.userToken,
        authState?.userId,
        authState?.mallDetails?.oko_Row_Desc,
        item?.brand_Name
          ?.toLowerCase()
          ?.split(' ')
          ?.map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
          ?.join(' '),
        '',
      )
        .then((res) => {})
        .catch((e) => {}),
        (updatedData[index11].is_Favorite = 0);
    }
    setBrandList(updatedData);
    setCopyBrandList(updatedData);
    apiUpdateFavoriteStatus(item.tenant_id);
  };

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

  const renderBrandItem = ({item, index}) => {
    return (
      <BrandListCard
        onPressBrand={() => {
          CTA_firebaseAnalytics(
            'Brand_Directory',
            'Brand_listing',
            authState?.userToken,
            authState?.userId,
            authState?.mallDetails?.oko_Row_Desc,
            item?.brand_Name
              ?.toLowerCase()
              ?.split(' ')
              ?.map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
              ?.join(' '),
          )
            .then((res) => {})
            .catch((e) => {}),
            navigation.navigate('BrandDetails', {
              Brand_Id: item.tenant_id,
            });
        }}
        source={{
          uri: (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) + item.brand_logo,
        }}
        brandName={item?.brand_Name
          ?.toLowerCase()
          ?.split(' ')
          ?.map((word) => word?.charAt(0).toUpperCase() + word?.slice(1))
          ?.join(' ')}
        like={() => {
          authState.userToken == null ? goForLogin() : updateList(item, index);
        }}
        name={item.is_Favorite != 0 ? 'ri-heart-3-fill' : 'ri-heart-3-line'}
      />
    );
  };

  const renderListEmptyComponent = () => {
    return (
      <View style={styles.view}>
        <Image
          source={R.images.NoBrand}
          resizeMode={'contain'}
          style={styles.image}
        />
        <Text style={styles.favouriteText}>No Brands Found!!</Text>
      </View>
    );
  };

  //////////////////// voice search ///////
  // const [recognized, setRecognized] = useState('');
  // const [started, setStarted] = useState('');
  // const [results, setResults] = useState([]);

  // const requestMicrophonePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //         {
  //           title: 'Microphone Permission',
  //           message: 'App needs access to your microphone.',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       } else {
  //       }
  //     } catch (error) {
  //     }
  //   } else {
  //     const result = await requestAuthorization('microphone');
  //     if (result === 'granted') {
  //     } else {
  //     }
  //   }
  // };

  // useEffect(() => {
  //   Voice.onSpeechResults = onSpeechResults;
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const onSpeechResults = (e) => {
  //   setResults(e.value);

  // };

  // const startRecognition = async () => {
  //   try {
  //     await Voice.start('en-US');

  //     setStarted('√');
  //   } catch (e) {
  //     alert('error for speaking');
  //
  //   }
  // };

  // const stopRecognition = async () => {
  //   try {
  //     await Voice.stop();
  //     setStarted('');
  //   } catch (e) {
  //
  //   }
  // };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={cName ? cName : 'All'} />
      <RootView>
        {/* <View style={styles.mainContainer}>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              //paddingRight: 15,
              margin: 10,
            }}
            onPress={() => handleSearch(brandName)}
          >
            <Image
              source={R.images.Search_double}
              style={{height: 25, width: 25}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TextInput
                //selectionColor={R.themes.darkButtonColor}
            style={{
              fontFamily: R.fonts.primaryRegular,
              alignSelf: 'flex-start',
              // paddingLeft: 10,
              width: '80%',
            }}
            onSubmitEditing={(event) => {
              handleSearch(event.nativeEvent.text);
            }}
            onChangeText={(name) => {
              setBrandName(name);
              handleSearch(name);
            }}
            placeholder={'Look For Your Most Loved Brands'}
            placeholderTextColor={R.themes.darkCardBackgroundColor}
            value={brandName === '' ? null : brandName}
          />
        </View> */}

        <SearchInputComponent
          onPress={() => handleSearch(brandName)}
          onSubmitEditing={(event) => {
            handleSearch(event.nativeEvent.text);
          }}
          onChangeText={(name) => {
            setBrandName(name);
            handleSearch(name);
          }}
          placeholder={'Look For Your Most Loved Brands'}
          value={brandName === '' ? null : brandName}
        />

        {/* <View
          style={{
            alignSelf: 'center',
          }}
        >
          <Text style={{color: 'white', textAlign: 'center'}}>
            Voice Search
          </Text>
          <View
            style={{
              flexDirection: 'row',

              alignContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={{
                margin: 10,
                backgroundColor:  R.themes.boxBackgroundColour,
                borderRadius: 10,
              }}
              onPress={startRecognition}
            >
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  margin: 10,
                }}
              >
                Start Recording {started}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 10,
                backgroundColor:  R.themes.boxBackgroundColour,
                borderRadius: 10,
              }}
              onPress={stopRecognition}
            >
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  margin: 10,
                }}
              >
                Stop Recording
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{color: 'white', textAlign: 'center'}}>Results</Text>
          {results.map((result, index) => (
            <TouchableOpacity
              style={{flexDirection: 'column', backgroundColor: 'white'}}
              onPress={() => [handleSearch(result), setBrandName(result)]}
            >
              <Text style={{color: 'black', textAlign: 'center'}} key={index}>
                {result}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}

        <FlatList
          data={brandList}
          extraData={brandList}
          renderItem={renderBrandItem}
          keyExtractor={(item, index) => item + index}
          ListEmptyComponent={renderListEmptyComponent}
          contentContainerStyle={{paddingBottom: R.dimensions.hp(10)}}
        />
        <Loader isVisible={ShowLoader} />
      </RootView>
    </>
  );
};
