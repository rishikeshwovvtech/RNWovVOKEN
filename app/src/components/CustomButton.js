import React from 'react';
import {StyleSheet, Text, View, Image,TouchableOpacity,} from 'react-native';


const CustomButton = props => {
    return (
        <TouchableOpacity
            style={[styles.btnStyle, props.customStyle]}
            onPress={props.onPress}>
            <View style={{}}>
                <Image source={props.img} tintColor={props.tintColor} style={props.imgStyle} />
            </View>
            <View >
                <Text style={props.customTxtStyle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    btnStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
