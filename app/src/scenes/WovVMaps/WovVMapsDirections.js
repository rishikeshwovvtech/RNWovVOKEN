import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Switch,
} from 'react-native';
import {RootView, BackHeader, SimpleButton, CModal} from '../../components';
import R from '../../R';
import Icon from 'react-native-remix-icon';
import styles from './../Home/HomeStyle';
import {Image} from 'react-native';
import {WovVMapsContext} from './WovvMapsContext';
import WovVMapsStyles from './WovVMapsStyles';
import {socket} from '../../utils/Socket';

import {AuthContext} from '../../context/auth/AuthContext';
import {CTA_firebaseAnalytics} from '../../components/Analytics/CTAAnalytics';
import analytics from '@react-native-firebase/analytics';
import SubHeader from '../../components/SubHeader';

export const WovvMapsDirections = ({navigation}) => {
  const {authState} = useContext(AuthContext);

  const {
    setCurrentFloor,
    socketId,
    destination,
    setDestination,
    departure,
    setDeparture,
    directionData,
    setdirectionData,
    isAvoidtrairAndEscalator,
    setIsAvoidtrairAndEscalator,
    setShowDetailCard,
    setfloorArray,
    mapsData,
  } = useContext(WovVMapsContext);
  const [ShowLoader, setShowLoader] = useState(false);
  const [SelectedPath, setSelectedPath] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const onSwap = () => {
    let newDestination = departure;
    let newDeparture = destination;
    if (directionData != null) {
      getDirections(isAvoidtrairAndEscalator, newDeparture, newDestination);
    }
    setDeparture(newDeparture);
    setDestination(newDestination);
  };

  const getDirectionfloorarray = () => {
    setShowDetailCard(false);
    setSelectedPath(false);
    navigation.goBack();
  };

  const getDirections = async (isOn, depart, desti) => {
    if (depart == undefined) {
      setErrorModalMessage('Choose starting point');
      setShowErrorModal(true);
    } else if (desti == undefined) {
      setErrorModalMessage('Choose end point');
      setShowErrorModal(true);
    } else {
      setShowLoader(true);

      let pointType = {elevator: !isOn, escalator: isOn, stair: isOn};
      let raw = {
        start: {x: depart.x, y: depart.y, z: depart.z},
        end: {x: desti.x, y: desti.y, z: desti.z},
        stape: pointType,
      };

      socket.emit(`findpath`, {raw, id: socketId});
      socket.once(`findpath${socketId}`, async (data) => {
        if (data == null) {
          setErrorModalMessage('Path not found, please use the elevator!');
          setShowErrorModal(true);
        } else {
          let isLoggedIn = true;
          if (authState?.userToken == null || authState?.userToken == '') {
            isLoggedIn = false;
          } else {
            isLoggedIn = true;
          }

          await analytics()
            .logEvent('wayfinding_event', {
              user_ID: authState?.userId,
              mall_name: authState?.mallDetails?.oko_Row_Desc,
              start_point: depart?.LocationName?.text,
              end_point: desti?.LocationName?.text,
              avoid_escalator: isOn,
              is_loggedIn: isLoggedIn,
            })
            .then((res) => {})
            .catch((e) => {});

          let steps = data?.StapeByStape;
          let newSteps = [];
          var prevnxt = null;
          if (data?.['StapeByStape'].length != 0) {
            prevnxt = AllFloor(data.path, mapsData.filterNodePoint);
            for (var j = 0; j < prevnxt.length; j++) {
              steps.forEach((d, i) => {
                if (i > 0) {
                  if (d?.floor == prevnxt[j]) {
                    newSteps.push(d);
                  }
                }
              });
            }
            setfloorArray(data?.['floorNumber']);
            setCurrentFloor(mapsData?.FloorImg[newSteps[0].floor].ShortName);
            setSelectedPath(true);
            setdirectionData(newSteps);
          } else {
            // getDirections(!isOn, depart, desti);
            setErrorModalMessage('Path not found, please use the elevator!');
            setShowErrorModal(true);
          }

          setShowLoader(false);
        }
      });
    }
  };

  function AllFloor(data, nodePoint) {
    let x = [];
    let type = [];

    data.forEach((d) => {
      let find = nodePoint.findIndex(
        (a) => a.x == d.x && a.y == d.y && a.z == d.z,
      );
      if (find) {
        if (nodePoint[find].type === 'Elevator') {
          type.push(d.z);
        }
      }
      x.push(d.z);
    });

    if (type.length > 0) {
      x = [];
      x.push(type[0]);
      x.push(type[type.length - 1]);
    }
    let uniq = new Set(x);
    return [...uniq];
  }

  const RenderNavigationItem = ({data}) => {
    let image = R.images.mapsLocation;
    if (data?.turn == 'left') {
      image = R.images.mapsTurnLeft;
    } else if (data.turn == 'right') {
      image = R.images.mapsTurnRight;
    } else if (data?.turn == 'Next Floor') {
      if (data?.type == 'Escalator') {
        if (data?.next == 'Up') {
          image = R.images.mapsEscalatorUp;
        } else {
          image = R.images.mapsEscalatorDown;
        }
      } else if (data?.type == 'Elevator') {
        image = R.images.mapsElevator;
      } else if (data?.type == 'Stair') {
        if (data?.next == 'Up') {
          image = R.images.mapsStairsUp;
        } else {
          image = R.images.mapsStairsDown;
        }
      }
    } else if (data?.turn == 'sida') {
      image = R.images.mapsStraight;
    } else {
      image = R.images.mapsLocation;
    }

    return (
      <View style={WovVMapsStyles.NavigationItemStyle}>
        <Image source={image} style={WovVMapsStyles.NavigationImageStyle} />
        <Text style={{color: R.themes.darkTextColor, marginLeft: '4%'}}>
          {data.text}
          {'\t'}
          {`(${Math.floor(data.dist)}m)`}
        </Text>
      </View>
    );
  };

  const handleBackPress = () => {
    navigation.goBack();
    socket.emit('killpath', {id: socketId});
    setDestination(null);
    setDeparture(null);
    setShowDetailCard(false);
    setdirectionData(null);
    setIsAvoidtrairAndEscalator(false);
    return true;
  };

  return (
    <>
      <BackHeader customOnPress={handleBackPress} navigation={navigation} />
      <SubHeader title={'Get Direction'} />

      <RootView>
        <View style={{flexDirection: 'column', flex: 1}}>
          <View style={{width: '95%', flex: 0.98}}>
            <View style={{flexDirection: 'row'}}>
              <View>
                <TouchableOpacity
                  style={styles.mainContainersStyle}
                  onPress={() => [
                    setdirectionData(null),
                    navigation.navigate('WovVMapSearch', {
                      isDeparture: true,
                      isHome: false,
                    }),
                  ]}
                >
                  <Text style={WovVMapsStyles.startpoint}>Start Point : </Text>

                  <Text style={WovVMapsStyles.startpointdep}>
                    {departure == undefined
                      ? 'Choose Starting Point'
                      : departure?.LocationName?.text}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.mainContainersStyle}
                  onPress={() => [
                    setdirectionData(null),
                    navigation.navigate('WovVMapSearch', {
                      isDeparture: false,
                      isHome: false,
                    }),
                  ]}
                >
                  <Text style={WovVMapsStyles.startpoint}>End Point : </Text>

                  <Text style={WovVMapsStyles.startpointdep}>
                    {destination == undefined
                      ? 'Choose destination Point'
                      : destination?.LocationName?.text}
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  end: 0,

                  position: 'absolute',
                  marginRight: '3%',
                }}
                onPress={() => onSwap()}
              >
                <Icon
                  name="ri-arrow-up-down-line"
                  size="25"
                  color={R.themes.darkCardBackgroundColor}
                />
              </TouchableOpacity>
            </View>

            <View style={WovVMapsStyles.Avoidstairsstyle}>
              <Text style={WovVMapsStyles.Avoidstairstextstyle}>
                Avoid stairs and escalators
              </Text>

              <Switch
                disabled={ShowLoader}
                trackColor={{
                  false: R.themes.switchOffColour,
                  true: R.themes.switchOffColour,
                }}
                thumbColor={R.themes.boxBackgroundColour}
                ios_backgroundColor={R.themes.switchOffColour}
                onValueChange={() => {
                  setIsAvoidtrairAndEscalator(!isAvoidtrairAndEscalator);
                  CTA_firebaseAnalytics(
                    'Avoid_Escalator_Option_Selected',
                    'WovvMapsSearch',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                    '',
                    'Avoid_Escalator : ' + !isAvoidtrairAndEscalator,
                  )
                    .then((res) => {})
                    .catch((e) => {}),
                    getDirections(
                      !isAvoidtrairAndEscalator,
                      departure,
                      destination,
                    );
                }}
                value={isAvoidtrairAndEscalator}
              />
            </View>
            {ShowLoader ? (
              <View style={WovVMapsStyles.mainloaderview}>
                <View style={WovVMapsStyles.Activityindicatorview}>
                  {/* <ActivityIndicator
                    size={'large'}
                    color={R.themes.boxBackgroundColour}
                  />
                  <Text style={WovVMapsStyles.ActivityindicatorText}>
                    Loading
                  </Text> */}
                  <Image
                    source={R.images.loaderNexus}
                    style={{width: 50, height: 50}}
                  />
                </View>
              </View>
            ) : null}
            {SelectedPath && (
              <ScrollView>
                <View style={{marginHorizontal: '5%', marginVertical: '5%'}}>
                  {directionData?.map((e, i) => (
                    <RenderNavigationItem data={e} index={i} />
                  ))}
                </View>
              </ScrollView>
            )}
          </View>

          <SimpleButton
            disabled={ShowLoader}
            title={directionData == null ? 'Get Direction' : 'View Route'}
            customStyle={{
              alignSelf: 'center',
              backgroundColor: R.themes.darkCardBackgroundColor,
              height: R.dimensions.hp('5%'),
              width: R.dimensions.wp('46%'),
            }}
            onPress={() => {
              directionData == null
                ? (CTA_firebaseAnalytics(
                    'Get_Directions_Applied',
                    'WovvMapsSearch',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                  )
                    .then((res) => {})
                    .catch((e) => {}),
                  getDirections(
                    isAvoidtrairAndEscalator,
                    departure,
                    destination,
                  ))
                : (CTA_firebaseAnalytics(
                    'View_Route_Button',
                    'WovvMapsSearch',
                    authState?.userToken,
                    authState?.userId,
                    authState?.mallDetails?.oko_Row_Desc,
                  )
                    .then((res) => {})
                    .catch((e) => {}),
                  getDirectionfloorarray());
            }}
          />
        </View>
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
