import { User, UserId } from "../../domain/entities/User";
import { IUserRepository, UserDraft } from "../../domain/repositories/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
    private users: User[];

    constructor(seed: User[] = []) {
        this.users = [...seed];
    }

    async getById(id: UserId): Promise<User | null> {
        return this.users.find((u) => u.id === id) ?? null;
    }

    async create(draft: UserDraft): Promise<User> {
        const user: User = { ...draft };
        this.users = [...this.users.filter((u) => u.id !== user.id), user];
        return user;
    }
}
