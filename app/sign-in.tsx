import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Text, View, TextButton } from "../src/components/Themed";
import { Screen } from "../src/presentation/components/ui/Screen";
import { Input } from "../src/presentation/components/ui/Input";
import { Button } from "../src/presentation/components/ui/Button";
import AuthHeader from "../src/components/Auth/AuthHeader";
import styles from "../src/constants/style";
import authStyles from "../src/constants/authStyles"

import { helpers } from "../src/utils/constants";
import { useSignInForm } from "../src/hooks/useSignInForm";
import { Button } from "../src/presentation/components/ui/Button";

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

                <Input
                    className="mb-[30px]"
                    label="Email address"
                    autoCapitalize="none"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: { value: helpers.EMAIL_VALIDATION, message: 'Email is invalid' },
                    }}
                    name="email"
                />

                <Input
                    className="mb-[30px]"
                    label="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    control={control}
                    rules={{
                        required: 'Password is required',
                        min: { value: 8, message: "Password must have at least 8 characters" }
                    }}
                    name="password"
                />

                <Text style={localStyle.formWarning}>{formError}</Text>

                <Button
                    title="Login"
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
