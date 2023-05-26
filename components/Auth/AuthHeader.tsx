import React, { useEffect, useRef } from "react";
import { Animated, Keyboard } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ImageBackground, Text, View } from "../Themed";
import styles from "../../constants/style";
import authStyles from "../../screens/Auth/authStyles";

import { IHead } from "../types";

interface IHeader {
    title: string
}

const AuthHeader: React.FC<IHeader> = ({ title }) => {

    const insets = useSafeAreaInsets();

    const initialHeaderHeight = 250
    const headerHeight = useRef(new Animated.Value(initialHeaderHeight)).current

    useEffect(() => {

        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            Animated.timing(headerHeight, {
                toValue: 130,
                duration: 300,
                useNativeDriver: false
            }).start()
        })


        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            Animated.timing(headerHeight, {
                toValue: initialHeaderHeight,
                duration: 300,
                useNativeDriver: false
            }).start()
        })

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        }
    }, [])

    return (
        <Animated.View style={[authStyles.header, { height: headerHeight }]}>
            <ImageBackground imageStyle={{ borderBottomRightRadius: 80 }} source={require('../../assets/images/login-header.png')}>
                <View style={[authStyles.headerImageView]}>
                    <Text style={[authStyles.headerText, { paddingTop: insets.top / 2 }]}>
                        {title}
                    </Text>
                </View>
            </ImageBackground>
        </Animated.View>
    )
}

export default AuthHeader