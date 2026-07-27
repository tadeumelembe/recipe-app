import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

import { InMemoryRecipeRepository } from "../../../data/repositories/InMemoryRecipeRepository";
import { useRecipe } from "../useRecipe";

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

describe("useRecipe", () => {
    it("resolves the recipe from the repository", async () => {
        const repository = new InMemoryRecipeRepository();
        const created = await repository.create({
            authorId: "u1",
            title: "Vanilla Pudding",
            description: null,
            coverImageUrl: null,
            ingredients: [],
            directions: [],
        });

        const { result } = renderHook(() => useRecipe(created.id, repository), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(created);
    });
});
