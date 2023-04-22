import React from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { Container, FlatList, ScrollView, View } from "../../../components/Themed";

import { RootTabScreenProps } from "../../../types";
import Head from "../../components/Head";
import FeedCard from "../../components/TabHome/FeedCard";


const data = [
    {
        profile_name: 'Tadeu Melembe'
    },
    {
        profile_name: 'Wildson Guiamba'
    },
    {
        profile_name: 'Itan'
    }
]

interface data {
    profile_name: string
}

export default function TabHome({ navigation }: RootTabScreenProps<'TabHome'>) {
    function renderItem({ item }: ListRenderItemInfo<data>) {
        return <FeedCard navigation={navigation} />;
    }


    return (
        <Container>
            <Head navigation={navigation} />

            <FlatList
                data={data}
                style={localStyles.flatlist}
                keyExtractor={(item) => item.profile_name}
                renderItem={renderItem}
            />


        </Container>
    )
}

const localStyles = StyleSheet.create({
    flatlist:{
        width:'100%',
        paddingTop:15
    }
})