import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

import { Avatar, View, Text, IoniconsIcon } from "../../../components/Themed";
import style from "../../../constants/style";
import { IHomeFeedCard } from "../types";


const FeedCard: React.FC<IHomeFeedCard> = ({ navigation, item }) => {

    return (
        <View style={[localStyle.root, style.card]}>
            <View 
            style={{
                ...style.row,
                ...style.bgNone,
                ...localStyle.header
            }}
            >
                <Avatar size="xs" />
                <View style={{ marginLeft: 10, ...style.bgNone }}>
                    <Text>{item.profile_name}</Text>
                    <Text>{item.created_at}</Text>
                </View>
            </View>
            <View style={{ ...style.bgNone, padding: 15 }}>
                <View style={{ ...style.row, ...style.bgNone, ...localStyle.titleRow }}>
                    <Text style={[localStyle.title, style.fontL, style.fontNunitoMedium]}>{item.title}</Text>

                    <Ionicons name="heart-outline" size={30} color="gray" />
                </View>

                <Text style={localStyle.description}>{item.description}</Text>
            </View>
        </View>
    )
}

export default FeedCard

const localStyle = StyleSheet.create({
    root: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.05)'
    },
    titleRow: {
        justifyContent: 'space-between',
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        //
    }
})