import React,{Component} from 'react';
import {View, Text, Image, FlatList, ScrollView,} from 'react-native';
import Search from '../../components/Search';
import R from '../../R';
import scale from '../../utils/Scale';
import SimpleButton from '../../components/SimpleButton';
import styles from './UploadedBillHistoryStyle';
export default class UploadedBillHistory extends Component{
    constructor() {
        super();
        this.state={
            data: [
                {
                    image: R.images.Uploaded_Bills_History_Bill,
                    title:"Uploaded",
                    backgroundColor:R.colors.green,
                },
                {
                    image: R.images.Uploaded_Bills_History_Bill_2,
                    title:" Auto Uploaded",
                    backgroundColor:R.colors.voilet,
                },
                {
                    image: R.images.Uploaded_Bills_History_Bill,
                    title:"Uploaded",
                    backgroundColor:R.colors.green,
                },
                {
                    image: R.images.Uploaded_Bills_History_Bill_2,
                    title:" Auto Uploaded",
                    backgroundColor:R.colors.voilet,
                },

            ]

        }
    }


    render(){

        return(
            <View style={{flex: 1}}>
                <ScrollView>
                <Search
                    img={R.images.Search}
                    placeholder={'Search by Bill Number or Store name'}
                    placeholderTextColor={R.colors.black}
                />
                <View style={{backgroundColor:R.colors.lightBlueGrey,paddingBottom:scale(15),}}>

                    <View style={styles.filterView}>
                    <Image
                        tintColor={R.colors.black}
                        source={R.images.Filter}
                        style={styles.filterImage}
                    />
                    <Text
                        style={styles.filterText}>
                        Filter
                    </Text>
                    </View>

                    <FlatList
                        data={this.state.data}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => /*this.malldetail(item)*/

                            <View style={styles.cardView}>
                                <View style={styles.cardContainer}>
                                    <View style={styles.view}>
                                        <View style={{flexDirection: 'row',}}>
                                            <Image
                                                source={R.images.Coin_Money}
                                                style={styles.coinImage}
                                            />
                                            <Text
                                                style={{
                                                    fontSize: scale(10),
                                                    marginLeft: scale(10),
                                                    color: R.colors.black,alignSelf: 'center',
                                                }}>
                                                250 points added
                                            </Text>
                                        </View>
                                        <Text style={styles.text}>
                                            BIBA
                                        </Text>
                                        <Text style={styles.text}>
                                            Seawoods Grand Central Mall
                                        </Text>
                                        <Text style={styles.text}>
                                            Navi Mumbai
                                        </Text>
                                    </View>
                                    <Image
                                        source={item.image}
                                        style={styles.billImage}
                                    />
                                </View>
                                <View style={{flexDirection: 'row', marginLeft: scale(30),marginTop: scale(5),}}>
                                    <View>
                                        <Text style={styles.billText}>
                                            Bill #098765
                                        </Text>
                                        <Text style={styles.billText}>
                                            Billing Date: 27/05/2020
                                        </Text>
                                    </View>
                                    <SimpleButton
                                        onPress={() => this.props.navigation.navigate('AutoUploadBill')}
                                        title={item.title}
                                        customTxtStyle={styles.customTxtStyle}
                                        customStyle={{marginLeft: scale(60),backgroundColor:item.backgroundColor,
                                            height: scale(20),width: scale(90),}}
                                    />

                                </View>
                            </View>

                        }
                        keyExtractor={(item) => item.id}
                    />

                </View>
                </ScrollView>

            </View>

        )
    }
}
