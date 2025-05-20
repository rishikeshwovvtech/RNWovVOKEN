import React from 'react';
import {View, Text, Image,} from 'react-native';
import R from '../R';
import scale from '../utils/Scale';
export const HeaderTitle = (props) => {
  return (
    <View style={{flexDirection: 'row',alignItems: 'center'}}>
      <Image source={R.images.OKEN_Logo} style={{height: scale(25),
        width: scale(90),}} />

        <View style={{
            marginLeft:scale(10),flexDirection: 'row',
          borderRadius:scale(22), justifyContent: 'center',
          alignItems: 'center',height: scale(25),
          backgroundColor:R.colors.white,width: scale(140),
          }}>
      <Text
        style={[{marginLeft:scale(2), fontSize: 12, color: R.colors.black,}, props.textcolour,]}>
        Reward points
      </Text>
          <Text
              style={{marginLeft:scale(5), fontSize: 12,fontWeight:'bold',color: R.colors.voilet,}}>
            1015
          </Text>
        </View>
        <Image source={R.images.NotificationBell_ON} style={{height: scale(20),
            width: scale(20),marginLeft:scale(5)}}/>
        <Image source={R.images.UserAvatar} style={{height: scale(20),
            width: scale(20),marginLeft:scale(5)}} />
    </View>
  );
};
