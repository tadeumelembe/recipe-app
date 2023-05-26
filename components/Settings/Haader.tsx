import React from "react"
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { Text, View } from "../../components/Themed"
import style from "../../constants/style";
import { IHead } from "../types";
import { useAuth } from "../../contexts/authContext";

const Header: React.FC<IHead> = ({ navigation }) => {

    const { signOut } = useAuth()
    return (
        <View style={localStyle.root}>
            <Pressable onPress={() => navigation.goBack()} style={localStyle.buttonSection}>
                <MaterialIcons name="arrow-back-ios" size={20} color="black" />
                <Text style={localStyle.backText}>Back</Text>
            </Pressable>

            <Pressable onPress={() => signOut()} style={localStyle.buttonSection}>
                <MaterialIcons name="logout" size={20} color="black" />
                <Text style={localStyle.logOutText}>Log Out</Text>
            </Pressable>
        </View>
    )
}

export default Header;

const localStyle = StyleSheet.create({
    root: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 5
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
    logOutText: {
        ...style.textPrimary,
        ...style.fontNunitoBold,
        ...style.fontM,
        paddingLeft: 5
    }
})