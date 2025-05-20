import React, {Component} from 'react';
import {Text, View, ScrollView, Image,} from 'react-native';
import SimpleButton from '../../../components/SimpleButton';
import R from '../../../R';
import styles from './IndexStyle';
import registrationStyles from './RegistrationWithOTPStyles';
import confirmationStyles from './confirmationPopUpStyle';
import verificationStyles from './VerificationCodeStyle ';
import SignUp from '../SignUp';
import SimpleTextInput from '../../../components/SimpleTextInput';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import OtpInputs from 'react-native-otp-textinput';
export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      screenConfirmationPopUp: true,
      flag: true,
    };
  }

  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  };
  renderElement(currentindex) {
    if (currentindex == 0) {
      return <SignUp navigation={this.props.navigation} />;
    }
    if (this.state.flag) {
      return this.registrationWithOTP();
    } else {
      return this.verificationCode();
    }
  }
  registrationWithOTP() {
    return (
      <View>
        <Text style={registrationStyles.text}>Enter your phone number</Text>
        <View style={registrationStyles.textInputView}>
          <SimpleTextInput
            placeholder="+91 98523456622"
            placeholderTextColor={R.colors.white}
            imgStyle={registrationStyles.image}
            img={R.images.Mobile}
            tintColor={R.colors.white}
          />
          <Image source={R.images.Right_Tick} style={registrationStyles.tickImage} />
        </View>

        <View style={registrationStyles.ButtonView}>
          <SimpleButton
            title="Next"
            onPress={() => this.setState({screenConfirmationPopUp: false})}
          />
        </View>
      </View>
    );
  }
  verificationCode() {
    return (
      <View>
          <View style={verificationStyles.container}>

          <Text style={verificationStyles.text}>
            Verification codes OTP
          </Text>
          <Text style={verificationStyles.otpText}>
            An OTP has been send to you number
          </Text>
          <Text style={verificationStyles.numberText}>
            +91 XXXXXX0123
          </Text>
        </View>

        <OtpInputs
          handleChange={(code) => console.log(code)}
          numberOfInputs={4}
          textInputStyle={verificationStyles.textInputStyle}
          containerStyle={verificationStyles.containerStyle}
        />
        <View style={verificationStyles.validTextView}>
          <Text style={verificationStyles.validText}>
            The OTP is valid for 5 minutes
          </Text>

          <View style={verificationStyles.resendOtpView}>
            <Text style={verificationStyles.resendOtpTextOne}>
              Didn't receive the code?
            </Text>
            <Text style={verificationStyles.resendOtpTextTwo}>
              Resend in 00:15
            </Text>
          </View>

        </View>
        <View style={verificationStyles.buttonView}>
          <SimpleButton
            title="Verify"
            onPress={() => this.props.navigation.navigate('Location')}
          />
        </View>
      </View>
    );
  }

  render() {
    return this.state.screenConfirmationPopUp ? (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={R.images.OKEN_Logo} style={styles.logoImage} />
        </View>
        <SegmentedControlTab
          values={['Sign Up using Email', 'Register using OTP']}
          selectedIndex={this.state.selectedIndex}
          onTabPress={this.handleIndexChange}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={styles.activeTabTextStyle}
          tabTextStyle={styles.tabTextStyle}
        />

        <ScrollView>
          <View style={styles.view}>
            {this.renderElement(this.state.selectedIndex)}
          </View>
        </ScrollView>
      </View>
    ) : (
      <View style={confirmationStyles.container}>
        <View style={confirmationStyles.logoContainer}>
          <Image
            source={R.images.OKEN_Logo}
            style={confirmationStyles.logoImage}
          />
        </View>

        <Text style={confirmationStyles.phoneNumberText}>
          Login with phone number
        </Text>
        <Text style={confirmationStyles.numberText}>
          +91 98523456622
        </Text>

        <Text style={confirmationStyles.codeText}>
          We will send the authentication code
        </Text>
        <Text
          style={confirmationStyles.text}>
          to the phone number you entered
        </Text>
        <Text
          style={confirmationStyles.continueText}>
          Do you want to continue?
        </Text>
        <View
          style={confirmationStyles.buttonView}>
          <SimpleButton
            title="Cancel"
            customTxtStyle={{color: R.colors.white}}
            customStyle={confirmationStyles.cancelButton}
            onPress={() => {
              this.setState({screenConfirmationPopUp: true});
              this.registrationWithOTP();
            }}
          />
          <SimpleButton
            title="Next"
            customTxtStyle={{color: R.colors.white}}
            customStyle={confirmationStyles.nextButton}
            onPress={() => {
                this.setState({flag: false, screenConfirmationPopUp: true});
              this.verificationCode()
            }}
          />
        </View>
      </View>
    );
  }
}


