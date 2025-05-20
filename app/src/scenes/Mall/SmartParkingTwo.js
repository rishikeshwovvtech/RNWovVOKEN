import React,{Component} from 'react';

import {Text,  View, Image, TouchableOpacity} from 'react-native';

import R from '../../R';
import styles from './SmartParkingTwoStyle';

export default class SmartParkingTwo extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render = () => (
        <View style={{backgroundColor: R.colors.gainsboro}}>
            <View style={styles.upperView}>
                <Image source={R.images.Up_Arrow} style={styles.imgView} />

                <TouchableOpacity
                    style={styles.fourthView}
                    onPress={() => console.log('You Clicked Wovvtech')}>
                    <Text style={styles.shareText}>50</Text>
                    <Text style={styles.shareText}>meters</Text>
                </TouchableOpacity>
                <View style={styles.textStyle}>
                    <Text style={styles.fontView}>
                        Go straight about 50 meters and take a left
                    </Text>
                    <Text style={styles.fontView}>
                        before elevator sign to park your vehicle
                    </Text>
                </View>
            </View>
            <View style={styles.parkView}>
                <Image source={R.images.ParkingView} style={styles.parkImg} />
                <View style={styles.newView}>
                    <View style={styles.latestV}>
                        <TouchableOpacity
                            style={styles.bView}
                            onPress={() => console.log('You Clicked Wovvtech')}>
                            <Text style={styles.bText}>B</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cView}
                            onPress={() => console.log('You Clicked Wovvtech')}>
                            <Text style={styles.bText}>B1</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.bookView}
                        onPress={() => console.log('You Clicked Wovvtech')}>
                        <Text style={styles.parktext}>Park the Vehicle</Text>
                    </TouchableOpacity>

                    <Image source={R.images.NorthMap} style={styles.lastV} />
                </View>
            </View>
        </View>
    );
}
