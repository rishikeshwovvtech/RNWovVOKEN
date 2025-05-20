import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput, FlatList,
  Image,
  ScrollView,TouchableOpacity,
  ImageBackground,
} from 'react-native';
import scale from '../../utils/Scale';
import R from '../../R';
import SimpleButton from '../../components/SimpleButton';
import Search from '../../components/Search';
import styles from './MallDetailsStyle';
import CustomButton from '../../components/CustomButton';
import Title from '../../components/Title';

export default class MallDetails extends Component {
  constructor() {
    super();
    this.state = {
        data: [
            {
                mallName: "Seawoods Grand Central Mall",
                image: R.images.Fashion,
                mallAddress:"Near Express Highway,Navi Mumbai"
            },
            {
                mallName: "Seawoods Grand Central Mall",
                image: R.images.Multiplex,
                mallAddress:"Near Express Highway,Navi Mumbai"
            },
            {
                mallName: "Seawoods Grand Central Mall",
                image: R.images.SGC_Events,
                mallAddress:"Near Express Highway,Navi Mumbai"
            },

        ]};
  }

  render() {
    return (

        <ScrollView style={{flex: 1}}>
          <Search
            img={R.images.Search}
            placeholder={'What are you looking for?'}
            placeholderTextColor={R.colors.black}
          />
          <ImageBackground
            source={R.images.SGC_Mall_Explore}
            style={styles.Home_screen_image}>
            <View style={styles.rate}>
              <Image source={R.images.Star} style={styles.rateImage} />
              <Text style={styles.rateText}>4.0</Text>
            </View>
          </ImageBackground>

          <View style={{backgroundColor: R.colors.lightBlueGrey}}>
            <View style={styles.viewContainer}>
              <Image source={R.images.Location} style={styles.locationImage} />
              <Text style={styles.locationText}>
                Near Express Highway,Navi Mumbai
              </Text>
              <Image
                source={R.images.Favorite_Heart}
                style={styles.heartImage}
              />
              <Image
                source={R.images.NotificationBell_ON}
                style={styles.locationImage}
              />
            </View>

            <View style={styles.childView}>
              <View style={{}}>
                <Image
                  source={R.images.Contact}
                  style={styles.childViewImage}
                />
                <Text style={styles.childViewText}>Contact</Text>
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('UploadBillViaPhoto')}
              >
                <Image
                  source={R.images.UploadBill}
                  style={styles.childViewImage}
                />
                <Text style={styles.childViewText}>Upload Bills</Text>
              </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SmartParking')}>
                    <Image
                  source={R.images.SmartParking}
                  style={styles.childViewImage}
                />
                <Text style={styles.childViewText}>Parking</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('SocialMedia')}>
                    <Image
                  source={R.images.SocialFeeds}
                  style={styles.childViewImage}
                />
                <Text style={styles.childViewText}>Social Feeds</Text>
                </TouchableOpacity>
            </View>

            <View
              style={styles.childContainer}>
                <CustomButton
                    onPress={() => this.props.navigation.navigate('RedeemVoucher')}
                    title=" My Vouchers"
                    customStyle={styles.containerView}
                    imgStyle={styles.containerImage}
                    img={R.images.MyVouchers}
                    customTxtStyle={styles.containerText}
                />
              <CustomButton
                title="Timings"
                customStyle={styles.containerView}
                imgStyle={styles.containerImage}
                img={R.images.Timings}
                customTxtStyle={styles.containerText}
              />

              <View
                style={styles.container}>
                <Image
                  source={R.images.Location}
                  style={styles.containerImage}
                  tintColor={R.colors.white}
                />
                <Text
                  style={[styles.containerText,{color:R.colors.white}]}>
                  Check-in
                </Text>
                <Image
                  source={R.images.Right_Tick}
                  style={styles.rightTickImage}
                  tintColor={R.colors.green}
                />
              </View>
            </View>



              <Title title="Search your Interest" name="View All" />

            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={styles.interestView}>
                <Image
                  source={R.images.WomansWear}
                  style={styles.interestImage}
                />
                <Text style={styles.interestText}>Women's wear</Text>
              </View>

              <View style={styles.interestView}>
                <Image
                  source={R.images.MensWear}
                  style={styles.interestImage}
                />
                <Text style={styles.interestText}>Man's Wear</Text>
              </View>

