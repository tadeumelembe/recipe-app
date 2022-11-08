import { StyleSheet } from "react-native";
import Colors from "./Colors";
import Layout from "./Layout";

const horizontal_padding = 30;
const colorScheme = 'light'

export default StyleSheet.create({
  container: {
    //width: Layout.window.width - 30,
    alignItems: 'center',
    backgroundColor: Colors[colorScheme].background,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    flex: 1
  },
  scrollContainer: {
    paddingHorizontal: horizontal_padding,
    width: '100%'
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
    fontSize: 14
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
  textInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    fontFamily: 'nunito-regular',
    color: '#030F09d',
    fontSize: 16
  }
});