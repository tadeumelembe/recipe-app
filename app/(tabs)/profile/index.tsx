import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Tabs, MaterialTabBar, TabBarProps } from 'react-native-collapsible-tab-view'

import { ButtonRounded } from "../../../src/components/Themed";
import { Screen } from "../../../src/presentation/components/ui/Screen";
import Header from "../../../src/components/Profile/Header";
import style from "../../../src/constants/style";

import Recipe from "../../../src/components/Profile/RecipeTab";
import Saved from "../../../src/components/Profile/SavedTab";

export default function TabProfile() {
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
