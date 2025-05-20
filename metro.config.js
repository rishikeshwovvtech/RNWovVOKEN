const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {
    wrapWithReanimatedMetroConfig,
  } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */



const defaultConfig = getDefaultConfig(__dirname);

const config = mergeConfig(defaultConfig, {
    // Your custom Metro configuration (if any) goes here
  });

  module.exports = wrapWithReanimatedMetroConfig(config);