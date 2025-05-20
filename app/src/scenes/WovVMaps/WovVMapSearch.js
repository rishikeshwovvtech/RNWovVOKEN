import React, {useEffect, useState, useContext} from 'react';
import {View} from 'react-native';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import {RootView, BackHeader} from '../../components';
import {SearchInputComponent} from '../../components/SearchInputComponent';

import R from '../../R';

import {WovVMapsContext} from './WovvMapsContext';
import {socket} from '../../utils/Socket';
import WovVMapsStyles from './WovVMapsStyles';

import {AuthContext} from '../../context/auth/AuthContext';

import {CTA_firebaseAnalytics} from '../../components/Analytics/CTAAnalytics';
import SubHeader from '../../components/SubHeader';
import {Image} from 'react-native';
export const WovVMapSearch = ({navigation, route}) => {
  const CleverTap = require('clevertap-react-native');

  const {authState} = useContext(AuthContext);

  const {
    mapsData,
    socketId,
    setDestination,
    setDeparture,
    setCurrentFloor,
    setShowDetailCard,
    setdirectionData,
    isClicked,
    setisClicked,
  } = useContext(WovVMapsContext);
  const {isDeparture, isHome} = route.params;
  const [data, setData] = useState(null);
  const [dataCopy, setDataCopy] = useState(null);
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    let x = mapsData?.filterNodePoint?.filter((d) => {
      if (d?.LocationName) {
        let find1 = d?.LocationName?.text;
        find1 = find1.toLowerCase().trim();
        if (find1 != '') {
          return d;
        }
      }
    });
    // let y = [...new Set(i.map(item=>item?.LocationName))];
    let y = x.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) => t.LocationName.text.trim() === value.LocationName.text.trim(),
        ),
    );
    y.sort((a, b) =>
      a.LocationName.text.trim().localeCompare(b.LocationName.text.trim()),
    );
    setData([...y]);
    setDataCopy([...y]);
  }, []);

  const handleSearch = (text) => {
    if (text == '' || text == null) {
      setData([...dataCopy]);
      return;
    } else if (text.length > 0) {
      let val = text.toLowerCase().trim();
      let x = dataCopy.filter((d) => {
        if (d?.shape && d?.LocationName) {
          let find1 = d?.LocationName
            ? d.LocationName.text.trim()
            : `grid[${d.x}][${d.y}][${d.z}]`;
          find1 = find1.toLowerCase();
          if (find1?.match(val)) {
            return d;
          }
        }
      });
      x.sort((a, b) =>
        a.LocationName.text.trim().localeCompare(b.LocationName.text.trim()),
      );
      setData([...x]);
    }
  };

  return (
    <>
      <BackHeader navigation={navigation} />
      <SubHeader title={'Search Brands'} />
      <RootView>
        <SearchInputComponent
          onPress={() => handleSearch(searchText)}
          onSubmitEditing={(event) => {
            CleverTap.recordEvent('Maps Viewed', {
              'Keyword searched': event.nativeEvent.text,
            });
            handleSearch(event.nativeEvent.text);
          }}
          onChangeText={(searchText) => {
            handleSearch(searchText);
            setSearchText(searchText);
          }}
          value={searchText}
          placeholder={'Search your Beloved Brands'}
        />
        {isClicked ? (
          <View style={WovVMapsStyles.mainloaderview}>
            <View style={WovVMapsStyles.Activityindicatorview}>
              {/* <ActivityIndicator
                size={'large'}
                color={R.themes.boxBackgroundColour}
              />
              <Text style={WovVMapsStyles.ActivityindicatorText}>Loading</Text> */}
              <Image
                source={R.images.loaderNexus}
                style={{width: 50, height: 50}}
              />
            </View>
          </View>
        ) : null}

        <FlatList
          data={data}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                style={{
                  padding: '4%',
                  borderBottomWidth: 1,
                  borderBottomColor: R.themes.borderColor,
                  marginHorizontal: '4%',
                }}
                onPress={() => {
                  setisClicked(true);
                  isDeparture
                    ? [
                        setDeparture(item),
                        CTA_firebaseAnalytics(
                          'Start_Point_Wayfinding',
                          'WovvMapsSearch',
                          authState?.userToken,
                          authState?.userId,
                          authState?.mallDetails?.oko_Row_Desc,
                          item?.LocationName?.text,
                        )
                          .then((res) => {})
                          .catch((e) => {}),
                        navigation.goBack(),
                        setisClicked(false),
                        // socket.emit(`endpointsend`, {
                        //   id: socketId,
                        //   data: `${item.x},${item.y},${item.z}`,
                        // }),
                      ]
                    : [
                        isHome
                          ? [
                              setDestination(item),
                              setShowDetailCard(true),
                              socket.emit(`endpointsend`, {
                                id: socketId,
                                data: `${item.x},${item.y},${item.z}`,
                              }),
                              mapsData.FloorImg.map((f, i) => {
                                if (i == item.z) {
                                  setCurrentFloor(f.ShortName);
                                }
                              }),
                              setisClicked(false),
                              setdirectionData(null),
                              CTA_firebaseAnalytics(
                                'Wayfinder_Searches ',
                                'WovvMapsSearch',
                                authState?.userToken,
                                authState?.userId,
                                authState?.mallDetails?.oko_Row_Desc,
                                '',
                                'Searched_item : ' + item?.LocationName?.text,
                              )
                                .then((res) => {})
                                .catch((e) => {}),
                              navigation.goBack(),
                            ]
                          : [
                              setisClicked(false),
                              setDestination(item),
                              CTA_firebaseAnalytics(
                                'End_Point_Wayfinding',
                                'WovvMapsSearch',
                                authState?.userToken,
                                authState?.userId,
                                authState?.mallDetails?.oko_Row_Desc,
                                item?.LocationName?.text,
                              )
                                .then((res) => {})
                                .catch((e) => {}),
                              navigation.goBack(),
                            ],
                      ];
                }}
              >
                <Text
                  style={{
                    fontFamily: R.fonts.primaryMed,
                    color: R.themes.darkTextColor,
                  }}
                >
                  {item?.LocationName?.text}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </RootView>
    </>
  );
};
