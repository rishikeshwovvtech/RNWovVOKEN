import React, {Component} from 'react';
import R from '../../R';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './SmartParkingStyle';

export default class SmartParking extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.parkView}>
          <Text style={styles.parkText}>Parking Summary</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('SmartParkingFour')}>
          <Image source={R.images.info} style={styles.infoImg} />
        </TouchableOpacity>
        </View>

        <Image source={R.images.Car} style={styles.carImg} />

        <TouchableOpacity style={styles.imgView} onPress={() => this.props.navigation.navigate('SmartParkingTwo')}>
          <Image source={R.images.SmartParking} style={styles.parkImg1} />
          <View style={styles.textView}>
            <Text style={styles.twoText}>Smart Parking</Text>
          </View>
        </TouchableOpacity>

          <TouchableOpacity style={styles.imgView} onPress={() => this.props.navigation.navigate('SmartParkingThree')}>

          <Image source={R.images.CarMap} style={styles.parkImg2} />
          <View style={styles.textView}>
            <Text style={styles.twoText}>Find my vehicle</Text>
          </View>
          </TouchableOpacity>

        <View style={styles.lastView}>
          <Text style={styles.lastText}>
            Last updated 21 May 2020 10:28 AM , Pull to refresh
          </Text>

          <Image source={R.images.refresh} style={styles.refreshImg} />
        </View>
      </View>
    );
  }
}
