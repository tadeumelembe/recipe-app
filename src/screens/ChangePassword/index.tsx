import React, { useState } from "react";
import { Pressable, StyleSheet, View as DefaultView, Switch } from "react-native";

import { Text, View } from "../../components/Themed";
import { Screen } from "../../presentation/components/ui/Screen";
import style from "../../constants/style";
import Header from "../../components/Settings/Haader";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";

type ISwitchButton = DefaultView['props'] & {
    label: string
}
const ChangePassword = () => {

    return (
        <Screen style={style.horizontalPadding}>
            <Header />


            <Text style={style.textH1}>ChangePass</Text>



        </Screen>
    )
}

export default ChangePassword
