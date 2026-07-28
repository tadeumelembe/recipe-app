import React from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { FlatList, View } from "../../src/components/Themed";
import { Screen } from "../../src/presentation/components/ui/Screen";
import style from "../../src/constants/style";

import Header from "../../src/components/Head";
import FeedCard from "../../src/components/TabHome/FeedCard";
import { IHomeItem } from "../../src/components/types";
import { data } from "../../src/constants/profileData";

export default function TabHome() {

    function renderItem({ item }: ListRenderItemInfo<IHomeItem>) {
        return <FeedCard item={item} />;
    }


    return (
        <Screen style={localStyles.root}>
            <View style={style.horizontalPadding}>
                <Header />
            </View>
            <FlatList
                data={data}
                contentContainerStyle={localStyles.flatlistContainer}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListFooterComponent={
                    <View style={{ marginTop: 15 }} />
                }
            />
        </Screen>
    )
}

const localStyles = StyleSheet.create({
    root: {
        paddingHorizontal: 0,

    },
    flatlist: {
        width: '100%',
        paddingTop: 15,
    },
    flatlistContainer: {
        ...style.horizontalPadding,
    }
})
