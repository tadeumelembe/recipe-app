import React from "react"
import { StyleSheet, Image } from "react-native"
import { ImageBackground, Text, View } from "../../../components/Themed"
import Layout from "../../../constants/Layout"
import style from "../../../constants/style"
import { IProfileRecipeItem } from "./types"

const cardWidth = (Layout.window.width - 15) * 40 / 100

const RecipeItem: React.FC<IProfileRecipeItem> = ({ item }) => {
    console.log(item)
    return (
        <View style={localStyle.card}>
            <Image
                source={`${item.image}`}
                style={localStyle.image}
            />
            <View style={localStyle.nameSection}>
                <Text numberOfLines={1} style={localStyle.name}>{item.title}</Text>
            </View>
        </View>
    )
}

export default RecipeItem

const localStyle = StyleSheet.create({

    card: {
        ...style.card,
        height: cardWidth,
        width: '47%',
        marginBottom: 10,
        alignSelf: 'center',
    },
    image: {
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        width: '100%',
        height: cardWidth-35
    },
    nameSection: {
        alignItems: 'center',
        justifyContent:'center',
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height:35
    },
    name: {
       // paddingVertical: 8,
        ...style.fontNunitoRegular,
        ...style.fontM
    }
})