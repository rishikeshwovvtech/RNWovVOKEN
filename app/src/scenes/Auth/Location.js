import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity,} from 'react-native';
import R from '../../R';
import styles from './LocationStyle';
import CustomButton from '../../components/CustomButton';
import SimpleTextInput from '../../components/SimpleTextInput';

export default class Location extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
          <Image source={R.images.OKEN_Logo} style={styles.logoImage} />



          <Text style={styles.textStyle}> Where are you now?</Text>
          <Text style={styles.messageText}>
            To provide you best search results
          </Text>
          <Text style={styles.messageTextStyle}>
            application needs to know your
          </Text>
          <Text style={styles.messageTextStyle}> Current location </Text>

          <CustomButton
            title="Use Current Location"
            customStyle={styles.customStyle}
            imgStyle={styles.imgStyle}
            img={R.images.TargetLocation}
            customTxtStyle={styles.customTxtStyle}
            tintColor={R.colors.voilet}
          />

        <View style={styles.view}>
          <Text style={styles.text}>----------------</Text>
          <Text style={styles.text}>or connect via</Text>
          <Text style={styles.text}>----------------</Text>
        </View>

        <SimpleTextInput
          placeholder="Enter Location manually"
          placeholderTextColor={R.colors.white}
          customViewStyle={styles.customViewStyle}
          imgStyle={styles.image}
          img={R.images.Search}
          tintColor={R.colors.white}
        />
        <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MainNavigator')}>
        <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
