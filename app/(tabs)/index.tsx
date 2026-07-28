import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../../src/components/Themed";
import { Screen } from "../../src/presentation/components/ui/Screen";
import style from "../../src/constants/style";

import Header from "../../src/components/Head";
import { FeedScreen } from "../../src/presentation/components/feed/FeedScreen";
import { useFeed } from "../../src/presentation/hooks/useFeed";
import { firebaseRecipeRepository } from "../../src/data/repositories/FirebaseRecipeRepository";
import { firebaseUserRepository } from "../../src/data/repositories/FirebaseUserRepository";

export default function TabHome() {
    const { data, isLoading, error } = useFeed(firebaseRecipeRepository);

    return (
        <Screen style={localStyles.root}>
            <View style={style.horizontalPadding}>
                <Header />
            </View>
            <FeedScreen
                recipes={data?.items ?? []}
                isLoading={isLoading}
                error={!!error}
                userRepository={firebaseUserRepository}
            />
        </Screen>
    )
}

const localStyles = StyleSheet.create({
    root: {
        paddingHorizontal: 0,
        flex: 1,
    },
})
