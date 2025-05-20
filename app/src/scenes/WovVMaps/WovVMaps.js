import React, {useContext, useEffect, useState} from 'react';
import {Image, Modal, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Text, View} from 'react-native';
import WebView from 'react-native-webview';
import {
  Card,
  CModal,
  MainHeader,
  RootView,
  SimpleButton,
} from '../../components/index';
import {
  WOVVMAPS_API_BASE_URL,
  WOVVMAPS_BASE_URL,
  WOVVMAPS_SIT_PROD,
} from '../../utils/Constants';
import {WovVMapsContext} from './WovvMapsContext';
import R from '../../R';
import {AuthContext} from '../../context/auth/AuthContext';
import WovVMapsStyles from './WovVMapsStyles';
import axios from 'axios';
import {socket} from '../../utils/Socket';
import checkInternetStatus from '../../internetconnection/inConnectionOn';
import {useFocusEffect} from '@react-navigation/native';
import {ScreenAnalytics} from '../../components/Analytics/ScreenAnalytics';
import {CTA_firebaseAnalytics} from '../../components/Analytics/CTAAnalytics';

export const WovVMaps = ({navigation, route}) => {
  const isbrandid = route?.params?.brandid;
  //console.log('🚀 ~ file: WovVMaps.js:30 ~ WovVMaps ~ isbrandid:', isbrandid);
  const {authState} = useContext(AuthContext);
  const {
    mapsData,
    setMapsData,
    socketId,
    setSocketId,
    destination,
    setDestination,
    setDeparture,
    currentFloor,
    setCurrentFloor,
    directionData,
    setdirectionData,
    showDetailCard,
    setShowDetailCard,
    floorIndex,
    setfloorIndex,
    floorArray,
    setfloorArray,
  } = useContext(WovVMapsContext);
  const [showLoader, setShowLoader] = React.useState(true);
  const [showEllipseMode, setshowEllipseMode] = React.useState(false);
  const [showFloorSlection, setShowFloorSlection] = React.useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const CleverTap = require('clevertap-react-native');

  useEffect(() => {
    CleverTap.recordEvent('Maps Viewed', {'Maps Opened': 'Yes'});
    ScreenAnalytics('Maps', authState?.userToken, authState?.userId)
      .then((res) => {})
      .catch((e) => {});
    return () => {
      resetMaps();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      internetCheck();
    }, []),
  );

  useEffect(() => {
    if (socketId != undefined && socketId != 'offline' && socketId != null) {
      getMapsData(socketId);
      socketEvent();
    }
  }, [socketId]);

  const socketEvent = () => {
    socket.on(`endpointrecive${socketId}`, (data) => {
      setDestination(data.point);
      const locationName = data.point.LocationName.text;
      CleverTap.recordEvent('Maps Viewed', {
        'Location Viewed': locationName,
      });
      CTA_firebaseAnalytics(
        'Mall_Map_Store',
        'WovvMaps',
        authState?.userToken,
        authState?.userId,
        authState?.mallDetails?.oko_Row_Desc,
        data.point?.LocationName?.text,
      )
        .then((res) => {})
        .catch((e) => {});

      setShowDetailCard(true);
      setdirectionData(null);
    });
  };

  const internetCheck = () => {
    checkInternetStatus().then((isWorking) => {
      if (!isWorking) {
        setShowLoader(false);
        navigation.navigate('NewInternetScreen');
      }
    });
  };

  const handlePreviousStep = () => {
    socket.emit('nextandpre', {id: socketId, data: 'pre'});
    setfloorIndex(floorIndex - 1);

    for (var i = 0; i <= mapsData?.FloorImg.length; i++) {
      setCurrentFloor(
        mapsData?.FloorImg[floorArray[floorIndex - 1]]?.ShortName,
      );
    }
  };

  const handleNextStep = () => {
    socket.emit('nextandpre', {id: socketId, data: 'next'});
    setfloorIndex(floorIndex + 1);
    for (var i = 0; i <= mapsData?.FloorImg.length; i++) {
      setCurrentFloor(
        mapsData?.FloorImg[floorArray[floorIndex + 1]]?.ShortName,
      );
    }
  };

  const getMapsData = (id) => {
    if (id != undefined) {
      axios.get(WOVVMAPS_API_BASE_URL + 'user/' + id).then((res) => {
        res?.data?.user?.FloorImg?.map((f, i) => {
          if (f.FloorNumber == 0) {
            setCurrentFloor(f.ShortName);
          }
        });

        if (isbrandid != null) {
          var test = [...res?.data?.user?.filterNodePoint];
          var filteredArray = test?.filter((a) => a.type == 'Amenities');
          var filteredArray = test?.filter((a) =>
            WOVVMAPS_SIT_PROD == 'sit'
              ? a.brand_Id?.sit == isbrandid
              : a.brand_Id?.pro == isbrandid,
          );
          // console.log(
          //   '🚀 ~ file: WovVMaps.js:147 ~ axios.get ~ filteredArray:',
          //   filteredArray,
          // );
          if (filteredArray.length != 0) {
            var d = filteredArray[0];
            setDestination(d);
            setShowDetailCard(true),
              socket.emit('endpointsend', {
                id: id,
                data: `${d.x},${d.y},${d.z}`,
              }),
              res?.data?.user?.FloorImg.map((f, i) => {
                if (i == d.z) {
                  setCurrentFloor(f.ShortName);
                }
              });

            setShowLoader(false);
          } else {
            setShowLoader(false);
            setShowDetailCard(false);
            setErrorModalMessage('path not found');
            setShowErrorModal(true);
          }
        }
        setMapsData(res?.data?.user);
        setShowLoader(false);
      });
    }
  };
  const resetMaps = () => {
    socket.emit('killpath', {id: socketId});
    setSocketId(null);
    setfloorArray([]);
    setfloorIndex(0);
    setDestination(null);
    setDeparture(null);
    setShowDetailCard(false);
    setdirectionData(null);
  };
  const handleEndStep = () => {
    socket.emit('killpath', {id: socketId});
    setfloorArray([]);
    setfloorIndex(0);
    setDestination(null);
    setDeparture(null);
    setShowDetailCard(false);
    setdirectionData(null);
  };
  const GetDirectionCardView = () => {
    return (
      <Card bottom={0}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            source={{uri: destination?.logo?.url}}
            style={WovVMapsStyles.img}
            resizeMode="contain"
          />

          <View
            style={{
              width: '75%',
            }}
          >
            <Text style={WovVMapsStyles.nameTxt}>
              {destination?.LocationName?.text}
            </Text>
            {showEllipseMode ? (
              <Text style={WovVMapsStyles.descTxt}>
                {destination?.Description}
              </Text>
            ) : (
              <Text
                ellipsizeMode="tail"
                numberOfLines={2}
                style={WovVMapsStyles.descTxt}
              >
                {destination?.Description}
              </Text>
            )}

            {destination?.Description &&
              destination?.Description.length > 40 && (
                <TouchableOpacity
                  onPress={() => setshowEllipseMode(!showEllipseMode)}
                >
                  {showEllipseMode ? (
                    <Text
                      style={{
                        fontSize: R.dimensions.hp('1.5%'),
                        color: R.themes.boxBackgroundColour,
                        paddingBottom: '10%',
                        fontFamily: R.fonts.primaryRegular,
                      }}
                    >
                      Less
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: R.dimensions.hp('1.5%'),
                        color: R.themes.boxBackgroundColour,
                        paddingBottom: '10%',
                        fontFamily: R.fonts.primaryRegular,
                      }}
                    >
                      More
                    </Text>
                  )}
                </TouchableOpacity>
              )}
          </View>
        </View>

        <TouchableOpacity
          style={WovVMapsStyles.getdirTouchable}
          onPress={() => {
            CTA_firebaseAnalytics(
              'popup_get_directions_Clicked',
              'WovvMaps',
              authState?.userToken,
              authState?.userId,
              authState?.mallDetails?.oko_Row_Desc,
              destination?.LocationName?.text,
            )
              .then((res) => {})
              .catch((e) => {});
            navigation.navigate('WovvMapsDirections');
            setdirectionData(null);
            setDeparture(null);
            setShowDetailCard(false);
          }}
        >
          <Text style={WovVMapsStyles.getdirText}>Get Directions</Text>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <>
      <MainHeader navigation={navigation} isFromDrawer={true} />
      <RootView>
        <View style={{paddingHorizontal: '3%', marginVertical: '5%'}}>
          {!showLoader && mapsData && (
            <>
              <TouchableOpacity
                style={WovVMapsStyles.searchbar}
                onPress={() => {
                  navigation.navigate('WovVMapSearch', {
                    isDeparture: false,
                    isHome: true,
                  });
                }}
              >
                <Image
                  source={R.images.search_double}
                  style={{
                    height: R.dimensions.wp(6),
                    width: R.dimensions.wp(6),
                  }}
                  resizeMode="contain"
                />
                {destination ? (
                  <Text
                    style={{
                      marginStart: '5%',
                      width: '90%',
                      color: R.themes.accountTextColour,
                    }}
                  >
                    {destination?.LocationName?.text}
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginStart: '5%',
                      width: '90%',
                      color: R.themes.accountTextColour,
                      fontFamily: R.fonts.primaryItalic,
                      alignSelf: 'center',
                    }}
                  >
                    Search for Brands, Amenities or Parking
                  </Text>
                )}
                <View
                  style={{
                    alignSelf: 'center',
                    paddingHorizontal: 15,
                  }}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={{flex: 6}}>
          <WebView
            useWebKit={true}
            style={{flex: 1}}
            source={{
              uri: `${WOVVMAPS_BASE_URL}/?v=2&d=m&m=${authState?.mallDetails?.oko_Row_Code}`,
            }}
            renderLoading={() => (
              <ActivityIndicator
                style={{
                  alignSelf: 'center',
                  alignContent: 'center',
                  width: 20,
                  marginBottom: '100%',
                  borderRadius: 20,
                }}
                color={R.themes.borderColor}
                size="small"
              />
            )}
          
           
            startInLoadingState={true}
            onNavigationStateChange={({url}) => {
              if (url.includes('&id')) {
                setSocketId(url.split('&id=')[1]);
              }
            }}
            onLoadProgress={({nativeEvent}) => {
              if (nativeEvent.url.includes('&id')) {
                setSocketId(nativeEvent.url.split('&id=')[1]);
              }
            }}
            domStorageEnabled={true}
            onError={(syntheticEvent) => {
              internetCheck();
            }}
          />

          {!showLoader && mapsData && (
            <View style={WovVMapsStyles.currentfloor}>
              <Text
                style={{
                  fontFamily: R.fonts.primaryRegular,
                  fontWeight: '400',
                  fontSize: 16,
                  lineHeight: 20,
                }}
              >
                Choose Floor
              </Text>
              <TouchableOpacity
                onPress={() => setShowFloorSlection(true)}
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  paddingHorizontal: 5,
                  borderRadius: 15,
                  alignSelf: 'flex-end',
                }}
              >
                <View style={WovVMapsStyles.currentfloorstyle}>
                  <Text style={WovVMapsStyles.currentfloortextstyle}>
                    {currentFloor}
                  </Text>
                  <Image
                    source={R.images.DownArrow}
                    style={{
                      width: 10,
                      height: 10,
                      resizeMode: 'contain',
                      marginHorizontal: 5,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {!showLoader && directionData != null && (
            <View style={WovVMapsStyles.resetstyle}>
              <TouchableOpacity
                onPress={() => {
                  resetMaps();
                }}
                style={{
                  backgroundColor: R.themes.darkButtonColor,
                  padding: 10,
                  borderRadius: 100,
                }}
              >
                <Image
                  resizeMode="contain"
                  source={R.images.mapsReset}
                  style={WovVMapsStyles.resetimage}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Modal visible={showFloorSlection} transparent animationType="fade">
          <TouchableOpacity
            onPress={() => {
              setShowFloorSlection(false);
            }}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                borderRadius: 10,
                backgroundColor: '#fff',
                padding: '5%',
                width: '80%',
              }}
            >
              {mapsData?.FloorImg?.map((f, i) => {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomColor: R.themes.boxBackgroundColour,
                      borderBottomWidth:
                        i == mapsData?.FloorImg.length - 1 ? 0 : 1.4,
                      paddingVertical: '1.5%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: '1%',
                    }}
                    onPress={async () => {
                      socket.emit('floorchange', {id: socketId, number: i});
                      await CTA_firebaseAnalytics(
                        'Mall_Floor',
                        'WovvMaps',
                        authState?.userToken,
                        authState?.userId,
                        authState?.mallDetails?.oko_Row_Desc,
                        '',
                        'Floor : ' + f.FloorName,
                      )
                        .then((res) => {})
                        .catch((e) => {});
                      setShowFloorSlection(false);
                      setCurrentFloor(f.ShortName);
                      setDestination(null);
                      setDeparture(null);
                      setShowDetailCard(false);
                    }}
                  >
                    <Text>{f.FloorName}</Text>
                    <Text>{f.ShortName}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableOpacity>
        </Modal>

        {showDetailCard && (
          <View style={{paddingBottom: 20}}>
            <GetDirectionCardView />
          </View>
        )}
        {directionData && (
          <View style={{paddingBottom: 20}}>
            <Card bottom={0}>
              <View style={{flexDirection: 'row'}}>
                {floorIndex != 0 && (
                  <View style={{flex: 1, margin: '2%'}}>
                    <SimpleButton
                      title={'Previous Step'}
                      customStyle={WovVMapsStyles.nextCardbtn}
                      onPress={() => handlePreviousStep()}
                    />
                  </View>
                )}
                {floorIndex != floorArray.length - 1 && (
                  <View style={{flex: 1, margin: '2%'}}>
                    <SimpleButton
                      title={'Next Step'}
                      customStyle={WovVMapsStyles.nextCardbtn}
                      onPress={() => handleNextStep()}
                    />
                  </View>
                )}
                {floorIndex == floorArray.length - 1 && (
                  <View style={{flex: 1, margin: '2%'}}>
                    <SimpleButton
                      title={'End Trip'}
                      customStyle={WovVMapsStyles.nextCardbtn}
                      onPress={() => handleEndStep()}
                    />
                  </View>
                )}
              </View>
            </Card>
          </View>
        )}
        <Modal visible={showLoader} animationType="fade" transparent={true}>
          <View style={WovVMapsStyles.mainloaderview}>
            <View style={WovVMapsStyles.Activityindicatorview}>
              {/* <ActivityIndicator
                size={'large'}
                color={R.themes.boxBackgroundColour}
              />
              <Text style={WovVMapsStyles.ActivityindicatorText}>Loading</Text> */}
              <Image
                source={R.images.loaderNexus}
                style={{width: 65, height: 65}}
              />
            </View>
          </View>
        </Modal>

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
