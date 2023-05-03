import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Octicons } from '@expo/vector-icons';

import { View, Text, Avatar } from "../../../components/Themed"
import style from "../../../constants/style";
import Colors from "../../../constants/Colors";

const HeaderProfile: React.FC = () => {
    return (
        <View style={localStyle.root}>

            <View style={localStyle.rowView}>
                <Text style={localStyle.title}>My Kitchen</Text>
                
                <TouchableOpacity style={localStyle.settingSection}>
                    <Ionicons name="settings-outline" size={22} color="black" />
                    <Text style={localStyle.settingsText}>Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={[localStyle.rowView, { marginTop: 30 }]}>
                <Avatar size="xl" />

                <View style={[localStyle.column, { marginLeft: 15 }]}>
                    <View style={localStyle.column}>
                            <Text style={localStyle.profileName}>Nick Evans</Text>
                        <Text style={localStyle.secondaryText}>Nick Evans</Text>
                    </View>

                    <View style={[localStyle.row,{alignItems:'center'}]}>
                        <Text style={localStyle.secondaryText}>584 followers</Text>
                        <View style={{ marginHorizontal: 8 }}>
                            <Octicons name="dot-fill" size={15} color="black" />
                        </View>
                        <Text style={localStyle.secondaryText}>23k likes</Text>
                    </View>
                </View>
            </View>
            
        </View>
    )
}

const localStyle = StyleSheet.create({
    root: {
        flexDirection: 'column',
        flex: 1,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        flex: 1
    },
    column: {
        flexDirection: 'column',
        flex: 1
    },
    rowView: {
        ...style.row,
        flex: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        ...style.fontXl,
        flex: 0,

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
    },
    profileName: {
        ...style.fontM,
        ...style.fontNunitoBold
    },
    secondaryText: {
        ...style.fontR,
        ...style.textMuted2,
        ...style.fontNunitoRegular
    }
})

export default HeaderProfile