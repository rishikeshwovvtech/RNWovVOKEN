import React from 'react';
import {Text, Image} from 'react-native';
import R from '../R';
import scale from '../utils/Scale';
import LinearGradient from 'react-native-linear-gradient';

const LinearGradientHeader = (props) => {
    return (

        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
           colors={['rgba(145,14,224,0.83)', 'rgb(118,17,224)', 'rgba(115,28,224,1)',]}
           style={{ paddingLeft: 15, paddingRight: 15, height: scale(45), width: '100%', flexDirection: 'row',}}>

            <Image tintColor={R.colors.white} source={R.images.Back} style={{margin: 10, width: 20, height: 20}}/>

            <Text style={{fontSize: 15, textAlign: 'center', margin: 10, marginLeft: 50,
            color: '#ffffff', backgroundColor: 'transparent',}}>
                {props.title}
            </Text>
            </LinearGradient>


    );
};
export default LinearGradientHeader;
