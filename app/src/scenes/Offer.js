import React, {Component} from 'react';
import {View, Text, Image, ScrollView, FlatList,ImageBackground,TouchableOpacity} from 'react-native';
import R from '../R';
import Location from '../components/LocationComponent';
import styles from './OfferStyles';
import SimpleButton from '../components/SimpleButton';
import scale from '../utils/Scale';
import LinearGradient from 'react-native-linear-gradient';

import SmallCard from '../components/SmallCard';
import { colors } from '../../res/colors';

export default class Offer extends Component {
  constructor() {
    super();
    this.state = {
      share:false,
      data: [ {},{},{}, ],
      variaty:[
                { 
                 name: 'All',
                 color: R.colors.orange,
                },
                { 
                  name: 'Fashion',
                  color: R.colors.coolGrey,
                 },
                 { 
                  name: 'Beauty',
                  color: R.colors.coolGrey,
                 },
                 { 
                  name: 'Music Show',
                  color: R.colors.coolGrey,
                 },
    ],
      offerByCategories:[
        { 
        name: 'Sports Shoes',
        image: R.images.SportsShoes,
        },
        { 
          name: 'Spa',
          image: R.images.Spas,
        },
        { 
          name: 'Eyewear',
          image: R.images.eyecare,
        },
        { 
          name: 'Sports Shoes',
          image: R.images.SportsShoes,
        },
  ],
    TreadingOffer:[
      {  image: R.images.Multiplex,
         color:R.colors.orange
      },
      { image: R.images.Fashion,
        color:R.colors.pink
      },
      { 
       image: R.images.WestendMall,
       color:R.colors.orange
      },
      { 
        image: R.images.Multiplex,
        color:R.colors.pink
      },
  ],
      offerByBrand:[
        {  image: R.images.BIBA_logo,
          name:'BIBA'
        },
        { image: R.images.ShoppersStop,
          name:'ShoppersStop'
        },
        { 
        image: R.images.BeingHuman,
        name:'BeingHuman'
        },
        
    ]

    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: R.colors.gainsboro}}>
        <ScrollView>
          <Location
            tintColor={R.colors.red}
            imgRight={R.images.TargetLocation}
            imgLeft={R.images.Location}
            placeholder={'Seawoods Grand Central Mall'}
            placeholderTextColor={R.colors.black}
            title={'Change'}
            onPress={() => this.toggleModal()}
          />

          <ImageBackground
            source={R.images.SGC_Mall_Explore}
            style={styles.Home_screen_image}
          />

