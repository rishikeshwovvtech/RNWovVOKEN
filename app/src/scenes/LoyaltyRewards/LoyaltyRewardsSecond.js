import React, {Component} from 'react';
import {
    Text,
    View, Image,
    TouchableOpacity,
  } from 'react-native';

import R from '../../R';
import styles from './LoyaltyRewardsSecondStyle';

import SimpleButton from '../../components/SimpleButton';
export default class LoyaltyRewardsSecond extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.insideView}>
          <View style={styles.buttonView}>
            <TouchableOpacity>
              <Image source={R.images.Close} style={styles.locImg} />
            </TouchableOpacity>
          </View>

          <View style={styles.textView}>
            <Text style={styles.congoText}>Congratulations !!</Text>
            <Text style={styles.textStyle}>Here's the Code for your</Text>
            <Text style={styles.middleStyle}> ₹ 500</Text>
            <Text style={styles.textStyle}> BIBA's Gift Voucher</Text>

            <Text style={styles.bibaStyle}>BIBA500</Text>
          </View>

            <View style={styles.lastView}>
              <SimpleButton
                title="Copy Code"
                customTxtStyle={styles.customTxtStyle}
                customStyle={styles.customBtnStyle}
              />

              <SimpleButton
                  onPress={() => this.props.navigation.navigate('AfterRedeemPoints')}
                title="Redeem it"
                customTxtStyle={styles.customTxtStyle}
                customStyle={styles.customBtnStyle}
              />
          </View>
        </View>
      </View>
    );
  }
}
