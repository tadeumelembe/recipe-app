import { InMemoryRecipeRepository } from "../../../data/repositories/InMemoryRecipeRepository";
import { getFeed } from "../getFeed";

const draft = {
    authorId: "u1",
    title: "Vanilla Pudding",
    description: null,
    coverImageUrl: null,
    ingredients: [],
    directions: [],
};

describe("getFeed", () => {
    it("returns the recipes page from the repository", async () => {
        const repository = new InMemoryRecipeRepository();
        const first = await repository.create(draft);
        const second = await repository.create({ ...draft, title: "Chocolate Pudding" });

        const page = await getFeed(repository)();

        expect(page.items).toEqual([first, second]);
        expect(page.nextCursor).toBeNull();
    });

    it("returns an empty page when there are no recipes", async () => {
        const repository = new InMemoryRecipeRepository();

        const page = await getFeed(repository)();

        expect(page.items).toEqual([]);
    });
});
