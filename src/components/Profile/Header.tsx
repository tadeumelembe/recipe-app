import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, Octicons } from '@expo/vector-icons';

import { View, Text, Avatar } from "../../../components/Themed"
import style from "../../../constants/style";
import Colors from "../../../constants/Colors";
import { IProfileHeader } from "../types";



const HeaderProfile: React.FC<IProfileHeader> = ({navigation, headerHeight}) => {
    return (
        <View style={[localStyle.root,{height:headerHeight}]}>
            <View style={localStyle.topHead}>
                <Text style={localStyle.title}>My Kitchen</Text>

                <TouchableOpacity onPress={()=>navigation.navigate('Settings')} style={localStyle.settingSection}>
                    <Ionicons name="settings-outline" size={22} color="black" />
                    <Text style={localStyle.settingsText}>Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={localStyle.profileInfoSection}>
                <Avatar size="xl" />

                <View style={localStyle.nameSection}>
                    <View>
                        <Text style={localStyle.profileName}>Nick Evans</Text>
                        <Text style={localStyle.secondaryText}>Nick Evans</Text>
                    </View>

                    <View style={localStyle.statsSection}>
                        <Text style={localStyle.secondaryText}>584 followers</Text>
                        <View style={{ marginHorizontal: 8 }}>
                            <Octicons name="dot-fill" size={10} color="gray" />
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
        width: '100%',
        ...style.paddingHorizontal
    },
    profileInfoSection: {
        flexDirection: 'row',

        marginTop: 30,
        flex: 0,
        width: '100%'
    },
    nameSection: {
        marginLeft: 15,
        justifyContent: 'space-evenly'
    },
    statsSection: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    topHead: {
        flexDirection: 'row',
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
        flexDirection: 'row',
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