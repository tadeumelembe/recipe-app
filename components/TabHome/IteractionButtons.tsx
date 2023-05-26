import { Ionicons, FontAwesome } from "@expo/vector-icons";
import React, { useState, useRef, useEffect, Ref } from "react";
import { Image, Animated, TouchableOpacity, Pressable, StyleSheet } from "react-native";

import { Avatar, View, Text, IoniconsIcon, ImageBackground } from "../../components/Themed";
import Colors from "../../constants/Colors";
import style from "../../constants/style";
import { IHomeFeedCard } from "../types";



const InteractionButtons: React.FC = () => {
    const [bookmarked, setBookemarked] = useState(false)
    const [liked, setLiked] = useState(false)
    const colorScheme = 'light'
    const iconSize = 20;

    const scaleBookemarkButton = useRef(new Animated.Value(1)).current;
    const scaleLikeButton = useRef(new Animated.Value(1)).current;

    function scaleButtonSequence(buttonToScale: any) {
        Animated.sequence([
            Animated.timing(buttonToScale, {
                toValue: 0.7,
                duration: 70,
                useNativeDriver: true,
            }),
            Animated.timing(buttonToScale, {
                toValue: 1.2,
                duration: 70,
                useNativeDriver: true,
            }),
            Animated.timing(buttonToScale, {
                toValue: 1,
                duration: 70,
                useNativeDriver: true,
            })
        ]).start();
    }

    function handleBookmarked() {
        setBookemarked(!bookmarked)
        scaleButtonSequence(scaleBookemarkButton)
    }

    function handleLiked() {
        setLiked(!liked)
        scaleButtonSequence(scaleLikeButton)
    }



    return (
        <View style={[style.row, { justifyContent: 'flex-start' }]}>

            <View style={localStyle.statistics_section}>

                <View style={localStyle.iteract_buttons}>
                    <Pressable onPress={() => handleLiked()}>
                        <Animated.View style={{ transform: [{ scale: scaleLikeButton }] }}>
                            <Ionicons name={liked ? "heart" : "heart-outline"} size={iconSize} color={liked ? Colors.light.tint : Colors.light.icon} />
                        </Animated.View>
                    </Pressable>
                    <Text style={localStyle.statistic_info}>32</Text>
                </View>

                <TouchableOpacity style={[localStyle.iteract_buttons, { marginHorizontal: 30 }]}>
                    <FontAwesome name="comment-o" size={19} color={Colors.light.icon} />
                    <Text style={localStyle.statistic_info}>8</Text>
                </TouchableOpacity>

                <Pressable style={localStyle.iteract_buttons}>
                    <Ionicons name="share-social-outline" size={iconSize} color={Colors.light.icon} />
                    <Text style={localStyle.statistic_info}>8</Text>
                </Pressable>

            </View>

            <Pressable onPress={() => { handleBookmarked() }}>

                <Animated.View style={{ transform: [{ scale: scaleBookemarkButton }] }}>
                    <Ionicons name={bookmarked ? "bookmark" : 'bookmark-outline'} size={iconSize} color={bookmarked ? "black" : Colors.light.icon} />
                </Animated.View>

            </Pressable>

        </View>
    )
}

export default InteractionButtons

const localStyle = StyleSheet.create({

    statistics_section: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    iteract_buttons: {
        ...style.row,
        flex: 0,
        alignItems: 'center',

    },
    statistic_info: {
        ...style.fontR,
        ...style.textMuted2,
        paddingLeft: 2
    }
})