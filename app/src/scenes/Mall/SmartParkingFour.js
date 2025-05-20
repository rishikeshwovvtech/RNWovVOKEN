import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './SmartParkingFourStyle';

export default class SmartParkingFour extends Component {
  render() {
    return (
      <View style={styles.Reactangle}>
        <View style={styles.view1}>
          <TouchableOpacity>
            <Text style={styles.text1}>X</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text2}>Visitor Parking-Schedule fees</Text>
        <View style={styles.view2}>
          <Text style={styles.text3}> M</Text>
          <View>
            <Text style={styles.text4}>T</Text>
          </View>
          <View>
            <Text style={styles.text4}>W </Text>
          </View>
          <View>
            <Text style={styles.text4}>T </Text>
          </View>
          <View>
            <Text style={styles.text4}>F </Text>
          </View>
          <View>
            <Text style={styles.text4}>S </Text>
          </View>
          <View>
            <Text style={styles.text5}>S</Text>
          </View>
        </View>
        <View style={styles.view3}>
          <Text style={styles.text6}> Hours</Text>
          <View>
            <Text style={styles.text7}>Two-wheels </Text>
          </View>
          <View>
            <Text style={styles.text8}>Four-wheels</Text>
          </View>
        </View>

        <View style={styles.view4}>
          <Text style={styles.text9}> 0-2</Text>
          <View>
            <Text style={styles.text10}>Free </Text>
          </View>
          <View>
            <Text style={styles.text11}>Free</Text>
          </View>
        </View>

        <View style={styles.view4}>
          <Text style={styles.text9}>2-4 hours</Text>
          <View>
            <Text style={styles.text12}>₹10 </Text>
          </View>
          <View>
            <Text style={styles.text11}>₹20</Text>
          </View>
        </View>

        <View style={styles.view4}>
          <Text style={styles.text9}>4-6 hours</Text>
          <View>
            <Text style={styles.text12}>₹30 </Text>
          </View>
          <View>
            <Text style={styles.text11}>₹40</Text>
          </View>
        </View>

        <View style={styles.view4}>
          <Text style={styles.text9}>6-8 hours</Text>
          <View>
            <Text style={styles.text12}>₹60 </Text>
          </View>
          <View>
            <Text style={styles.text11}>₹80</Text>
          </View>
        </View>

        <View style={styles.view4}>
          <Text style={styles.text13}>8-10 hours</Text>
          <View>
            <Text style={styles.text12}>₹80 </Text>
          </View>
          <View>
            <Text style={styles.text11}>₹100</Text>
          </View>
        </View>

        <View style={styles.view4}>
          <Text style={styles.text9}>overnight</Text>
          <View>
            <Text style={styles.text12}>₹160 </Text>
          </View>
          <View>
            <Text style={styles.text11}>₹200</Text>
          </View>
        </View>
        <Text style={styles.text14}>
          If any problem in parking please contact us
        </Text>
      </View>
    );
  }
}
