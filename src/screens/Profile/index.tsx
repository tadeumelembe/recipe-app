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
import Saved from "./Saved";

const TabProfile = ({ navigation }: RootTabScreenProps<'TabProfile'>) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
    const headerHeight = 190;


    function Head() {
        return <Header headerHeight={headerHeight} navigation={navigation} />
    }

    return (
        <Container style={localStyles.root}>
            <Tabs.Container
                lazy={true}
                onIndexChange={setActiveTabIndex}
                allowHeaderOverscroll={true}
                containerStyle={localStyles.tabContainer}
                headerContainerStyle={localStyles.headerContainerStyle}
                headerHeight={headerHeight}
                renderHeader={Head}>
                <Tabs.Tab name="Recipe" label={'Recipe'}>
                    <Recipe navigation={navigation} />
                </Tabs.Tab>
                <Tabs.Tab name="Saved" label={'Saved'}>
                    <Saved navigation={navigation} />
                </Tabs.Tab>
            </Tabs.Container>
        </Container>
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