import React from "react";
import { ImageBackground, Pressable, View, Text } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { Recipe } from "../../../domain/entities/Recipe";

export function RecipeDetailHeader({ recipe, height }: { recipe: Recipe; height: number }) {
    const router = useRouter();

    return (
        <View style={{ minHeight: height }} className="w-full">
            <ImageBackground
                source={recipe.coverImageUrl ? { uri: recipe.coverImageUrl } : undefined}
                resizeMode="cover"
                style={{ height: "100%" }}
                className="justify-start bg-gray-200"
            >
                <View className="h-full bg-overlay justify-between px-4 py-5">
                    <View className="flex-row items-center justify-between">
                        <Pressable onPress={() => router.back()} className="flex-row items-center">
                            <MaterialIcons name="arrow-back-ios" size={20} color="white" />
                            <Text className="text-body font-nunito-regular text-white">Back</Text>
                        </Pressable>

                        {/* Route params are URL search params, so the recipe is passed field by field. */}
                        <Pressable
                            onPress={() =>
                                router.push({
                                    pathname: "/cooking-mode",
                                    params: { id: recipe.id, title: recipe.title, image: recipe.coverImageUrl ?? "" },
                                })
                            }
                            className="flex-row items-center gap-1 rounded-[10px] border border-white bg-black/45 px-2 py-1"
                        >
                            <Ionicons name="play-outline" size={24} color="white" />
                            <Text className="text-caption font-nunito-bold text-white">Cook now</Text>
                        </Pressable>
                    </View>

                    <Text className="text-h1 font-nunito-bold text-white">{recipe.title}</Text>
                </View>
            </ImageBackground>
        </View>
    );
}
