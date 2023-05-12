import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePassword from "../src/screens/ChangePassword";
import TabProfile from "../src/screens/Profile";
import Settings from "../src/screens/Settings";

const stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <stack.Navigator>

            <stack.Screen name="Root" component={TabProfile} options={{ headerShown: false }} />

            <stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />

        </stack.Navigator>
    );
}