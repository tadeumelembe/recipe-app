import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, SafeAreaView, StatusBar } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Tabs, MaterialTabBar, TabBarProps } from 'react-native-collapsible-tab-view'


import { Container, ScrollView, View, Text, FlatList } from "../../../components/Themed";
import Header from "../../components/Profile/Header";
import { RootTabScreenProps } from "../../../types";
import style from "../../../constants/style";
import Colors from "../../../constants/Colors";
import Recipe from "./Recipe";

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
    },
    {
        id: '334',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '343',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '3434',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '322',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '31233',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '3435',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '863',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '334',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '343',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '3434',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '322',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '31233',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '3435',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    },
    {
        id: '863',
        profile_name: 'Itan',
        image: require('../../../assets/images/dish-3.png'),
        created_at: '50min ago',
        title: 'Vanilla Pud',
    }
]


function Saved() {
    return (
        <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Text>saved</Text>
        </View>
    )
}


const TabProfile = ({ navigation }: RootTabScreenProps<'TabProfile'>) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
    const headerHeight = 190;


    function Head() {
        return (
            <View pointerEvents="box-none" style={[style.paddingHorizontal, { height: headerHeight }]}>
                <Header />
            </View>
        )
    }


    return (
        <Container style={{ paddingHorizontal: 0 }}>
            <Tabs.Container
                onIndexChange={setActiveTabIndex}
                allowHeaderOverscroll={true}
                containerStyle={localStyles.tabContainer}
                headerContainerStyle={localStyles.headerContainerStyle}
                headerHeight={headerHeight}
                renderHeader={Head}>
                <Tabs.Tab name="Recipe">
                    <Recipe />
                </Tabs.Tab>
                <Tabs.Tab name="Saved">
                    <Saved />
                </Tabs.Tab>
            </Tabs.Container>
        </Container>
    )
}

export default TabProfile

const localStyles = StyleSheet.create({
    tabContainer: {
        flex: 1,
    },
    flatListStyle: {
        ...style.horizontalPadding,
        width: '100%',
        paddingTop: 15
    },
    headerContainerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        ...style.borderSeparator
    },
    tabView: {
        flex: 1,
    },
    tabButtons: {
        flexDirection: 'row',
        ...style.borderSeparator,
        marginBottom: 20
    },
    tabLabel: {
        ...style.fontM,
        ...style.fontNunitoRegular,
        paddingTop: 10,
        paddingBottom: 10
    },
    tabLabelNumber: {
        ...style.fontL,
        ...style.fontNunitoBold,
    },
    labelMuted: {
        ...style.textMuted
    },
    tabViewLabelButton: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 0
    },
    tabIndicator: {
        borderTopColor: Colors.light.tint,
        marginBottom: -0.2,
        width: '100%'
    },
})