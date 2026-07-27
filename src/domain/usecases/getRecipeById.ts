import { Recipe, RecipeId } from "../entities/Recipe";
import { IRecipeRepository } from "../repositories/IRecipeRepository";

export function getRecipeById(recipes: IRecipeRepository) {
    return (id: RecipeId): Promise<Recipe | null> => recipes.getById(id);
}
