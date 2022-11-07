import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "../../components/Themed";

const Routes: React.FC = ()=>{

    const logged = true;
    const loading = false;

     // loading
     if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ccc" />
            </View>
        );
    }


    return logged ?<></> : <></>;
}

export default Routes