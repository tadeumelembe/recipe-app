import { useQuery } from "@tanstack/react-query";

import { IRecipeRepository } from "../../domain/repositories/IRecipeRepository";
import { getRecipeById } from "../../domain/usecases/getRecipeById";
import { queryKeys } from "./queryKeys";

export function useRecipe(id: string, recipeRepository: IRecipeRepository) {
    return useQuery({
        queryKey: queryKeys.recipes.detail(id),
        queryFn: () => getRecipeById(recipeRepository)(id),
        enabled: !!id,
    });
}
