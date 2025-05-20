import React, {Component} from 'react';
import {Text, View, Image,} from 'react-native';
import styles from './LoyaltyRewardsThirdStyle';
import R from '../../R';

export default class AfterRedeemPoints extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render = () => (
    <View style={styles.container}>
      <View style={styles.rootView}>
            <Image  source={R.images.Close} style={styles.closeImage}/>



          <Text style={styles.congoText}>Congratulations !!</Text>

          <View style={styles.childView}>
            <Image
              source={R.images.BIBA}
              style={styles.bibaImage}
              resizeMode="center"
            />
          </View>
          <Text style={styles.textStyle}>Gift Voucher received</Text>
          <View style={styles.smallView}>
            <Text style={styles.textStyle}>of BIBA worth</Text>
            <Text style={styles.priceText}> ₹ 500 </Text>
          </View>




          <Text style={styles.commontext}>It is auto saved to My vouchers</Text>
          <Text style={styles.commontext}>
            You can redeem any item you want when{' '}
          </Text>
          <Text style={styles.commontext}>you visit the interested store</Text>


        <Text style={styles.eText}> Expires </Text>

        <View style={styles.view}>
          <Text style={styles.dateText}> 31 May 2020 </Text>
          <Text style={styles.termsText}>* Terms and contition Apply </Text>
        </View>
      </View>
    </View>
  );
}
