import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Linking
} from 'react-native';


export default class QrCode extends Component{

    constructor() {
        super();
        this.state={


        }
    }



        render(){

            return(
                <View style={{alignItems: 'center',marginVertical:60}}>
    
                    <Text style={{fontSize: 23, fontWeight: 'bold',color:'#ff1313'}}>Welcome to QrCode Screen</Text>
    
                </View>
    
            )
        }
    }
    