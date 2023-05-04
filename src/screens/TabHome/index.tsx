import React from "react";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { Container, FlatList, ScrollView, View } from "../../../components/Themed";

import { RootTabScreenProps } from "../../../types";
import Header from "../../components/Head";
import FeedCard from "../../components/TabHome/FeedCard";
import { IHomeItem } from "../../components/types";


const data = [
    {
        id: '1',
        profile_name: 'Tadeu Melembe',
        created_at: '2h ago',
        title: 'Red Wine and Mint Soufflé',
        image: require('../../../assets/images/dish-1.png'),
        description: 'Integer at bibendum nisi. Integer eu tortor orci. Proin in consequat odio, vitae viverra est. Integer neque mauris, consequat vitae sapien sit amet, pretium convallis velit. Donec auctor velit consectetur rutrum hendrerit. Nam ornare vel urna quis dictum. Sed feugiat, magna eget ullamcorper scelerisque, nulla urna consequat magna, scelerisque tempus sem ex in ex. Sed a sagittis ante. Aenean non eros a urna sodales aliquam. Nulla risus lectus, accumsan dignissim nunc ac, placerat ullamcorper nibh.'
    },
    {
        id: '2',
        profile_name: 'Wildson Guiamba',
        created_at: '1day ago',
        image: require('../../../assets/images/dish-2.png'),
        title: 'White Wine Toffee',
        description: 'Proin sit amet dictum turpis, at aliquam nulla. Cras tincidunt, nisl quis tincidunt hendrerit, orci lorem pharetra nunc, sed aliquam eros nunc quis purus. Suspendisse vulputate nisl vitae est finibus, id tristique dui suscipit. In condimentum eros nisl, ut interdum turpis suscipit vitae. Suspendisse hendrerit pulvinar lacus, in egestas risus gravida ut.'
    },
    {
        id: '3',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    }
]

interface data {
    profile_name: string
}

export default function TabHome({ navigation }: RootTabScreenProps<'TabHome'>) {
    
    function renderItem({ item }: ListRenderItemInfo<IHomeItem>) {
        return <FeedCard navigation={navigation} item={item} />;
    }


    return (
        <Container>
            <Header navigation={navigation} />

            <FlatList
                data={data}
                style={localStyles.flatlist}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
               // ItemSeparatorComponent={(({highlighted}) => (<View style={{borderTopColor:'rgba(0,0,0,.05)',borderWidth:0.,marginBottom:20}} />))}
                ListFooterComponent={
                    <View style={{ marginTop: 15 }}></View>
                }
            />

        </Container>
    )
}

const localStyles = StyleSheet.create({
    flatlist: {
        width: '100%',
        paddingTop: 15
    }
})