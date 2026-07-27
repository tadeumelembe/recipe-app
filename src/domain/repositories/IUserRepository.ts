import { User, UserId } from "../entities/User";

export interface IUserRepository {
    getById(id: UserId): Promise<User | null>;
}
