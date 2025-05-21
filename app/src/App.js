import React, {useContext, useEffect} from 'react';
import {LogBox, TextInput, Text, TouchableOpacity} from 'react-native';
// local imports
import {RootNavigator} from './Routes';
import {AuthProvider} from './context/auth/AuthProvider';
import {WovVMapsProvider} from './scenes/WovVMaps/WovvMapsContext';
import {TourGuideProvider} from 'rn-tourguide';
import {Button} from '../../node_modules/rn-tourguide/lib/components/Button.js';
import {View} from 'react-native';
import R from './R.js';
import {initialWindowMetrics} from 'react-native-safe-area-context';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// hides logs in app
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const CleverTap = require('clevertap-react-native');

const App = () => {
  useEffect(() => {
    // codePush.disallowRestart();
    CleverTap.setDebugLevel(3);
  });

  return (
    <AuthProvider>
      <WovVMapsProvider>
        <RootNavigator />
      </WovVMapsProvider>
    </AuthProvider>
  );
};

export default App;

// codePush({
//   checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
//   installMode: codePush.InstallMode.ON_NEXT_RESTART,
// })(App);
