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
import {
  BASE_URL,
  IS_CDN,
  IMAGE_URL,
  IMAGE_CDN_URL_TENANT_ID,
} from '../../../utils/Constants';
import {useFocusEffect} from '@react-navigation/native';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
// import ContactusController, { Props } from "./ContactusController";
import R from '../../../R';
import styles from './ApproveScreen/ApproveScreenstyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import RemarkModal from './RemarkModal/RemarkModal';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {Alert} from 'react-native';
const RejectedScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [Remark, setRemark] = useState();
  const [noData, setNoData] = useState(null);
  const [ShowLoader, setShowLoader] = useState(false);
  const {authAction, authState} = useContext(AuthContext);
  const [ImgInfo, setImgInfo] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [carouselActiveSlide, setCarouselActiveSlide] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setData([]);
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
          invp_status: 2,
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
        event:'RejectedScreen',
        action:'onLoadRejectedInvoices'
      },
      data: data,
    };
    // setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        // setShowLoader(false);

        var sorted_meetings = response?.data?.data?.Inv_Lpt.sort((a, b) => {
          return new Date(a.bill_upload_date) - new Date(b.bill_upload_date);
        });
        // var output = response.data.data.Inv_Lpt.filter((rejected) => rejected.invp_Status == 2);
        setData(sorted_meetings?.reverse());
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
        {item.includes('.pdf') ? (
          <TouchableOpacity
            onPress={() => openPDF(item)}
            style={{
              flex: 1,
              backgroundColor: 'white',
              marginHorizontal: 45,
              marginVertical: 10,
              borderWidth: 1,
              borderColor: R.colors.darkorange,
            }}
          >
            <Image
              source={R.images.PdfFile}
              //imageStyle={{borderRadius: 15}}
              style={{
                tintColor: R.colors.darkorange,
                width: 140,
                height: 150,
                top: 190,
                left: 80,
              }}
              //resizeMode={'stretch'}
            >
              {/* {isMiddleLogo && (
          <View style={styles.textView}>
            <View style={styles.logoView}>
              <Image
                source={source}
                style={styles.productImage}
                resizeMode={'contain'}
              />
            </View>
          </View>
        )} */}
            </Image>
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
            >
              {/* {isMiddleLogo && (
        <View style={styles.textView}>
          <View style={styles.logoView}>
            <Image
              source={source}
              style={styles.productImage}
              resizeMode={'contain'}
            />
          </View>
        </View>
      )} */}
            </Image>
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
              // autoplay={true}
              //autoplayInterval={5000}
              onSnapToItem={(index) => setCarouselActiveSlide(index)}
            />
            {/* <CustomSlider 
            data={ImgInfo}
            /> */}
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
      <>
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
                        color: R.themes.darkTextColor,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: R.dimensions.hp('2%'),

                          fontFamily: R.fonts.primaryRegular,
                          color: R.themes.darkTextColor,
                        }}
                      >
                        {item.brand_name}
                      </Text>
                      {item.mall_name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setVisible(true), setRemark(item.checker_remark);
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: R.themes.darkCardBackgroundColor,
                          marginTop: 15,
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: R.dimensions.hp('25%'),
                          padding: 5,
                          borderRadius: 18,
                          justifyContent: 'space-around',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: R.fonts.primaryBold,
                            fontSize: R.dimensions.hp('1.6%'),
                            color: R.themes.backgroundColor,
                          }}
                        >
                          Click here to know why
                        </Text>

                        <Icon name="share-box-line" size="20" color="white" />
                      </View>
                    </TouchableOpacity>
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
                          item.inv_image
                            .split('<->')
                            .filter((str) => str !== ''),
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
      </>
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
          {renderModal()}
          {noData == null ? (
            <View>
              <CustomUploadBill
                noDataText={
                  'We hope you upload accurate shopping bills. In case our investigators find a wrong bill, they will reject the bill. Please check the comments and upload your bill again'
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
              {data.length === 0 ? (
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
                    Requested data not found
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
          <RemarkModal
            ShowVisible={visible}
            remark={Remark}
            onClosePress={() => setVisible(false)}
          />
        </RootView>
      )}
    </SafeAreaView>
  );
};
export default RejectedScreen;
