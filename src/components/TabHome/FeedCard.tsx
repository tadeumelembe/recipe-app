import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";

import { Avatar, View, Text, IoniconsIcon, ImageBackground } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import style from "../../../constants/style";
import { IHomeFeedCard } from "../types";
import InteractionButtons from "./IteractionButtons";



const FeedCard: React.FC<IHomeFeedCard> = ({ navigation, item }) => {
    const [bookmarked, setBookemarked] = useState(false)
    const [liked, setLiked] = useState(false)
const colorScheme = 'light'
    return (
        <View style={localStyle.root}>
            <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={localStyle.image_bg}
                imageStyle={localStyle.image}
            >
                <View style={localStyle.header}>
                    <Avatar size="xs" />
                    <View style={{ marginLeft: 10, ...style.bgNone }}>
                        <Text style={localStyle.profile_name}>{item.profile_name}</Text>
                        <Text style={localStyle.created_at}>{item.created_at}</Text>
                    </View>
                </View>
            </ImageBackground>
            {!item.image &&
                <Image
                    style={localStyle.image}
                    source={`${item.image}`}
                />
            }
            <View style={localStyle.content}>
                <View style={localStyle.title_row}>
                    <Text style={localStyle.title}>{item.title}</Text>
                    
                </View>
                {item.description &&
                    <Text numberOfLines={2} style={localStyle.description}>{item.description}</Text>
                }
               <InteractionButtons />
            </View>
        </View>
    )
}

export default FeedCard

const localStyle = StyleSheet.create({
    root: {
        width: '100%',
        minHeight: 100,
        marginBottom: 20,
        maxWidth: 395,
        ...style.card
    },
    title_row: {
        justifyContent: 'space-between',
        ...style.row,
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'rgba(255,255,255,.95)',
        maxHeight: 62,
        alignItems: 'flex-start',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        ...style.row,
    },
    profile_name: {
        ...style.fontS
    },
    created_at: {
        ...style.fontS,
        ...style.textMuted2
    },
    title: {
        ...style.fontL,
        ...style.fontNunitoMedium
    },
    content: {
        padding: 15,
        borderBottomRightRadius:10,
        borderBottomLeftRadius:10,
    },
    
    description: {
        ...style.fontR,
        ...style.fontNunitoRegular,
        ...style.textMuted2,
        paddingVertical: 15
    },
    image: {
        borderTopLeftRadius: 10.8,
        borderTopRightRadius: 10.8,
    },
    image_bg: {
        height: 200,
        justifyContent: 'flex-start'
    }
})