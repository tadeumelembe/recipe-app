import { Page } from "../../domain/entities/Page";
import { Recipe, RecipeId } from "../../domain/entities/Recipe";
import { RecipeNotFoundError } from "../../domain/errors/RecipeNotFoundError";
import { IRecipeRepository, RecipeDraft, RecipePatch } from "../../domain/repositories/IRecipeRepository";

let nextId = 1;

export const PLACEHOLDER_IMAGE_URL = "https://picsum.photos/seed/recipe/800";

export class InMemoryRecipeRepository implements IRecipeRepository {
    private recipes: Recipe[];

    constructor(seed: Recipe[] = []) {
        this.recipes = [...seed];
    }

    async getFeed(cursor?: string): Promise<Page<Recipe>> {
        const start = cursor ? this.recipes.findIndex((r) => r.id === cursor) + 1 : 0;
        return { items: this.recipes.slice(start), nextCursor: null };
    }

    async getById(id: RecipeId): Promise<Recipe | null> {
        return this.recipes.find((r) => r.id === id) ?? null;
    }

    async create(draft: RecipeDraft): Promise<Recipe> {
        const recipe: Recipe = {
            id: String(nextId++),
            authorId: draft.authorId,
            title: draft.title,
            description: draft.description,
            coverImageUrl: draft.coverImageUrl,
            ingredients: draft.ingredients,
            directions: draft.directions,
            createdAt: new Date().toISOString(),
            likeCount: 0,
            isLikedByViewer: false,
            isSavedByViewer: false,
        };
        this.recipes.push(recipe);
        return recipe;
    }

    async update(id: RecipeId, patch: RecipePatch): Promise<Recipe> {
        const recipe = await this.getExistingOrThrow(id);
        Object.assign(recipe, patch);
        return recipe;
    }

    async remove(id: RecipeId): Promise<void> {
        await this.getExistingOrThrow(id);
        this.recipes = this.recipes.filter((r) => r.id !== id);
    }

    async setLiked(id: RecipeId, liked: boolean): Promise<void> {
        const recipe = await this.getExistingOrThrow(id);
        if (recipe.isLikedByViewer === liked) return;
        recipe.isLikedByViewer = liked;
        recipe.likeCount += liked ? 1 : -1;
    }

    async setSaved(id: RecipeId, saved: boolean): Promise<void> {
        const recipe = await this.getExistingOrThrow(id);
        recipe.isSavedByViewer = saved;
    }

    private async getExistingOrThrow(id: RecipeId): Promise<Recipe> {
        const recipe = this.recipes.find((r) => r.id === id);
        if (!recipe) throw new RecipeNotFoundError(id);
        return recipe;
    }
}
