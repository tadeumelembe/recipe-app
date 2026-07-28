import { User, UserId } from "../entities/User";

export interface UserDraft {
    id: UserId;
    name: string | null;
    email: string | null;
    avatarUrl: string | null;
}

export interface IUserRepository {
    getById(id: UserId): Promise<User | null>;
    create(draft: UserDraft): Promise<User>;
}
