import { InMemoryUserRepository } from "../InMemoryUserRepository";

const draft = {
    id: "u1",
    name: "Tadeu Melembe",
    email: "tadeu@example.com",
    avatarUrl: null,
};

describe("InMemoryUserRepository", () => {
    it("creates and reads a user back", async () => {
        const repository = new InMemoryUserRepository();

        const created = await repository.create(draft);
        const found = await repository.getById(created.id);

        expect(found).toEqual(created);
    });

    it("returns null for a missing user", async () => {
        const repository = new InMemoryUserRepository();

        expect(await repository.getById("missing")).toBeNull();
    });

    it("overwrites an existing user with the same id", async () => {
        const repository = new InMemoryUserRepository();
        await repository.create(draft);

        await repository.create({ ...draft, name: "Tadeu M." });
        const found = await repository.getById(draft.id);

        expect(found?.name).toBe("Tadeu M.");
    });
});
