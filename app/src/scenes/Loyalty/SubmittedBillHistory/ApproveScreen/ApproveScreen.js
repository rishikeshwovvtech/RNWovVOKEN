import React, {useState, useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
  FlatList,
  Modal,
  Linking,
} from 'react-native';
import {fetchApiService} from '../../../../internetconnection/CommonApiService';
import Icon from 'react-native-remix-icon';
import {RootView, CustomUploadBill, Loader} from '../../../../components/index';
import {
  BASE_URL,
  IMAGE_URL,
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
} from '../../../../utils/Constants';
import {useFocusEffect} from '@react-navigation/native';
import styles from './ApproveScreenstyle';

import {AuthContext} from '../../../../context/auth/AuthContext';
import Carousel from 'react-native-snap-carousel';

import R from '../../../../R';
import LinearGradient from 'react-native-linear-gradient';
import {SearchInputComponent} from '../../../../components/SearchInputComponent';
import {Alert} from 'react-native';
const ApproveScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const {authState, authAction} = useContext(AuthContext);
  const [CopyData, setCopyData] = useState([]);
  const [noData, setNoData] = useState(null);
  const [ShowLoader, setShowLoader] = useState(false);
  const [ImgInfo, setImgInfo] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [carouselActiveSlide, setCarouselActiveSlide] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setData([]);
      setCopyData([]);
      setNoData(null);

      const carousel = carouselActiveSlide;
      const ApprovedInvoice = apiApprovedInvoice();
      setSearch('');
      return () => {
        ApprovedInvoice, carousel;
      };
    }, [authState?.mallDetails?.oko_Row_Code]),
  );

  const apiApprovedInvoice = () => {
    var data = JSON.stringify({
      entityName: 'invoice',
      action: 'payload',
      pageUrl: 'FetchApprovedInvoice',
      event: 'replaceWithAuth',
      formList: [
        {
          party_code: authState.PartyCode || authState.partyCode,
          invp_status: 1,
          branch_code: authState?.mallDetails?.oko_Row_Code,
        },
      ],
    });

    var config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState.userToken,
        userid: authState.userId,
        'Content-Type': 'application/json',
        pageUrl:'FetchApprovedInvoice',
        event:'ApprovedScreen',
        action:'onLoadApprovedInvoices'
      },
      data: data,
    };

   fetchApiService(config, authAction,authState)
      .then(function (response) {
        var sorted_bills = response?.data?.data?.Inv_Lpt.sort((a, b) => {
          return new Date(a.bill_upload_date) - new Date(b.bill_upload_date);
        });

        setData(sorted_bills?.reverse());
        setCopyData(sorted_bills?.reverse());
        setNoData(sorted_bills?.reverse());
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };
  const apiSearchBill = (item) => {
    if (item == '') {
      setData(CopyData);
    }
    if (item.trim() == '') {
      return true;
    }

    var test;
    if (/\d/.test(item) == true) {
      test = [
        {
          party_code: authState.PartyCode || authState.partyCode,
          invp_status: 1,
          inv_num: item + '%',
          brand_name: '',
          branch_code: authState?.mallDetails?.oko_Row_Code,
        },
      ];
    } else {
      test = [
        {
          party_code: authState.PartyCode || authState.partyCode,
          invp_status: 1,
          inv_num: '',
          brand_name: item + '%',
          branch_code: authState?.mallDetails?.oko_Row_Code,
        },
      ];
    }

    var data = JSON.stringify({
      entityName: 'searchbill',
      action: 'payload',
      pageUrl: 'FetchSearchBill',
      event: 'replaceWithAuth',
      formList: test,
    });

    var config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState.userToken,
        userid: authState.userId,
        'Content-Type': 'application/json',
        pageUrl:'FetchSearchBill',
        event:'ApprovedScreen',
        action:'onSearchInvoices'
      },
      data: data,
    };

    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        setShowLoader(false);
        if (
          response.data.message.message.includes('Requested data not found')
        ) {
          setData([]);
        } else {
          setData(response.data.data.Inv_Lpt);
        }
      })
      .catch(function () {
        setShowLoader(false);
      });
  };
  const openPDF = (loc) => {
    let url = (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) + `${loc}`;
    if (url) {
      Linking.openURL(url);
    } else {
      Alert.alert('', 'Failed to open document.', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
    }
  };
  const renderImgItem = ({item}) => {
    return (
      <View style={{flex: 1}}>
        {item.includes('.pdf') ? (
          <TouchableOpacity
            onPress={() => openPDF(item)}
            style={{
              flex: 1,
              backgroundColor: 'white',
              marginHorizontal: 45,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: R.themes.boxBackgroundColour,
            }}
          >
            <Image
              source={R.images.PdfFile}
              //imageStyle={{borderRadius: 15}}
              style={{
                tintColor: R.themes.boxBackgroundColour,
                width: 140,
                height: 150,
                top: 190,
                left: 80,
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Image
              source={{
                uri: (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) + `${item}`,
              }}
              imageStyle={{borderRadius: 15}}
              style={styles.bImage}
              resizeMode={'stretch'}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: R.colors.modalBlack,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 0.5,
              width: '100%',
              flexDirection: 'row',
            }}
          >
            <View style={{flex: 1}} />
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginTop: 25,
                marginRight: 23,
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Icon
                  name={'ri-close-circle-line'}
                  color="white"
                  size={R.dimensions.wp(7)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 6}}>
            <Carousel
              layout={'default'}
              data={ImgInfo}
              sliderWidth={R.dimensions.wp('100%')}
              itemWidth={R.dimensions.wp('100%')}
              renderItem={renderImgItem}
              loop={true}
              onSnapToItem={(index) => setCarouselActiveSlide(index)}
            />
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
          >
            <Text
              style={{
                color: R.colors.primaryWhite,
                fontSize: R.dimensions.wp(4),
                fontWeight: 'bold',
              }}
            >
              {carouselActiveSlide + 1} of {ImgInfo?.length}
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
            }}
          />
        </SafeAreaView>
      </Modal>
    );
  };
  const renderItem = ({item}) => {
    return (
      <RootView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: '2%',
          }}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            locations={[0, 0.02]}
            colors={[R.themes.yellowPetalcolor, R.themes.backgroundColor]}
            style={styles.linearGradient}
          >
            <View
              style={{
                borderColor: R.themes.accountTextColour,
                borderRightWidth: 1,
                borderBottomWidth: 1,
                borderTopWidth: 1,
              }}
            >
              <View style={{flexDirection: 'row', left: '2%'}}>
                <View style={{flex: 1, padding: R.dimensions.hp('1.5%')}}>
                  <Text
                    style={{
                      fontSize: R.dimensions.hp('1.8%'),
                      fontFamily: R.fonts.primaryBold,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: R.dimensions.hp('1.8%'),

                        fontFamily: R.fonts.primaryBold,
                      }}
                    >
                      {item.brand_name}{' '}
                    </Text>
                    , {item.mall_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                        padding: 4,
                        borderRadius: 18,
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: R.fonts.primaryBold,
                          fontSize: R.dimensions.hp('1.8%'),
                        }}
                      >
                        {item.inv_amt1}
                      </Text>
                    </View>
                    {/* <Text
                    style={{
                      fontFamily: R.fonts.primaryBold,
                      color: R.themes.backgroundColor,
                      fontSize: R.dimensions.hp('1.8%'),
                      marginLeft: 5,
                    }}>
                    Points Earned
                  </Text> */}
                  </View>
                  <View style={{marginTop: R.dimensions.hp('1%')}}>
                    <Text style={styles.idTextStyle}>
                      {/* Bill Date: {moment(item.bill_Date).format('DD-MMM-YYYY')} */}
                    </Text>

                    <Text style={styles.idTextStyle}>
                      Bill Upload Date: {item.bill_upload_date1}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View style={{}}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        setCarouselActiveSlide(0);
                        setImgInfo(
                          item.inv_image
                            .split('<->')
                            .filter((str) => str !== ''),
                        );
                      }}
                    >
                      <Image
                        source={{
                          uri:
                            (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                            item?.inv_image?.split('<->')[0],
                        }}
                        // source={R.images.demoBill}
                        style={styles.imgStyle}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: R.dimensions.wp('1%')}}>
                    <Text style={styles.idTextStyle}>{item.inv_num}</Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </RootView>
    );
  };

  return (
    <>
      <RootView>
        {ShowLoader ? (
          <Loader isVisible={ShowLoader} />
        ) : (
          <>
            {renderModal()}
            {noData == null ? (
              <View>
                <CustomUploadBill
                  noDataText={
                    'Uh oh ! No bill uploaded and approved yet. More bills uploaded equal more points. Upload your bill now !!'
                  }
                  onPressUpload={() =>
                    navigation.navigate('DrawerNavigation', {
                      screen: 'UploadBillCapture',
                    })
                  }
                />
              </View>
            ) : (
              <>
                <SearchInputComponent
                  onPress={() => apiSearchBill(search)}
                  onSubmitEditing={(event) => {
                    apiSearchBill(event.nativeEvent.text);
                  }}
                  onChangeText={(search) => {
                    setSearch(search);
                  }}
                  value={search}
                  multiline={false}
                  numberOfLines={1}
                  placeholder={'Search By Bill No Or Store Name'}
                />

                {data?.length === 0 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: '55%',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: R.themes.backgroundColor,
                      }}
                    >
                      Requested Data Not Found
                    </Text>
                  </View>
                ) : (
                  <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                  />
                )}
              </>
            )}
          </>
        )}
      </RootView>
    </>
  );
};
export default ApproveScreen;
