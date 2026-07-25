import React from "react"
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { View, Text, Avatar, Button, ImageBackground } from "../Themed"
import style from "../../constants/style";
import Colors from "../../constants/Colors";
import { IRecipeDetailsHeader } from "../types";



const HeaderRecipee: React.FC<IRecipeDetailsHeader> = ({ item, headerHeight }) => {
    const router = useRouter();

    return (
        <View style={[localStyle.root, { minHeight: headerHeight }]}>

            <ImageBackground
                source={item.image}
                resizeMode="cover"
                style={localStyle.image_bg}
                imageStyle={localStyle.image}
            >
                <View style={localStyle.head}>
                    <View style={localStyle.topHead}>
                        <TouchableOpacity onPress={() => router.back()} style={localStyle.buttonSection}>
                            <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                            <Text style={localStyle.backText}>Back</Text>
                        </TouchableOpacity>

                        {/* Route params are URL search params, so the recipe is passed
                            field by field rather than as a whole object. */}
                        <TouchableOpacity
                            onPress={() => router.push({
                                pathname: '/cooking-mode',
                                params: { id: item.id, title: item.title, image: item.image },
                            })}
                            style={[localStyle.buttonSection, localStyle.playButton]}
                        >
                            <Ionicons name="play-outline" size={24} color="white" />
                            <Text style={localStyle.playText}>Cook now</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={localStyle.title}>{item.title}</Text>
                </View>

            </ImageBackground>

        </View>
    )
}

const localStyle = StyleSheet.create({
    root: {
        width: '100%',
    },
    head: {
        height: '100%',
        backgroundColor: 'rgba(40, 41, 40, 0.5)',
        ...style.horizontalPadding,
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    topHead: {
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1
    },
    buttonSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playButton: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,.45)',
        paddingHorizontal: 8,
        paddingVertical: 3
    },
    backText: {
        ...style.fontR,
        ...style.fontNunitoRegular,
        paddingLeft: 0,
        ...style.textMuted2,
        color: '#fff'
    },
    image: {
        height: '100%'
    },
    image_bg: {
        height: '100%',
        justifyContent: 'flex-start',
    },
    title: {
        ...style.textH1,
        color: '#fff'
    },
    playText: {
        ...style.fontS,
        ...style.fontNunitoBold,
        color: '#fff'
    }
})

export default HeaderRecipee