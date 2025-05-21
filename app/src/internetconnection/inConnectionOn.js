// import NetInfo from '@react-native-community/netinfo';
// const CONNECTION_THRESHOLD = 0.5; // Minimum value to consider the connection "on"

// function isConnectionOn() {
//   return new Promise((resolve) => {
//     NetInfo.fetch().then((connectionInfo) => {
//       const connectionValue = parseFloat(connectionInfo.details.strength || 0); // Extract a value from the connection info
//       if (connectionValue >= CONNECTION_THRESHOLD) {
//         resolve(true); // Connection is on
//       } else {
//         resolve(false); // Connection is off
//       }
//     });
//   });
// }

import NetInfo from '@react-native-community/netinfo';

function isConnectionOn() {
  return new Promise((resolve) => {
    NetInfo.fetch().then((connectionInfo) => {
      const isConnected = connectionInfo.isConnected;
      const connectionType = connectionInfo.type;

      if (
        isConnected &&
        (connectionType === 'wifi' || connectionType === 'cellular')
      ) {
        resolve(true); // Connection is on
      } else {
        resolve(false); // Connection is off
      }
    });
  });
}

function checkInternetConnection() {
  return new Promise((resolve) => {
    fetch('https://dns.google/resolve?name=www.google.com')
      .then((response) => {
        if (response.status === 200) {
          resolve(true); // Internet is working
        } else {
          resolve(false); // Internet is not working
        }
      })
      .catch(() => {
        resolve(false); // Internet is not working
      });
  });
}

async function checkInternetStatus() {
  // const isConnected = await isConnectionOn();
  // if (isConnected) {
  return checkInternetConnection();
  // } else {
  //   return false;
  // }
}

export default checkInternetStatus;
