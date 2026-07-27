import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";

interface IUser {
    email: string;
    password: string;
    name?: string
}

async function create(user: IUser) {
    const { user: authUser } = await createUserWithEmailAndPassword(auth, user.email, user.password)

    await updateProfile(authUser, {
        displayName: user.name,
    })

    // onAuthStateChanged already fired when the account was created, back when
    // displayName was still null, and updateProfile does not re-trigger it. The
    // caller has to push the named user into the auth context itself.
    return authUser
}

async function login(user: IUser) {
    return await signInWithEmailAndPassword(auth, user.email, user.password)
}

export const authService = {
    create,
    login
}