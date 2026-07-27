import { Timestamp } from "firebase/firestore";

import { RecipeDraft } from "../../../domain/repositories/IRecipeRepository";
import { toRecipeDocData, toRecipeEntity } from "../recipeMapper";

describe("recipeMapper", () => {
    describe("toRecipeEntity", () => {
        it("maps a Firestore doc to a Recipe, sorting directions by position", () => {
            const createdAt = Timestamp.fromDate(new Date("2026-01-01T00:00:00.000Z"));
            const snap = {
                id: "r1",
                data: () => ({
                    authorId: "u1",
                    title: "Vanilla Pudding",
                    description: null,
                    coverImageUrl: null,
                    ingredients: [{ id: "i1", name: "Milk", quantity: "1L" }],
                    directions: [
                        { id: "d2", position: 2, instruction: "Cool.", imageUrl: null },
                        { id: "d1", position: 1, instruction: "Heat.", imageUrl: null },
                    ],
                    likeCount: 3,
                    createdAt,
                    updatedAt: createdAt,
                }),
            } as any;

            const recipe = toRecipeEntity(snap);

            expect(recipe.id).toBe("r1");
            expect(recipe.createdAt).toBe("2026-01-01T00:00:00.000Z");
            expect(recipe.directions.map((d) => d.id)).toEqual(["d1", "d2"]);
            expect(recipe.likeCount).toBe(3);
            expect(recipe.isLikedByViewer).toBe(false);
            expect(recipe.isSavedByViewer).toBe(false);
        });

        it("applies the given viewer state", () => {
            const createdAt = Timestamp.fromDate(new Date("2026-01-01T00:00:00.000Z"));
            const snap = {
                id: "r1",
                data: () => ({
                    authorId: "u1",
                    title: "Vanilla Pudding",
                    description: null,
                    coverImageUrl: null,
                    ingredients: [],
                    directions: [],
                    likeCount: 0,
                    createdAt,
                    updatedAt: createdAt,
                }),
            } as any;

            const recipe = toRecipeEntity(snap, { isLikedByViewer: true, isSavedByViewer: true });

            expect(recipe.isLikedByViewer).toBe(true);
            expect(recipe.isSavedByViewer).toBe(true);
        });
    });

    describe("toRecipeDocData", () => {
        it("maps a RecipeDraft to Firestore doc data", () => {
            const draft: RecipeDraft = {
                authorId: "u1",
                title: "Vanilla Pudding",
                description: "Creamy.",
                coverImageUrl: "https://example.com/cover.jpg",
                ingredients: [{ id: "i1", name: "Milk", quantity: "1L" }],
                directions: [{ id: "d1", position: 1, instruction: "Heat.", imageUrl: null }],
            };

            const docData = toRecipeDocData(draft);

            expect(docData.authorId).toBe("u1");
            expect(docData.title).toBe("Vanilla Pudding");
            expect(docData.ingredients).toEqual(draft.ingredients);
            expect(docData.directions).toEqual(draft.directions);
            expect(docData.likeCount).toBe(0);
            expect(docData.createdAt).toBeDefined();
            expect(docData.updatedAt).toBeDefined();
        });
    });
});
