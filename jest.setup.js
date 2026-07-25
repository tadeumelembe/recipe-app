// Reanimated 4 runs on react-native-worklets, whose native module has no JS
// implementation under Jest. The mock provides the JS-only Animated surface;
// react-native-worklets/jest/resolver.js (wired up as `resolver` in the jest
// config) keeps the .native entry points from being resolved at all.
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);
