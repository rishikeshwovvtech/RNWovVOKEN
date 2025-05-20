import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import R from '../R';
import scale from '../utils/Scale';

const Title = (props) => {
    return (
        <React.Fragment>
            <View style={styles.view}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <TouchableOpacity
                    onPress={props.onPress}
                    style={styles.LoginButton}>
                    <Text style={[styles.LoginButtonText, props.customTxtStyle]}>
                        {' '}
                        {props.name}
                    </Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    );
};
export default Title;

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: scale(15),
    },
    title: {
        fontSize: scale(16),
        fontWeight: 'bold',
        marginLeft: scale(20),
        color: R.colors.black,
    },
    LoginButton: {
        marginRight: scale(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: R.colors.voilet,
        height: scale(20),
        borderRadius: scale(22),
        width: scale(55),
    },
    LoginButtonText: {
        alignSelf: 'center',
        color: R.colors.white,
        fontSize: scale(10),
        fontWeight: 'bold',
    },
});
