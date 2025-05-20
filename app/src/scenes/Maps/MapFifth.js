import React, {Component} from 'react';
import {Text,  View, Image} from 'react-native';
import R from '../../R';
import styles from './MapfifthStyle';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class Mapfifth extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render = () => (
        <View style={{flex:1,}}>
        <View style={styles.view}>
            <TouchableOpacity style={styles.fourthView}>
                <Text style={styles.shareText}>First Floor</Text>
            </TouchableOpacity>
                <Text style={styles.text}>
                    Hooray! You have reached your point of interest
                </Text>
            </View>

            <Image style={styles.image} source={R.images.GOOGLE_MAPS}/>

        </View>
    );
}

