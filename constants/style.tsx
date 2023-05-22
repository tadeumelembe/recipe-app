import React from "react";
import { ColorSchemeName, StatusBar, Platform, StyleSheet } from "react-native";
import { useThemeColor } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "./Colors";
import Layout from "./Layout";

const horizontal_padding = 20;
const colorScheme = 'light'

export default StyleSheet.create({

  container: {
    paddingHorizontal: horizontal_padding,
    backgroundColor: Colors[colorScheme].background,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  bgNone: {
    backgroundColor: '#ffffff00'
  },
  inline: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    //width: '100%'
    flex: 1
  },
  paddingHorizontal: {
    paddingHorizontal: horizontal_padding,
  },
  scrollContainer: {
    paddingHorizontal: 0,
    width: '100%',
    backgroundColor: '#fff'
  },
  backgorundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%'
  },
  horizontalPadding: {
    paddingHorizontal: horizontal_padding
  },
  fontXl: {
    fontSize: 24
  },
  fontL: {
    fontSize: 18
  },
  fontM: {
    fontSize: 16
  },
  fontR: {
    fontSize: 14
  },
  fontS: {
    fontSize: 12
  },
  fontNunitoBold: {
    fontFamily: 'nunito-bold'
  },
  fontNunitoMedium: {
    fontFamily: 'nunito-medium'
  },
  fontNunitoRegular: {
    fontFamily: 'nunito-regular'
  },
  textH1: {
    fontSize: 24,
    fontFamily: 'nunito-bold'
  },
  textH2: {
    fontSize: 20,
    fontFamily: 'nunito-bold'
  },
  textPrimary: {
    color: Colors[colorScheme].tint
  },
  textMuted: {
    color: Colors[colorScheme].textMuted
  },
  textMuted2: {
    color: Colors[colorScheme].textMuted2
  },
  avatar: {
    borderRadius: 100,
    backgroundColor: Colors[colorScheme].avatarBackground
  },
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    fontFamily: 'nunito-regular',
    color: '#030F09',
    fontSize: 16,
    paddingTop: 8,
    paddingHorizontal: 5
  },
  btn1: {
    width: '100%',
    height: 45,
    borderRadius: 8,
    backgroundColor: Colors[colorScheme].tint,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 8,
    elevation: 17,
  },
  btn2: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors[colorScheme].tint,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: horizontal_padding,
    shadowColor: "rgba(0,0,0,0.6)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 8,
    elevation: 17,
  },
  btnSecondary: {
    backgroundColor: Colors[colorScheme].background,

    borderColor: 'rgba(0,0,0,.08)',
    borderWidth: 2,
  },
  btn1Text: {
    color: '#fff',
  },
  btnTextLink: {
    color: Colors[colorScheme].tint
  },
  borderSeparator: {
    borderBottomColor: Colors[colorScheme].borderSeparator,
    borderBottomWidth: 0.9,
  },
  card: {
    backgroundColor: Colors[colorScheme].card,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 0.8,

        // borderColor: 'rgba(0,0,0,.08)',
        // borderWidth: 0.8,
      },
    })
  },
});