import { InMemoryRecipeRepository } from "../../../data/repositories/InMemoryRecipeRepository";
import { getRecipeById } from "../getRecipeById";

describe("getRecipeById", () => {
    it("returns the recipe when it exists", async () => {
        const repository = new InMemoryRecipeRepository();
        const created = await repository.create({
            authorId: "u1",
            title: "Vanilla Pudding",
            description: null,
            coverImageUrl: null,
            ingredients: [],
            directions: [],
        });

        const recipe = await getRecipeById(repository)(created.id);

        expect(recipe).toEqual(created);
    });

    it("returns null when the recipe does not exist", async () => {
        const repository = new InMemoryRecipeRepository();

        const recipe = await getRecipeById(repository)("missing");

        expect(recipe).toBeNull();
    });
});
