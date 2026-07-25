module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // react-native-worklets/plugin replaces react-native-reanimated/plugin in
    // Reanimated 4, and must stay last.
    plugins: ['react-native-worklets/plugin'],
  };
};
