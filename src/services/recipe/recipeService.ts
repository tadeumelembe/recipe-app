import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig"
import { IRecipeForm } from "../../components/types";

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