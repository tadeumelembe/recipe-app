import { StyleSheet } from "react-native";
import Layout from "./Layout";

const horizontal_padding = 30;

export default StyleSheet.create({
  container: {
    //width: Layout.window.width - 30,
    alignItems: 'center',
    backgroundColor: '#fff',
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
  }
});