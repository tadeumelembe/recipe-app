import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { firebaseUserRepository } from "../../data/repositories/FirebaseUserRepository";

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

    // The feed and other cooks' views read author info from this Firestore
    // doc, not from Firebase Auth (the client SDK can't look up another
    // user's Auth profile by uid).
    await firebaseUserRepository.create({
        id: authUser.uid,
        name: user.name ?? null,
        email: user.email,
        avatarUrl: null,
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