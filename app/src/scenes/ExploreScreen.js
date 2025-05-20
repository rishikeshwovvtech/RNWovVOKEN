import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import styles from './ExploreScreenStyle';
import R from '../R';
import Location from '../components/LocationComponent';
import StartView from '../components/ExploreScreenView';
import SmallCard from '../components/SmallCard';

export default class ExploreScreen extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Location
            imgRight={R.images.TargetLocation}
            imgLeft={R.images.Location}
            placeholder={'Navi Mumbai'}
            placeholderTextColor={R.colors.black}
            title={'Change'}
          />
          <Text style={styles.expText}>Explore</Text>

          <StartView
              onPress={() => this.props.navigation.navigate('MallDetails')}
            source={R.images.SGC_Mall_Explore}
            mainTitle="Seawooods Grand Central Mall"
            locTitle="1.5 km Near Express Highway, Navi Mumbai"></StartView>

          <StartView
            source={R.images.WestendMall}
            mainTitle="Westend"
            locTitle="
            1.5 km Near Express Highway, Pune"></StartView>

          <StartView
            source={R.images.AhemdabadOneMall}
            mainTitle="Ahemdabad One"
            locTitle="1.5 km Near Express Highway, Ahemdabad"></StartView>

          <View>
            <View style={styles.commonView}>
              <Text style={styles.CategoriesText}>Categories</Text>
              <TouchableOpacity style={styles.allView}>
                <Text style={styles.btnText}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginLeft: 15}}>
              <SmallCard Title="Accessories" source={R.images.Accessories} />

              <SmallCard Title="Bags" source={R.images.bags} />

              <SmallCard Title="HomeDecore" source={R.images.HomeDecore} />
            </ScrollView>
          </View>

          <View>
            <View style={styles.commonView}>
              <Text style={styles.CategoriesText}>
                Explore based on your Location
              </Text>
              <TouchableOpacity style={styles.allView}>
                <Text style={styles.btnText}>View All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{marginLeft: 15}}><SmallCard Title="Sports Shoes" source={R.images.SportsShoes} />

              <SmallCard Title="Spa's" source={R.images.Spas} />

              <SmallCard
                Title="Departmental Store"
                source={R.images.DepartmentStore}
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    );
  }
}
