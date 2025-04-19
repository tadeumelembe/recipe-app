import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

interface IUser {
    email: string;
    password: string;
    name?: string
}

async function create(user: IUser) {
    return await createUserWithEmailAndPassword(auth, user.email, user.password).then(async (authUser) => {
        await updateProfile(authUser.user, {
            displayName: user.name,

        })
    })
}

async function login(user: IUser) {
    return await signInWithEmailAndPassword(auth, user.email, user.password)
}

export const authService = {
    create,
    login
}