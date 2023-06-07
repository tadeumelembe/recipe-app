/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import { Children, PropsWithChildren, forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView as DefaultScrollView,
  ImageBackground as DefaultImageBackground,
  TextInput as DefaultTextInput,
  TouchableOpacity as DefaultTouchableOpacity,
  FlatList as DefaultFlatList,
  Modal as DefaultModal,
  StyleSheet,
  Pressable,
  StatusBar,
  Animated,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CollapsibleProps, CollapsibleRef, MaterialTabBar, MaterialTabItem, TabProps, Tabs } from 'react-native-collapsible-tab-view';


import { FlashList, FlashListProps } from "@shopify/flash-list";
import { Ionicons } from '@expo/vector-icons';

import { Controller } from "react-hook-form";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import styles from '../constants/style';
import Layout from '../constants/Layout';


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
export type ModalProps = ThemeProps & DefaultView['props'] & {
  title?: string;
  resizable?: boolean;
};
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type ImageBackgroundProps = ThemeProps & DefaultImageBackground['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'] & {
  control: object;
  name: string;
  rules: object;
};
export type TopTabBarProps = ThemeProps & CollapsibleProps;
export type FlatListProps = ThemeProps & FlashListProps<any>;
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacity['props'] & {
  btnText?: string,
  btnSecondary?: boolean,
  iconName?: string,
  loading?: boolean,
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
    <FlashList
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}

      {...otherProps}
    />
  )
}

