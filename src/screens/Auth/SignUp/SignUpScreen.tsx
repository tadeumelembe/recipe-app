import React from "react";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { Text, View, TextInput, Button, TextButton } from "../../../components/Themed";
import { Screen } from "../../../presentation/components/ui/Screen";
import styles from "../../../constants/style";
import AuthHeader from "../../../components/Auth/AuthHeader";
import authStyles from "../authStyles"
import { helpers } from "../../../utils/constants";
import { useSignUpForm } from "./hooks/useSignUpForm";

const SignUp: React.FC = () => {

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

                <View style={authStyles.inputView}>
                    <TextInput
                        placeholder="Full name"
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
                </View>

                <View style={authStyles.inputView}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        control={control}
                        inputMode='email'
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


                <View style={authStyles.inputView}>
                    <TextInput
                        placeholder="Confirm Password"
                        autoCapitalize="none"
                        secureTextEntry
                        control={control}
                        rules={{
                            validate: (value: string) => (value === pwd || pwd == '') || 'Password do not match',
                        }}
                        name="password2"
                    />
                </View>

                <Text style={localStyle.formWarning}>{formError}</Text>

                <Button
                    btnText="Create Account"
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

export default SignUp

const localStyle = StyleSheet.create({
    formWarning: {
        ...styles.fontS,
        ...styles.fontNunitoRegular,
        color: 'red',
        marginTop: -23,
        marginBottom: 15
    }
})
