import { NavigationProp } from "@react-navigation/native";

export interface IProfileRecipeItem {
    item:{
        name: string;
        image: string;
        id: number;
    };
    navigation: NavigationProp<any, any>;
}