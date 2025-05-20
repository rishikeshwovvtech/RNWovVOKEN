import React, {Component} from 'react';
import {
  View,
  Text,
} from 'react-native';
import styles from './EventScreenSixStyle';

export default class EventScreenSix extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.secondview}>
        <Text style={styles.textview}>
          Scan QR Code at Event Ticket Counter to get rewards point
        </Text>
        <Text style={styles.textview2}>
          Having trouble to scanning? Increase brigthness and scan again.
        </Text>
        <View style={styles.RectangleShapeView}>
          <View style={styles.firstview}>
            <Text style={styles.textview3}>Famous Music Event 2020</Text>
            <Text style={styles.textview4}>₹200.00</Text>
          </View>

          <Text style={styles.text5}>1 Ticket</Text>

          <View style={styles.view5} />
          <Text style={styles.view6}>Date</Text>
          <Text style={styles.text6}>Sunday May,31 2020</Text>
          <Text style={styles.view6}>Timming</Text>
          <Text style={styles.text6}>8:00-11:00</Text>
          <Text style={styles.view6}>Venue</Text>
          <Text style={styles.text6}>
            Sawoods,Grand central mall-Ground floor
          </Text>
          <View style={styles.view7} />
          <View style={styles.firstview}>
            <Text style={styles.view8}>Entry Ticket(s)</Text>
            <Text style={styles.text7}>1</Text>
          </View>
        </View>
      </View>
    );
  }
}
