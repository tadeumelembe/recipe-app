import React from "react";
import { ScrollView, Text } from "../../components/Themed";
import { Screen } from "../../presentation/components/ui/Screen";
import style from "../../constants/style";

const TabHome: React.FC = () => {
    return (
        <Screen style={style.horizontalPadding}>
            <ScrollView>
                <Text>Search</Text>
            </ScrollView>
        </Screen>
    )
}

export default TabHome