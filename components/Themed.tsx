/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView as DefaultScrollView,
  ImageBackground as DefaultImageBackground,
  TextInput as DefaultTextInput,
  TouchableOpacity as DefaultTouchableOpacity,
  FlatList as DefaultFlatList
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import styles from '../constants/style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = 'light' //useColorScheme();
  const colorFromProps = props[theme];
  
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type ImageBackgroundProps = ThemeProps & DefaultImageBackground['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type FlatListProps = ThemeProps & DefaultFlatList['props'];
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacity['props'] & {
  btnText: string
};
export type AvatarProps = ViewProps & { size?: string };

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function FlatList(props: FlatListProps) {
  const { ...otherProps } = props;
  return (
    <DefaultFlatList
      style={{ width: '100%' }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...otherProps}
    />
  )
}

export function Avatar(props: AvatarProps) {

  const { style, size, ...otherProps } = props;
  let width = 30
  let height = 30

  switch (size) {
    case 'xxs':
      width = 20
      height = 20
      break;
    case 'xs':
      width = 35
      height = 35
      break;
    case 'sm':
      width = 42
      height = 42
      break;
    case 'md':
      width = 55
      height = 55
      break;

    case 'lg':
      width = 70
      height = 70
      break;

    case 'xl':
      width = 82
      height = 82
      break;

    default:
      break;
  }

  return <DefaultView
    style={[{ ...styles.avatar, width: width, height: height }, style]}
    {...otherProps}
  />
}

export function Container(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const insets = useSafeAreaInsets();
  
  return <DefaultView style={[styles.container, { backgroundColor, paddingTop: insets.top }, style,]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, ...otherProps } = props

  return <DefaultScrollView showsVerticalScrollIndicator={false} style={[styles.scrollContainer, style]} {...otherProps} />;
}

export function ImageBackground(props: ImageBackgroundProps) {
  const { style, ...otherProps } = props

  return <DefaultImageBackground style={[styles.backgorundImage, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { placeholder, style, ...otherProps } = props

  return (
    <DefaultView>
      <Text style={[styles.fontNunitoRegular, styles.fontR, styles.textMuted]}>{placeholder}</Text>
      <DefaultTextInput style={[styles.textInput, style]} {...otherProps} />
    </DefaultView>
  );
}

export function TouchableOpacity(props: TouchableOpacityProps) {
  const { btnText, style, ...otherProps } = props

  return (
    <DefaultTouchableOpacity style={[styles.btn1, style]} {...otherProps}>
      <Text style={[styles.fontNunitoBold, styles.fontM, styles.btn1Text]}>{btnText}</Text>
    </DefaultTouchableOpacity>
  )
}

export function TextButton(props: TouchableOpacityProps) {
  const { btnText, style, ...otherProps } = props

  return (
    <DefaultTouchableOpacity style={[{ backgroundColor: 'transparent' }, style]} {...otherProps}>
      <Text style={[styles.fontNunitoBold, styles.fontM, styles.btnTextLink]}>{btnText}</Text>
    </DefaultTouchableOpacity>
  )
}

export function IoniconsIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size:number;
}) {
  return <Ionicons {...props} />;
}