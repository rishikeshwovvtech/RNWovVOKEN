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
import Icon from 'react-native-remix-icon';
import {RootView, CustomUploadBill, Loader} from '../../../components/index';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
// import ContactusController, { Props } from "./ContactusController";
import R from '../../../R';
import styles from './ApproveScreen/ApproveScreenstyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {
  BASE_URL,
  IMAGE_URL,
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
} from '../../../utils/Constants';
import Carousel from 'react-native-snap-carousel';
import {Alert} from 'react-native';

const InProgressScreen = ({props, navigation}) => {
  const [data, setData] = useState([]);
  const [CopyData, setCopyData] = useState([]);
  const [noData, setNoData] = useState(null);
  const [ShowLoader, setShowLoader] = useState(false);
  const {authAction, authState} = useContext(AuthContext);
  const [ImgInfo, setImgInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [carouselActiveSlide, setCarouselActiveSlide] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setData([]);
      setCopyData([]);
      setNoData(null);
      const ApprovedInvoice = apiApprovedInvoice();
      return () => {
        ApprovedInvoice;
      };
    }, [authState?.userId, authState?.mallDetails?.oko_Row_Code]),
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
          invp_status: 0,
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
        event:'InProgressScreen',
        action:'onLoadInProgressInvoices'
      },
      data: data,
    };
    // setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        var sorted_meetings = response?.data?.data?.Inv_Lpt.sort((a, b) => {
          return new Date(a.bill_upload_date) - new Date(b.bill_upload_date);
        });
        setData(sorted_meetings?.reverse());

        setCopyData(sorted_meetings);
        setNoData(sorted_meetings);
      })
      .catch(function (error) {
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
            <View style={{flex: 1}}></View>
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
          ></View>
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
                      marginTop: R.dimensions.wp('2%'),
                      fontSize: R.dimensions.hp('1.5%'),
                      fontFamily: R.fonts.primaryBold,
                      color: R.themes.accountTextColour,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: R.dimensions.hp('2%'),

                        fontFamily: R.fonts.primaryRegular,
                        color: R.themes.accountTextColour,
                      }}
                    >
                      {item.brand_name}
                    </Text>
                    {item.mall_name}
                  </Text>

                  <View style={{marginTop: R.dimensions.wp('1%')}}>
                    <Text style={styles.idTextStyle}>{item.inv_num}</Text>
                    <Text
                      style={[
                        styles.idTextStyle,
                        {marginTop: R.dimensions.wp('3%')},
                      ]}
                    >
                      Bill Upload Date: {item.bill_upload_date1}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: R.dimensions.wp('2%'),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setCarouselActiveSlide(0);
                      setImgInfo(
                        item.inv_image.split('<->').filter((str) => str !== ''),
                      );
                    }}
                  >
                    {item?.inv_image?.split('<->')[0]?.includes('.pdf') ? (
                      <Image
                        source={R.images.PdfFile}
                        // source={R.images.demoBill}
                        style={{
                          tintColor: R.colors.darkorange,
                          height: R.dimensions.hp('11%'),
                          width: R.dimensions.wp('20%'),
                          borderRadius: 10,
                        }}
                      />
                    ) : (
                      <Image
                        source={{
                          uri:
                            (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                            item?.inv_image?.split('<->')[0],
                        }}
                        // source={R.images.demoBill}
                        style={styles.imgStyle}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </RootView>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      {ShowLoader ? (
        <RootView>
          <Loader isVisible={ShowLoader} />
        </RootView>
      ) : (
        <RootView>
          {noData == null ? (
            <View>
              <CustomUploadBill
                noDataText={
                  'Our team verifies your bills to reward your loyalty. Bills under approval will be displayed here ....'
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
              {renderModal()}

              <FlatList data={data} renderItem={renderItem} />
            </>
          )}
        </RootView>
      )}
    </SafeAreaView>
  );
};
export default InProgressScreen;
const Data = [{id: 0}, {id: 1}, {id: 3}];
