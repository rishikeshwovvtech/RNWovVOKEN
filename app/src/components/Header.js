import React from 'react';
import {View, Text} from 'react-native';


export const Header = props => {
    return (
        <View>
        <Text style={[{ fontSize: 16}, props.textcolor]}>
            {props.title}
        </Text>
        </View>
    );
};
