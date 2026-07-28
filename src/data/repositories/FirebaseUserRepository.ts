import { Firestore, doc, getDoc, setDoc } from "firebase/firestore";

import { User, UserId } from "../../domain/entities/User";
import { IUserRepository, UserDraft } from "../../domain/repositories/IUserRepository";
import { db } from "../firebase/client";
import { USERS_COLLECTION } from "../firebase/collections";
import { toUserDocData, toUserEntity } from "../mappers/userMapper";

export class FirebaseUserRepository implements IUserRepository {
    constructor(private readonly firestore: Firestore = db) {}

    async getById(id: UserId): Promise<User | null> {
        const snap = await getDoc(doc(this.firestore, USERS_COLLECTION, id));
        if (!snap.exists()) return null;
        return toUserEntity(snap);
    }

    async create(draft: UserDraft): Promise<User> {
        const userRef = doc(this.firestore, USERS_COLLECTION, draft.id);
        await setDoc(userRef, toUserDocData(draft));
        return { ...draft };
    }
}

export const firebaseUserRepository = new FirebaseUserRepository();
