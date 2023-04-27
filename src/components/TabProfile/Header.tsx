import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { View, Text } from "../../../components/Themed"
import style from "../../../constants/style";
import Colors from "../../../constants/Colors";

const Header: React.FC = () => {
    return (
        <View style={localStyle.root}>
            <Text style={localStyle.title}>My Kitchen</Text>
            <TouchableOpacity style={localStyle.settingSection}>
                <Ionicons name="settings-outline" size={22} color="black" />
                <Text style={localStyle.settingsText}>Settings</Text>
            </TouchableOpacity>
        </View>
    )
}

const localStyle = StyleSheet.create({
    root: {
        ...style.row,
        justifyContent: 'space-between'
    },
    title: {
        ...style.fontXl,
        ...style.fontNunitoBold,
    },
    settingSection: {
        ...style.row,
        flex: 0,
        alignItems: 'center'

    },
    settingsText: {
        ...style.fontM,
        ...style.fontNunitoBold,
        color: Colors.light.tint,
        paddingLeft: 5
    }
})

export default Header