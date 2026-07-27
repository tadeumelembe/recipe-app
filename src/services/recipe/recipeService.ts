import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig"
import { IRecipeForm } from "../../components/types";

// Deprecated: writes an unvalidated form object straight to Firestore.
// Use `FirebaseRecipeRepository.create` (src/data/repositories/FirebaseRecipeRepository.ts) instead
// once the Add Recipe form is rebuilt on RecipeDraft (Phase 1).
async function create(recipe: IRecipeForm) {
    console.log(recipe)
    const recipeRef = await addDoc(collection(db, 'recipes'), recipe)
    console.log(recipeRef)
    return recipeRef
}

{/**List */ }


{/**Details */ }


export const recipeService = {
    create
}