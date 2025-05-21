import React from 'react';
import {AuthContext} from './AuthContext';
import {AuthReducer} from './AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SET_DATA, REMOVE_DATA} from './AuthActionTypes';

import CryptoJS from 'react-native-crypto-js';

export const AuthProvider = (props) => {
  const initialAuthState = {
    isLoading: true,
    isLogInSkipped: false,
    userToken: null,
    userId: null,
    userObject: null,
    partyCode: null,
    userPoints: null,
    mallDetails: null,
    parkingDetails: null,
    fcmTokenDetails: null,
    showTourGuide: true,
    tempAuthToken: null,
    fcmId: null,
    location:null,
    ipAddress:null,
  };
  const [authState, dispatch] = React.useReducer(AuthReducer, initialAuthState);
  var key = CryptoJS.enc.Base64.parse('2b7e151628aed2a6abf7158809cf4f3c');
  var iv = CryptoJS.enc.Base64.parse('S4duQOLzqeKP3rf8nSb5Ow==');

  const authAction = React.useMemo(
    () => ({
      getData: async () => {
        try {
          let userInfo = await AsyncStorage.getItem('userInfo');
          var userObj = null;
          if (userInfo != null) {
            let bytes = CryptoJS.AES.decrypt(userInfo, key, {iv: iv});
            let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            userObj = decryptedData;
          }
        } catch (e) {}
        dispatch({type: SET_DATA, payload: {...userObj, isLoading: false}});
      },
      setData: async (data) => {
        try {
          const jsonObj = JSON.stringify(data);
          let ciphertext = CryptoJS.AES.encrypt(jsonObj, key, {
            iv: iv,
          }).toString();
          await AsyncStorage.setItem('userInfo', ciphertext);
        } catch (e) {}
        dispatch({type: SET_DATA, payload: data});
      },
      removeData: async () => {
        try {
          await AsyncStorage.removeItem('userInfo');
        } catch (e) {}
        dispatch({type: REMOVE_DATA});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{authState, authAction, dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
};
