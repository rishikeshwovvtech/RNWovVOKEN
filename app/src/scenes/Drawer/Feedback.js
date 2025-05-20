import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import R from '../../R';
import SimpleButton from '../../components/SimpleButton';
import styles from './FeedbackStyle'
export default class Feedback extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text
          style={styles.feedbackText}>
          Share your feedback
        </Text>
        <Text
          style={styles.thankText}>
          Thank you so much for taking time to share your Valuable feedback.This
          survey will take just 5 minutes to finish.
        </Text>
        <Text
          style={styles.shareText}>
          Please share your experiences using the OKEN app.
        </Text>

        <TouchableOpacity
          style={styles.touchableView}>
          <Text style={styles.text}>
            Awesome
          </Text>
        </TouchableOpacity>
          <TouchableOpacity style={[styles.touchableView,{backgroundColor: R.colors.white,}]}>
              <Text style={[styles.text,{color: R.colors.black,}]}>
                  Good
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchableView,{backgroundColor: R.colors.white,}]}>
              <Text style={[styles.text,{color: R.colors.black,}]}>
                  Bad
              </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchableView,{backgroundColor: R.colors.white,}]}>
              <Text style={[styles.text,{color: R.colors.black,}]}>
                  Worst
              </Text>
          </TouchableOpacity>
            <SimpleButton
                title="Next"
                customTxtStyle={styles.customTxtStyle}
                customStyle={styles.customStyle}
            />

      </View>
    );
  }
}
