import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
//import {RNCamera} from 'react-native-camera';
import R from '../../../R';
import Icon from 'react-native-remix-icon';
import {launchImageLibrary} from 'react-native-image-picker';
import {BackHeader} from '../../../components/index';
import {useFocusEffect} from '@react-navigation/native';
import SubHeader from '../../../components/SubHeader';
import {Alert} from 'react-native';

export const UploadBillCapture = ({navigation}) => {
  const camera = useRef(null);
  const [selectionMode, setSelectionMode] = useState(1);
  const [longBillImgObject, setLongBillImgObject] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
    }, []),
  );

  const backAction = () => {
    setLongBillImgObject([]);
    navigation.goBack();
    return true;
  };

  const takePicture = async () => {
    try {
      const options = {
        width: 1500,
        quality: 0.9,
        orientation: 'portrait',
        fixOrientation: true,
        base64: true,
      };
      const data = await camera.current.takePictureAsync(options);
      var ImageUrl = data?.uri;

      var startIndex = ImageUrl.lastIndexOf('/') + 1;
      var fileName =
        new Date().getTime() + ImageUrl.substring(startIndex, ImageUrl.length);
      var finalImageObject = data.base64;

      let type = 'image/jpg';

      if (selectionMode === 1) {
        let singleBillImgObject = {
          base64: `data:${type};base64,${finalImageObject}`,
          fileName: fileName,
          type: type,
        };
        navigation.navigate('UploadBillPreview', {
          imageObjectArray: [singleBillImgObject],
        });
      }
      if (selectionMode === 2) {
        if (longBillImgObject.length < 10) {
          let tempArray = [];
          tempArray.push({
            base64: `data:${type};base64,${finalImageObject}`,
            fileName: fileName,
            type: type,
            uri: ImageUrl,
          });
          setLongBillImgObject([...longBillImgObject, ...tempArray]);
        } else {
          Alert.alert('', 'You can select only 10 pictures.', [
            {
              text: 'OK',
              onPress: () => {},
            },
          ]);
        }
      }
    } catch (e) {}
  };

  const documentPicker = async () => {
    if (selectionMode === 1) {
      try {
        launchImageLibrary({
          selectionLimit: 1,
          includeBase64: true,
          maxWidth: 1500,
          maxHeight: 1500,
          quality: 0.9,
        }).then((docs) => {
          let fileName = docs?.assets[0]?.fileName;
          let type = docs?.assets[0]?.type;
          let base64 = `data:${type};base64,${docs?.assets[0]?.base64}`;
          let fileSize = docs?.assets[0]?.fileSize;
          let singleBillImgObject = {base64, fileName, type, fileSize};
          navigation.navigate('UploadBillPreview', {
            imageObjectArray: [singleBillImgObject],
          });
        });
      } catch (e) {}
    }

    if (selectionMode === 2) {
      if (longBillImgObject.length == 10) {
        Alert.alert('', 'You can select only 10 pictures.', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      } else {
        try {
          launchImageLibrary({
            selectionLimit:
              longBillImgObject.length == 0
                ? 10
                : 10 - longBillImgObject.length,
            includeBase64: true,
            maxWidth: 1500,
            maxHeight: 1500,
            quality: 0.9,
          }).then((docs) => {
            if (longBillImgObject.length < 10) {
              let tempArray = [];
              docs.assets.forEach((element) => {
                let fileName = element?.fileName;
                let type = element?.type;
                let base64 = `data:${type};base64,${element?.base64}`;
                let uri = element?.uri;
                let fileSize = element.fileSize;
                tempArray.push({
                  base64: base64,
                  fileName: fileName,
                  type: type,
                  uri: uri,
                  fileSize: fileSize,
                });
              });
              setLongBillImgObject([...longBillImgObject, ...tempArray]);
            } else {
              Alert.alert('', 'You can select only 10 pictures.', [
                {
                  text: 'OK',
                  onPress: () => {},
                },
              ]);
            }
          });
        } catch (e) {}
      }
    }
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
        {/* <RNCamera
          ref={camera}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {}}
        >
          <View style={styles.viewConatainer}>
            <View style={[styles.switchContainer, {borderRadius: 25}]}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectionMode(1);
                  if (longBillImgObject.length > 1) {
                    setLongBillImgObject([]);
                  }
                }}
                style={[
                  styles.toggleSection,
                  {
                    backgroundColor:
                      selectionMode == 1
                        ? R.themes.boxBackgroundColour
                        : R.themes.backgroundColor,
                    borderRadius: R.dimensions.wp('50%'),
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      selectionMode == 1
                        ? R.themes.backgroundColor
                        : R.themes.boxBackgroundColour,
                    fontFamily: R.fonts.primaryBold,
                    fontSize: R.dimensions.wp('3.5%'),
                    fontWeight: '400',
                  }}
                >
                  Default Bill
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                TouchableOpacity
                activeOpacity={1}
                onPress={() => setSelectionMode(2)}
                style={[
                  styles.toggleSection,
                  {
                    backgroundColor:
                      selectionMode == 2
                        ? R.themes.boxBackgroundColour
                        : R.themes.backgroundColor,
                    borderRadius: R.dimensions.wp('50%'),
                  },
                ]}
              >
                <Text
                  style={{
                    color:
                      selectionMode == 2
                        ? R.themes.backgroundColor
                        : R.themes.boxBackgroundColour,
                    fontFamily: R.fonts.primaryBold,
                    fontSize: R.dimensions.wp('3.5%'),
                  }}
                >
                  Long Bill
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginBottom: '10%'}}>
            <TouchableOpacity
              onPress={() => takePicture()}
              style={styles.capture}
            >
              <Icon name="ri-camera-line" size="30" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => documentPicker()}
              style={styles.gallery}
            >
              <Icon name="ri-image-line" size="20" color="white" />
            </TouchableOpacity>

            {longBillImgObject.length >= 1 && selectionMode === 2 ? (
              <View style={styles.longBill}>
                <View style={styles.ImageCounter}>
                  <Text style={styles.CountText}>
                    {longBillImgObject.length}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    const finalObject = longBillImgObject;
                    setLongBillImgObject([]);
                    navigation.navigate('UploadBillPreview', {
                      imageObjectArray: finalObject,
                    });
                  }}
                >
                  <Icon name="ri-arrow-right-s-line" size="50" color="white" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </RNCamera> */}
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
    padding: '4.2%',
    backgroundColor: R.themes.accountTextColour,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '8%',
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
