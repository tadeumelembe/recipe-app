
import useColorScheme from '../../hooks/useColorScheme';
// hooks/useThemeColors.ts
//import { useColorScheme } from 'react-native';
import Colors from './Colors';

const useThemeColors = () => {
  const colorScheme = useColorScheme()
  const colors = Colors[colorScheme]

  return colors
}

export default useThemeColors