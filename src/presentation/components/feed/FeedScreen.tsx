import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { Recipe } from "../../../domain/entities/Recipe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { FeedCard } from "./FeedCard";

export function FeedScreen({
    recipes,
    isLoading,
    error,
    userRepository,
}: {
    recipes: Recipe[];
    isLoading: boolean;
    error: boolean;
    userRepository: IUserRepository;
}) {
    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center px-4">
                <Text className="text-body font-nunito-regular text-gray-500">Couldn't load the feed.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={recipes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <FeedCard recipe={item} userRepository={userRepository} />}
            contentContainerClassName="px-4 pt-4 pb-6"
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <Text className="text-body font-nunito-regular text-gray-400 text-center mt-10">
                    No recipes yet. Be the first to publish one!
                </Text>
            }
        />
    );
}
