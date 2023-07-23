import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

async function create(user: any) {
    return await createUserWithEmailAndPassword(auth, user.email, user.password).then(async (authUser) => {

        await updateProfile(authUser.user, {
            displayName: user.name,

        })

    })
}

export const authService = {
    create
}