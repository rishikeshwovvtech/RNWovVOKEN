import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styles from './EventScreenFifthStyle';
import R from '../../R';
import LinearGradient from 'react-native-linear-gradient';

export default class EventScreenFifth extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <ScrollView style={styles.mainView}>
          <View style={styles.firstView}>

              <Text style={styles.insideView}>Famous Music Event-2020</Text>


            <View style={styles.oView}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={R.images.OnlineStream}
                  style={styles.infoLogoImg}
                />
                <Text style={styles.tView}>Online Streaming</Text>
              </View>
              <Text style={styles.noView}>1</Text>
            </View>

            <View style={styles.minView}>
              <Text style={styles.fsizeV}>
                Sunday May,31 2020 | 8:00 - 11:00 PM
              </Text>
              <Text style={styles.sizeV}>Ticket</Text>
            </View>

            <View style={styles.vView} />
            <View style={styles.comView}>
              <Text style={styles.dView}>Sub-Total</Text>
              <Text style={styles.dView}>₹200.00</Text>
            </View>

            <View style={styles.comView}>
              <Text style={styles.sview}>Internet handling fees</Text>
              <Text style={styles.sview}>₹10.00</Text>
            </View>

            <View style={styles.comView}>
              <View style={styles.donateV}>
                <Text style={styles.sview}>Donate to PMCares fund</Text>
                <Image
                  source={R.images.info}
                  style={styles.infoImg}
                  resizeMode="contain"
                />

                <Text style={styles.rView}>Remove</Text>
              </View>

              <Text style={styles.sview}>₹1.00</Text>
            </View>

            <View style={styles.xview}>
              <Text style={styles.cView}>Total Payable Amount</Text>
              <Text style={styles.cView}>₹211.00</Text>
            </View>

            <View style={styles.midView} />
            <View style={styles.viewView}>
              <Text style={styles.eView}>
                Apply Promocode or Gift Card Code
              </Text>
              <TextInput placeholder="" style={styles.inputV} />
            </View>
          </View>


        <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['rgba(145,14,224,0.83)', 'rgba(118,17,224,0.62)', 'rgba(115,28,224,0.11)',]}
            style={styles.initialView}>
          <View style={styles.upperView}>
            <View>
            <Text style={[styles.textView,{fontWeight:'bold'}]}>John Doe</Text>
            <Text style={styles.textView}>****1234</Text>
            </View>
            <Image style={styles.imgView} source={R.images.visa}></Image>
          </View>
        </LinearGradient>
        <View style={styles.lastView}>
          <TextInput
              placeholder="Enter CVV to complete payment"
              style={{alignSelf: 'center',}}
          />
        </View>
          <View style={styles.mView}>
            <View style={styles.nView}>
              <View style={styles.sameV}>
                <View style={styles.commonV}>
                  <Image
                    source={R.images.DebitCard}
                    style={styles.logoImg}
                    resizeMode="contain"
                  />
                  <Text style={styles.padView}>Debit/Credit Card</Text>
                </View>
                <Image source={R.images.RightArrow} style={styles.symbolV} />
              </View>

              <View style={styles.sameV}>
                <View style={styles.commonV}>
                  <Image
                    source={R.images.NetBanking}
                    style={styles.logoImg}
                    resizeMode="contain"
                  />
                  <Text style={styles.padView}>Net Banking</Text>
                </View>
                <Image
                  source={R.images.RightArrow}
                  style={styles.symbolV}></Image>
              </View>

              <View style={styles.sameV}>
                <View style={styles.commonV}>
                  <Image
                    source={R.images.UPI}
                    style={styles.upiImg}
                    resizeMode="contain"
                  />
                  <Text style={styles.padView}>UPI Payment</Text>
                </View>
                <Image
                  source={R.images.RightArrow}
                  style={styles.symbolV}></Image>
              </View>

              <TouchableOpacity style={styles.opacityView} onPress={() => this.props.navigation.navigate('EventScreenSix')}>
                <Text style={styles.buttonView}> Pay ₹ 200.00 </Text>
              </TouchableOpacity>
            </View>
          </View>

      </ScrollView>
    );
  }
}
