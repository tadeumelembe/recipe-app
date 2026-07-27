import React from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { FlatList, View } from "../../components/Themed";
import { Screen } from "../../presentation/components/ui/Screen";
import style from "../../constants/style";

import Header from "../../components/Head";
import FeedCard from "../../components/TabHome/FeedCard";
import { IHomeItem } from "../../components/types";
import { data } from "../Profile/data";



interface data {
    profile_name: string
}

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
                // ItemSeparatorComponent={(({highlighted}) => (<View style={{borderTopColor:'rgba(0,0,0,.05)',borderWidth:0.,marginBottom:20}} />))}
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