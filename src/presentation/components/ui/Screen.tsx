import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../../constants/Colors";

type ScreenProps = PropsWithChildren<{
    edges?: Edge[];
    className?: string;
    style?: ViewStyle;
}>;

/**
 * SafeAreaView from react-native-safe-area-context does not reliably apply
 * NativeWind `className` — keep this outer element StyleSheet-only and put
 * NativeWind classes on the inner View instead.
 */
export function Screen({ edges = ["top"], className, style, children }: ScreenProps) {
    return (
        <SafeAreaView edges={edges} style={styles.safeArea}>
            <View className={className} style={[styles.content, style]}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    content: {
        flex: 1,
    },
});
