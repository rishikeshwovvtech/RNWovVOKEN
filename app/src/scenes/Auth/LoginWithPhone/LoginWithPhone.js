import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import styles from './LoginPhoneStyle';
import {horizontalScale} from '../../../../res/scale';
import R from '../../../R';
import {
  RootView,
  SimpleButton,
  BackHeader,
  CModal,
} from '../../../components/index';
import {AUTH_BASE_URL, TENANT_ID, USER_APP_ID} from '../../../utils/Constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
export const LoginWithPhone = ({route, navigation}) => {
  const [ShowLoader, setShowLoader] = useState(false);
  const phoneNo = route.params.phoneNo;
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);

  const sendOTP = () => {
    setShowLoader(true);
    let data = JSON.stringify({
      mobilePhone: '+91' + phoneNo,
      pageUrl:'loginViaOTPVersion2',
    });
    let config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/fusionAuth/loginViaOTPVersion2?tenantId=_${TENANT_ID}&user_App_ID=${USER_APP_ID}`,
      headers: {
        'Content-Type': 'application/json',
        pageUrl:'loginViaOTPVersion2',
        event:'LoginWithPhoneScreen',
        action:'onSendOTP'
      },
      data: data,
    };

   fetchApiService(config, authAction,authState)
      .then(function (response) {
        setShowLoader(false);
        if (Object.keys(response?.data) == '2008') {
          setErrorModalMessage(response?.data['2008']);
          setShowErrorModal(true);
        } else if (Object.keys(response?.data) == '2007') {
          setErrorModalMessage(response?.data['2007']);
          setShowErrorModal(true);
        } else if (Object.keys(response?.data) == '2006') {
          setErrorModalMessage(response?.data['2006']);
          setShowErrorModal(true);
        } else {
          navigation.navigate('VerifyPhone', {
            userId: response.data.userId,
            twoFactor: response.data.twoFactor,
            phoneNo: phoneNo,
          });
        }
      })
      .catch(function (error) {
        setShowLoader(false);
        setErrorModalMessage(
          'Please wait for few minutes before you try again',
        );
        setShowErrorModal(true);
      });
  };
  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left']}
      style={{backgroundColor: R.colors.primaryBrand2, flex: 1}}
    >
      <BackHeader logo={true} navigation={navigation} />

      {ShowLoader ? (
        <RootView>
          <View
            style={{
              marginTop: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              position: 'absolute',
              alignSelf: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: R.themes.backgroundColor,
                padding: '5%',
                borderRadius: 8,
                width: horizontalScale(300),
                alignItems: 'center',
              }}
            >
              {/* <ActivityIndicator
                size={'large'}
                color={R.themes.boxBackgroundColour}
              />
              <Text
                style={{
                  marginTop: '5%',
                  fontSize: horizontalScale(12),
                  fontFamily: R.fonts.primaryRegular,
                  textAlign: 'center',
                }}
              >
                Loading
              </Text> */}
              <Image
                source={R.images.loaderNexus}
                style={{width: 50, height: 50}}
              />
            </View>
          </View>
        </RootView>
      ) : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {/* <ImageBackground
            source={R.images.Elantebackscreenimage}
            // resizeMode={'contain'}
            style={styles.mainContainer}
          ></ImageBackground> */}
          <Image
            resizeMode="contain"
            source={R.images.newapplogo}
            style={{width: '100%', resizeMode: 'cover'}}
          />
          <View>
            <Text style={styles.phoneNumberText}>Login with phone number</Text>
            <Text style={styles.numberText}>{phoneNo}</Text>

            <Text style={styles.codeText}>
              We will send the authentication code
            </Text>
            <Text style={styles.text}>to the phone number you entered</Text>
            <Text style={styles.continueText}>Do you want to continue?</Text>
            <View style={styles.buttonView}>
              <SimpleButton
                onPress={() => {
                  sendOTP();
                }}
                title={'NEXT'}
                customTxtStyle={styles.btntext}
                customStyle={styles.nextBtn}
              />
              <CModal
                isVisible={ShowErrorModal}
                modalMsg={ErrorModalMessage}
                onPressModal={() => {
                  setShowErrorModal(!ShowErrorModal);
                }}
                isForm={'Signup'}
              />

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => navigation.navigate('LoginWithOTP')}
              >
                <Text style={styles.canceltext}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
