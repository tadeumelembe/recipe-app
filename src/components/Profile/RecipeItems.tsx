import React from "react"
import { StyleSheet } from "react-native"
import { Text, View } from "../../../components/Themed"
import style from "../../../constants/style"

const RecipeItem: React.FC = () => {
    return (
        <View style={localStyles.card}>
            <Text>Recipe</Text>
        </View>
    )
}

export default RecipeItem

const localStyles = StyleSheet.create({
    card: {
        ...style.card,
        height:150,
        width:'50%'
    }
})