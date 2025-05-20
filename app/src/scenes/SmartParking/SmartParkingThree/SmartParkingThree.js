import React, {useState, useContext} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {StackActions, useFocusEffect} from '@react-navigation/native';
//local imports
import R from '../../../R';
import styles from './SmartParkingThreeStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {RootView, Loader, CModal, BackHeader} from '../../../components/index';
import {BASE_URL} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import SubHeader from '../../../components/SubHeader';
import {CTA_firebaseAnalytics} from '../../../components/Analytics/CTAAnalytics';
import {Alert} from 'react-native';

export const SmartParkingThree = ({route, navigation}) => {
  const {selectedFloor, selectedZone} = route.params;
  const {authState, authAction} = useContext(AuthContext);

  const [ShowLoader, setShowLoader] = useState(false);
  const [data, setdata] = useState(['']);
  const [isModalVisible, setModalVisible] = useState(false);
  const [spotData, setSpotData] = useState(null);
  const [isAlertModalVisible, setAlertModalVisible] = useState(false);
  let timeid;
  useFocusEffect(
    React.useCallback(() => {
      if (authState?.mallDetails?.oko_Row_Code != null) {
      fetchParkingApi();
      }
      return () => clearTimeout(timeid);
    }, [authState?.mallDetails?.oko_Row_Code]),
  );

  const fetchParkingApi = () => {
    var data = JSON.stringify({
      entityName: 'parking',
      action: 'payload',
      pageUrl: 'FetchParkingStatus',
      event: 'replaceWithAuth',
      formList: [
        {
          branch_code: authState?.mallDetails?.oko_Row_Code,
          level_code: selectedFloor.level_code,
          level_zone_code: selectedZone.level_zone_code,
          parking_unit_status: 1,
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
        pageUrl:'FetchParkingStatus',
        event:'ChooseSpotNoScreen',
        action:'onLoadSpotNoDetails'
      },
      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then(function (response) {
        setShowLoader(false);

        let employees = response?.data?.data?.Parking_Unit_Status;
        employees = employees?.sort(function (a, b) {
          return a.spot_numer?.localeCompare(b.spot_numer, undefined, {
            numeric: true,
            sensitivity: 'accent',
          });
        });
        setdata(employees);
      })
      .catch(function (error) {
        setShowLoader(false);
      });
  };

  const storeData = async (item) => {
    var parkInfo =
      selectedFloor.level_desc +
      ', ' +
      selectedZone.level_zone_desc +
      ', ' +
      item.spot_numer;

    var parkingWid = selectedZone.level_zone_code;
    if (parkingWid == null && parkingWid == '' && parkingWid == undefined) {
      parkingWid = '';
    }
    setShowLoader(true);
    try {
      if (parkInfo != null || parkInfo != '' || parkInfo != undefined) {
        let parkingDetailsArray = authState?.parkingDetails;

        if (parkingDetailsArray == null) {
          parkingDetailsArray = [
            {
              mallCode: authState?.mallDetails?.oko_Row_Code,
              parkingInfo: parkInfo,
              parkingWId: parkingWid,
              parkingTime: Date.now(),
            },
          ];
        } else {
          arrayIndex = parkingDetailsArray.findIndex(
            (x) => x.mallCode == authState?.mallDetails?.oko_Row_Code,
          );
          if (arrayIndex != -1) {
            parkingDetailsArray[arrayIndex].parkingInfo = parkInfo;
            parkingDetailsArray[arrayIndex].parkingWId = parkingWid;
            parkingDetailsArray[arrayIndex].parkingTime = Date.now();
          } else {
            parkingDetailsArray.push({
              mallCode: authState?.mallDetails?.oko_Row_Code,
              parkingInfo: parkInfo,
              parkingWId: parkingWid,
              parkingTime: Date.now(),
            });
          }
        }

        var userInfo = {
          ...authState,
          parkingDetails: parkingDetailsArray,
        };
        await authAction.setData(userInfo);
        analyticsdata(item);
        timeid = setTimeout(() => {
          setShowLoader(false);
          setModalVisible(!isModalVisible);
        }, 1500);
      } else {
        Alert.alert('', 'Please wait for few minutes before you try again');
      }
    } catch (e) {
      setShowLoader(false);
    }
  };

  const analyticsdata = async (item) => {
    await analytics().logEvent(`carparking_data`, {
      mallName: authState?.mallDetails?.oko_Row_Desc,
      spotnumber:
        selectedFloor.level_desc +
        ', ' +
        selectedZone.level_zone_desc +
        ', ' +
        item.spot_numer,
    });
  };

  const onPressHandler = (item) => {
    setSpotData(item);
    storeData(item);
  };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Choose Spot No'} />
      <RootView>
        <Image
          source={R.images.parking}
          style={styles.imageContainer}
          resizeMode={'cover'}
        />
        <Loader isVisible={ShowLoader} />
        {isModalVisible
          ? (CTA_firebaseAnalytics(
              'Mark_Spot',
              'Mark_Spot_Screen',
              authState?.userToken,
              authState?.userId,
              authState?.mallDetails?.oko_Row_Desc,
              '',
              selectedFloor.level_desc +
                ', ' +
                selectedZone.level_zone_desc +
                ', ' +
                spotData.spot_numer,
            )
              .then((res) => {})
              .catch((e) => {}),
            (
              <CModal
                isVisible={isModalVisible}
                isForm={true}
                modalMsg={
                  selectedFloor.level_desc +
                  ', ' +
                  selectedZone.level_zone_desc +
                  ', ' +
                  spotData.spot_numer +
                  '\n' +
                  'Your Vehicle Parked Successfully'
                }
                onPressModal={() =>
                  navigation.dispatch(StackActions.popToTop())
                }
              />
            ))
          : null}

        {isAlertModalVisible ? (
          <CModal
            isVisible={isAlertModalVisible}
            isForm={true}
            modalMsg={'Please Select Spot No'}
            onPressModal={() => setAlertModalVisible(false)}
          />
        ) : null}

        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={3}
          contentContainerStyle={{padding: '5%', paddingBottom: '15%'}}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.mainCardContainer}
              onPress={() => onPressHandler(item)}
            >
              <Text style={styles.cardText}>{item.spot_numer}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </RootView>
    </>
  );
};
