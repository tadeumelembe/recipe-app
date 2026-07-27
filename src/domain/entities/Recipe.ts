import { UserId } from "./User";
import { Ingredient } from "./Ingredient";
import { Direction } from "./Direction";

export type RecipeId = string;

export interface Recipe {
    id: RecipeId;
    authorId: UserId;
    title: string;
    description: string | null;
    coverImageUrl: string | null;
    ingredients: Ingredient[];
    directions: Direction[];
    createdAt: string; // ISO 8601
    likeCount: number;
    isLikedByViewer: boolean;
    isSavedByViewer: boolean;
}
