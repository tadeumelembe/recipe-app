import React, { useState } from "react";
import { Pressable, StyleSheet, View as DefaultView, Switch } from "react-native";

import { Container, ScrollView, Text, View } from "../../../components/Themed";
import style from "../../../constants/style";
import Header from "../../components/Settings/Haader";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from "../../../constants/Colors";

type ISwitchButton = DefaultView['props'] & {
    label: string
}
const ChangePassword: React.FC = ({ navigation }) => {

  

    return (
        <Container>
            <Header navigation={navigation} />


            <Text style={style.textH1}>ChangePass</Text>



        </Container>
    )
}

export default ChangePassword
