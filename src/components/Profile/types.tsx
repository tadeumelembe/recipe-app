import { NavigationProp } from "@react-navigation/native";

interface IRecipeItem {
    item:{
        name: string;
        image: string;
        id: number;
    };
    navigation: NavigationProp<any, any>;
}