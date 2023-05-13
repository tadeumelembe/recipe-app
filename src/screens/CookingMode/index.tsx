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
import HeaderHome from "../../components/Head";

const headeHeight = Layout.window.height * 35 / 100

const CookingMode = ({ navigation, route }: RootStackScreenProps<'CookingMode'>) => {

    return (
        <Container style={localStyles.root}>
            <HeaderHome navigation={navigation} type='back' />
        </Container>
    )
}

export default CookingMode

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