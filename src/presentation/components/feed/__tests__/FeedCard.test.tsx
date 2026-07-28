import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react-native";

import { InMemoryUserRepository } from "../../../../data/repositories/InMemoryUserRepository";
import { Recipe } from "../../../../domain/entities/Recipe";
import { FeedCard } from "../FeedCard";

jest.mock("expo-router", () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

const recipe: Recipe = {
    id: "r1",
    authorId: "u1",
    title: "Vanilla Pudding",
    description: "Creamy and simple.",
    coverImageUrl: null,
    ingredients: [],
    directions: [],
    createdAt: new Date().toISOString(),
    likeCount: 3,
    isLikedByViewer: false,
    isSavedByViewer: false,
};

describe("FeedCard", () => {
    it("renders the recipe title and the fetched author name", async () => {
        const userRepository = new InMemoryUserRepository();
        await userRepository.create({ id: "u1", name: "Tadeu Melembe", email: null, avatarUrl: null });

        render(<FeedCard recipe={recipe} userRepository={userRepository} />, { wrapper: createWrapper() });

        expect(screen.getByText("Vanilla Pudding")).toBeOnTheScreen();
        await waitFor(() => expect(screen.getByText("Tadeu Melembe")).toBeOnTheScreen());
    });

    it("falls back to 'Unknown cook' when there is no author profile", async () => {
        const userRepository = new InMemoryUserRepository();

        render(<FeedCard recipe={recipe} userRepository={userRepository} />, { wrapper: createWrapper() });

        await waitFor(() => expect(screen.getByText("Unknown cook")).toBeOnTheScreen());
    });
});
