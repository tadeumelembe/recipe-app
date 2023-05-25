import { StyleSheet } from "react-native";

import styles from "../../../constants/style";

export default StyleSheet.create({
    container: {
        paddingTop: 0
    },
    scrollView: {
        paddingHorizontal: 0,
        flex: 1
    },
    header: {
        width: '100%',
        borderBottomRightRadius: 100,
        justifyContent: 'center',
    },
    headerImage: {
        height: 300,
    },
    headerText: {
        ...styles.fontNunitoBold,
        ...styles.fontXl
    },
    headerImageView: {
        ...styles.horizontalPadding,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    pageTitle: {
        ...styles.fontNunitoRegular,
        ...styles.fontR,
        ...styles.textH3,
        paddingTop: 25,
        paddingBottom: 25
    },
    inputView: {
        marginBottom: 30
    }
})