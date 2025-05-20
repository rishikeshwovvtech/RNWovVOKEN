import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import R from '../R';
import scale from '../utils/Scale';

const Socialmedia = (props) => {
    return (
        <React.Fragment>
            <View style={styles.view}>
                <Text style={styles.text}>----------------</Text>
                <Text style={styles.text}>{props.title}</Text>
                <Text style={styles.text}>----------------</Text>
            </View>
            <View style={styles.viewChild}>
                <Image source={props.facebook} style={styles.logo} />
                <Image source={props.google} style={styles.logo} />
                <Image source={props.twitter} style={styles.logo} />
                <Image source={props.instagram} style={styles.logo} />
            </View>
        </React.Fragment>
    );
};
export default Socialmedia;

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        marginTop: scale(20),
        alignSelf: 'center',
    },
    text: {
        alignSelf: 'center',
        marginTop: scale(20),
        fontSize: scale(14),
        color: R.colors.white,
        marginRight:scale(10),
    },
    viewChild: {
        margin: scale(35),
        alignItems: 'center',
        marginTop: scale(20),
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    logo: {
        height: scale(45),
        width: scale(45),
    },

});
