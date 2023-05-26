import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ChangePassword from "../screens/ChangePassword";
import TabProfile from "../screens/Profile";
import Settings from "../screens/Settings";
import AddRecipe from "../screens/AddRecipe";
import { navigationNames } from "../utils/constants";

import { ProfileStackParamList, RootStackParamList } from "../types";

const stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
    return (
        <stack.Navigator>

            <stack.Screen name="Root" component={TabProfile} options={{ headerShown: false }} />

            <stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />

        </stack.Navigator>
    );
}