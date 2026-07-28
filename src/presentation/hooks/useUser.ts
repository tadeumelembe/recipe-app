import { useQuery } from "@tanstack/react-query";

import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { getUserById } from "../../domain/usecases/getUserById";
import { queryKeys } from "./queryKeys";

export function useUser(id: string, userRepository: IUserRepository) {
    return useQuery({
        queryKey: queryKeys.users.detail(id),
        queryFn: () => getUserById(userRepository)(id),
        enabled: !!id,
    });
}
