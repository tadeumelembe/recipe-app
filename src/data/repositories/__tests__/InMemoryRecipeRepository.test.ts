import { RecipeNotFoundError } from "../../../domain/errors/RecipeNotFoundError";
import { InMemoryRecipeRepository } from "../InMemoryRecipeRepository";

const draft = {
    authorId: "u1",
    title: "Vanilla Pudding",
    description: "Creamy and simple.",
    coverImageUrl: null,
    ingredients: [{ id: "i1", name: "Milk", quantity: "1L" }],
    directions: [{ id: "d1", position: 1, instruction: "Heat the milk.", imageUrl: null }],
};

describe("InMemoryRecipeRepository", () => {
    it("creates and reads a recipe back", async () => {
        const repository = new InMemoryRecipeRepository();

        const created = await repository.create(draft);
        const found = await repository.getById(created.id);

        expect(found).toEqual(created);
        expect(created.likeCount).toBe(0);
        expect(created.isLikedByViewer).toBe(false);
    });

    it("updates a recipe in place", async () => {
        const repository = new InMemoryRecipeRepository();
        const created = await repository.create(draft);

        const updated = await repository.update(created.id, { title: "Chocolate Pudding" });

        expect(updated.title).toBe("Chocolate Pudding");
        expect((await repository.getById(created.id))?.title).toBe("Chocolate Pudding");
    });

    it("toggles likes and saves", async () => {
        const repository = new InMemoryRecipeRepository();
        const created = await repository.create(draft);

        await repository.setLiked(created.id, true);
        let recipe = await repository.getById(created.id);
        expect(recipe?.isLikedByViewer).toBe(true);
        expect(recipe?.likeCount).toBe(1);

        await repository.setSaved(created.id, true);
        recipe = await repository.getById(created.id);
        expect(recipe?.isSavedByViewer).toBe(true);

        await repository.setLiked(created.id, false);
        recipe = await repository.getById(created.id);
        expect(recipe?.isLikedByViewer).toBe(false);
        expect(recipe?.likeCount).toBe(0);
    });

    it("removes a recipe", async () => {
        const repository = new InMemoryRecipeRepository();
        const created = await repository.create(draft);

        await repository.remove(created.id);

        expect(await repository.getById(created.id)).toBeNull();
    });

    it("throws RecipeNotFoundError for operations on a missing recipe", async () => {
        const repository = new InMemoryRecipeRepository();

        await expect(repository.update("missing", { title: "x" })).rejects.toThrow(RecipeNotFoundError);
        await expect(repository.remove("missing")).rejects.toThrow(RecipeNotFoundError);
        await expect(repository.setLiked("missing", true)).rejects.toThrow(RecipeNotFoundError);
    });
});
