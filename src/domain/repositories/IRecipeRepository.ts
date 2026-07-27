import { Page } from "../entities/Page";
import { Recipe, RecipeId } from "../entities/Recipe";
import { Ingredient } from "../entities/Ingredient";
import { Direction } from "../entities/Direction";
import { UserId } from "../entities/User";

export interface RecipeDraft {
    authorId: UserId;
    title: string;
    description: string | null;
    coverImageUrl: string | null;
    ingredients: Ingredient[];
    directions: Direction[];
}

export type RecipePatch = Partial<Omit<RecipeDraft, "authorId">>;

export interface IRecipeRepository {
    getFeed(cursor?: string): Promise<Page<Recipe>>;
    getById(id: RecipeId): Promise<Recipe | null>;
    create(draft: RecipeDraft): Promise<Recipe>;
    update(id: RecipeId, patch: RecipePatch): Promise<Recipe>;
    remove(id: RecipeId): Promise<void>;
    setLiked(id: RecipeId, liked: boolean): Promise<void>;
    setSaved(id: RecipeId, saved: boolean): Promise<void>;
}
