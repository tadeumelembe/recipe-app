import { useQuery } from "@tanstack/react-query";

import { IRecipeRepository } from "../../domain/repositories/IRecipeRepository";
import { getFeed } from "../../domain/usecases/getFeed";
import { queryKeys } from "./queryKeys";

export function useFeed(recipeRepository: IRecipeRepository) {
    return useQuery({
        queryKey: queryKeys.recipes.feed(),
        queryFn: () => getFeed(recipeRepository)(),
    });
}