export function TopTabBar(props: TopTabBarProps) {
  const { children, lightColor, darkColor, ...otherProps } = props

  const indicatorColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');
  const inactiveTabColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textMuted2');

  const localStyles = StyleSheet.create({
    tabContainer: {
      flex: 1,
    },
    headerContainerStyle: {
      shadowOpacity: 0,
      elevation: 0,
      ...styles.borderSeparator
    },
    tabBarLabel: {
      ...styles.fontM,
      ...styles.fontNunitoRegular,
      paddingHorizontal: 15
    },
    tabBarIndicatorStyle: {
      backgroundColor: indicatorColor
    }
  })

  return (
    <Tabs.Container
      lazy={true}
      allowHeaderOverscroll={true}
      containerStyle={localStyles.tabContainer}
      headerContainerStyle={localStyles.headerContainerStyle}
      renderTabBar={(props) =>
        <MaterialTabBar
          inactiveColor={inactiveTabColor}
          indicatorStyle={localStyles.tabBarIndicatorStyle}
          TabItemComponent={(props) =>
            <MaterialTabItem
              activeColor="#000"
              {...props}
            />
          }
          labelStyle={localStyles.tabBarLabel}
          {...props}
          scrollEnabled
        />
      }
      {...otherProps}
    >
      {children}
    </Tabs.Container>
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

  return <DefaultScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={[styles.scrollContainer, style]} {...otherProps} />;
}

export function ImageBackground(props: ImageBackgroundProps) {
  const { style, ...otherProps } = props

  return <DefaultImageBackground style={[styles.backgorundImage, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { placeholder, name, rules, control, style, ...otherProps } = props
  const localStyle = StyleSheet.create({
    errorBorder: {
      borderBottomWidth: 1,
      borderBottomColor: 'red',
    },
    errorText: {
      ...styles.fontNunitoMedium,
      ...styles.fontS,
      color: 'red',
      paddingTop: 2
    }
  })
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (

        <DefaultView>
          <Text style={[styles.fontNunitoRegular, styles.fontR]}>{placeholder}</Text>
          <DefaultTextInput
            value={value}
            onChangeText={onChange}
            style={[styles.textInput, error && localStyle.errorBorder, style]}
            {...otherProps}
          />
          {error &&
            <Text style={localStyle.errorText}>{error.message || 'Error'}</Text>
          }
        </DefaultView>

      )}
    />
  );
}

export function Button(props: TouchableOpacityProps) {
  const { btnText, style, loading, btnSecondary, ...otherProps } = props

  return (
    <DefaultTouchableOpacity style={[btnSecondary == true ? styles.btnSecondary : styles.btn, style]} {...otherProps}>
      {loading ?
        <ActivityIndicator size={'small'} color={'#fff'} />
        :
        <Text style={[styles.fontNunitoBold, styles.fontM, btnSecondary ? styles.btnSecondaryText : styles.btn1Text]}>{btnText}</Text>
      }
    </DefaultTouchableOpacity>
  )
}

export function ButtonRounded(props: TouchableOpacityProps) {
  const { btnText, iconName, style, ...otherProps } = props

  return (
    <DefaultTouchableOpacity style={[styles.btnRounded, style]} {...otherProps}>
      <Ionicons name={iconName} size={30} color={'#fff'} />
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
  size: number;
}) {
  return <Ionicons {...props} />;
}

export const Modal = forwardRef((props: ModalProps, ref) => {
  const { children, resizable, title, ...otherProps } = props

  const maxHeight = Layout.window.height
  const maxModalHeight = Layout.window.height * 0.9

  const [visibility, setVisibility] = useState(false)
  const [shouldHide, setShouldHide] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [animatedValue, setAnimatedValue] = useState(0)
  const animatedValueRef = useRef(animatedValue).current;

  const localStyle = StyleSheet.create({
    root: {
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      flex: 1,
      backgroundColor: '#0000',
      zIndex: 10,
    },
    opacityView: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    },
    contentContainer: {
      width: '100%',
      backgroundColor: 'rgba(0,0,0,.3)',
      //  height: contentHeight
      maxHeight: '55%'
    },
    content: {
      width: '100%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      backgroundColor: '#fff',
      paddingBottom: 20,
      paddingTop: 10,
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor: '#0000',
      ...styles.horizontalPadding,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    modalTitle: {

    }
  })

  const modalAnimation = useRef(new Animated.Value(animatedValueRef)).current;

  const heightAnimation = (endValue: number) => {
    return Animated.timing(modalAnimation, {
      toValue: endValue,
      duration: 1000,
      useNativeDriver: false,
    }).start()
  }

  useImperativeHandle(ref, () => ({
    open,
    close
  }))

  const close = () => {
    setVisibility(false)
  }

  const open = () => {
    setVisibility(true)
  }

  useEffect(() => {
    if (contentHeight) return
  }, [contentHeight])

  useEffect(() => {
    setContentHeight(maxHeight * 0.3)
  }, [])

  useEffect(() => {
    if (!visibility) return setContentHeight(maxHeight * 0.3)
  }, [visibility])

  const resizeHeight = (pageY: number) => {
    if (!resizable) return
    const minHeight = maxHeight * 0.03
    const positionY = maxHeight - pageY

    if (positionY <= minHeight) {
      return setShouldHide(true)
    }

    setContentHeight(positionY)
  }

  const handleRelease = (pageY: number) => {
    if (!resizable) return

    const positionY = maxHeight - pageY
    const minHeight = maxHeight * 0.05
    const setMaxHeight = maxHeight * 0.60

    if (positionY <= minHeight) setVisibility(false)

    if (positionY >= setMaxHeight) setContentHeight(maxModalHeight)

  }

  return (
    <DefaultModal
      transparent={true}
      visible={visibility}
      style={[localStyle.root]}
      animationType="fade"

    >
      <Pressable onPress={() => setVisibility(false)} style={localStyle.opacityView} />

      <View style={[localStyle.contentContainer, !resizable && { maxHeight: '50%' }]}>

        <View style={localStyle.content}>
          <View
            style={localStyle.iconContainer}
            onMoveShouldSetResponder={() => true}
            onResponderMove={(evt) => {
              resizeHeight(evt.nativeEvent.pageY)
            }}
            onResponderRelease={(evt) => handleRelease(evt.nativeEvent.pageY)}
          >
            <View />
            <Text style={styles.textH3}>{title}</Text>
            <TouchableOpacity onPress={() => close()}>
              <Ionicons name="close" size={24} color={Colors.light.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ backgroundColor: '#fff', height: 'auto' }}>
            <Container style={{ paddingTop: 10 }}>
              {children}

              <View style={{ height: 20 }} />

            </Container>
          </ScrollView>
        </View>

      </View>

    </DefaultModal>
  )
})
