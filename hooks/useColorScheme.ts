import { useColorScheme as _useColorScheme } from 'react-native';

// RN 0.86 widened ColorSchemeName from 'light' | 'dark' | null to
// 'light' | 'dark' | 'unspecified'. The app only themes light and dark, so
// collapse 'unspecified' to light and keep a narrow return type that can index
// the Colors map.
export default function useColorScheme(): 'light' | 'dark' {
  return _useColorScheme() === 'dark' ? 'dark' : 'light';
}
