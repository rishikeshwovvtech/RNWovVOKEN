import React,{Component} from 'react';
import {View, TouchableOpacity, TextInput, Image,Text, FlatList,} from 'react-native';
import R from '../../R';
import scale from '../../utils/Scale';
import styles from './MapThirdStyle';

export default class MapsThird extends Component{
    constructor() {
        super();
        this.state={

            data: [
                {
                    name: "Lee",
                    floor: 'Ground floor',
                },
                {
                    name: "Cantabil",
                    floor: 'Ground floor',
                },
                {
                    name: "TNG",
                    floor:'First floor',
                },
                {
                    name: "DIESEL",
                    floor: 'First floor',

                },
                {
                    name: "Levis",
                    floor: 'Ground floor',

                },
                {
                    name: "Blue Buddha",
                    floor:'First floor',

                },
                {
                    name: "Lee",
                    floor: 'Ground floor',

                },
                {
                    name: "Cantabil",
                    floor: 'Ground floor',

                },

                {
                    name: "TNG",
                    floor:'First floor',

                },
                {
                    name: "DIESEL",
                    floor: 'First floor',

                },
                {
                    name: "Levis",
                    floor: 'Ground floor',

                },
                {
                    name: "Blue Buddha",
                    floor:'First floor',

                },
            ]
        }
    }


    render(){

        return(
            <View style={styles.mainView}>
                <View style={styles.rootView}>
                    <Image
                        tintColor={R.colors.voilet}
                        source={R.images.Search}
                        style={styles.searchImage}
                    />
                    <TextInput
                        onChangeText={(item)=>this.setState({item})}
                        placeholder={'Enter Nearest Store'}
                        style={styles.textInput}
                    />
                    <Image
                        tintColor={R.colors.red}
                        source={R.images.TargetLocation}
                        style={styles.targetImage}
                    />
                </View>
                <View style={styles.view}>

                    <FlatList
                        data={this.state.data}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) =>
                            <TouchableOpacity style={styles.touchableView} onPress={() => this.props.navigation.navigate('Mapfour')}>

                                <Text style={{fontSize:scale(15),}}>{item.name}</Text>
                                <Text style={{fontSize:scale(12),color:R.colors.coolGrey}}>{item.floor}</Text>
                            </TouchableOpacity>}
                        keyExtractor={(item) => item.id}
                    />

                </View>
            </View>

        )
    }
}
