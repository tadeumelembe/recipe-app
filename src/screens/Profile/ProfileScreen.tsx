import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, SafeAreaView, StatusBar } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Tabs, MaterialTabBar, TabBarProps } from 'react-native-collapsible-tab-view'


import { View, Text, FlatList, ButtonRounded } from "../../components/Themed";
import { Screen } from "../../presentation/components/ui/Screen";
import Header from "../../components/Profile/Header";
import style from "../../constants/style";
import Colors from "../../constants/Colors";

import Recipe from "./Recipe";
import Saved from "./Saved";

const TabProfile = () => {
    const router = useRouter()
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
    const headerHeight = 190;


    function Head() {
        return <Header headerHeight={headerHeight} />
    }

    return (
        <Screen style={localStyles.root}>
            <Tabs.Container
                lazy={true}
                onIndexChange={setActiveTabIndex}
                allowHeaderOverscroll={true}
                containerStyle={localStyles.tabContainer}
                headerContainerStyle={localStyles.headerContainerStyle}
                headerHeight={headerHeight}
                renderHeader={Head}>
                <Tabs.Tab name="Recipe" label={'Recipe'}>
                    <Recipe />
                </Tabs.Tab>
                <Tabs.Tab name="Saved" label={'Saved'}>
                    <Saved />
                </Tabs.Tab>
            </Tabs.Container>

            <ButtonRounded iconName="add" onPress={() => router.push('/add-recipe')} />
        </Screen>
    )
}

export default TabProfile

const localStyles = StyleSheet.create({
    root: {
        paddingHorizontal: 0
    },
    tabContainer: {
        flex: 1,
    },
    headerContainerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        ...style.borderSeparator
    }
})