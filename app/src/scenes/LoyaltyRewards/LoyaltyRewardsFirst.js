import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import styles from './LoyaltyRewardsFirstStyle';
import R from '../../R';
export default class RedeemVoucher extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.inView}>
            <View style={styles.textView}>
              <Text style={styles.textStyle}>1025</Text>
              <Text style={styles.balaneStyle}> Balance</Text>
            </View>
          </View>

          <View style={styles.insideView}>
            <TouchableOpacity style={styles.secondView} onPress={() => this.props.navigation.navigate('LoyaltyRewardsSecond')}>
              <View style={styles.fview}>
                <View style={styles.imgView}>
                  <Image
                    source={R.images.ShoppersStop}
                    style={styles.logoImage}
                    resizeMode="center"
                  />
                </View>
                <View>
                  <Text style={styles.comText}>Gift Voucher</Text>

                  <Text>at BIBA</Text>

                  <Text style={styles.priceV}>₹ 1500 </Text>
                </View>
              <View style={{ alignItems: 'flex-end',}}>
                <TouchableOpacity style={styles.labelView}>
                  <Text style={styles.leftV}> 3 Left</Text>
                </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.eText}> Expires </Text>

              <View style={styles.viewAndview}>
                <Text style={styles.dateText}> 31 May 2020 </Text>

                <View style={styles.theView}>
                  <TouchableOpacity style={styles.opacityView}>
                    <Image
                      source={R.images.Coin_Money}
                      style={styles.coinImage}
                    />
                    <Text style={styles.buttonView}>500</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.termsText}>* Terms and contition Apply </Text>
            </TouchableOpacity>

            <View style={styles.thirdView}>
              <View style={styles.fview}>
                <View style={styles.imgView}>
                  <Image
                    source={R.images.BeingHuman}
                    style={styles.logoImage}
                    resizeMode="center"
                  />
                </View>

                <View>
                  <Text style={styles.comText}>Gift Voucher</Text>

                  <Text>at BIBA</Text>

                  <Text style={styles.priceV}>₹ 1000 </Text>
                </View>

                <TouchableOpacity style={styles.labelView}>
                  <Text style={styles.leftV}> 5 Left</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.eText}> Expires </Text>

              <View style={styles.viewAndview}>
                <Text style={styles.dateText}> 31 May 2020 </Text>

                <View style={styles.theView}>
                  <TouchableOpacity style={styles.opacityView}>
                    <Image
                      source={R.images.Coin_Money}
                      style={styles.coinImage}
                    />
                    <Text style={styles.buttonView}>1500</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.termsText}>* Terms and contition Apply </Text>
            </View>

            <View style={styles.thirdView}>
              <View style={styles.fview}>
                <View style={styles.imgView}>
                  <Image
                    source={R.images.TanishqLogo}
                    style={styles.logoImage}
                    resizeMode="center"
                  />
                </View>

                <View>
                  <Text style={styles.comText}>Gift Voucher</Text>

                  <Text>at BIBA</Text>

                  <Text style={styles.priceV}>₹ 1000 </Text>
                </View>

                <TouchableOpacity style={styles.labelView}>
                  <Text style={styles.leftV}> 5 Left</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.eText}> Expires </Text>

              <View style={styles.viewAndview}>
                <Text style={styles.dateText}> 31 May 2020 </Text>

                <View style={styles.theView}>
                  <TouchableOpacity style={styles.opacityView}>
                    <Image
                      source={R.images.Coin_Money}
                      style={styles.coinImage}
                    />
                    <Text style={styles.buttonView}>700</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.termsText}>* Terms and contition Apply </Text>
            </View>
          </View>

          <View style={styles.squareView}>
            <View style={styles.fview}>
              <View style={styles.imgView}>
                <Image
                  source={R.images.BIBA}
                  style={styles.logoImage}
                  resizeMode="center"
                />
              </View>

              <View>
                <Text style={styles.comText}>Gift Voucher</Text>

                <Text>at BIBA</Text>

                <Text style={styles.priceV}>₹ 500 </Text>
              </View>

              <TouchableOpacity style={styles.labelView}>
                <Text style={styles.leftV}> 2 Left</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.eText}> Expires </Text>

            <View style={styles.viewAndview}>
              <Text style={styles.dateText}> 31 May 2020 </Text>

              <View style={styles.theView}>
                <TouchableOpacity style={styles.opacityView}>
                  <Image
                    source={R.images.Coin_Money}
                    style={styles.coinImage}
                  />
                  <Text style={styles.buttonView}>250</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.termsText}>* Terms and contition Apply </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
