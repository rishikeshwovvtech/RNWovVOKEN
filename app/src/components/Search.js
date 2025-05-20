import React from 'react';
import {StyleSheet, View, Image, TextInput} from 'react-native';
import R from '../R';
import scale from '../utils/Scale';

const Search = (props) => {
    return (
        <View style={styles.locationContainer}>
            <Image
                tintColor={R.colors.voilet}
                source={props.img}
                style={styles.img}
            />
            <TextInput
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                secureTextEntry={props.secureTextEntry}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}
                style={{
                    borderBottomWidth:scale(0.5),
                    borderBottomColor: R.colors.coolGrey,
                    marginTop: scale(10),
                    marginLeft: scale(10),
                    width:'75%',
                    height:scale(45)
                }}
            />
        </View>
    );
};

export default Search

const styles = StyleSheet.create({
    locationContainer: {
        height: scale(45),
        width: scale(400),
        backgroundColor: R.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: scale(15),
    },
    customTextStyle: {
        fontSize: scale(12),
        color: R.colors.white,
        opacity: scale(0.4),
    },
    img: {
        marginTop: scale(10),
        marginLeft: scale(10),
        width: scale(22),
        height: scale(22),
    },
});
