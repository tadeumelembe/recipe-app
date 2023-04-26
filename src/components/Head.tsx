import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

import { Container, IoniconsIcon, ScrollView, Text, View } from "../../components/Themed";
import styles from "../../constants/style";
import { IHead } from "./types";

const Head: React.FC<IHead> = ({ navigation }) => {

    return (
        <View style={[localStyles.root, styles.paddingHorizontal]}>
            <Text>Logo</Text>
            <View style={localStyles.iconContainer}>
                <View style={{ paddingRight: 15 }}>
                    <Ionicons name="notifications-outline" size={22} color="#000" />
                </View>
                <View>
                    <Ionicons name="mail-outline" size={22} color="#000" />
                </View>
            </View>
        </View>
    )
}

export default Head

const localStyles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    iconContainer: {
        flexDirection: 'row',
    },
});