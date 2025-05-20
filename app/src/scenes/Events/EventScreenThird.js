import React, {Component} from 'react';
import {View, Text, TouchableOpacity,} from 'react-native';
import styles from './EventScreenThirdStyle';
import NumericInput from 'react-native-numeric-input'

export default class EventScreenThird extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.insideView}>
          <Text style={styles.selectText}>Select Your Category</Text>
        </View>

        <View style={styles.secondView}>
          <View style={styles.textView}>
            <Text style={styles.entryText}>Entry Pass</Text>
            <Text style={styles.textStyle}> ₹ 200</Text>
          </View>

          <View style={styles.midView}>

            <NumericInput type='plus-minus'
                          rounded={true}
                          onChange={value => console.log(value)} />
          </View>
        </View>

        <View style={styles.thirdView}>
          <View style={styles.marView}>
            <Text style={styles.textStyle}> ₹ 200</Text>

            <Text style={styles.tView}>1 Ticket</Text>
          </View>

          <View style={styles.lastView}>
            <TouchableOpacity style={styles.proceedView}
                              onPress={() => this.props.navigation.navigate('EventScreenFourth')}>
              <Text style={styles.bView}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
