import React from 'react';
import {styles} from './VoucherStyle';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import R from '../../../R';

import moment from 'moment';
import {
  IMAGE_CDN_URL_TENANT_ID,
  IS_CDN,
  IMAGE_URL,
} from '../../../utils/Constants';

// export default class PhysicalVoucher extends React.Component {
const PhysicalVoucher = (props) => {
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={props.showVal}>
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <View
              style={{
                alignSelf: 'center',
                paddingVertical: '2%',
                backgroundColor: R.themes.backgroundColor,
                borderColor: R.themes.boxBackgroundColour,
                paddingHorizontal: '22%',
                bottom: '4%',
                borderWidth: 2,
              }}
            >
              <Text style={{fontSize: 20, fontWeight: '600', padding: '2%'}}>
                {props?.vName}
              </Text>
            </View>
            <View>
              {!props.ImgUrl ? (
                <Image
                  //  source={R.images.AldoLogo}
                  source={R.images.GiftClamiedVoucher}
                  style={{
                    height: R.dimensions.wp('18%'),
                    width: R.dimensions.wp('16%'),
                    alignSelf: 'center',
                  }}
                />
              ) : (
                <Image
                  //  source={R.images.AldoLogo}
                  resizeMode="contain"
                  source={{
                    uri:
                      (IS_CDN ? IMAGE_CDN_URL_TENANT_ID : IMAGE_URL) +
                      props.ImgUrl,
                  }}
                  style={styles.aldoLogo}
                />
              )}
            </View>

            <View style={styles.priceContainer}>
              {props.pTitle != 'GIFT' && (
                <Text style={styles.priceText}>
                  {'\u20B9'} {props.voucher_Amount}
                </Text>
              )}
            </View>
            <View style={styles.horizontalLine} />
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
                marginVertical: '2%',
              }}
            >
              <Text
                style={{
                  fontFamily: R.fonts.primaryRegular,
                  fontSize: 16,
                  textAlign: 'center',
                  color: R.themes.accountTextColour,
                }}
              >
                Valid till{' - '}
              </Text>
              <Text
                style={{
                  color: R.themes.accountTextColour,

                  fontFamily: R.fonts.primaryRegular,
                  fontSize: 16,
                  textAlign: 'center',
                }}
              >
                {moment(props.Expire_Date).format('DD-MMM-YYYY')}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: R.fonts.primaryRegular,
                fontSize: 18,
                textAlign: 'center',
                fontWeight: '700',
                color: R.themes.accountTextColour,
                marginTop: '5%',
              }}
            >
              Congratulations !!!
            </Text>

            <Text
              style={{
                fontFamily: R.fonts.primaryRegular,
                fontSize: 12,
                textAlign: 'center',
                fontWeight: '500',
                marginTop: '5%',
                paddingHorizontal: '10%',
                color: R.themes.accountTextColour,
                lineHeight: 20,
              }}
            >
              You can now collect the voucher from Mall Help desk.{'\n'} Use map
              to navigate to help desk!
            </Text>

            <View style={{marginVertical: '1%'}}>
              <TouchableOpacity
                onPress={props.onPressClose}
                style={styless.closebtnView}
              >
                <Text
                  style={{
                    fontFamily: R.fonts.primaryBold,
                    fontSize: 14,
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: '80%',
                  borderWidth: 1,
                  alignSelf: 'center',
                  marginTop: '5%',
                  borderColor: R.themes.yellowPetalcolor,
                  borderStyle: 'dashed',
                }}
              />
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10%',
                }}
              >
                <Image
                  style={{
                    height: R.dimensions.wp('18%'),
                    width: R.dimensions.wp('16%'),
                  }}
                  source={R.images.GiftClamiedVoucher}
                />
                <Text
                  style={{
                    paddingStart: '5%',
                    fontWeight: '500',
                    fontSize: 16,
                    color: R.themes.accountTextColour,
                  }}
                >
                  {props.vType}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
// }

const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  closebtnView: {
    width: R.dimensions.wp('30%'),
    height: R.dimensions.hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // padding: R.dimensions.hp('5%'),
    borderRadius: 5,
    backgroundColor: R.colors.primaryBrand2,
    borderColor: R.colors.primaryBrand2,
    borderWidth: 2,
    flexDirection: 'row',
    marginTop: R.dimensions.hp('1.8%'),
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default PhysicalVoucher;
