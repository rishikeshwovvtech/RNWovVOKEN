import React,{Component} from 'react';
import {View,Text,} from 'react-native';

export default class SocialMedia extends Component{

    constructor() {
        super();
        this.state={


        }
    }


    render(){

        return(
            <View style={{alignItems: 'center',marginTop:60}}>
                <View style={{alignItems: 'center',justifyContent:'space-between'}}>
                <Text style={{fontSize: 23, fontWeight: 'bold',color:'#ff1313'}}>Welcome to SocialMedia </Text>
                </View>
            </View>

        )
    }
}
