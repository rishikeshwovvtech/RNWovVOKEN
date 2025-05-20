import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//local import
import R from '../../../R';
import styles from './SmartParkingStyle';
import {AuthContext} from '../../../context/auth/AuthContext';
import {RootView, Loader, CModal, BackHeader} from '../../../components/index';
import {BASE_URL} from '../../../utils/Constants';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import SubHeader from '../../../components/SubHeader';

export const SmartParking = ({navigation}) => {
  const [data, setdata] = useState([]);
  const [ShowLoader, setShowLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const {authAction, authState} = useContext(AuthContext);

  useFocusEffect(
    React.useCallback(() => {
      if (authState?.mallDetails?.oko_Row_Code != null) {
      fetchLevelApi();
      }
    }, [authState?.mallDetails?.oko_Row_Code]),
  );

  const fetchLevelApi = () => {
    var data = JSON.stringify({
      entityName: 'level',
      action: 'payload',
      pageUrl: 'FetchLevelDetails',
      event: 'replaceWithAuth',
      formList: [
        {
          branch_Code: authState?.mallDetails?.oko_Row_Code,
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
        pageUrl:'FetchLevelDetails',
        event:'ChooseFloorScreen',
        action:'onLoadFloorDetails'
      },
      data: data,
    };
    setShowLoader(true);
   fetchApiService(config, authAction,authState)
      .then((response) => {
        setShowLoader(false);

        var highlight = response?.data?.data?.Parking_Unit_Status;
        setdata(highlight);
      })
      .catch((error) => {
        setShowLoader(false);
      });
  };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Choose Floor'} />
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
              onPress={() => {
                navigation.navigate('SmartParkingTwo', {selectedFloor: item});
              }}
            >
              {/* <View style={{flexDirection: 'row'}}>
                <Image
                  source={R.images.parking}
                  style={styles.imageContainer}
                  resizeMode={'cover'}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.floorText}>
                    {(item?.level_desc).replace(' ', '\n')}
                  </Text>
                </View>
              </View> */}
              <Text style={styles.cardText}>{item?.level_desc}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(index) => index.toString()}
        />
        {isModalVisible ? (
          <CModal
            isVisible={isModalVisible}
            isForm={true}
            modalMsg={'Please select floor'}
            onPressModal={() => setModalVisible(false)}
          />
        ) : null}
      </RootView>
    </>
  );
};
