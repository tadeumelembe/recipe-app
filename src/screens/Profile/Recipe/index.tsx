import React from "react"
import { StyleSheet } from "react-native"
import { Tabs } from "react-native-collapsible-tab-view"
import { View } from "../../../../components/Themed"
import style from "../../../../constants/style"
import RecipeItem from "../../../components/Profile/RecipeItems"
import { data } from "../data"

const Recipe: React.FC = () => {
    function renderItem({ item }) {
        return <RecipeItem item={item} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <Tabs.FlatList
                data={data}
                contentConatinerStyle={localStyles.flatListConatinerStyle}
                keyExtractor={(item) => item.id}
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