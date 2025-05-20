import React,{Component} from 'react';
import {View,Text} from 'react-native';

export default class CheckIns extends Component{
    constructor() {
        super();
        this.state={


        }
    }


    render(){

        return(
            <View style={{alignItems: 'center',marginVertical:60}}>

                <Text style={{fontSize: 23, fontWeight: 'bold',color:'#ff1313'}}>Welcome to Navigation Screen</Text>

            </View>

        )
    }
}
