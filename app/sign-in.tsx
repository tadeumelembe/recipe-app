import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Text, View, TextInput, Button, TextButton } from "../src/components/Themed";
import { Screen } from "../src/presentation/components/ui/Screen";
import AuthHeader from "../src/components/Auth/AuthHeader";
import styles from "../src/constants/style";
import authStyles from "../src/constants/authStyles"

import { helpers } from "../src/utils/constants";
import { useSignInForm } from "../src/hooks/useSignInForm";

export default function Login() {

    const router = useRouter()

    const {
        handleSubmit,
        loading,
        formError,
        control,
        submitForm
    } = useSignInForm()

    return (
        <Screen edges={[]} scrollable header={<AuthHeader title={'Recipe Rells'} />}>
            <View style={[styles.horizontalPadding, { flex: 1 }]}>

                <Text style={authStyles.pageTitle}>
                    Please login to continue.
                </Text>

                <View style={authStyles.inputView}>
                    <TextInput
                        placeholder="Email address"
                        autoCapitalize="none"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: { value: helpers.EMAIL_VALIDATION, message: 'Email is invalid' },
                        }}
                        name="email"
                    />
                </View>

                <View style={authStyles.inputView}>
                    <TextInput
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry
                        control={control}
                        rules={{
                            required: 'Password is required',
                            min: { value: 8, message: "Password must have at least 8 characters" }
                        }}
                        name="password"
                    />
                </View>

                <Text style={localStyle.formWarning}>{formError}</Text>

                <Button
                    btnText="Login"
                    onPress={handleSubmit(submitForm)}
                    loading={loading}
                    disabled={loading}

                />

                <View style={[{ alignItems: 'center', marginTop: 40 }]}>
                    <Text style={[styles.fontR, styles.fontNunitoMedium, styles.textMuted]}>
                        New to xxxx?
                    </Text>

                    <TextButton
                        btnText="Create New Account"
                        onPress={() => router.push('/sign-up')}

                    />

                </View>
            </View>
        </Screen>
    )
}

const localStyle = StyleSheet.create({
    formWarning: {
        ...styles.fontS,
        ...styles.fontNunitoRegular,
        color: 'red',
        marginTop: -23,
        marginBottom: 15
    }
})
