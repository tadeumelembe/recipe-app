import { User, UserId } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

export function getUserById(users: IUserRepository) {
    return (id: UserId): Promise<User | null> => users.getById(id);
}
