export const queryKeys = {
    recipes: {
        all: ["recipes"] as const,
        feed: () => [...queryKeys.recipes.all, "feed"] as const,
        detail: (id: string) => [...queryKeys.recipes.all, "detail", id] as const,
    },
    users: {
        detail: (id: string) => ["users", id, "detail"] as const,
        saved: (id: string) => ["users", id, "saved"] as const,
    },
};
