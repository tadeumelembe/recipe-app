import React, { PropsWithChildren, ReactNode } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
    ViewStyle,
    type ScrollViewProps,
} from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../../constants/Colors";

type ScreenProps = PropsWithChildren<{
    edges?: Edge[];
    scrollable?: boolean;
    header?: ReactNode;
    className?: string;
    contentContainerClassName?: string;
    keyboardShouldPersistTaps?: ScrollViewProps["keyboardShouldPersistTaps"];
    style?: ViewStyle;
}>;

/**
 * SafeAreaView from react-native-safe-area-context does not reliably apply
 * NativeWind `className` — keep this outer element StyleSheet-only and put
 * NativeWind classes on the inner View instead.
 *
 * `header` is a plain node rendered above the content, outside the
 * ScrollView, so it stays pinned while the body scrolls. Pass the shared
 * `Header` component for the common back/title/action bar, or a fully
 * custom node (e.g. RecipeDetailHeader) when a screen needs something else.
 */
export function Screen({
    edges = ["top"],
    scrollable = false,
    header,
    className,
    contentContainerClassName,
    keyboardShouldPersistTaps = "handled",
    style,
    children,
}: ScreenProps) {
    return (
        <SafeAreaView edges={edges} style={styles.safeArea}>
            {header}
            <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                {scrollable ? (
                    <ScrollView
                        className={className}
                        contentContainerClassName={contentContainerClassName}
                        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                        showsVerticalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                ) : (
                    <View className={className} style={[styles.content, style]}>
                        {children}
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});
