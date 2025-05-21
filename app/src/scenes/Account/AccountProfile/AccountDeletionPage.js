import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
//local imports
import CheckBox from '@react-native-community/checkbox';
import analytics from '@react-native-firebase/analytics';
import R from '../../../R';
import {BackHeader, CModal, RootView} from '../../../components';
import {AuthContext} from '../../../context/auth/AuthContext';
import SubHeader from '../../../components/SubHeader';
import {TextInput} from 'react-native-gesture-handler';
import {fetchApiService} from '../../../internetconnection/CommonApiService';
import DeleteProgressBar from './DeleteProgressBar';
import {
  AUTH_BASE_URL,
  Register_ID,
  Temp_Token,
  TENANT_ID,
  USER_APP_ID,
} from '../../../utils/Constants';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
export const AccountDeletionPage = (props) => {
  const {authAction, authState} = useContext(AuthContext);
  const [isMaleSelected, setMaleSelection] = useState(false);
  const [ShowErrorModal, setShowErrorModal] = useState(false);
  const [ErrorModalMessage, setErrorModalMessage] = useState(null);
  const [deletedOrNot, setDeletedOrNot] = useState(false);
  const [modalDeleteVisible, setmodalDeleteVisible] = useState(false);
  const [InputDataError, setInputDataError] = useState(false);
  const [dText, setDtext] = useState('');
  const CleverTap = require('clevertap-react-native');
  const delete_Account_Fun = () => {
    if (dText !== 'YES') {
      setInputDataError(true);
      return false;
    }
    setmodalDeleteVisible(true);

    const data = JSON.stringify({
      wovv_User_Code: +authState?.userId,
      party_Code: +authState.PartyCode || +authState.partyCode,
      party_Name: authState?.userObject?.fullName,
      party_MobNo: authState?.userObject?.mobilePhone,
      party_email: authState?.userObject?.email,
      pageUrl: 'DeletionAccount',
    });
    const config = {
      method: 'post',
      url: `${AUTH_BASE_URL}/ipos/rest/FYND/DeletionAccountFYND?tenantId=_${TENANT_ID}`,
      headers: {
        access_Token: authState.userToken
          ? authState.userToken
          : authState.tempAuthToken,
        ...(authState.userToken
          ? {userId: authState.userId}
          : {fcmId: authState.fcmId}),
        'Content-Type': 'application/json',
        pageUrl: 'DeletionAccountFYND',
        event: 'AccountDeletion',
        action: 'onAccountDelete ',
        user_App_ID: USER_APP_ID,
      },
      data: data,
    };

    fetchApiService(config, authAction, authState)
      .then((response) => {
        console.log(
          '🚀 ~ AccountDeletionPage.js:68 ~ .then ~ response:',
          response,
        );
        if (response?.data?.message?.type === 'SUCCESS') {
          setDeletedOrNot(true);
        } else {
          setmodalDeleteVisible(false);
          setErrorModalMessage(
            'Dear customer, there seems to have been a network issue while you tried to delete your account. Please try again.',
          );
          setShowErrorModal(true);
        }
      })
      .catch((error) => {
        setmodalDeleteVisible(false);
      });
  };

  const clearAsync = async () => {
    //clevertap

    var clevertap_props = {
      identity:
        authState.PartyCode?.toString() || authState.partyCode?.toString(),

      'User Status': 'INACTIVE',
    };

    CleverTap.onUserLogin(clevertap_props);

    await analytics()
      .logEvent('deleteaccount_event', {
        user_ID: authState?.userId,
        mall_name: authState?.mallDetails?.oko_Row_Desc,
      })
      .then((res) => {
        {
        }
      })
      .catch((e) => {});

    try {
      let userInfo = {
        ...authState,
        isLoading: true,
        isLogInSkipped: false,
        userToken: null,
        userId: null,
        userObject: null,
        PartyCode: null,
        partyCode: null,
        parkingDetails: null,
        fcmTokenDetails: null,
        mallDetails: null,
      };
      await authAction.setData(userInfo);
      setmodalDeleteVisible(false);
      const isSignedIn = await GoogleSignin.isSignedIn();

      if (isSignedIn) {
        await GoogleSignin.signOut();
      }

      await props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthNavigator',
            params: {
              screen: 'Login',
            },
          },
        ],
      });
    } catch (error) {
      await props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 'AuthNavigator',
            params: {
              screen: 'Login',
            },
          },
        ],
      });
    }
  };
  const handleOnChange = (txt) => {
    setDtext(txt);
    setInputDataError(false);
  };
  return (
    <>
      <BackHeader navigation={props.navigation} />
      <SubHeader title={'Delete Account'} />
      <RootView>
        <View style={styles.mainView}>
          <Text style={styles.firsttext}>
            Are you sure you want to delete your NexusOne account ?
          </Text>

          <Text style={styles.secondText}>
            Once your account is deleted, your personal information, Shop & Win
            earnings and history will be permanently removed from NexusOne app.
          </Text>

          <View style={styles.checkboxText}>
            <CheckBox
              disabled={false}
              value={isMaleSelected}
              onValueChange={(newvalue) => setMaleSelection(newvalue)}
              tintColors={{true: R.themes.accountTextColour}}
              onAnimationType={'fill'}
              offAnimationType={'fill'}
              onCheckColor={R.themes.accountTextColour}
              onTintColor={R.themes.accountTextColour}
              style={{height: 20, top: 3}}
            />
            <Text style={styles.checkboxtext}>
              I Agree and Confirm to delete my NexusOne account
            </Text>
          </View>

          {isMaleSelected && (
            <View style={styles.mainTextinputcontainer}>
              <Text style={styles.textinputtext}>Please write here</Text>
              <TextInput
                //selectionColor={R.themes.darkButtonColor}
                textAlign="left"
                style={styles.textInputStyle}
                placeholder={`Type "YES" to confirm`}
                multiline={false}
                autoFocus={true}
                placeholderTextColor={R.colors.black}
                onChangeText={(text) => handleOnChange(text)}
                cursorColor={R.themes.accountTextColour}
              />

              {InputDataError && (
                <Text style={styles.errorText}>Enter "YES" in capital</Text>
              )}
              <TouchableOpacity
                onPress={() => [delete_Account_Fun()]}
                style={styles.touchableView}
              >
                <Text style={styles.btntxt}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          <DeleteProgressBar
            isVisible={modalDeleteVisible}
            isDeleted={deletedOrNot}
            onPressClearAsync={() => {
              clearAsync();
            }}
          />
          <CModal
            isVisible={ShowErrorModal}
            modalMsg={ErrorModalMessage}
            onPressModal={() => setShowErrorModal(!ShowErrorModal)}
            isForm={'Signup'}
          />
        </View>
      </RootView>
    </>
  );
};

export default AccountDeletionPage;
const styles = StyleSheet.create({
  errorText: {
    marginTop: '1%',
    color: 'red',
    fontSize: R.dimensions.wp(3),
  },
  mainTextinputcontainer: {
    marginTop: '10%',
    alignSelf: 'center',
  },
  checkboxtext: {
    color: R.colors.primaryBrand2,
    alignSelf: 'center',
    flexWrap: 'wrap',
    fontSize: 12,
    fontWeight: '500',
  },
  textinputtext: {
    fontWeight: '400',
    fontSize: R.dimensions.wp(3),
    color: R.colors.black,
  },
  checkboxText: {
    flexDirection: 'row',
    marginTop: 25,
    alignSelf: 'center',
    marginHorizontal: 10,
    flexWrap: 'wrap',
  },
  textInputStyle: {
    color: R.themes.darkTextColor,
    width: R.dimensions.wp(80),
    flexWrap: 'wrap',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingTop: '2%',
    fontFamily: R.fonts.primaryRegular,
    fontSize: R.dimensions.wp(4),
    alignSelf: 'center',
    paddingVertical: '2%',
  },
  mainView: {
    flex: 1,
    backgroundColor: R.themes.backgroundColor,
    alignContent: 'center',
  },
  firsttext: {
    color: R.themes.accountTextColour,
    alignSelf: 'center',
    fontSize: R.dimensions.wp(5),
    marginHorizontal: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  secondText: {
    marginTop: 15,
    fontSize: 15,
    marginHorizontal: 15,
    color: R.themes.accountTextColour,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  touchableView: {
    alignSelf: 'center',
    backgroundColor: R.themes.deleteAccountButton,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: R.dimensions.wp(40),
    marginTop: '5%',
  },
  touchableViewc: {
    backgroundColor: R.colors.coolGrey,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  btntxt: {
    color: R.themes.backgroundColor,
    alignSelf: 'center',
    fontWeight: '700',
  },
});
