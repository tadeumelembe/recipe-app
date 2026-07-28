import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

import { User } from "../../domain/entities/User";
import { UserDraft } from "../../domain/repositories/IUserRepository";

export interface UserDocData {
    name: string | null;
    email: string | null;
    avatarUrl: string | null;
}

export function toUserEntity(snap: DocumentSnapshot<DocumentData> | QueryDocumentSnapshot<DocumentData>): User {
    const data = snap.data() as UserDocData;

    return {
        id: snap.id,
        name: data.name ?? null,
        email: data.email ?? null,
        avatarUrl: data.avatarUrl ?? null,
    };
}

export function toUserDocData(draft: UserDraft): UserDocData {
    return {
        name: draft.name,
        email: draft.email,
        avatarUrl: draft.avatarUrl,
    };
}
