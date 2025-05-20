import React, {Component} from 'react';

import {Text, View, Image,TouchableOpacity,} from 'react-native';

import R from '../../R';
import styles from './MapfourthStyle';
import scale from '../../utils/Scale';
export default class Mapfour extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render = () => (
        <View style={styles.initialView}>
            <View
                style={{
                    marginTop: scale(65),
                }}>
                <TouchableOpacity style={styles.storeView}>
                    <Text style={styles.storeText}>A</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.storeViewB}>
                    <Text style={styles.storeText}>B</Text>
                </TouchableOpacity>
            </View>

            <Image source={R.images.Add_1} style={styles.lastImg} />
            <View>
                <View style={{marginTop: scale(70)}}>
                    <Text style={styles.routeText}>Route Overview (2 minutes)</Text>

                    <TouchableOpacity style={styles.fourthView}>
                        <Text style={styles.shareText}>First Floor</Text>
                    </TouchableOpacity>

                    <Text style={styles.mainText}>Start Walking left 25 steps</Text>

                    <Text style={styles.smallText}>
                        Take a right turn and walk about 150 steps
                    </Text>
                </View>

                <View style={{marginTop: scale(30)}}>
                    <TouchableOpacity style={styles.fourthView}>
                        <Text style={styles.shareText}>First Floor</Text>
                    </TouchableOpacity>

                    <Text style={styles.mainText}>
                        Take a left turn towards Asian Kitchen store
                    </Text>

                    <Text style={styles.smallText}>Then walk forward 50 steps</Text>

                    <Text style={styles.smallText}>Arrive your points</Text>
                </View>



                <TouchableOpacity style={styles.startView} onPress={() => this.props.navigation.navigate('MapFifth')}>
                    <Text style={styles.startText}>Start Navigation</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
