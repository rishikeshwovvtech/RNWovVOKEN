import React, {Component} from 'react';

import {Text, View, Image, TextInput,TouchableOpacity, FlatList} from 'react-native';

import R from '../../R';
import scale from '../../utils/Scale';
import styles from './MapfirstStyle';
export default class Mapfirst extends Component {
    constructor() {
        super();
        this.state = {
            flag:true,

            data: [
                {
                    image:R.images.SGC_Events,
                    name: "Lee",
                    floor: 'Ground floor',
                },
                {
                    image:R.images.AhemdabadOneMallEvents,
                    name: "Cantabil",
                    floor: 'Ground floor',
                },
                {
                    image:R.images.EMallElantevents,
                    name: "TNG",
                    floor:'Ground floor',
                },
                ]
        };
    }
    render = () => (
        <View style={styles.view}>
            <View style={styles.headerView}>
                <Image
                    tintColor={R.colors.voilet}
                    source={R.images.Search}
                    style={styles.searchImage}
                />
                <TextInput
                    onChangeText={(item)=>this.setState({item})}
                    placeholder={' Mens Casual Wear'}
                    placeholderTextColor={R.colors.black}
                    style={styles.textInput}/>

                <Image
                    tintColor={R.colors.voilet}
                    source={R.images.Close}
                    style={styles.closeImage}
                />

            </View>
            <Image source={R.images.GOOGLE_MAPS} style={styles.images} />
            <View style={styles.imgView}>
                <Image tintColor={R.colors.red} source={R.images.TargetLocation} style={styles.locImg} />
            </View>
            <View style={[styles.bottomView,{height: this.state.flag ? null: scale(280),}]}>
                <View style={styles.bottomView1}>
                <TouchableOpacity style={styles.storeView}   onPress={() => this.setState({flag:!this.state.flag})}>
                    <Text style={styles.storeText}>Stores (13)</Text>
                </TouchableOpacity>
                <Image source={R.images.Arrow} style={styles.lastImg} />
                </View>

                {this.state.flag ?
                    null :
                    <FlatList
                        data={this.state.data}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => /*this.malldetail(item)*/
                            <TouchableOpacity style={styles.childView} onPress={() => this.props.navigation.navigate('MapsThird')}>
                                <Image
                                    source={item.image}
                                    style={styles.shopImg}
                                />
                                <View style={{marginLeft: scale(10),}}>

                                    <Text style={styles.nameText}>{item.name}</Text>
                                    <Text style={styles.floorText}>{item.floor}</Text>
                                </View>
                                <Image
                                    tintColor={R.colors.coolGrey}
                                    source={R.images.Favorite_Heart}
                                    style={styles.heartImg}
                                />
                                <Image
                                    source={R.images.Navigate}
                                    style={styles.navigateImg}
                                />
                            </TouchableOpacity>}
                        keyExtractor={(item) => item.id}
                    />
                }


            </View>
        </View>
    );
}
