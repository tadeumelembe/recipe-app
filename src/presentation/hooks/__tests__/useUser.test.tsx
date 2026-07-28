import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react-native";

import { InMemoryUserRepository } from "../../../data/repositories/InMemoryUserRepository";
import { useUser } from "../useUser";

function createWrapper() {
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: PropsWithChildren) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}

describe("useUser", () => {
    it("resolves the user from the repository", async () => {
        const repository = new InMemoryUserRepository();
        const created = await repository.create({
            id: "u1",
            name: "Tadeu Melembe",
            email: "tadeu@example.com",
            avatarUrl: null,
        });

        const { result } = renderHook(() => useUser(created.id, repository), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(created);
    });
});
