import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from './SmartParkingThreeStyle';

export default class SmartParkingThree extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={styles.text2}>
          Enter the Lane number where you have to parked your vehicle
        </Text>
        <View style={styles.RectangleShapeView}>
          <Text style={styles.text1}>Basement</Text>
          <View style={{marginTop: 30}}></View>
        </View>

        <View style={styles.RectangleShapeView}>
          <Text style={styles.text1}>A1</Text>
        </View>
        <View style={styles.RectangleShapeView1}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SmartParkingFour')}>
            <Text style={styles.text3}>Find My Vehicle</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text4}>
          If it seems that you might have parked in an area where our system is
          in the process of being implemented.
        </Text>
        <Text style={styles.text5}>Let us help you find your vehicle.</Text>
        <TouchableOpacity
          onPress={() => this.onPressButton()}
          style={styles.submit}>
          <Text style={styles.text6}>Call Us</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