            <View style={styles.container}>
                  <FlatList
                    horizontal={true}
                    data={this.state.variaty}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <SimpleButton
                          title={item.name}
                          customTxtStyle={styles.customTxtStyle}
                          customStyle={[styles.customStyle,{backgroundColor: item.color,}]}
                        />
                  )}
                  keyExtractor={(item) => item.id}
              />
            </View>
         


       <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={styles.title}>Offers by Categories</Text>
            <SimpleButton
              title="See All"
              customTxtStyle={styles.customButtonTxtStyle}
              customStyle={styles.customButtonStyle}
            />
          </View>
            <View style={styles.container}>

            <FlatList
                    horizontal={true}
                    data={this.state.offerByCategories}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <View style={{marginLeft: scale(10)}}>
                        <SmallCard Title={item.name} source={item.image} />

                        <TouchableOpacity  onPress={()=>
                                     this.setState({share:true})}>
                                <Image
                                  tintColor={R.colors.green}
                                  source={R.images.Share}
                                  style={styles.shareImage}
                                />
                                </TouchableOpacity>
              </View>
                  )}
                  keyExtractor={(item) => item.id}
              />

             </View>
        
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={styles.title}>Treading Offers</Text>
            <SimpleButton
              title="See All"
              customTxtStyle={styles.customButtonTxtStyle}
              customStyle={styles.customButtonStyle}
            />
          </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: scale(20),
                paddingBottom: scale(10),
              }}>

                <FlatList
                        horizontal={true}
                        data={this.state.TreadingOffer}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                          <View style={{marginLeft: scale(20)}}>
                                <ImageBackground
                                  source={item.image}
                                  style={{width: scale(120), height: scale(90)}}>
                                  <View style={[styles.hightlightView,{backgroundColor:item.color}]}>
                                    <Text style={styles.hightlightText}>Hot </Text>
                                  </View>
                                </ImageBackground>
                                <Text style={styles.interestText}>Home Decor</Text>
                                <Text style={styles.text}>30% OFF on all garments</Text>
                                <Text style={styles.text}>Over purchase of 5000.00</Text>
                                <TouchableOpacity  onPress={()=>
                                     this.setState({share:true})}>
                                <Image
                                  tintColor={R.colors.green}
                                  source={R.images.Share}
                                  style={styles.shareImage}
                                />
                                </TouchableOpacity>
              </View>
                      )}
                      keyExtractor={(item) => item.id}
                  />

            </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={styles.title}>Offers by Brands</Text>
            <SimpleButton
              title="View All"
              customTxtStyle={styles.customButtonTxtStyle}
              customStyle={styles.customButtonStyle}
            />
          </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: scale(20),
                paddingBottom: scale(10),
              }}>
            <FlatList
                        horizontal={true}
                        data={this.state.offerByBrand}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                          <View style={{marginLeft: scale(20)}}>
                            <View
                              style={{
                                backgroundColor: 'white',

                                height: scale(60),
                                width: scale(150),
                                alignContent: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                                  <ImageBackground
                                    source={item.image}
                                    style={{
                                      width: scale(140),
                                      alignSelf: 'center',

                                      height: scale(35),
                                    }}
                                  />
                                </View>
                                <Text style={styles.interestText}>{item.name}</Text>
                                <Text style={styles.text}>30% OFF on all garments</Text>
                                <Text style={styles.text}>Over purchase of 5000.00</Text>
                                <TouchableOpacity  onPress={()=>
                                     this.setState({share:true})}>
                                <Image
                                  tintColor={R.colors.green}
                                  source={R.images.Share}
                                  style={styles.shareImage}
                                />
                                </TouchableOpacity>
                          </View>
                      )}
                      keyExtractor={(item) => item.id}
                  />


            
            </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={styles.title}>Reward points offers</Text>
            <SimpleButton
              title="View All"
              customTxtStyle={styles.customButtonTxtStyle}
              customStyle={styles.customButtonStyle}
            />
          </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingBottom: scale(10),
              }}>
        <FlatList
              horizontal={true}
              data={this.state.data}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
            <View style={{marginLeft: scale(20)}}>
                <View style={styles.rewardView}>
                  <View style={{flexDirection: 'row', paddingTop: scale(5)}}>
                    <Image
                      source={R.images.BIBA_logo}
                      style={styles.rewardImage}
                    />
                    <View>
                      <Text style={styles.rewardName}>Gift Voucher</Text>
                      <Text style={styles.rewardName}>at BIBA</Text>
                      <Text style={[styles.rewardName, {fontWeight: 'bold'}]}>
                        ₹ 500
                      </Text>
                    </View>
                    <View style={styles.leftTextView}>
                      <Text style={styles.leftText}> 3 Left</Text>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', marginTop: scale(10)}}>
                    <View>
                      <Text style={styles.expiresText}>Expires</Text>
                      <Text style={styles.dateText}>31 May 2020</Text>
                    </View>

                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={[
                        'rgba(145,14,224,0.83)',
                        'rgb(118,17,224)',
                        'rgba(115,28,224,1)',
                      ]}
                      style={styles.linearGradientView}>
                      <Image
                        source={R.images.Coin_Money}
                        style={styles.coinImage}
                      />

                      <Text
                        style={{
                          fontSize: scale(10),
                          alignSelf: 'center',
                          marginLeft: scale(5),
                          color: R.colors.white,
                          backgroundColor: 'transparent',
                        }}>
                        250
                      </Text>
                    </LinearGradient>
                  </View>
                  <Text
                    style={{
                      fontSize: scale(5),
                      marginLeft: scale(5),
                      color: R.colors.coolGrey,
                      marginTop: scale(2),
                    }}>
                    *Terms & Conditions Apply
                  </Text>
                </View>
              </View>
          )}
          keyExtractor={(item) => item.id}
        />
        </View>
       
        </ScrollView>
        {this.state.share ?  

              <TouchableOpacity
                  onPress={()=>this.setState({share:false})}
                  style={styles.bottomView}>

                <View style={styles.shareTextView}>
                  <Text style={{alignSelf:'center',marginTop:scale(20)}}>Share Offer via </Text>
                </View>

                <View style={{justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
                    <Image source={R.images.Facebook_Active} style={styles.socialImageLogo} />
                    <Image source={R.images.Instagram_Active} style={styles.socialImageLogo} />
                      <Image source={R.images.Twitter_Active} style={styles.socialImageLogo} />
                </View>
              </TouchableOpacity>
              :
              null
              }
      </View>
    );
  }
}
