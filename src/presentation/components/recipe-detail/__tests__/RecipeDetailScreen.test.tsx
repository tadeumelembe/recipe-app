import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Recipe } from "../../../../domain/entities/Recipe";
import { RecipeDetailScreen } from "../RecipeDetailScreen";

jest.mock("expo-router", () => ({
    useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

// react-native-collapsible-tab-view relies on reanimated APIs (useFrameCallback)
// that aren't available under the project's reanimated mock. Stand in with a
// plain, non-animated layout so this test can assert on rendered content.
jest.mock("react-native-collapsible-tab-view", () => {
    const { View } = require("react-native");
    const Container = ({ renderHeader, children }: any) => (
        <View>
            {renderHeader ? renderHeader() : null}
            {children}
        </View>
    );
    const Passthrough = ({ children }: any) => <View>{children}</View>;

    return {
        Tabs: {
            Container,
            Tab: Passthrough,
            ScrollView: Passthrough,
            FlatList: Passthrough,
            SectionList: Passthrough,
            FlashList: Passthrough,
            Lazy: Passthrough,
        },
        MaterialTabBar: () => null,
        MaterialTabItem: () => null,
    };
});

const recipe: Recipe = {
    id: "r1",
    authorId: "u1",
    title: "Vanilla Pudding",
    description: null,
    coverImageUrl: null,
    ingredients: [{ id: "i1", name: "Milk", quantity: "1L" }],
    directions: [{ id: "d1", position: 1, instruction: "Heat the milk.", imageUrl: null }],
    createdAt: "2026-01-01T00:00:00.000Z",
    likeCount: 0,
    isLikedByViewer: false,
    isSavedByViewer: false,
};

describe("RecipeDetailScreen", () => {
    it("renders the recipe title, ingredients, and directions", () => {
        render(<RecipeDetailScreen recipe={recipe} />);

        expect(screen.getByText("Vanilla Pudding")).toBeOnTheScreen();
        expect(screen.getByText("Milk")).toBeOnTheScreen();
        expect(screen.getByText("Heat the milk.")).toBeOnTheScreen();
    });
});
