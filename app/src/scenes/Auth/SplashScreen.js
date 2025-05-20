import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Login from './Login';
import R from '../../R';

import styles from './SplashScreenStyle';
import {RootView} from '../../components/RootView';
class SplashScreen extends Component {
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      this.props.navigation.navigate('Login');
    }, 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <RootView>
        <View style={styles.viewContainer}>
          <Image source={R.images.OKEN_Logo_Icon} style={styles.logoImage} />
        </View>

        <View style={styles.logoTextContainer}>
          <Image source={R.images.OKEN_Logo_Text} style={styles.logoText} />
        </View>
      </RootView>
    );
  }
}

export default SplashScreen;
