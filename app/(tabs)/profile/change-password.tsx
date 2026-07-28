import React from "react";

import { Text } from "../../../src/components/Themed";
import { Screen } from "../../../src/presentation/components/ui/Screen";
import style from "../../../src/constants/style";
import Header from "../../../src/components/Settings/Haader";

export default function ChangePassword() {

    return (
        <Screen style={style.horizontalPadding}>
            <Header />

            <Text style={style.textH1}>ChangePass</Text>

        </Screen>
    )
}
