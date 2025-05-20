import React,{Component} from 'react';
import {
    View, Text,
    TouchableOpacity, Image, FlatList, ScrollView, ImageBackground,
} from 'react-native';
import R from '../../R';
import styles from './EventScreenFirstStyles';
import Location from '../../components/LocationComponent';
import scale from '../../utils/Scale';
import SimpleButton from '../../components/SimpleButton';
import Modal from 'react-native-modal';

export default class EventScreenFirst extends Component{
    constructor() {
        super();
        this.state={

            isModalVisible: false,
            data: [
                {
                    mallName: "Seawoods Grand Central Mall",
                    image: R.images.SGC_Mall_image,
                    mallAddress:"Near Express Highway,Navi Mumbai",
                    date:"Music Events-Sun,31 May",
                    price:"₹200.00 onward"
                },
                {
                    mallName: "Ahmedabad One mall",
                    image: R.images.AhemdabadOneMallEvents,
                    mallAddress:" Ahmedabad",
                    date:"Music Events-Sun,31 May",
                    price:"₹200.00 onward"
                },
                {
                    mallName: "Elante",
                    image: R.images.EMallElantevents,
                    mallAddress:"Pune",
                    date:"Music Events-Sun,31 May",
                    price:"₹200.00 onward"
                },

            ],
            data1: [
                {
                    mallName: "Ahmedabad One mall",
                    image: R.images.AhemdabadOneMallEvents,
                    mallAddress:" Ahmedabad",
                    date:"Music Events-Sun,31 May",
                    price:"₹200.00 onward"
                },
                {
                    mallName: "Elante",
                    image: R.images.EMallElantevents,
                    mallAddress:"Pune",
                    date:"Music Events-Sun,31 May",
                    price:"₹200.00 onward"
                },
                {
                    mallName: "Seawoods Grand Central Mall",
                    image: R.images.SGC_Mall_image,
                    mallAddress:"Near Express Highway,Navi Mumbai",
                    date:"Music Events-Sun,31 May",
                    price:"₹200.00 onward"
                },



            ]
        }
    }

    toggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    };

    render(){

        return(
            <View style={{flex: 1}}>

                    <ScrollView>
                        <Location
                            imgRight={R.images.TargetLocation}
                            imgLeft={R.images.Search}
                            placeholder={'Navi Mumbai'}
                            placeholderTextColor={R.colors.black}
                            title={'Change'}
                            onPress={()=> this.toggleModal()}
                        />

                        <Modal isVisible={this.state.isModalVisible}>
                            <ScrollView>

                            <TouchableOpacity
                                onPress={()=> this.toggleModal()}
                                style={styles.modalView}>
                                <Text style={styles.dayText}>
                                    Today</Text>

                                <View style={{borderTopWidth:scale(0.5),borderTopColor:R.colors.coolGrey,
                                    marginTop:scale(5), flexDirection: 'row',paddingTop:scale(20),}}>
                                    <Image
                                        source={R.images.SGC_Notification}
                                        style={{ width: scale(25),
                                            height: scale(30),marginLeft:scale(10),}}>
                                    </Image>
                                    <View style={{ marginLeft:scale(10),}}>
                                        <Text
                                            style={styles.notificationHeadline}>
                                            Event Reminder
                                        </Text>
                                        <Text
                                            style={styles.notificationMallName}>
                                            Seawoods Grand Central Mall,Navi Mumbai
                                        </Text>
                                        <Text
                                            style={styles.notificationEventName}>
                                            Famous Music Event-2020
                                        </Text>
                                        <Text
                                            style={styles.dateTimeText}>
                                            May 31,2020 from 8:00-11:00 PM
                                        </Text>
                                    </View>
                                    <Text
                                        style={styles.time}>
                                        18.00
                                    </Text>

                                </View>

                                <View style={{borderTopWidth:scale(0.5),borderTopColor:R.colors.coolGrey,
                                    marginTop:scale(5), flexDirection: 'row',paddingTop:scale(20),}}>
                                    <Image
                                        source={R.images.SGC_Notification}
                                        style={{ width: scale(25),
                                            height: scale(30),marginLeft:scale(10),}}>
                                    </Image>
                                    <View style={{ marginLeft:scale(10),alignSelf: 'center',}}>
                                        <Text
                                            style={styles.notificationMallName}>
                                            Seawoods Grand Central Mall,Navi Mumbai
                                        </Text>
                                        <Text
                                            style={{ marginTop:scale(2),
                                                fontSize: scale(10),
                                                color: R.colors.black,}}>
                                            Amazing Offer: 15% OFF for Tickets on purchase
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: scale(10),
                                                color: R.colors.black,}}>
                                            of 4 Tickets for the movie "Lorem"
                                        </Text>
                                    </View>
                                    <Text
                                        style={styles.time}>
                                        15.23
                                    </Text>
                                </View>

                                <View style={{borderTopWidth:scale(0.5),borderTopColor:R.colors.coolGrey,
                                    marginTop:scale(5), flexDirection: 'row',paddingTop:scale(20),}}>
                                    <Image
                                        source={R.images.SGC_Notification}
                                        style={{ width: scale(25),
                                            height: scale(30),marginLeft:scale(10),}}>
                                    </Image>
                                    <View style={{ marginLeft:scale(10),alignSelf: 'center',}}>
                                        <Text
                                            style={styles.notificationMallName}>
                                            Seawoods Grand Central Mall,Navi Mumbai
                                        </Text>
                                        <Text
                                            style={{ marginTop:scale(2),
                                                fontSize: scale(10),
                                                color: R.colors.black,}}>
                                            New Event is about to start .Visit SGC
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: scale(10),
                                                color: R.colors.black,}}>
                                            to have amazing experience
                                        </Text>
                                    </View>
                                    <Text
                                        style={styles.time}>
                                        06.23
                                    </Text>
                                </View>
                                <View style={{borderTopWidth:scale(0.5),borderTopColor:R.colors.coolGrey,
                                    marginTop:scale(5), flexDirection: 'row',paddingTop:scale(20),}}>
                                    <Image
                                        source={R.images.SGC_Notification}
                                        style={{ width: scale(25),
                                            height: scale(30),marginLeft:scale(10),}}>
                                    </Image>
                                    <View style={{ marginLeft:scale(10),alignSelf: 'center',}}>
                                        <Text
                                            style={styles.notificationMallName}>
                                            Seawoods Grand Central Mall,Navi Mumbai
                                        </Text>
                                        <Text
                                            style={{ marginTop:scale(2),
                                                fontSize: scale(10),
                                                color: R.colors.black,}}>
                                            Thanks for visiting SGC
                                        </Text>
                                    </View>
                                    <Text
                                        style={styles.time}>
                                        01.03
                                    </Text>
                                </View>
                                <Text style={styles.dayText}>
                                    Yesterday</Text>
                                <View style={{borderTopWidth:scale(0.5),borderTopColor:R.colors.coolGrey,
                                    marginTop:scale(5), flexDirection: 'row',paddingTop:scale(20),}}>
                                    <Image
                                        source={R.images.SGC_Notification}
                                        style={{ width: scale(25),
                                            height: scale(30),marginLeft:scale(10),}}>
                                    </Image>
                                    <View style={{ marginLeft:scale(10),alignSelf: 'center',}}>
                                        <Text
                                            style={styles.notificationMallName}>
                                            Seawoods Grand Central Mall,Navi Mumbai
                                        </Text>
                                        <Text
                                            style={{ marginTop:scale(2),
                                                fontSize: scale(10),
                                                color: R.colors.black,}}>
                                            Thanks for visiting SGC
                                        </Text>
                                    </View>
                                    <Text
                                        style={styles.time}>
                                        01.03
                                    </Text>
                                </View>
                                <View style={{borderTopWidth:scale(0.5),borderTopColor:R.colors.coolGrey,
                                    marginTop:scale(5), flexDirection: 'row',paddingTop:scale(20),}}>
                                    <Image
                                        source={R.images.SGC_Notification}
                                        style={{ width: scale(25),
                                            height: scale(30),marginLeft:scale(10),}}>
                                    </Image>
                                    <View style={{ marginLeft:scale(10),alignSelf: 'center',}}>
                                        <Text
                                            style={styles.notificationMallName}>
                                            Seawoods Grand Central Mall,Navi Mumbai
                                        </Text>
                                        <Text
                                            style={{ marginTop:scale(2),
                                                fontSize: scale(10),
                                                color: R.colors.black,}}>
                                            Thanks for visiting SGC
                                        </Text>
                                    </View>
                                    <Text
                                        style={styles.time}>
                                        01.03
                                    </Text>
                                </View>
                                <View style={{borderTopWidth:scale(0.5),borderTopColor:R.colors.coolGrey,
                                    marginTop:scale(5), flexDirection: 'row',paddingTop:scale(20),}}>
                                    <Image
                                        source={R.images.SGC_Notification}
                                        style={{ width: scale(25),
                                            height: scale(30),marginLeft:scale(10),}}>
                                    </Image>
                                    <View style={{ marginLeft:scale(10),alignSelf: 'center',}}>
                                        <Text
                                            style={styles.notificationMallName}>
                                            Seawoods Grand Central Mall,Navi Mumbai
                                        </Text>
                                        <Text
                                            style={{ marginTop:scale(2),
                                                fontSize: scale(10),
                                                color: R.colors.black,}}>
                                            Thanks for visiting SGC
                                        </Text>
                                    </View>
                                    <Text
                                        style={styles.time}>
                                        01.03
                                    </Text>
                                </View>
                                <View style={{borderTopWidth:scale(0.5),borderTopColor:R.colors.coolGrey,
                                    marginTop:scale(20)}}>
                                <Text
                                    style={{ fontWeight:'bold',
                                        fontSize:scale(14),paddingTop:scale(5),paddingBottom:scale(5),
                                        color:R.colors.voilet,alignSelf: 'center',}}>
                                    Mark all as Read
                                </Text>
                                </View>
                            </TouchableOpacity>
                                </ScrollView>
                        </Modal>

                        <ImageBackground
                            source={R.images.SGC_Mall_Explore}
                            style={styles.Home_screen_image}>

                                <Text style={styles.musicText}>MUSIC EVENT</Text>
                            <Text style={styles.mallText}>AT SEAWOOD MALL</Text>

                        </ImageBackground>

                        <ScrollView horizontal={true}>
                        <View  style={styles.container}>
                            <SimpleButton
                                title="Today"
                                customTxtStyle={styles.customTxtStyle}
                                customStyle={{
                                    backgroundColor: R.colors.orange,
                                    alignSelf: 'center',
                                    width: scale(95),
                                    height: scale(25),
                                }}
                            />
                            <SimpleButton
                                title="Tomorrow"
                                customTxtStyle={styles.customTxtStyle}
                                customStyle={styles.customStyle}
                            />
                            <SimpleButton
                                title="Weekend"
                                customTxtStyle={styles.customTxtStyle}
                                customStyle={styles.customStyle}
                            />
                            <SimpleButton
                                title="Music Show"
                                customTxtStyle={styles.customTxtStyle}
                                customStyle={styles.customStyle}
                            />
                        </View>
                        </ScrollView>
                        <View  style={{   flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: scale(20),
                            }}>
                            <FlatList
                                data={this.state.data}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => /*this.malldetail(item)*/
                                    <TouchableOpacity style={{marginTop:scale(15)}}
                                                      onPress={() => this.props.navigation.navigate('EventScreenSecond')}>
                                        <Image
                                            source={item.image}
                                            style={styles.eventImage}>
                                        </Image>
                                        <Text style={styles.mallName}>
                                            {item.mallName}
                                        </Text>
                                        <Text
                                            style={styles.mallAddress}>
                                            {item.mallAddress}
                                        </Text>
                                        <Text
                                            style={styles.dateText}>
                                            {item.date}
                                        </Text>
                                        <Text
                                            style={styles.priceText}>
                                            {item.price}
                                        </Text>
                                    </TouchableOpacity>}
                                keyExtractor={(item) => item.id}
                            />

                            <FlatList
                                data={this.state.data1}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => /*this.malldetail(item)*/

                                    <TouchableOpacity style={{marginLeft: scale(15),marginTop:scale(15)}}
                                                      onPress={() => this.props.navigation.navigate('EventScreenSecond')}>
                                        <Image
                                            source={item.image}
                                            style={styles.eventImage}>
                                        </Image>
                                        <Text style={styles.mallName}>
                                            {item.mallName}
                                        </Text>
                                        <Text
                                            style={styles.mallAddress}>
                                            {item.mallAddress}
                                        </Text>
                                        <Text
                                            style={styles.dateText}>
                                            {item.date}
                                        </Text>
                                        <Text
                                            style={styles.priceText}>
                                            {item.price}
                                        </Text>
                                    </TouchableOpacity>
                                }
                                keyExtractor={(item) => item.id}
                            />

                        </View>
                    </ScrollView>
            </View>

        )
    }
}
