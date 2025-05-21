import axios from 'axios';

import {navigate, resetNavigation} from '../utils/NavigationService';
import checkInternetStatus from './inConnectionOn';
import publicIP from 'react-native-public-ip';
import {
  AUTH_BASE_URL,
  Register_ID,
  Temp_Token,
  TENANT_ID,
  USER_APP_ID,
} from '../utils/Constants';
import {AuthContext} from '../context/auth/AuthContext';
import {useContext} from 'react';
import DeviceInfo from 'react-native-device-info';
import {fetch} from '@react-native-community/netinfo';

export const fetchApiService = async (
  config,
  action,
  authState,
  locationapi = false,
  apitype = '',
) => {
  let locationDetails = null;
  if (locationapi == false) {
    let headers = config.headers;
    locationDetails = await getLocationDetails(action, authState, headers);

    await fetch().then((state) => {
      headers['deviceIP'] = state.details?.ipAddress;
    });
    headers['user_App_ID'] = USER_APP_ID;
    headers['IspId'] = locationDetails?.ip;
    headers[
      'location'
    ] = `{"Latitude":${locationDetails?.latitude} ,"Longitude": ${locationDetails?.longitude}}`;
    headers['area'] = locationDetails?.zipcode;

    config.headers = headers;
  }

  const clearAsync = async () => {
    await action.removeData();
    try {
      if (apitype == '') resetNavigation('AuthNavigator', 'Login', 'null');
    } catch (error) {}
  };

  const connectionOn = await checkInternetStatus();

  if (!connectionOn) {
    navigate('NewInternetScreen');
  }

  // const start = performance.now();
  const response = await axios(config);
  try {
    console.log('🚀 ~ CommonApiService.js:58 ~ response:', response);
  } catch (error) {}
  // console.log('🚀 ~ CommonApiService.js:58 ~ response:', response);
  // const end = performance.now(); // End time
  // console.log(
  //   `API ${config.headers.pageUrl} call took ${(end - start) / 1000} seconds`,
  // );

  if (response?.data?.message?.code == 1005 || response?.data?.[3001]) {
    clearAsync();
  } else {
    return response;
  }
};

export const getPublicIP = async () => {
  return await publicIP()
    .then((ip) => {
      return ip;
    })
    .catch((error) => {
      return null;
      // 'Unable to get IP address.'
    });
};

export const getLocationDetails = async (authAction, authState, headers) => {
  return await getPublicIP().then((ipAddress) => {
    if (ipAddress === authState?.ipAddress) {
      return authState?.location;
    } else {
      let data = JSON.stringify({
        ip: ipAddress,
      });
      let config = {
        method: 'post',
        url: `${AUTH_BASE_URL}/ipos/rest/JRConversion/GetLocationV1?tenantId=_${TENANT_ID}`,
        headers: {
          // access_Token:
          //   headers?.['access_Token'] ||
          //   headers?.['access_token'] ||
          //   authState?.userToken ||
          //   authState?.tempAuthToken,
          // ...(authState.userId
          //   ? {
          //       userId:
          //         headers?.['userId'] ||
          //         headers?.['userid'] ||
          //         authState.userId,
          //     }
          //   : {fcmId: headers?.['fcmId'] || authState.fcmId}),
          // access_Token: headers?.['access_Token'] || headers?.['access_token'],
          // ...(headers?.['userId'] || headers?.['userid']
          //   ? {userId: headers?.['userId'] || headers?.['userid']}
          //   : {fcmId: headers?.['fcmId']}),
          access_Token: Temp_Token,
          Register_Id: Register_ID,
          'Content-Type': 'application/json',
          user_App_ID: USER_APP_ID,
        },
        data: data,
      };

      return fetchApiService(config, authAction, authState, true)
        .then(async function (response) {
          const locationData = response?.data?.data?.Location;
          if (locationData != undefined && locationData != null) {
            locationData &&
              (await authAction.setData({
                ...authState,
                tempAuthToken: headers?.['access_Token'],
                fcmId: headers?.['fcmId'],
                location: locationData,
                ipAddress: ipAddress,
              }));
          }
          return locationData;
        })
        .catch(function (error) {
          return null;
        });
    }
  });
};
