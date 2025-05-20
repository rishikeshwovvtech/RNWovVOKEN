import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  FlatList,
  BackHandler,
} from 'react-native';
import R from '../../../R';
import Icon from 'react-native-remix-icon';
import {AuthContext} from '../../../context/auth/AuthContext';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import {
  AUTH_BASE_URL,
  BASE_URL,
  IS_CDN,
  TENANT_ID,
} from '../../../utils/Constants';
import {Loader, CModal, BackHeader} from '../../../components/index';
import analytics from '@react-native-firebase/analytics';
import {useFocusEffect} from '@react-navigation/native';
import SubHeader from '../../../components/SubHeader';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {fetchPartyCode} from '../../Auth/API/CommonApiCalls';

let counter = 0;
export const UploadBillPreview = ({navigation, route}) => {
  const {imageObjectArray} = route?.params;
  const {authState, authAction} = useContext(AuthContext);
  const [showImg, setShowImg] = useState(imageObjectArray[0].base64);
  const [ShowLoader, setShowLoader] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );

  const backAction = () => {
    counter = 0;
    navigation.goBack();
    setShowErrorModal(false);
    return true;
  };

  const apiUploadCaptureBill = async () => {
    let finalPartyCode = authState?.partyCode || authState?.PartyCode;
    if (authState?.partyCode == null || authState?.PartyCode == null) {
      const {result} = await fetchPartyCode(
        authState?.userId,
        authState?.accessToken,
        authState
      );
      finalPartyCode = result;
    }
    var data = JSON.stringify({
      entityName: 'Bill_Upload',
      action: 'payload',
      pageUrl: 'billuploadinsert',
      event: 'replaceWithAuth',
      formList: [
        {
          party_Code: finalPartyCode,
          party_Name: authState?.userObject?.fullName,
          party_Email: authState?.userObject?.email,
          party_Mob: authState?.userObject?.mobilePhone,
          branch_Code: authState?.mallDetails?.oko_Row_Code,
          branch_Name: authState?.mallDetails?.oko_Row_Desc,
          UserCode: authState?.userId,
        },
      ],
    });

    var config = {
      method: 'post',
      url: BASE_URL,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl:'billuploadinsert',
        event:'UploadedBillPreviewScreen',
        action:'onUploadBill'
      },
      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        if (response?.data?.message?.code == 0) {
          let id = response?.data?.data?.Inv_Lpt[0].id;

          analytics().logEvent('UploadBill', {
            Bill: 'id',
          });
          if (imageObjectArray.length === 1) {
            apiUploadImage(id);
          }
          if (imageObjectArray.length > 1) {
            IS_CDN ? multiimageUpload(id) : nonCdnMultibillUpload(id);
          }
        } else {
          setErrorModalMessage(response?.data?.message?.message);
          setShowErrorModal(true);
        }
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  const apiUploadImage = (id) => {
    const imgObject = imageObjectArray[0];

    var data = JSON.stringify({
      action: IS_CDN ? 'payload' : 'payloadRuleWithTid',
      pageUrl: IS_CDN ? 'saveImagefileV2' : 'saveImagefile',
      entityName: 'Inv_Lpt',
      event: IS_CDN ? 'replaceWithAuth' : 'PT_560',
      formList: [
        {
          tenantId: TENANT_ID,
          image_data_Json: [
            {
              name: imgObject.fileName,
              type: imgObject.type,
              folderName: 'INV_LPT',
              content: imgObject.base64,
            },
          ],
          Id: id,
          branch_Code: authState?.mallDetails?.oko_Row_Code,
          setFields: [
            {
              name: 'invp_user_Code_Updt',
              value: authState?.userId,
            },
            {
              name: 'inv_Image',
              value: '',
            },
            {
              name: 'invp_TS_Edited',
              value: '',
            },
          ],
        },
      ],
    });

    var config = {
      method: 'post',
      url: IS_CDN
        ? `${AUTH_BASE_URL}/ipos/rest/OcrUtility/billuploadwithocr?tenantId=_${TENANT_ID}`
        : `${AUTH_BASE_URL}/ipos/rest/fusionAuth/billuploadwithCT?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl:'billuploadwithocr',
        event:'UploadedBillPreviewScreen',
        action:'onUploadBillImageOCR'
      },
      data: data,
    };
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        CTA_firebaseAnalytics(
          'Bill_Upload',
          'UploadBill',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
        )
          .then((res) => {})
          .catch((e) => {});
        setShowLoader(false);
        setErrorModalMessage('Successfully uploaded !');
        setShowErrorModal(true);
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  const multiimageUpload = (id) => {
    let counter = 0;
    setShowLoader(true);
    callingApiMultipleTimes(counter, id);
  };

  const callingApiMultipleTimes = async (counter, id) => {
    //console.log('🚀 ~ callingApiMultipleTimes ~ counter:', counter);
    let failedCounter = 0;
    // while (counter < imageObjectArray.length) {
    var data = JSON.stringify({
      action: 'payload',
      pageUrl: 'saveImagefileV2',
      entityName: 'Inv_Lpt',
      event: 'replaceWithAuth',

      formList: [
        {
          tenantId: TENANT_ID,
          image_data_Json: [
            {
              name: imageObjectArray[counter].fileName,
              type: imageObjectArray[counter].type,
              folderName: 'INV_LPT',
              content: imageObjectArray[counter].base64,
            },
          ],
          Id: id,
          branch_Code: authState?.mallDetails?.oko_Row_Code,
          setFields: [
            {
              name: 'invp_user_Code_Updt',
              value: authState?.userId,
            },
            {
              name: 'inv_Image',
              value: '',
            },
            {
              name: 'invp_TS_Edited',
              value: '',
            },
          ],
        },
      ],
    });

    var config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/OcrUtility/billuploadwithocr?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl:'billuploadwithocr',
        event:'UploadedBillPreviewScreen',
        action:'onUploadBillmultipleImageOCR'
      },
      data: data,
    };

    await fetchApiService(config, authAction,authState)
      .then(function (response) {
        if (counter >= imageObjectArray.length - 1) {
          setShowLoader(false);
          setErrorModalMessage('Successfully uploaded !');
          setShowErrorModal(true);
          CTA_firebaseAnalytics(
            'Bill_Upload',
            'UploadBill',
            authState?.userToken,
            authState?.userId,
            authState?.mallDetails?.oko_Row_Desc,
            '',
            'multipleImages : true',
          );
        } else {
          counter += 1;
          callingApiMultipleTimes(counter, id);
        }
      })
      .catch(function (error) {
        if (failedCounter > 1) {
          failedCounter += 1;
          callingApiMultipleTimes(counter, id);
        } else {
          setShowLoader(false);
          setErrorModalMessage('Please try after sometime!');
          setShowErrorModal(true);
        }
      });
    // }
  };

  const nonCdnMultibillUpload = async (id) => {
    const imageArray = imageObjectArray.map((x) => {
      let obj;
      return (obj = {
        name: x?.fileName,
        type: x?.type,
        folderName: 'Inv_Lpt',
        content: x?.base64,
      });
    });

    var data = JSON.stringify({
      action: 'payloadRuleWithTid',
      pageUrl: 'saveMultipleImage',
      entityName: 'Inv_Lpt',
      event: 'JR_815',
      formList: [
        {
          tenantId: TENANT_ID,
          image_data_Json: imageArray,
          Id: id,
          setFields: [
            {
              name: 'invp_user_Code_Updt',
              value: authState?.userId,
            },
            {
              name: 'inv_Image',
              value: '',
            },
            {
              name: 'invp_TS_Edited',
              value: '',
            },
          ],
        },
      ],
    });

    var config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/billmutipleuploadwithCT?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: authState?.userToken,
        userid: authState?.userId,
        'Content-Type': 'application/json',
        pageUrl:'billmutipleuploadwithCT',
        event:'UploadedBillPreviewScreen',
        action:'onUploadBillmultipleNonCDN'
      },
      data: data,
    };

   fetchApiService(config, authAction,authState)
      .then(function (response) {
        // analyticsdata(id);
        CTA_firebaseAnalytics(
          'Bill_Upload',
          'UploadBill',
          authState?.userToken,
          authState?.userId,
          authState?.mallDetails?.oko_Row_Desc,
          '',
          'multipleImages : true',
        )
          .then((res) => {})
          .catch((e) => {});
        setShowLoader(false);
        setErrorModalMessage('Successfully uploaded !');
        setShowErrorModal(true);
      })
      .catch(function (error) {});
  };

  const renderItem = (item) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setShowImg(item?.item?.uri);
          }}
          style={{
            margin: 5,
            borderRadius: 50,
            borderColor:
              showImg == item?.item?.uri
                ? 'gray'
                : R.themes.boxBackgroundColour,
            borderWidth: 2,

            justifyContent: 'center',
          }}
        >
          {item?.item?.base64?.includes('data:application/pdf') ? (
            <Image
              source={R.images.PdfFile}
              style={{
                tintColor: R.colors.darkorange,
                width: R.dimensions.wp('10%'),
                height: R.dimensions.wp('10%'),
                margin: R.dimensions.wp('3%'),
              }}
            />
          ) : (
            <Image
              source={{uri: item?.item?.uri}}
              style={styles.longbillImages}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <BackHeader
        title={'Upload Bill'}
        navigation={navigation}
        customOnPress={backAction}
      />
      <SubHeader title={'Upload Bill'} />
      <View style={styles.container}>
        <ImageBackground
          source={{uri: showImg}}
          resizeMode="contain"
          style={styles.container}
        >
          {imageObjectArray.length > 1 && (
            <View style={{flexDirection: 'row', marginTop: '2%'}}>
              <FlatList
                horizontal
                data={imageObjectArray}
                renderItem={renderItem}
              />
            </View>
          )}

          <TouchableOpacity
            onPress={() => apiUploadCaptureBill()}
            style={styles.uploadContainer}
          >
            <Icon
              name="ri-upload-2-line"
              size={R.dimensions.wp('8%')}
              color="white"
            />
          </TouchableOpacity>
        </ImageBackground>

        <CModal
          isVisible={ShowErrorModal}
          modalMsg={ErrorModalMessage}
          onPressModal={() => {
            setShowErrorModal(!ShowErrorModal);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'MainNavigator',
                  params: {
                    screen: 'DrawerNavigation',
                  },
                },
              ],
            });
          }}
          isForm={'Signup'}
        />
        <Loader isVisible={ShowLoader} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: R.themes.boxBackgroundColour,
    borderRadius: R.dimensions.wp('50%'),
    padding: '5%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
  },
  gallery: {
    borderRadius: R.dimensions.wp('50%'),
    padding: '3%',
    alignSelf: 'center',
    margin: R.dimensions.wp('8%'),
    height: R.dimensions.hp('6%'),
    width: R.dimensions.wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8E8E8E',
    position: 'absolute',
    right: '18%',
  },
  uploadContainer: {
    borderRadius: R.dimensions.wp('50%'),
    padding: '4%',
    backgroundColor: R.themes.accountTextColour,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
  },

  longBill: {
    borderRadius: R.dimensions.wp('50%'),
    padding: '1%',
    alignSelf: 'center',
    margin: R.dimensions.wp('5%'),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: '20%',
  },

  proceedIcon: {
    position: 'absolute',
    right: R.dimensions.wp('5%'),
    //top: R.dimensions.wp('3%'),
  },

  proceedImage: {
    height: R.dimensions.wp('10%'),
    width: R.dimensions.wp('10%'),
    borderWidth: 1,
    borderRadius: R.dimensions.wp('50%'),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '17%',
  },

  switchContainer: {
    height: R.dimensions.hp('5%'),
    width: R.dimensions.wp('60%'),
    marginHorizontal: R.dimensions.wp('15%'),
    backgroundColor: R.themes.backgroundColor,

    borderColor: R.themes.backgroundColor,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  ImageCounter: {
    backgroundColor: R.themes.backgroundColor,
    height: R.dimensions.wp('5%'),
    width: R.dimensions.wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: R.dimensions.wp('50%'),
    position: 'absolute',
    right: R.dimensions.wp('0%'),
    top: R.dimensions.wp('0.5%'),
  },
  CountText: {
    color: R.colors.black,
    padding: '2%',
    fontSize: 10,
    fontFamily: R.fonts.primaryBold,
  },

  viewConatainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: R.dimensions.wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  toggleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  longbillpreviewContainer: {
    margin: '2%',
    borderWidth: R.dimensions.wp('0.2'),
    borderColor: R.themes.backgroundColor,
    borderRadius: R.dimensions.wp('50%'),
  },

  longbillImages: {
    width: R.dimensions.wp('15%'),
    height: R.dimensions.wp('15%'),
    borderRadius: R.dimensions.wp('50%'),
  },
});
