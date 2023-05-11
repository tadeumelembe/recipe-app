import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, SafeAreaView, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, Octicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { Tabs, MaterialTabBar, TabBarProps } from 'react-native-collapsible-tab-view'


import { Container, ScrollView, View, Text, FlatList } from "../../../components/Themed";
import Header from "../../components/Profile/Header";
import { RootTabScreenProps } from "../../../types";
import style from "../../../constants/style";
import Colors from "../../../constants/Colors";
import RecipeItem from "../../components/Profile/RecipeItems";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

function MyTabBar({ state, descriptors, navigation, position }: any) {
    return (
        <View style={localStyles.tabButtons}>
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

               

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[localStyles.tabViewLabelButton]}
                        key={index}
                    >
                        <Animated.Text style={[localStyles.tabLabelNumber, { opacity }]}>
                            16
                        </Animated.Text>
                        <Animated.Text style={[localStyles.tabLabel, { opacity }]}>
                            {label}
                        </Animated.Text>
                        <Animated.View style={{ ...localStyles.tabIndicator, opacity: indicatorOpacity }} />

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

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
function Recipe() {
    function renderItem({ item }) {
        return <RecipeItem />;
    }

    return (
        <Container>
            <Tabs.FlatList
                data={data}
                style={localStyles.flatlist}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                // ItemSeparatorComponent={(({highlighted}) => (<View style={{borderTopColor:'rgba(0,0,0,.05)',borderWidth:0.,marginBottom:20}} />))}
                ListFooterComponent={
                    <View style={{ marginTop: 15 }} />
                }
                scrollEventThrottle={10}
                numColumns={2}
            />
        </Container>
    )
}

function Saved() {
    return (
        <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Text>saved</Text>
        </View>
    )
}

function Head() {
    return (
        <View style={[style.container, { height: 190 }]}>
            <Header />
        </View>
    )
}


const TabProfile = ({ navigation }: RootTabScreenProps<'TabProfile'>) => {
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0)

    return (
        <Tabs.Container
         
            onIndexChange={setActiveTabIndex}
            allowHeaderOverscroll={true}
            containerStyle={localStyles.tabContainer}
            headerContainerStyle={localStyles.headerContainerStyle}
            headerHeight={190}
            renderHeader={Head}>
            <Tabs.Tab name="Recipe">
                <Recipe />
            </Tabs.Tab>
            <Tabs.Tab name="Saved">
                <Saved />
            </Tabs.Tab>
        </Tabs.Container>
    )
}

export default TabProfile

const localStyles = StyleSheet.create({
    tabContainer: {
        flex: 1
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
    flatlist: {
        width: '100%',
        paddingTop: 15
    }
})