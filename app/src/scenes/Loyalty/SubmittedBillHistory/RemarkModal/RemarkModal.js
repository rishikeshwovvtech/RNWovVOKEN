import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Modal,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import FilyterStyle from './RemarkModalStyle';

import R from '../../../../R';
const RemarkModal = (props) => {
  const [radioSelected, setradioSelected] = useState(1);
  return (
    <Modal
      visible={props.ShowVisible}
      transparent={true}
      animationType={'slide'}
    >
      <TouchableOpacity
        style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}
        onPress={props.onClosePress}
      />
      <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
        <View style={FilyterStyle.viewContainer}>
          <View style={{alignItems: 'center', padding: R.dimensions.hp('2')}}>
            <TouchableOpacity style={{width: R.dimensions.wp('30%')}}>
              <View
                style={{
                  backgroundColor: R.colors.coolGrey,
                  height: R.dimensions.hp('1%'),
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={props.onClosePress}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                source={R.images.UploadCaptureBill}
                resizeMode="contain"
                style={FilyterStyle.logo}
              />
            </View>
          </TouchableOpacity>

          <View style={{marginHorizontal: R.dimensions.hp('2%')}}>
            <Text style={FilyterStyle.textStyle}>
              Why did your Bill get Rejected ?
            </Text>
            <View style={FilyterStyle.remarkContainer}>
              <Text style={FilyterStyle.RemarkText}>{props.remark}</Text>
            </View>
            <Text style={FilyterStyle.textStyle}>How to avoid this ?</Text>
            <View style={{flexDirection: 'row', marginVertical: 7}}>
              <Text style={FilyterStyle.BulletStyle}>{'\u2B24'}</Text>
              <Text style={FilyterStyle.BulletText}>
                Ensure a clear picture of the bill is submitted
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={FilyterStyle.BulletStyle}>{'\u2B24'}</Text>
              <Text style={FilyterStyle.BulletText}>
                Ensure your bill is submitted only once
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: R.dimensions.hp('3%'),
              }}
            ></View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default RemarkModal;
