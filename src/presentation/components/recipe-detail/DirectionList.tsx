import React from "react";
import { View, Text } from "react-native";

import { Direction } from "../../../domain/entities/Direction";

export function DirectionList({ directions }: { directions: Direction[] }) {
    if (directions.length === 0) {
        return (
            <Text className="text-body font-nunito-regular text-gray-400 px-4 py-6">
                No directions yet.
            </Text>
        );
    }

    return (
        <View className="px-4 py-4 gap-5">
            {directions.map((direction) => (
                <View key={direction.id} className="flex-row gap-3">
                    <View className="w-7 h-7 rounded-full bg-primary items-center justify-center">
                        <Text className="text-caption font-nunito-bold text-white">{direction.position}</Text>
                    </View>
                    <Text className="flex-1 text-lead font-nunito-regular text-gray-900">
                        {direction.instruction}
                    </Text>
                </View>
            ))}
        </View>
    );
}
