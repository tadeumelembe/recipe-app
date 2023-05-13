import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, SafeAreaView, StatusBar } from "react-native";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Tabs, MaterialTabBar, TabBarProps, MaterialTabItem } from 'react-native-collapsible-tab-view'


import { Container, ScrollView, View, Text, FlatList, TopTabBar } from "../../../components/Themed";
import Header from "../../components/Profile/Header";
import { RootStackScreenProps, RootTabScreenProps } from "../../../types";
import style from "../../../constants/style";
import Colors from "../../../constants/Colors";
import Layout from "../../../constants/Layout";
import HeaderRecipe from "../../components/RecipeDetails/Header";

const headeHeight = Layout.window.height * 35 / 100

const RecipeDetails = ({ navigation, route }: RootStackScreenProps<'RecipeDetails'>) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
    const headerHeight = headeHeight;
    const { recipe } = route.params
    
    function Head() {
        return (<HeaderRecipe item={recipe} navigation={navigation} headerHeight={headeHeight} />)
    }
    return (
        <Container style={localStyles.root}>
            <TopTabBar
                headerHeight={headerHeight}
                renderHeader={Head}

            >
                <Tabs.Tab name="Ingredients" label={'Ingredients'}>

                </Tabs.Tab>
                <Tabs.Tab name="How o Cook" label={'How o Cook'}>

                </Tabs.Tab>
                <Tabs.Tab name="Additinal info" label={'Additional info'}>

                </Tabs.Tab>
                <Tabs.Tab name="Gallery" label={'Gallery'}>

                </Tabs.Tab>
            </TopTabBar>
        </Container>
    )
}

export default RecipeDetails

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
    },
    tabBarLabel: {
        ...style.fontM,
        ...style.fontNunitoRegular,
        paddingHorizontal: 15
    },
    tabBarIndicatorStyle: {
        backgroundColor: '#000'
    }
})