import { useState } from "react";
import { IRecipeForm } from "../../../components/types";
import { initialRecipeForm } from "../../../constants/initialData";

export const useRecipeForm = () =>{
    const [form, setForm] = useState<IRecipeForm>(JSON.parse(JSON.stringify(initialRecipeForm)));
    
}