import React from "react";
import { StyleSheet } from "react-native";

import { Avatar, View, Text } from "../../../components/Themed";
import useGlobalStyles from "../../../constants/style";
import { IHomeFeedCard } from "../types";


const FeedCard: React.FC<IHomeFeedCard> = () => {

    const style = useGlobalStyles()

    return (
        <View style={[localStyle.root, style.card]}>
            <View style={{ ...style.row, ...style.bgNone, ...localStyle.header }}>
                <Avatar size="sm" />
                <View style={{ marginLeft: 10, ...style.bgNone }}>
                    <Text>Profile Name</Text>
                    <Text>2h ago</Text>
                </View>
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
    header: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    }
})