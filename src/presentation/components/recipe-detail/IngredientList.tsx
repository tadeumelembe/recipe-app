import React from "react";
import { View, Text } from "react-native";

import { Ingredient } from "../../../domain/entities/Ingredient";

export function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
    if (ingredients.length === 0) {
        return (
            <Text className="text-body font-nunito-regular text-gray-400 px-4 py-6">
                No ingredients yet.
            </Text>
        );
    }

    return (
        <View className="px-4 py-4 gap-3">
            {ingredients.map((ingredient) => (
                <View key={ingredient.id} className="flex-row items-center justify-between border-b border-gray-100 pb-3">
                    <Text className="text-lead font-nunito-medium text-gray-900">{ingredient.name}</Text>
                    {ingredient.quantity && (
                        <Text className="text-body font-nunito-regular text-gray-500">{ingredient.quantity}</Text>
                    )}
                </View>
            ))}
        </View>
    );
}
