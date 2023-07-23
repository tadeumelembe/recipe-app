import React from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { Container, FlatList, ScrollView, View } from "../../components/Themed";
import style from "../../constants/style";

import { RootTabScreenProps } from "../../../types";
import Header from "../../components/Head";
import FeedCard from "../../components/TabHome/FeedCard";
import { IHomeItem } from "../../components/types";
import { data } from "../Profile/data";



interface data {
    profile_name: string
}

export default function TabHome({ navigation }: RootTabScreenProps<'TabHome'>) {

    function renderItem({ item }: ListRenderItemInfo<IHomeItem>) {
        return <FeedCard navigation={navigation} item={item} />;
    }


    return (
        <Container style={localStyles.root}>
            <View style={style.horizontalPadding}>
                <Header navigation={navigation} />
            </View>
            <FlatList
                data={data}
                contentContainerStyle={localStyles.flatlistContainer}
                keyExtractor={(item) => item.id}
                estimatedItemSize={1000}
                renderItem={renderItem}
                // ItemSeparatorComponent={(({highlighted}) => (<View style={{borderTopColor:'rgba(0,0,0,.05)',borderWidth:0.,marginBottom:20}} />))}
                ListFooterComponent={
                    <View style={{ marginTop: 15 }} />
                }
            />
        </Container>
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