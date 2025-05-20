import React, {Component} from 'react';
import {View,  Text, TouchableOpacity,} from 'react-native';
import styles from './EventScreenFourStyle';

export default class EventScreenFourth extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.firstView}>
          <View style={styles.fview}>
            <Text style={styles.insideView}>Famous Music Event 2020</Text>
            <Text style={styles.pview}>₹200.00</Text>
          </View>

          <Text style={styles.tView}>1 Ticket</Text>

          <View style={styles.vView} />
          <Text style={styles.dView}>Date</Text>
          <Text style={styles.sview}>Sunday May,31 2020</Text>
          <Text style={styles.greyView}>Timing</Text>
          <Text style={styles.sview}>8:00-11:00 PM</Text>
          <Text style={styles.greyView}>Venue</Text>
          <Text style={styles.sview}>
            Sawoods,Grand central Mall - Ground floor
          </Text>
          <View style={styles.midView} />
          <View style={styles.viewView}>
            <Text style={styles.eView}>Entry Ticket(s)</Text>
            <Text style={styles.oneView}>1</Text>
          </View>

          <View style={styles.xview}>
            <Text style={styles.stView}>Sub-Total</Text>
            <Text style={styles.priceView}>₹200.00</Text>
          </View>
        </View>

        <View style={styles.secondView}>
          <Text style={styles.amtView}> Total Amount</Text>
          <Text style={styles.ptext}>₹200.00</Text>
        </View>

        <View style={styles.theView}>
          <TouchableOpacity style={styles.opacityView} onPress={() => this.props.navigation.navigate('EventScreenFifth')}>
            <Text style={styles.buttonView}>Proceed to Pay </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
