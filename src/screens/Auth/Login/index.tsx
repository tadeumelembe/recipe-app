import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { Text, View, Container, ScrollView, TextInput, Button, TextButton } from "../../../../components/Themed";
import AuthHeader from "../../../components/Auth/AuthHeader";
import styles from "../../../../constants/style";
import authStyles from "../authStyles"
import { IAuthPage } from "../../../components/types";


const Login: React.FC<IAuthPage> = ({ navigation }) => {


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={authStyles.scrollView}
                keyboardShouldPersistTaps={'handled'}
            >

                <AuthHeader title={'Recipe Rells'} />

                <Container style={{ flex: 1 }}>

                    <Text style={authStyles.pageTitle}>
                        Please login to continue.
                    </Text>

                    <View style={authStyles.inputView}>
                        <TextInput
                            placeholder="Email address"
                            autoCapitalize="none"

                        />
                    </View>

                    <View style={authStyles.inputView}>
                        <TextInput
                            placeholder="Password"
                            autoCapitalize="none"
                            secureTextEntry
                        />
                    </View>

                    <Button
                        btnText="Login"
                        onPress={() => alert('ok')}
                    />

                    <View style={[{ alignItems: 'center', marginTop: 40 }]}>
                        <Text style={[styles.fontR, styles.fontNunitoMedium, styles.textMuted]}>
                            New to xxxx?
                        </Text>

                        <TextButton
                            btnText="Create New Account"
                            onPress={() => navigation.navigate('SignUp')}

                        />

                    </View>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login