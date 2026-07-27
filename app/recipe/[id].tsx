import React from "react";
import { ActivityIndicator, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { firebaseRecipeRepository } from "../../src/data/repositories/FirebaseRecipeRepository";
import { useRecipe } from "../../src/presentation/hooks/useRecipe";
import { Screen } from "../../src/presentation/components/ui/Screen";
import { RecipeDetailScreen } from "../../src/presentation/components/recipe-detail/RecipeDetailScreen";

export default function RecipeDetailRoute() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: recipe, isLoading, error } = useRecipe(id, firebaseRecipeRepository);

    if (isLoading) {
        return (
            <Screen className="items-center justify-center">
                <ActivityIndicator />
            </Screen>
        );
    }

    if (error || !recipe) {
        return (
            <Screen className="items-center justify-center">
                <Text>Recipe not found.</Text>
            </Screen>
        );
    }

    return <RecipeDetailScreen recipe={recipe} />;
}
