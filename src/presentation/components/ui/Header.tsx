import React, { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HeaderProps = {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    right?: ReactNode;
    className?: string;
};

/**
 * Default top bar for the `header` slot on `Screen`: back button, centered
 * title, optional right-side action. Screens that need something bespoke
 * (e.g. RecipeDetailHeader's image scrim) pass their own node to `header`
 * instead of using this component.
 */
export function Header({ title, showBack = true, onBack, right, className }: HeaderProps) {
    const router = useRouter();

    return (
        <View className={`w-full flex-row items-center justify-between px-4 py-3 ${className ?? ""}`}>
            <View className="min-w-8 items-start">
                {showBack && (
                    <Pressable onPress={onBack ?? (() => router.back())} hitSlop={8}>
                        <MaterialIcons name="arrow-back-ios" size={20} color="#030f09" />
                    </Pressable>
                )}
            </View>

            {title ? (
                <Text numberOfLines={1} className="flex-1 text-center text-h5 font-nunito-bold text-gray-900">
                    {title}
                </Text>
            ) : (
                <View className="flex-1" />
            )}

            <View className="min-w-8 items-end">{right}</View>
        </View>
    );
}
