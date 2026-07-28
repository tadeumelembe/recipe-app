import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Text, View, TextButton } from "../src/components/Themed";
import { Screen } from "../src/presentation/components/ui/Screen";
import { Input } from "../src/presentation/components/ui/Input";
import { Button } from "../src/presentation/components/ui/Button";
import styles from "../src/constants/style";
import AuthHeader from "../src/components/Auth/AuthHeader";
import authStyles from "../src/constants/authStyles"
import { helpers } from "../src/utils/constants";
import { useSignUpForm } from "../src/hooks/useSignUpForm";
import { Button } from "../src/presentation/components/ui/Button";

export default function SignUp() {

    const router = useRouter()

    const {
        loading,
        submitForm,
        control,
        formError,
        handleSubmit,
        watch
    } = useSignUpForm()

    const pwd = watch('password');

    return (
        <Screen edges={[]} scrollable header={<AuthHeader title={'Sign Up'} />}>
            <View style={[styles.horizontalPadding, { flex: 1 }]}>

                <Text style={authStyles.pageTitle}>
                    Create a new account
                </Text>

                <Input
                    className="mb-[30px]"
                    label="Full name"
                    autoCapitalize="none"
                    control={control}
                    rules={{
                        required: 'Name is required',
                        minLength: {
                            value: 3,
                            message: 'Name should be at least 3 characters long',
                        },
                        maxLength: {
                            value: 24,
                            message: 'Name should be max 24 characters long',
                        }
                    }}
                    name="name"
                />

                <Input
                    className="mb-[30px]"
                    label="Email"
                    autoCapitalize="none"
                    control={control}
                    inputMode='email'
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

                <Input
                    className="mb-[30px]"
                    label="Confirm Password"
                    autoCapitalize="none"
                    secureTextEntry
                    control={control}
                    rules={{
                        validate: (value: string) => (value === pwd || pwd == '') || 'Password do not match',
                    }}
                    name="password2"
                />

                <Text style={localStyle.formWarning}>{formError}</Text>

                <Button
                    title="Create Account"
                    onPress={handleSubmit(submitForm)}
                    loading={loading}
                    disabled={loading}
                />

                <View style={[{ alignItems: 'center', marginTop: 40 }]}>
                    <Text style={[styles.fontR, styles.fontNunitoMedium, styles.textMuted]}>
                        Already have an account?
                    </Text>

                    <TextButton
                        btnText="Sign In here"
                        onPress={() => router.back()}

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
