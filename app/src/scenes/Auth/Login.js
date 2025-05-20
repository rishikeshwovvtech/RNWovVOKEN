import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import SimpleButton from '../../components/SimpleButton';
import R from '../../R';
import styles from './LoginStyle';
import SimpleTextInput from '../../components/SimpleTextInput';
import Socialmedia from '../../components/Socialmedia';
import {RootView} from '../../components/RootView';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <RootView customStyle={{backgroundColor: R.colors.darkviolet}}>
        <Image source={R.images.OKEN_Logo} style={styles.logoImage} />

        <SimpleTextInput
          placeholder="John Doe"
          placeholderTextColor={R.colors.white}
          imgStyle={styles.image}
          customViewStyle={styles.nameContainer}
          img={R.images.Avatar}
          tintColor={R.colors.white}
        />

        <SimpleTextInput
          placeholder="Password"
          placeholderTextColor={R.colors.white}
          customViewStyle={styles.passwordContainer}
          secureTextEntry={true}
          imgStyle={styles.image}
          img={R.images.Password}
          tintColor={R.colors.white}
        />

        <Text style={styles.passwordText}>Forgot Password ?</Text>

        <SimpleButton title="Login" customStyle={styles.LoginButtonView} />

        <Socialmedia
          title={'or Login via'}
          facebook={R.images.Facebook_Active}
          google={R.images.Google_Active}
          twitter={R.images.Twitter_Active}
          instagram={R.images.Instagram_Active}
        />

        <View style={styles.viewText}>
          <Text style={styles.accountText}>Don't have an account ?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Index')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </RootView>
    );
  }
}
