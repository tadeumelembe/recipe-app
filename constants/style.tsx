import React from "react";
import { ColorSchemeName, Platform, StyleSheet } from "react-native";
import { useThemeColor } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "./Colors";
import Layout from "./Layout";

const horizontal_padding = 20;
const colorScheme = 'light'

export default StyleSheet.create({

  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: horizontal_padding,

    backgroundColor: Colors[colorScheme].background,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1
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
    flex:1
  },
  paddingHorizontal: {
    paddingHorizontal: horizontal_padding,
  },
  scrollContainer: {
    paddingHorizontal: horizontal_padding,
    width: '100%',
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
    paddingTop: 8
  },
  btn1: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors[colorScheme].tint,
    alignItems: 'center',
    justifyContent: 'center',
    /*
        shadowColor: "rgba(0,0,0,0.6)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 8,
        elevation: 7,
    */

  },
  btn1Text: {
    color: '#fff',
  },
  btnTextLink: {
    color: Colors[colorScheme].tint
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
          height: 12
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 0,

      },
    })
  },
});