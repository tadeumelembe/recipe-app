import React from "react"
import { StyleSheet } from "react-native"
import { Tabs } from "react-native-collapsible-tab-view"

import RecipeItem from "./RecipeItems"

import { View } from "../Themed"
import style from "../../constants/style"
import { data } from "../../constants/profileData"


const Recipe: React.FC = () => {

    function renderItem({ item }: any) {
        return <RecipeItem item={item} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <Tabs.FlatList
                data={data}
                contentContainerStyle={localStyles.flatListConatinerStyle}
                keyExtractor={(item: any) => item.id}
                style={localStyles.flatListStyle}
                renderItem={renderItem}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListFooterComponent={
                    <View style={{ marginTop: 15 }} />
                }
                scrollEventThrottle={10}
                numColumns={2}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Recipe

const localStyles = StyleSheet.create({
    flatListStyle: {
        ...style.horizontalPadding,
        width: '100%',
        paddingTop: 15,
    },
    flatListConatinerStyle: {
        justifyContent: 'center'

    }
})