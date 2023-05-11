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
                    <Recipe navigation={navigation} />
                </Tabs.Tab>
                <Tabs.Tab name="Saved">
                    <Saved navigation={navigation}/>
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
    headerContainerStyle: {
        shadowOpacity: 0,
        elevation: 0,
        ...style.borderSeparator
    }
})