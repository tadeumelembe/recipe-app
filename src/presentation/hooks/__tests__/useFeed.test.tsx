import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

import { InMemoryRecipeRepository } from "../../../data/repositories/InMemoryRecipeRepository";
import { useFeed } from "../useFeed";

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

describe("useFeed", () => {
    it("resolves the feed page from the repository", async () => {
        const repository = new InMemoryRecipeRepository();
        const created = await repository.create({
            authorId: "u1",
            title: "Vanilla Pudding",
            description: null,
            coverImageUrl: null,
            ingredients: [],
            directions: [],
        });

        const { result } = renderHook(() => useFeed(repository), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data?.items).toEqual([created]);
    });
});
