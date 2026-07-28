import { InMemoryUserRepository } from "../../../data/repositories/InMemoryUserRepository";
import { getUserById } from "../getUserById";

describe("getUserById", () => {
    it("returns the user when it exists", async () => {
        const repository = new InMemoryUserRepository();
        const created = await repository.create({
            id: "u1",
            name: "Tadeu Melembe",
            email: "tadeu@example.com",
            avatarUrl: null,
        });

        const user = await getUserById(repository)(created.id);

        expect(user).toEqual(created);
    });

    it("returns null when the user does not exist", async () => {
        const repository = new InMemoryUserRepository();

        const user = await getUserById(repository)("missing");

        expect(user).toBeNull();
    });
});
