import React, { useState } from "react";
import { Pressable, StyleSheet, View as DefaultView, Switch } from "react-native";

import { Container, ScrollView, Text, View } from "../../components/Themed";
import style from "../../constants/style";
import Header from "../../components/Settings/Haader";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from "../../constants/Colors";
import { ProfileStackScreenProps } from "../../types";

type ISwitchButton = DefaultView['props'] & {
    label: string
}
const Settings = ({ navigation }: ProfileStackScreenProps<'Settings'>) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState: Boolean) => !previousState);

    function SwitchButton(props: ISwitchButton) {
        const { label, style, ...otherProps } = props
        return (
            <View style={[localStyle.switchButton, style]} >
                <Text style={localStyle.switchLabel}>{label}</Text>
                <Pressable onPress={() => toggleSwitch()}>
                    {isEnabled ?
                        <MaterialCommunityIcons name="toggle-switch" size={35} color={Colors.light.tint} />
                        :
                        <MaterialCommunityIcons name="toggle-switch-off" size={35} color="#ccc" />
                    }
                </Pressable>
            </View>
        )
    }

    return (
        <Container>
            <Header navigation={navigation} />

            <ScrollView style={{ marginTop: 40 }}>
                <Text style={style.textH1}>Settings</Text>

                <>
                    <Text style={localStyle.subTitle}>Push Notifications</Text>

                    <SwitchButton label={'Notify me for followers'} />

                    <SwitchButton label={'When someone send me a message'} />

                    <SwitchButton label={'When someone do live cooking'} />
                </>

                <View style={style.borderSeparator} />

                <>
                    <Text style={localStyle.subTitle}>Privacy Settings</Text>

                    <SwitchButton style={{ marginBottom: 10 }} label={'Followers can see my saved recipes'} />
                    <View style={localStyle.infoBox}>
                        <Text style={localStyle.infoText}>
                            If disabled, you won’t be able to see recipes saved by other profiles. Leave this enabled to share your collected recipes to others.
                        </Text>
                    </View>

                    <SwitchButton label={'Followers can see profiles I follow'} />

                </>
                <View style={style.borderSeparator} />

                <Pressable onPress={() => navigation.navigate('ChangePassword')} style={[localStyle.switchButton, { marginTop: 25 }]} >
                    <Text style={localStyle.switchLabel}>Change Password</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#030F09" />
                </Pressable>

            </ScrollView>

        </Container>
    )
}

export default Settings

const localStyle = StyleSheet.create({
    subTitle: {
        ...style.fontR,
        ...style.fontNunitoMedium,
        ...style.textMuted2,
        marginVertical: 25
    },
    switchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25
    },
    switchLabel: {
        ...style.fontM,
        ...style.fontNunitoRegular,
    },
    infoBox: {
        borderRadius: 10,
        backgroundColor: Colors.light.lightBlack
    },
    infoText: {
        padding: 10,
        ...style.fontR,
        ...style.fontNunitoRegular
    }
})