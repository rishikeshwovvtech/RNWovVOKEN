import React from 'react';
import {View, TouchableOpacity, StyleSheet, Text, Image, } from 'react-native';
import R from '../R';
import scale from '../utils/Scale';

const MalldetailCard = (props) => {
    return (
        <React.Fragment>

            <TouchableOpacity style={styles.mallContainer}
                              onPress={props.onPress}
                             >
                <View style={styles.view}>
                    <Image source={props.image} style={styles.mallImage} />
                    <View>
                        <View style={styles.view}>
                            <Text
                                style={styles.mallName}>
                               {props.mallName}
                            </Text>
                            <Image source={R.images.Favorite_Heart} style={styles.heartImage}
                            />
                        </View>
                        <Text
                            style={styles.mallAddress}>
                            {props.mallAddress}
                        </Text>
                        <View style={styles.location}>
                            <Image source={R.images.Location} style={styles.locationImage}/>
                            <Text style={styles.locationText}>
                                1.5 Km
                            </Text>
                            <Image source={R.images.Directions} style={styles.locationImage}/>
                            <Text style={styles.locationText}>
                                Get Direction
                            </Text>
                            <View style={styles.rate}>
                                <Image source={R.images.Star} style={styles.rateImage}
                                />
                                <Text style={styles.rateText}>
                                    4.0
                                </Text>

                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </React.Fragment>
    );
};
export default MalldetailCard;

const styles = StyleSheet.create({
    mallContainer: {
        marginLeft: scale(20),
        backgroundColor: R.colors.white,
        borderRadius: scale(8),
        width: scale(300),
        padding: scale(8),
        marginTop: scale(10),
    },
    mallImage: {
        width: scale(70),
        height: scale(70),
    },
    mallName: {
        fontSize: scale(12),
        fontWeight: 'bold',
        marginLeft: scale(10),
        color: R.colors.black,
    },
    view: {
        flexDirection: 'row',
    },
    heartImage: {
        marginLeft: scale(5),
        width: scale(20),
        height: scale(20),
    },
    mallAddress: {
        fontSize: scale(9),
        marginLeft: scale(10),
        color: R.colors.coolGrey,
    },
    location: {
        flexDirection: 'row',
        marginTop: scale(15),
    },
    locationText: {
        fontSize: scale(10),
        marginLeft: scale(5),
        color: R.colors.coolGrey,
    },
    locationImage: {
        marginLeft: scale(8),
        width: scale(18),
        height: scale(18),
    },
    rate: {
        flexDirection: 'row',
        backgroundColor: R.colors.voilet,
        marginLeft: scale(10),
        padding: scale(5),
        alignSelf: 'center',
        borderRadius: scale(4),
    },
    rateText: {
        fontSize: scale(8),
        fontWeight: 'bold',
        marginLeft: scale(5),
        color: R.colors.white,
        marginRight: scale(5),
    },
    rateImage: {
        width: scale(10),
        height: scale(10),
    },
});
