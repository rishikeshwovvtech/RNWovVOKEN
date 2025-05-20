import React, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import R from '../../../R';
import styles from './LoginOTPStyle';
import {SafeAreaView} from 'react-native-safe-area-context';

import {SimpleButton, CTextInput, BackHeader} from '../../../components/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const LoginWithOTP = ({route, navigation}) => {
  const [phoneNo, setPhoneNo] = useState('');

  const validate = () => {
    if (phoneNo == '' || phoneNo.length < 10) {
      setPhoneNoError(true);
    } else {
      setPhoneNoError(false);
      navigation.navigate('LoginWithPhone', {phoneNo: phoneNo});
    }
  };

  const [phoneNoError, setPhoneNoError] = useState(false);
  return (
    <SafeAreaView
      edges={['right', 'bottom', 'left']}
      style={{backgroundColor: R.colors.primaryBrand2, flex: 1}}
    >
      <BackHeader logo={true} navigation={navigation} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardShouldPersistTaps={'handled'}
        enableResetScrollToCoords={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        extraHeight={10}
      >
        <Image
          resizeMode="contain"
          source={R.images.newapplogo}
          style={{
            width: '100%',
            marginTop: 20,
            height: '100%',
            alignSelf: 'center',
            flex: 4,
          }}
        />

        <View style={{flex: 3, backgroundColor: R.colors.primaryBrand2}}>
          <Text style={styles.text}>Enter your phone number</Text>
          <View style={styles.textInputView}>
            <CTextInput
              placeholder="Your Valid Mobile Number"
              onChangeText={(text) => setPhoneNo(text)}
              errorText={'Enter valid Phone Number'}
              keyboardType="numeric"
              showErrorText={phoneNoError}
              maxLength={10}
            />
          </View>

          <SimpleButton
            onPress={() => validate()}
            title={'NEXT'}
            customTxtStyle={styles.btntext}
            customStyle={styles.signinBtn}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
