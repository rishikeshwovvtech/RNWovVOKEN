import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  AppState,
} from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import R from '../../../R';
import {AUTH_BASE_URL, TENANT_ID} from '../../../utils/Constants';
import {ScreenAnalytics} from '../../../components/Analytics/ScreenAnalytics';
import {AuthContext} from '../../../context/auth/AuthContext';
import {
  BackHeader,
  CModal,
  CModalForProfile,
  RootView,
} from '../../../components/index';
import {dimensions} from '../../../../res/dimensions';
import {horizontalScale} from '../../../../res/scale';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import Clipboard from '@react-native-community/clipboard';

const GenerateRewardCode = ({navigation, route}) => {
  let timer;
  const isFocused = useIsFocused();
  const {authState, authAction} = useContext(AuthContext);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [ShowLoader, setShowloader] = useState(false);
  const [voucherCode, setVoucherCode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [copyModal, setCopyModal] = useState(false);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        //console.log('App has come to the foreground');
        apiGenerateCode();
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Cleanup listener on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      ScreenAnalytics(
        'Generate_Code_Screen',
        authState?.userToken,
        authState?.userId,
      )
        .then((res) => {})
        .catch((e) => {});
      apiGenerateCode();
    }, [isFocused]),
  );

  useEffect(() => {
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const getTime = () => {
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return minutes > 0
      ? `${minutes}:${seconds < 10 ? '0' : ''}${seconds} Min`
      : `${seconds < 10 ? '0' : ''}${seconds} Sec`;
  };

  const apiGenerateCode = () => {
    //console.log("apiGenerateCode");
    
    var data = JSON.stringify({
      partycode: authState.partyCode.toString(),
      pageUrl:'GetRewardCode',
    });
    var config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/domainAuth/GetRewardCode?tenantId=_${TENANT_ID}`,

      headers: {
        access_token: authState.userToken,
        userid: authState.userId,
        'Content-Type': 'application/json',
        pageUrl:'GetRewardCode',
        event:'GenerateRewardScreen',
        action:'onGenerateCode'
      },
      data: data,
    };
    setShowloader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        //console.log("apiGenerateCode response ",response?.data);
        
        setShowloader(false);
        if (response?.data?.message?.type === 'SUCCESS') {
          setVoucherCode(response.data.data.Token);
          const {lastGenrationTime, ExpTime} = response.data.data;
          const timeremaining =
            lastGenrationTime * 1000 + ExpTime * 1000 - Date.now();
          setTimeLeft(timeremaining);
        } else {
          setErrorModalMessage(response?.data?.message?.message);
        }
      })
      .catch(function (error) {
        //console.log("apiGenerateCode response error ",error);

        setShowloader(false);
      });
  };

  function FooterNote() {
    return (
      <View style={styles.linergradientinner}>
        {/* <Image source={R.images.Infoicon} style={styles.infoicon} /> */}

        <Text style={styles.cardSubtitle}>
          Tap the 'Generate code' button to receive your unique reward code,
          which is valid for 2 hours
        </Text>
      </View>
    );
  }
  function LoaderView() {
    return (
      <RootView>
        <View
          style={{
            // flex: 1,
            animationType: 'fade',
            transparent: true,
            justifyContent: 'center',
            alignItems: 'center',
            height: R.dimensions.hp('55%'),
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: R.themes.backgroundColor,
                padding: '5%',
                borderRadius: 8,
                width: horizontalScale(300),
                alignSelf: 'center',
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
        </View>
      </RootView>
    );
  }

  const backAction = () => {
    clearInterval(timer);
    navigation.goBack();
  };

  return (
    <>
      <BackHeader
        title={''}
        //  extraStyle={{fontSize:13}}
        ///navigation={navigation}
        customOnPress={backAction}
      />
      {/* <SubHeader title={'My Reward Code'} /> */}
      <RootView>
        {ShowLoader ? (
          <LoaderView />
        ) : (
          <>
            <ScrollView style={{flexGrow: 1}}>
              <View style={styles.contentContainer}>
                <View style={styles.abouttheVoucherContainer}>
                  <Text style={styles.abouttheVoucherText}>Reward Code</Text>
                </View>

                {timeLeft >= 0 && (
                  <>
                    <Text style={styles.useThisCodeText}>
                      Use this code at the Visitor's Desk to collect your
                      reward.
                    </Text>
                    <Text style={styles.yourRewardCodeText}>
                      Your Reward Code :{' '}
                    </Text>

                    <View style={styles.voucherMaskcontainer}>
                      <View
                        style={{
                          flex: 7,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.voucherMaskText}>
                          {voucherCode}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            Clipboard.setString(voucherCode),
                              setCopyModal(true);
                          }}
                        >
                          <RemixIcon
                            name={'ri-file-copy-line'}
                            size={R.dimensions.wp(7)}
                            color={R.themes.headerBackgroundColor}
                            style={{}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                )}

                <Text style={styles.yourCodeWillExpireText}>
                  {timeLeft >= 0
                    ? 'Your code will expire in'
                    : 'Your code is expired'}
                </Text>
                {timeLeft >= 0 && (
                  <Text style={styles.timerText}>{getTime()}</Text>
                )}

                {timeLeft <= 0 && (
                  <TouchableOpacity
                    style={styles.generateCodeBtnStyle}
                    onPress={() => {
                      apiGenerateCode();
                    }}
                  >
                    <Text style={styles.generateCodeBtnText}>
                      Generate Code
                    </Text>
                  </TouchableOpacity>
                )}

                {timeLeft >= 0 && (
                  <>
                    <Text style={styles.instructionsText}>Instructions : </Text>

                    <Text style={styles.presentThisCodeText}>
                      Present this code at the Visitor's Desk to claim your
                      reward.
                    </Text>
                  </>
                )}
              </View>
              <View style={{paddingBottom: '2%'}}>
                <FooterNote />
              </View>
            </ScrollView>
          </>
        )}
        <CModalForProfile
          isVisible={copyModal}
          modalMsg={'Voucher code copied sucessfully.'}
          onPressModal={() => setCopyModal(!copyModal)}
          isForm={'Signup'}
        />
        <CModal
          isVisible={ShowErrorModal}
          modalMsg={ErrorModalMessage}
          onPressModal={() => setShowErrorModal(!ShowErrorModal)}
          isForm={'Signup'}
        />
      </RootView>
    </>
  );
};

export default GenerateRewardCode;

// Customizable Area Start

////// Footer notes
const styles = StyleSheet.create({
  linergradientwrapper: {
    position: 'absolute',
    bottom: 0,
    width: dimensions.wp(90),
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderTopEndRadius: 10,
    borderBottomStartRadius: 10,
    overflow: 'hidden',
  },
  linergradientinner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,

    borderWidth: 0,
    borderColor: R.themes.boxBackgroundColour,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: R.colors.lightCardGray,
  },
  infoicon: {
    height: 15,
    width: 15,
    marginHorizontal: 5,
    resizeMode: 'contain',
    tintColor: R.themes.boxBackgroundColour,
  },
  cardSubtitle: {
    fontSize: horizontalScale(12),
    fontFamily: R.fonts.primaryRegular,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 15,
    textAlign: 'left',
    width: '100%',
    flexWrap: 'wrap',
    color: R.colors.primaryGrey,
  },
  footermaskSubtext: {
    textDecorationLine: 'underline',
    fontFamily: R.fonts.primaryBold,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
    textAlign: 'left',
    letterSpacing: 0,
  },
  ////// Footer notes end here
  container: {
    flex: 1,
    backgroundColor: R.themes.backgroundColor,
  },
  generateCodeBtnStyle: {
    width: R.dimensions.wp('80%'),
    height: R.dimensions.hp('6.5%'),
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#4CBB17',
    flexDirection: 'row',
    marginTop: R.dimensions.hp('2%'),
    alignSelf: 'center',
    margin: 20,
  },
  generateCodeBtnText: {
    fontFamily: R.fonts.primaryBold,
    fontSize: horizontalScale(16),
    color: R.themes.backgroundColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerLogoViewSty: {alignItems: 'center', justifyContent: 'center'},

  createPasswordTitleTxtSty: {
    marginHorizontal: R.dimensions.wp('5%'),
  },
  cardStyle: {
    elevation: 5,
    backgroundColor: R.themes.backgroundColor,

    width: R.dimensions.wp('92%'),
    borderRadius: 10,

    overflow: 'hidden',
  },

  coinImage: {
    width: R.dimensions.wp(4),
    height: R.dimensions.hp(2.5),
    alignSelf: 'center',
  },
  expireText: {
    fontSize: R.dimensions.hp('1.3%'),
    fontFamily: R.fonts.primaryRegular,
    color: R.colors.primaryBrand2,
  },
  rupeesText: {
    color: R.colors.primaryBrand2,
    fontSize: R.dimensions.hp('2.5%'),

    fontFamily: R.fonts.primaryBrand2,
  },
  giftVouText: {
    fontSize: R.dimensions.hp('2.2%'),
    fontFamily: R.fonts.primaryBold,
    color: R.colors.primaryBrand2,
  },
  expDate: {
    fontSize: R.dimensions.hp('1.6%'),
    color: R.colors.primaryBrand2,
  },

  linearGradient: {
    width: R.dimensions.wp('2%'),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  box: {
    height: R.dimensions.hp('3%'),
    width: R.dimensions.wp('25%'),
    backgroundColor: R.themes.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: R.dimensions.hp('1.8'),
    fontFamily: R.fonts.primaryMed,
    color: R.themes.backgroundColor,
    textAlign: 'center',
    marginLeft: R.dimensions.hp('2'),
  },
  VoucherCardContainer: {
    flex: 1,
    width: R.dimensions.wp(90),
    height: R.dimensions.hp('20%'),
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: R.themes.boxBackgroundColour,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 10,
    flexDirection: 'row',
  },
  VerticalTextContainer: {
    transform: [{rotate: '270deg'}],
    alignSelf: 'flex-start',
  },
  VerticalText: {
    color: R.themes.accountTextColour,
    fontWeight: 'bold',
    fontSize: 25,
  },
  VerticalTextValue: {
    color: R.themes.accountTextColour,
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
  dotedBorder: {
    width: 1,
    height: R.dimensions.hp('20%'),
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 1,
    borderColor: '#CD44B7',
  },
  giftvoucherContainer: {
    marginLeft: 10,
    justifyContent: 'space-around',
    flex: 1,
    height: R.dimensions.hp('20%'),
  },
  giftVoucherText: {
    fontSize: 14,
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryBold,
    marginTop: 10,
  },
  expiresOnText: {
    fontSize: 10,
    color: R.themes.accountTextColour,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  expireOnSubText: {fontSize: 12, fontFamily: R.dimensions.primaryBold},
  termandconditionText: {
    fontSize: 10,
    color: R.themes.accountTextColour,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    width: R.dimensions.wp(90),
    alignSelf: 'center',
    marginTop: '10%',
    borderRadius: 16,
    borderColor: R.themes.boxBackgroundColour,
    borderWidth: 1,
    overflow: 'visible',
    paddingBottom: '5%',
  },
  abouttheVoucherContainer: {
    alignItems: 'center',
    padding: 15,
    width: R.dimensions.wp(65),
    alignSelf: 'center',
    borderRadius: 6,
    borderColor: R.themes.boxBackgroundColour,
    borderWidth: 1,
    top: -30,
    backgroundColor: R.themes.backgroundColor,
  },
  abouttheVoucherText: {
    color: R.themes.accountTextColour,
    fontSize: 16,
    fontWeight: 'bold',
  },
  useThisCodeText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(13),
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  yourRewardCodeText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(13),
    margin: 10,
    fontWeight: 'bold',
  },

  voucherMaskcontainer: {
    //alignSelf: 'center',
    marginHorizontal: '5%',
    paddingVertical: 5,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderColor: R.themes.boxBackgroundColour,
    borderWidth: 2,
    borderRadius: 10,
    borderStyle: 'dashed',
  },
  voucherMaskText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(20),
    margin: '5%',
    fontWeight: 'bold',
    letterSpacing: 20,
  },
  yourCodeWillExpireText: {
    color: R.colors.black,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(16),
    margin: '5%',
    textAlign: 'center',
  },
  timerText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(30),
    margin: '2%',
    textAlign: 'center',
  },

  instructionsText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(13),
    marginTop: 10,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },

  presentThisCodeText: {
    color: R.themes.accountTextColour,
    fontFamily: R.dimensions.primaryRegular,
    fontSize: horizontalScale(13),
    marginTop: 5,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },

  FooterMask: {
    width: dimensions.wp(90),
    height: 60,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  infoIcon: {
    height: 25,
    width: 25,
    marginHorizontal: 5,
    resizeMode: 'contain',
  },
  footerMastText: {
    fontSize: horizontalScale(12),
    // fontFamily: R.fonts.primaryRegular,
    width: R.dimensions.wp(75),
    color: R.themes.backgroundColor,
    flexWrap: 'wrap',
  },
  footerMastSubText: {
    textDecorationLine: 'underline',
    fontFamily: R.fonts.primaryBold,
  },
});
