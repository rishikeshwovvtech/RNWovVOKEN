import React, {useContext, useState} from 'react';
import {StyleSheet, ImageBackground, FlatList, View, TouchableOpacity, Text} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
//local iports
import R from '../R';
import {IMAGE_CDN_URL_TENANT_ID, IS_CDN, IMAGE_URL} from '../utils/Constants';
import { BackHeader } from './BackHeader';
import SubHeader from './SubHeader';
import { RootView } from './RootView';
import { SearchInputComponent } from './SearchInputComponent';
import { CTA_firebaseAnalytics } from './Analytics/CTAAnalytics';
import { Loader } from './Loader';
import MultipleMallScreenStyle from '../scenes/Auth/MultipleMallScreen/MultipleMallScreenStyle'; 
import { AuthContext } from '../context/auth/AuthContext';
//TODO optmise the component
export const MultiMall = (props) => {

  const [MallName, setMallName] = useState('');
  const {authAction, authState} = useContext(AuthContext);
    const [Malldata, setMalldata] = useState(props.mallData);
  

  const handleSearch = (MallName) => {
      if (MallName != '') {
        CTA_firebaseAnalytics(
          'Mall_Explore',
          'Mall_Search',
          authState?.userToken,
          authState?.userId,
          '',
          '',
          'searched_query : ' + MallName,
        )
          .then((res) => {})
          .catch((e) => {});
  
        var MallData = props.mallData.filter((a) => {
          return (
            a.oko_Row_Desc.toLowerCase().includes(MallName.toLowerCase()) ||
            a.branch_City_Name.toLowerCase().includes(MallName.toLowerCase())
          );
        });
        setMalldata(MallData);
      } else {
        setMalldata(props.mallData);
      }
    };

      const renderItem = ({item}) => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={MultipleMallScreenStyle.itemMainContainer}
          //onPress={() => setMall_Details(item)}
          onPress={() => props.setSelectedMall(item)}
        >
          <Text style={MultipleMallScreenStyle.itemText}>
            {item.oko_Row_Desc}
            {','} {item.branch_City_Name}
          </Text>
        </TouchableOpacity>
      );
    
  return (
    <>
   { props.showBackHeader && 
    <BackHeader customOnPress={props.backHeaderPress} />}
    <SubHeader title={'Choose your mall for exciting rewards'} />
    <RootView>
      <SearchInputComponent
        customViewstyle={{marginTop: '5%'}}
        onPress={() => handleSearch(MallName)}
        onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
        onChangeText={(MallName) => {
          setMallName(MallName);
          handleSearch(MallName);
        }}
        value={MallName}
        placeholder={'Search for your favourite Mall'}
      />
      {/* <Loader isVisible={showmodalLoader} /> */}

      <View
        style={{
          marginTop: '2%',
          borderColor: R.colors.primaryBrand2,
          marginHorizontal: '5%',
          marginBottom: '12%',
          flex: 1,
        }}
      >

        <FlatList
          data={Malldata}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={MultipleMallScreenStyle.flatListContainer}
        />
      </View>
    </RootView>
  </>
  );
};
const styles = StyleSheet.create({
   
});
