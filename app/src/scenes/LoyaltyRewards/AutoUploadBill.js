import React,{Component} from 'react';
import {View,Text,} from 'react-native';

export default class AutoUploadBill extends Component{
    constructor() {
        super();
        this.state={


        }
    }


    render(){

        return(
            <View style={{flex:1,marginTop:60, alignItems: 'center',}}>

                <Text style={{fontSize: 20, fontWeight: 'bold',color:'#ff1313'}}>Welcome to AutoUploadBill </Text>

            </View>

        )
    }
}
