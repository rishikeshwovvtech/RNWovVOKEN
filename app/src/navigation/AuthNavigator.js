import React, {useContext, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {CardStyleInterpolators} from '@react-navigation/stack';
//local imports
import {Login} from '../scenes/Auth/Login/Login';
import {LoginWithOTP} from '../scenes/Auth/LoginWithOTP/LoginWithOTP';
import {LoginWithPhone} from '../scenes/Auth/LoginWithPhone/LoginWithPhone';
import {SignupVoucher} from '../scenes/Auth/SignupVoucher';
import {NewSignupVoucher} from '../scenes/Auth/NewSignupVoucher';

import {VerifyPhone} from '../scenes/Auth/VerifyPhone/VerifyPhone';
import {NewSignUp} from '../scenes/Auth/SignUp/NewSignup';
import {NewSignupNonMendatoryFields} from '../scenes/Auth/SignUp/NewSignupNonMendatoryFields'
import {OnBoardingSceen} from '../scenes/Auth/OnboardingScreen';
import {AppleSignIn} from '../scenes/Auth/AppleSigningflow/AppleSignIn';
import {SocialSignUPVerifyPage} from '../scenes/Auth/AppleSigningflow/SocialSignUPVerifyPage';
import {ForgotPassword} from '../scenes/Auth/ForgotPassword/ForgotPassword';
import {PasswordChange} from '../scenes/Auth/ForgotPassword/PasswordChange';
import {VerifypasswordForgot} from '../scenes/Auth/ForgotPassword/VerifypasswordForgot';

import {SetNewPassword} from '../scenes/Auth/SetNewPassword/SetNewPassword';
import {TermsConditions} from '../scenes/Drawer/TermsConditions';
import {BackHeader} from '../components/BackHeader';
import {GOOGLE_WEB_CLIENT_ID} from '../utils/Constants';
import {MultipleMallScreen} from '../scenes/Auth/MultipleMallScreen/MultipleMallScreen';
import {GoggleSignIn} from '../scenes/Auth/GoggleSignIn/GoggleSignIn';
import {NotificationWebView} from '../scenes/Notification/NoitificationWebView';
import {NewInternetScreen} from '../internetconnection/NewInternetScreen';
import {Nexus247SelectionScreen} from "../scenes/Auth/Nexus247SelectionScreen/Nexus247SelectionScreen"
const AuthStack = createStackNavigator();

export const AuthNavigator = (props) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
      forceConsentPrompt: true,
    });
  }, []);

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="VerifyPhone" component={VerifyPhone} />
      <AuthStack.Screen
        name="AppleVerifyPhone"
        component={SocialSignUPVerifyPage}
      />
      <AuthStack.Screen name="GoggleSignIn" component={GoggleSignIn} />
      <AuthStack.Screen name="LoginWithOTP" component={LoginWithOTP} />
      <AuthStack.Screen name="LoginWithPhone" component={LoginWithPhone} />
      <AuthStack.Screen name="AppleSignIn" component={AppleSignIn} />
      <AuthStack.Screen name="Nexus247SelectionScreen" component={Nexus247SelectionScreen}/>
      <AuthStack.Screen name="SignUp" component={NewSignUp} />
      <AuthStack.Screen name="NewSignUp" component={NewSignupNonMendatoryFields} />
      <AuthStack.Screen name="SignupVoucher" component={SignupVoucher} />
      <AuthStack.Screen name="NewSignupVoucher" component={NewSignupVoucher} />
      <AuthStack.Screen
        name="MultipleMallScreen"
        component={MultipleMallScreen}
      />

      <AuthStack.Screen name="PasswordChange" component={PasswordChange} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen
        name="VerifypasswordForgot"
        component={VerifypasswordForgot}
      />
      <AuthStack.Screen name="SetNewPassword" component={SetNewPassword} />
      <AuthStack.Screen
        name="NewInternetScreen"
        component={NewInternetScreen}
      />
      <AuthStack.Screen
        name="TermsConditions"
        component={TermsConditions}
        options={{
          headerShown: true,
          header: () => (
            <BackHeader
              title={'Terms and Conditions'}
              customOnPress={() =>
                props.navigation.navigate('SignUp', {isMdodal: true})
              }
            />
          ),
        }}
      />
      <AuthStack.Screen
        name="NotificationWebView"
        component={NotificationWebView}
      />
    </AuthStack.Navigator>
  );
};
