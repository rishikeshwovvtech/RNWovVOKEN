import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import R from '../../R';
import styles from './LoyaltyRewardsStyle';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import scale from '../../utils/Scale';
import SimpleButton from '../../components/SimpleButton';

export default class LoyaltyRewards extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[
            'rgba(145,14,224,0.83)',
            'rgba(118,17,224,0.86)',
            'rgba(115,28,224,1)',
          ]}>
          <View style={styles.logoContainer}>
            <Image source={R.images.SilverBadge} style={styles.logoImage} />

            <View style={{paddingLeft: scale(15)}}>
              <View style={{flexDirection: 'row', paddingBottom: scale(5)}}>
                <Text style={styles.textContainer}>SILVER </Text>
                <Image source={R.images.Coin_Money} style={styles.CoinMoney} />
                <Text style={styles.text}>1025 </Text>
                <Text style={styles.pointsText}>Points </Text>
              </View>

              <Progress.Bar
                progress={0.5}
                width={230}
                color={R.colors.voilet}
                unfilledColor={R.colors.white}
                borderColor={R.colors.white}
                height={12}
                borderWidth={0.5}
              />
              <Text style={styles.Text}>
                Earn 975 points more to reach Gold{' '}
              </Text>
            </View>
          </View>
          <SimpleButton
            title="Redeem Points"
            customStyle={styles.touchContainer}
            onPress={() => this.props.navigation.navigate('RedeemVoucher')}
            customTxtStyle={{fontSize: scale(14), fontWeight: 'normal'}}
          />

          <View style={styles.secondViewContainer}>
            <View style={styles.thirdView}>
              <Image
                source={R.images.Loyalty_Rewards}
                style={styles.theImage}
              />
              <View style={{marginTop: 15}}>
                <Text style={styles.commonText}>Earn 500 points on</Text>
                <Text style={styles.commonText}>a successful referral</Text>

                <View style={styles.fourthView}>
                  <TouchableOpacity>
                    <Text style={styles.shareText}>Share Code</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.innerView3}>
            <Text style={styles.tView1}> Increase Reward Points By</Text>

            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.innerView5}>
                  <Image source={R.images.Shopping} style={styles.imgView} />
                  <Text style={styles.tView2}>Shopping</Text>
                  <Text style={styles.tView3}>At Partner Malls</Text>
                </View>

                <TouchableOpacity
                  style={styles.innerView5}
                  onPress={() => this.props.navigation.navigate('UploadBill')}>
                  <Image source={R.images.Bill} style={styles.imgView1} />
                  <Text style={styles.tView4}>Upload Bill</Text>
                  <Text style={styles.tView5}>Upload Bills of your </Text>
                  <Text style={styles.shopText}>Shopping on OKEN app </Text>
                </TouchableOpacity>

                <View style={styles.innerView5}>
                  <Image source={R.images.Checkin} style={styles.imgView1} />
                  <Text style={styles.tView4}>Check In</Text>
                  <Text style={styles.tView5}>Check In Malls </Text>
                </View>
              </ScrollView>
            </View>
          </View>

          <View style={styles.innerView6}>
            <View style={styles.innerView7}>
              <Text style={styles.tview6}> Redemption History</Text>
              <TouchableOpacity style={styles.touchableView1}>
                <Text style={styles.buttonText}>Download Statement</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.innerView7}>
              <View>
                <Text style={styles.tView7}> Spykar Jeans</Text>
                <Text style={styles.TextnView}> Redeemed on 31/07/2020 </Text>
              </View>
              <View style={styles.TextnView}>
                <Text>CODE : SPY1000</Text>
              </View>
            </View>

            <View style={styles.innerView7}>
              <View>
                <Text style={styles.tView7}> BIBA</Text>
                <Text style={styles.TextnView}> Redeemed on 31/07/2020 </Text>
              </View>
              <View style={styles.TextnView}>
                <Text>CODE : BIBA500</Text>
              </View>
            </View>

            <View style={styles.innerView7}>
              <View>
                <Text style={styles.tView7}> ZARA</Text>
                <Text style={styles.TextnView}> Redeemed on 31/07/2020 </Text>
              </View>
              <View style={styles.TextnView}>
                <Text>CODE : ZARA500</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    );
  }
}
