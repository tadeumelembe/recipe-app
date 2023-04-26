import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";

import { Avatar, View, Text, IoniconsIcon, ImageBackground } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import style from "../../../constants/style";
import { IHomeFeedCard } from "../types";



const InteractionButtons: React.FC = () => {
    const [bookmarked, setBookemarked] = useState(false)
    const [liked, setLiked] = useState(false)
    const colorScheme = 'light'
    const iconSize = 20;
    return (
        <View style={[style.row, { justifyContent: 'flex-end' }]}>
            <View style={localStyle.statistics_section}>
                <View style={localStyle.iteract_buttons}>
                <Pressable onPress={() => setLiked(!liked)}>
                        {liked ?
                            <Ionicons name="heart" size={22} color={Colors.light.tint} />
                            :
                            <Ionicons name="heart-outline" size={22} color={Colors.light.icon} />
                        }
                    </Pressable>
                    <Text style={localStyle.statistic_info}>32</Text>
                </View>
                <View style={localStyle.iteract_buttons}>
                    <FontAwesome name="comment-o" size={20} color={Colors.light.icon} />
                    <Text style={localStyle.statistic_info}>8</Text>
                </View>

                <View style={localStyle.iteract_buttons}>
                    <Ionicons name="share-social-outline" size={22} color={Colors.light.icon} />
                    <Text style={localStyle.statistic_info}>8</Text>
                </View>
            </View>
            <Pressable onPress={() => setBookemarked(!bookmarked)}>
                {!bookmarked ?
                    <Ionicons name="bookmark" size={22} color={Colors.light.tint} />
                    :
                    <Ionicons name="bookmark-outline" size={22} color={Colors.light.icon} />
                }
            </Pressable>
        </View>
    )
}

export default InteractionButtons

const localStyle = StyleSheet.create({
    
    statistics_section: {
        ...style.row,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iteract_buttons: {
        ...style.row,
        alignItems: 'center'
    },
    statistic_info:{
        ...style.fontR,
        ...style.textMuted2,
        paddingLeft:2
    }
})