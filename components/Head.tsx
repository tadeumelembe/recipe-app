import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

import { Container, IoniconsIcon, ScrollView, Text, View } from "../../components/Themed";
import style from "../../constants/style";
import styles from "../../constants/style";
import { IHead } from "./types";

const Header: React.FC<IHead> = ({ navigation, type }) => {
    return (
        <View>
            {type === 'back' ?
                <View style={localStyle.topHead}>
                    <Pressable onPress={() => navigation.goBack()} style={localStyle.buttonSection}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="#030F09" />
                        <Text style={localStyle.backText}>Back</Text>
                    </Pressable>
                </View>
                :
                <View style={[localStyle.root]}>
                    <Text>Logo</Text>
                    <View style={localStyle.iconContainer}>
                        <View style={{ paddingRight: 15 }}>
                            <Ionicons name="notifications-outline" size={22} color="#030F09" />
                        </View>
                        <View>
                            <Ionicons name="mail-outline" size={22} color="#030F09" />
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default Header

const localStyle = StyleSheet.create({
    root: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    iconContainer: {
        flexDirection: 'row',
    },
    buttonSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        ...style.fontR,
        ...style.fontNunitoRegular,
        paddingLeft: 0,
        ...style.textMuted2
    },
    topHead: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical:5
    },
});