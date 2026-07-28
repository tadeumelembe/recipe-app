import { Page } from "../entities/Page";
import { Recipe } from "../entities/Recipe";
import { IRecipeRepository } from "../repositories/IRecipeRepository";

export function getFeed(recipes: IRecipeRepository) {
    return (cursor?: string): Promise<Page<Recipe>> => recipes.getFeed(cursor);
}
