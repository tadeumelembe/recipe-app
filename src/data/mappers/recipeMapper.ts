import {
    DocumentData,
    DocumentSnapshot,
    FieldValue,
    QueryDocumentSnapshot,
    Timestamp,
    serverTimestamp,
} from "firebase/firestore";

import { Direction } from "../../domain/entities/Direction";
import { Ingredient } from "../../domain/entities/Ingredient";
import { Recipe } from "../../domain/entities/Recipe";
import { RecipeDraft } from "../../domain/repositories/IRecipeRepository";

export interface RecipeDocData {
    authorId: string;
    title: string;
    description: string | null;
    coverImageUrl: string | null;
    ingredients: Ingredient[];
    directions: Direction[];
    likeCount: number;
    createdAt: Timestamp | FieldValue;
    updatedAt: Timestamp | FieldValue;
}

export interface ViewerRecipeState {
    isLikedByViewer: boolean;
    isSavedByViewer: boolean;
}

const defaultViewerState: ViewerRecipeState = {
    isLikedByViewer: false,
    isSavedByViewer: false,
};

export function toRecipeEntity(
    snap: DocumentSnapshot<DocumentData> | QueryDocumentSnapshot<DocumentData>,
    viewerState: ViewerRecipeState = defaultViewerState
): Recipe {
    const data = snap.data() as RecipeDocData;

    return {
        id: snap.id,
        authorId: data.authorId,
        title: data.title,
        description: data.description ?? null,
        coverImageUrl: data.coverImageUrl ?? null,
        ingredients: data.ingredients ?? [],
        directions: [...(data.directions ?? [])].sort((a, b) => a.position - b.position),
        createdAt: (data.createdAt as Timestamp).toDate().toISOString(),
        likeCount: data.likeCount ?? 0,
        isLikedByViewer: viewerState.isLikedByViewer,
        isSavedByViewer: viewerState.isSavedByViewer,
    };
}

export function toRecipeDocData(draft: RecipeDraft): RecipeDocData {
    return {
        authorId: draft.authorId,
        title: draft.title,
        description: draft.description,
        coverImageUrl: draft.coverImageUrl,
        ingredients: draft.ingredients,
        directions: draft.directions,
        likeCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
}
