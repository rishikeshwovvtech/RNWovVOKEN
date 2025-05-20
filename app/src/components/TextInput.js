import React from 'react';
import {TextInput,} from 'react-native';
import R from '../R';
import scale from '../utils/Scale';

const CustomTextInput = (props) => {
    return (
        <React.Fragment>
            <TextInput
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                secureTextEntry={props.secureTextEntry}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}
                style={[props.customStyle,{
                    borderBottomWidth: 1,
                    borderBottomColor: R.colors.coolGrey,
                    marginVertical: 10,
                    width:'60%',
                    height:scale(45)
                }]}
            />
        </React.Fragment>
    );
};
export default CustomTextInput;


