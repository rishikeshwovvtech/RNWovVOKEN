import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity,} from 'react-native';
import R from '../../R';
import styles from './SignUpStyle';
import SimpleTextInput from '../../components/SimpleTextInput';
import SimpleButton from '../../components/SimpleButton';
import Socialmedia from '../../components/Socialmedia';
import scale from '../../utils/Scale';

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
        <ScrollView style={{flex: 1, marginBottom: scale(30),}}>
          <SimpleTextInput placeholder="John Doe" placeholderTextColor={R.colors.white}
                           customViewStyle={styles.textInputContainer} imgStyle={styles.image}
                           img={R.images.Avatar} tintColor={R.colors.white}/>
          <SimpleTextInput placeholder="John.doe@gmail.com" placeholderTextColor={R.colors.white}
                           imgStyle={styles.image} img={R.images.Email}
                           tintColor={R.colors.white} customViewStyle={styles.textInputContainer}/>
          <SimpleTextInput placeholder="Password" placeholderTextColor={R.colors.white}
                           imgStyle={styles.image} img={R.images.Password}
                           tintColor={R.colors.white} customViewStyle={styles.textInputContainer}/>

          <Socialmedia title={'or Login via'} facebook={R.images.Facebook_Active} google={R.images.Google_Active}
                                              twitter={R.images.Twitter_Active} instagram={R.images.Instagram_Active}/>

          <SimpleButton title="Sign Up"
                        onPress={() => this.props.navigation.navigate('MainNavigator')}
                        customStyle={styles.ButtonView} />

          <View style={styles.viewText}>
            <Text style={styles.accountText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.signUpText}>Login here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

    );
  }
}
