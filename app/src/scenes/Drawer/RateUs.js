import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import R from '../../R'
import scale from '../../utils/Scale';
export default class RateUs extends Component{
    constructor() {
        super();
        this.state={


        }
    }


    render(){

        return(
            <View style={{backgroundColor:R.colors.lightBlueGrey}}>
                <View style={{ margin: scale(20),  width:'90%',backgroundColor:R.colors.white,
                    height: '90%',borderWidth: scale(1.5),borderRadius: scale(15),borderColor:R.colors.lightBlueGrey}}>
                    <Image
                        source={R.images.Home_screen_Like}
                        style={{   alignSelf: 'center',
                            width:scale(300),
                            height: scale(180),}}
                    />

                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize: scale(15),fontWeight:'bold',
                        marginTop: scale(10),
                        color: R.colors.black,
                    }}>
                    Like using OKEN app?
                </Text>
                    <Text
                        style={{ marginTop: scale(10),
                            alignSelf: 'center',
                            fontSize: scale(12),
                            color: R.colors.coolGrey,
                        }}>
                        If you are enjoying your shopping here
                    </Text>
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: scale(12),
                            color: R.colors.coolGrey,
                        }}>
                        On a scale of 1 to 5 Stars
                    </Text>
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: scale(12),
                            color: R.colors.coolGrey,
                        }}>
                        how much would you rate us?
                    </Text>
                    <View  style={{flexDirection: 'row',marginTop: scale(50),
                        justifyContent: 'space-around',marginLeft: scale(20),marginRight: scale(20),}}>
                        <Image
                            source={R.images.Star}
                            style={{
                                width:scale(40),
                                height: scale(40),}}
                        />
                        <Image
                            source={R.images.Star}
                            style={{
                                width:scale(40),
                                height: scale(40),}}
                        />
                        <Image
                            source={R.images.Star}
                            style={{
                                width:scale(40),
                                height: scale(40),}}
                        />
                        <Image
                            source={R.images.Star}
                            style={{
                                width:scale(40),
                                height: scale(40),}}
                        />
                        <Image
                            source={R.images.Star_Rating_Inactive}
                            style={{
                                width:scale(40),
                                height: scale(40),}}
                        />
                    </View>
                </View>

            </View>

        )
    }
}