              <View style={styles.interestView}>
                <Image
                  source={R.images.KidsWear}
                  style={styles.interestImage}
                />
                <Text style={styles.interestText}>Kids Wear</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: scale(20),
                marginBottom: scale(20),
              }}>
              <View style={styles.interestView}>
                <Image
                  source={R.images.EntertainmentandFun}
                  style={styles.interestImage}
                />
                <Text style={styles.interestText}>Entertainment and Fun</Text>
              </View>
              <View style={styles.interestView}>
                <Image
                  source={R.images.HomeDecor}
                  style={styles.interestImage}
                />
                <Text style={styles.interestText}>Home Decor</Text>
              </View>
              <View style={styles.interestView}>
                <Image
                  source={R.images.BeautyCareandProducts}
                  style={styles.interestImage}
                />
                <Text style={styles.interestText}>Beauty Care products</Text>
              </View>
            </View>

              {/* <TouchableOpacity  style={{marginTop: scale(10),}} onPress={() => this.props.navigation.navigate('Offer')}> */}
              <Title title=" Treading Offers" name="See All" />

              <FlatList
                  style={styles.offercontainer}
                  horizontal={true}
                  data={this.state.data}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => /*this.malldetail(item)*/
                      <View style={{marginLeft: scale(20)}}>
                       <TouchableOpacity  style={{marginTop: scale(10),}} onPress={() => this.props.navigation.navigate('Offer')}>

                          <ImageBackground
                              source={ item.image}
                              style={{width: scale(120), height: scale(90)}}>
                              <View style={styles.hightlightView}>
                                  <Text style={styles.hightlightText}>Hot </Text>
                              </View>
                          </ImageBackground>
                          <Text style={styles.interestText}>Home Decor</Text>
                          <Text style={styles.offerText}>
                              30% OFF on all garments
                          </Text>
                          <Text style={styles.offerText}>
                              Over purchase of 5000.00
                          </Text>
                          </TouchableOpacity>
                      </View>}
                  keyExtractor={(item) => item.id}
              />
              {/* </TouchableOpacity> */}
            <View
              style={styles.view}>
              <Text
                style={styles.viewTitle}>
                Ratings
              </Text>
              <View
                style={styles.ratingView}>
                <Image source={R.images.Star} style={styles.rateImage} />
                <Text style={styles.rateText}>4.0</Text>
              </View>
              <Text
                style={styles.viewText}>
                435 Ratings
              </Text>
              <Image
                source={R.images.DropDownarrow}
                style={styles.dropDownImage}
              />
            </View>

            <View
              style={styles.Starview}>
              <Image
                source={R.images.Star}
                style={styles.StarImage}
              />
              <Image
                source={R.images.Star}
                style={styles.StarImage}
              />
              <Image
                source={R.images.Star}
                style={styles.StarImage}
              />
              <Image
                source={R.images.Star}
                style={styles.StarImage}
              />
              <Image
                source={R.images.Star_Rating_Inactive}
                tintColor={R.colors.coolGrey}
                style={styles.StarImage}
              />
            </View>

              <View
                  style={styles.view}>
                  <Text
                      style={styles.viewTitle}>
                Reviews
              </Text>
              <Image
                source={R.images.Reviews}
                style={styles.reviewImage}
              />
              <Text style={styles.viewText}>
                435 Reviews
              </Text>
              <SimpleButton
                title="View All"
                customTxtStyle={styles.customTxtStyle}
                customStyle={styles.customStyle}
              />
              <Image
                source={R.images.DropDownarrow}
                style={styles.dropDownarrow}
              />
            </View>
            <TextInput
              onChangeText={(item) => this.setState({item})}
              placeholder={'Write your review here...'}
              placeholderTextColor={R.colors.voilet}
              style={styles.reviewstyle}
            />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: scale(30),
                  marginBottom: scale(10),
                }}>
                <Image
                  source={R.images.UserAvatar}
                  style={styles.avatar}
                />
                <View style={{marginLeft: scale(10)}}>
                  <Text
                    style={styles.name}>
                    John Doe
                  </Text>
                  <Text
                    style={styles.text}>
                    Posted on 14/03/2020
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: R.colors.voilet,
                    marginLeft: scale(130),
                    padding: scale(3),
                    alignSelf: 'flex-end',
                    borderRadius: scale(4),
                  }}>
                  <Image source={R.images.Star} style={styles.rateImage} />
                  <Text style={styles.rateText}>4.5</Text>
                </View>
              </View>
              <Text
                style={styles.detailText}>
                On of the best malls to go in Navi Mumbai. I prefer to go with
                my family and friends most of the time .most of the brands are
                available here
              </Text>
            </View>
          </View>
        </ScrollView>
    );
  }
}
