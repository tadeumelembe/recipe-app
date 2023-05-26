import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CookingMode from "../screens/CookingMode";
import RecipeDetails from "../screens/RecipeDetails";

const stack = createNativeStackNavigator();

export default function RecipeStack() {
    return (
        <stack.Navigator>
            <stack.Screen name="RecipeDetails" component={RecipeDetails} options={{ headerShown: false }} />

            <stack.Screen name="CookingMode" component={CookingMode} options={{ headerShown: false }} />


        </stack.Navigator>
    );
}