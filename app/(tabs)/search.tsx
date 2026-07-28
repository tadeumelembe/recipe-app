import React from "react";
import { ScrollView, Text } from "../../src/components/Themed";
import { Screen } from "../../src/presentation/components/ui/Screen";
import style from "../../src/constants/style";

export default function TabSearch() {
    return (
        <Screen style={style.horizontalPadding}>
            <ScrollView>
                <Text>Search</Text>
            </ScrollView>
        </Screen>
    )
}
