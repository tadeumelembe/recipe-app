import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Recipe } from "../../../domain/entities/Recipe";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { formatRelativeTime, getInitials } from "../../../utils/helpers";
import { useUser } from "../../hooks/useUser";

export function FeedCard({ recipe, userRepository }: { recipe: Recipe; userRepository: IUserRepository }) {
    const router = useRouter();
    const { data: author } = useUser(recipe.authorId, userRepository);
    const authorName = author?.name ?? null;

    return (
        <Pressable
            onPress={() => router.push(`/recipe/${recipe.id}`)}
            className="w-full mb-5 rounded-[10px] bg-white shadow-card overflow-hidden"
        >
            <View className="flex-row items-center px-4 py-3">
                <View className="w-9 h-9 rounded-full bg-primary-soft items-center justify-center">
                    <Text className="font-nunito-bold text-caption text-primary">{getInitials(authorName)}</Text>
                </View>
                <View className="ml-2.5">
                    <Text className="font-nunito-medium text-body text-gray-900">{authorName ?? "Unknown cook"}</Text>
                    <Text className="font-nunito-regular text-caption text-gray-400">
                        {formatRelativeTime(recipe.createdAt)}
                    </Text>
                </View>
            </View>

            {recipe.coverImageUrl && (
                <Image source={{ uri: recipe.coverImageUrl }} resizeMode="cover" className="w-full h-[200px]" />
            )}

            <View className="p-4">
                <Text className="text-h5 font-nunito-medium text-gray-900">{recipe.title}</Text>

                {recipe.description && (
                    <Text
                        numberOfLines={2}
                        className="text-body font-nunito-regular text-gray-500 mt-2"
                    >
                        {recipe.description}
                    </Text>
                )}

                <View className="flex-row items-center mt-3">
                    <Ionicons
                        name={recipe.isLikedByViewer ? "heart" : "heart-outline"}
                        size={18}
                        color={recipe.isLikedByViewer ? "#f84971" : "#767676"}
                    />
                    <Text className="ml-1 text-caption font-nunito-regular text-gray-500">{recipe.likeCount}</Text>
                </View>
            </View>
        </Pressable>
    );
}
