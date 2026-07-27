import { RecipeId } from "../entities/Recipe";

export class RecipeNotFoundError extends Error {
    constructor(id: RecipeId) {
        super(`Recipe not found: ${id}`);
        this.name = "RecipeNotFoundError";
    }
}
