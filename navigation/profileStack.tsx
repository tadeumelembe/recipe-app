import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChangePassword from "../src/screens/ChangePassword";
import TabProfile from "../src/screens/Profile";
import Settings from "../src/screens/Settings";
import AddRecipe from "../src/screens/AddRecipe";
import { navigationNames } from "../src/utils/constants";

import { ProfileStackParamList, RootStackParamList } from "../types";

const stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
    return (
        <stack.Navigator>

            <stack.Screen name="Root" component={TabProfile} options={{ headerShown: false }} />

            <stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
            <stack.Screen name="AddRecipe" component={AddRecipe} options={{ headerShown: false }} />

        </stack.Navigator>
    );
}