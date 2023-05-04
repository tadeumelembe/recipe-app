import React from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, Octicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";

import { Container, ScrollView, View, Text } from "../../../components/Themed";
import Header from "../../components/Profile/Header";
import { RootTabScreenProps } from "../../../types";
import style from "../../../constants/style";
import Colors from "../../../constants/Colors";

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

                const inputRange = state.routes.map((_: any, i: number) => i);
                const opacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i: any) => (i === index ? 1 : 0.5)),
                });
                const indicatorOpacity = position.interpolate({
                    inputRange,
                    outputRange: inputRange.map((i: any) => (i === index ? 1 : 0)),
                });

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[localStyles.tabViewLabelButton]}
                    >
                        <Animated.Text style={[localStyles.tabLabelNumber, { opacity }]}>
                            16
                        </Animated.Text>
                        <Animated.Text style={[localStyles.tabLabel, { opacity }]}>
                            {label}
                        </Animated.Text>
                        <Animated.View style={{ ...localStyles.tabIndicator, opacity: indicatorOpacity }}></Animated.View>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

function MyTabs() {
    return (
        <Tab.Navigator
            tabBar={props => <MyTabBar {...props} />}
        >
            <Tab.Screen name="Recipes" component={Recipe} />
            <Tab.Screen name="Saved" component={Saved} />
            <Tab.Screen name="Following" component={Saved} />
        </Tab.Navigator>
    );
}

function Recipe() {
    return (
        <View style={{ flex: 1, backgroundColor: 'tomato' }}>
            <Text>recipe</Text>
        </View>
    )
}

function Saved() {
    return (
        <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Text>saved</Text>
        </View>
    )
}




const TabProfile = ({ navigation }: RootTabScreenProps<'TabProfile'>) => {
    return (
        <Container>
            <Header />

            <View style={[style.borderSeparator, { marginVertical: 25 }]}></View>

            <View style={localStyles.tabView}>
                <MyTabs />
            </View>
        </Container>
    )
}

export default TabProfile

const localStyles = StyleSheet.create({
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
        borderTopWidth: 2,
        marginBottom: -0.2,
        width: '100%'
    }
})