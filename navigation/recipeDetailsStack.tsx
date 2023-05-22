import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CookingMode from "../src/screens/CookingMode";
import RecipeDetails from "../src/screens/RecipeDetails";

const stack = createNativeStackNavigator();

export default function RecipeStack() {
    return (
        <stack.Navigator>
            <stack.Screen name="RecipeDetails" component={RecipeDetails} options={{ headerShown: false }} />

            <stack.Screen name="CookingMode" component={CookingMode} options={{ headerShown: false }} />


        </stack.Navigator>
    );
}