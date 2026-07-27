import {
    Firestore,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    QueryConstraint,
    setDoc,
    startAfter,
    updateDoc,
} from "firebase/firestore";

import { Page } from "../../domain/entities/Page";
import { Recipe, RecipeId } from "../../domain/entities/Recipe";
import { UserId } from "../../domain/entities/User";
import { RecipeNotFoundError } from "../../domain/errors/RecipeNotFoundError";
import { IRecipeRepository, RecipeDraft, RecipePatch } from "../../domain/repositories/IRecipeRepository";
import { auth, db } from "../firebase/client";
import { LIKES_COLLECTION, RECIPES_COLLECTION, SAVES_COLLECTION } from "../firebase/collections";
import { toRecipeDocData, toRecipeEntity } from "../mappers/recipeMapper";

const FEED_PAGE_SIZE = 20;

function likeDocId(recipeId: RecipeId, userId: UserId) {
    return `${recipeId}_${userId}`;
}

export class FirebaseRecipeRepository implements IRecipeRepository {
    constructor(
        private readonly getViewerId: () => UserId | null,
        private readonly firestore: Firestore = db
    ) {}

    async getFeed(cursor?: string): Promise<Page<Recipe>> {
        const recipesRef = collection(this.firestore, RECIPES_COLLECTION);
        const constraints: QueryConstraint[] = [orderBy("createdAt", "desc"), limit(FEED_PAGE_SIZE)];

        if (cursor) {
            const cursorSnap = await getDoc(doc(this.firestore, RECIPES_COLLECTION, cursor));
            if (cursorSnap.exists()) constraints.push(startAfter(cursorSnap));
        }

        const snap = await getDocs(query(recipesRef, ...constraints));
        const items = await Promise.all(snap.docs.map((d) => this.toEntityWithViewerState(d)));
        const nextCursor = snap.docs.length === FEED_PAGE_SIZE ? snap.docs[snap.docs.length - 1].id : null;

        return { items, nextCursor };
    }

    async getById(id: RecipeId): Promise<Recipe | null> {
        const snap = await getDoc(doc(this.firestore, RECIPES_COLLECTION, id));
        if (!snap.exists()) return null;
        return this.toEntityWithViewerState(snap);
    }

    async create(draft: RecipeDraft): Promise<Recipe> {
        const recipeRef = doc(collection(this.firestore, RECIPES_COLLECTION));
        await setDoc(recipeRef, toRecipeDocData(draft));
        const snap = await getDoc(recipeRef);
        return this.toEntityWithViewerState(snap);
    }

    async update(id: RecipeId, patch: RecipePatch): Promise<Recipe> {
        const recipeRef = doc(this.firestore, RECIPES_COLLECTION, id);
        const existing = await getDoc(recipeRef);
        if (!existing.exists()) throw new RecipeNotFoundError(id);

        await updateDoc(recipeRef, { ...patch, updatedAt: new Date() });
        const snap = await getDoc(recipeRef);
        return this.toEntityWithViewerState(snap);
    }

    async remove(id: RecipeId): Promise<void> {
        const recipeRef = doc(this.firestore, RECIPES_COLLECTION, id);
        const existing = await getDoc(recipeRef);
        if (!existing.exists()) throw new RecipeNotFoundError(id);
        await deleteDoc(recipeRef);
    }

    async setLiked(id: RecipeId, liked: boolean): Promise<void> {
        const viewerId = this.requireViewerId();
        const recipeRef = doc(this.firestore, RECIPES_COLLECTION, id);
        const likeRef = doc(this.firestore, LIKES_COLLECTION, likeDocId(id, viewerId));

        if (liked) {
            await setDoc(likeRef, { recipeId: id, userId: viewerId, createdAt: new Date() });
            await updateDoc(recipeRef, { likeCount: increment(1) });
        } else {
            await deleteDoc(likeRef);
            await updateDoc(recipeRef, { likeCount: increment(-1) });
        }
    }

    async setSaved(id: RecipeId, saved: boolean): Promise<void> {
        const viewerId = this.requireViewerId();
        const saveRef = doc(this.firestore, SAVES_COLLECTION, likeDocId(id, viewerId));

        if (saved) {
            await setDoc(saveRef, { recipeId: id, userId: viewerId, createdAt: new Date() });
        } else {
            await deleteDoc(saveRef);
        }
    }

    private async toEntityWithViewerState(
        snap: Parameters<typeof toRecipeEntity>[0]
    ): Promise<Recipe> {
        const viewerId = this.getViewerId();
        if (!viewerId) return toRecipeEntity(snap);

        const [likeSnap, saveSnap] = await Promise.all([
            getDoc(doc(this.firestore, LIKES_COLLECTION, likeDocId(snap.id, viewerId))),
            getDoc(doc(this.firestore, SAVES_COLLECTION, likeDocId(snap.id, viewerId))),
        ]);

        return toRecipeEntity(snap, {
            isLikedByViewer: likeSnap.exists(),
            isSavedByViewer: saveSnap.exists(),
        });
    }

    private requireViewerId(): UserId {
        const viewerId = this.getViewerId();
        if (!viewerId) throw new Error("Must be signed in.");
        return viewerId;
    }
}

export const firebaseRecipeRepository = new FirebaseRecipeRepository(() => auth.currentUser?.uid ?? null);
