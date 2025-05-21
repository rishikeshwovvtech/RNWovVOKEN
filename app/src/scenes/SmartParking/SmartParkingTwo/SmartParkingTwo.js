import React, {useState, useContext} from 'react';
import {Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
//local import
import R from '../../../R';
import styles from './SmartParkingTwoStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {RootView, Loader, CModal, BackHeader} from '../../../components/index';
import {BASE_URL} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import SubHeader from '../../../components/SubHeader';

export const SmartParkingTwo = ({route, navigation}) => {
  const {selectedFloor} = route.params;
  const {authAction, authState} = useContext(AuthContext);
  const [ShowLoader, setShowLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setdata] = useState(['']);

  useFocusEffect(
    React.useCallback(() => {
      if (authState?.mallDetails?.oko_Row_Code != null) {
      fetchZoneApi();
      }
    }, [authState?.mallDetails?.oko_Row_Code]),
  );

  const fetchZoneApi = () => {
    var data = JSON.stringify({
      entityName: 'zone',
      action: 'payload',
      pageUrl: 'FetchZoneDetails',
      event: 'replaceWithAuth',
      formList: [
        {
          level_code: selectedFloor.level_code,
          parking_unit_status: '1',
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
        pageUrl:'FetchZoneDetails',
        event:'ChooseZoneScreen',
        action:'onLoadZoneDetails'
      },
      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then((response) => {
        setShowLoader(false);
        setdata(response?.data?.data?.Parking_Unit_Status);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Choose Zone'} />
      <RootView>
        <Loader isVisible={ShowLoader} />
        <Image
          source={R.images.parking}
          style={styles.imageContainer}
          resizeMode={'cover'}
        />
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          contentContainerStyle={{padding: '5%', paddingBottom: '15%'}}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.mainCardContainer}
              onPress={() =>
                navigation.navigate('SmartParkingThree', {
                  selectedFloor: route?.params.selectedFloor,
                  selectedZone: item,
                })
              }
            >
              <Text style={styles.cardText}>{item.level_zone_desc}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        {isModalVisible ? (
          <CModal
            isVisible={isModalVisible}
            isForm={true}
            modalMsg={'Please select Zone'}
            onPressModal={() => setModalVisible(false)}
          />
        ) : null}
      </RootView>
    </>
  );
};
