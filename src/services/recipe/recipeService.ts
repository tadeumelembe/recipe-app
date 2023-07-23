import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../firebaseConfig"

async function create(recipe:any){
    const recipeRef = await addDoc(collection(db, 'recipes'),recipe);
    console.log(recipeRef);
}

{/**List */}


{/**Details */}


export {
    create
}