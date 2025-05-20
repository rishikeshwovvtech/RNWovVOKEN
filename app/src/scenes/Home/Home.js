import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import ChooseMall from '../../components/ChooseMall';
import R from '../../R';
import scale from '../../utils/Scale';
import SimpleButton from '../../components/SimpleButton';
import styles from './HomeStyle';
import Title from '../../components/Title';
import MalldetailCard from '../../components/MalldetailCard';
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          mallName: 'Seawoods Grand Central Mall',
          image: R.images.SGC_Mall_image,
          mallAddress: 'Near Express Highway,Navi Mumbai',
        },
        {
          mallName: 'Seawoods Grand Central Mall',
          image: R.images.Westend_Mall,
          mallAddress: 'Near Express Highway,Navi Mumbai',
        },
        {
          mallName: 'Seawoods Grand Central Mall',
          image: R.images.SGC_Events,
          mallAddress: 'Near Express Highway,Navi Mumbai',
        },
      ],
    };
  }

  render() {
    return (
      <ScrollView>
        <ChooseMall
          imgLeft={R.images.TargetLocation}
          placeholder={'Choose mall'}
          title="Change"
        />

        <Image
          source={R.images.Home_screen_image}
          style={styles.Home_screen_image}></Image>

        <Text style={styles.earnText}>EARN AND REDEEM</Text>
        <Text style={styles.acrossText}>ACROSS STORES</Text>

        <Text style={styles.firstText}>
          Bill number 12345 is Auto uploaded Points will be added on approval
        </Text>

        <Title title="Malls nearly your Area" name="View All" />

        <Text style={styles.text}>
          * To explore more please select your favourite mall
        </Text>

        <FlatList
          horizontal={true}
          data={this.state.data}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <MalldetailCard
              image={item.image}
              mallName={item.mallName}
              onPress={() => this.props.navigation.navigate('MallDetails')}
              mallAddress="Near Express Highway,Navi Mumbai"
            />
          )}
          keyExtractor={(item) => item.id}
        />

        
          <Text style={styles.title}>Check-in</Text>
          <Text style={styles.text}>
            Review the last check-in's done by you
          </Text>
       

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.data}
          renderItem={({item}) => (
            <View style={{}}>
              <View style={styles.checkInMallView}>
                <ImageBackground
                  source={item.image}
                  style={styles.checkInMallImage}>
                  <View style={styles.heartImageView}>
                    <Image
                      source={R.images.Favorite_Heart}
                      style={styles.checkInHeartImage}
                    />
                  </View>
                </ImageBackground>
                <Text style={styles.checkInHeartName}>SGC</Text>
              </View>
              <Text style={styles.timeText}>Just now</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <ImageBackground
          source={R.images.Loyalty_Background}
          style={styles.loyaltyBackground}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: scale(20),
            }}>
            <Text style={styles.feedbackText}>Earn</Text>
            <Image source={R.images.Coin_Money} style={styles.coinImage} />
            <Text style={styles.feedbackText}>1000 points on sharing</Text>
          </View>
          <Text style={styles.feedbackText}>Your valuable Feedback</Text>
          <SimpleButton
            onPress={() => this.props.navigation.navigate('Feedback')}
            title="Share Feedback"
            customTxtStyle={styles.feedbackButtonText}
            customStyle={styles.feedbackButton}
          />
        </ImageBackground>

        <View style={styles.view}>
          <Text style={styles.eventsText}>Events</Text>
          <Text style={styles.availableText}>(Available around you)</Text>
        </View>

        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.data}
          renderItem={({item} /*this.malldetail(item)*/) => (
            <View style={styles.eventsView}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('EventScreenFirst')
                }>
                <Image source={item.image} style={styles.eventsImage} />
              </TouchableOpacity>
              <Text style={styles.mallName}>Seawood Grand Central</Text>
              <View style={styles.view}>
                <Image
                  source={R.images.Location}
                  style={styles.locationImage}
                />
                <Text style={styles.locationText}>1.5 Km</Text>
                <Image
                  source={R.images.Directions}
                  style={styles.directionImage}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={{flexDirection: 'row', marginTop: scale(10)}}>
          <Text style={styles.eventsText}>Contests</Text>
          <Text style={styles.availableText}>(Available around you)</Text>
        </View>

        <ImageBackground source={R.images.Spin_Win} style={styles.spinImage}>
          <View style={{marginTop: scale(80), marginLeft: scale(75)}}>
            <Text style={styles.spinText}>Available at</Text>
            <Text style={styles.spinText}>Seawoods Grand Central Mall</Text>
            <Text style={styles.spinText}>Navi Mumbai</Text>
          </View>
          <Text style={styles.TS_Text}>T&S Apply</Text>
        </ImageBackground>
      </ScrollView>
    );
  }
}
