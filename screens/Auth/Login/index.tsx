import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Text, View, Container, ScrollView, TextInput, Button, TextButton } from "../../../components/Themed";
import AuthHeader from "../../../components/Auth/AuthHeader";
import styles from "../../../constants/style";
import authStyles from "../authStyles"
import { IAuthPage } from "../../../components/types";

import { useAuth } from "../../../contexts/authContext";
import { auth, signInWithEmailAndPassword } from "../../../firebaseConfig";
import { helpers } from "../../../utils/constants";


interface IFormData {
    password: string;
    email: string
}

const Login: React.FC<IAuthPage> = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState('')

    const { signIn } = useAuth();

    const { control, handleSubmit } = useForm<IFormData>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data: IFormData) => {
        const { email, password } = data

        setFormError('')
        setLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                signIn(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                const firebaseAuthErros = ['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-email']

                if (firebaseAuthErros.includes(error.code)) return setFormError('Invalid credentials')

                setFormError('Something went wrong, trey again')
            })
            .finally(() => setLoading(false));
    }

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
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        disabled={loading}

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

const localStyle = StyleSheet.create({
    formWarning: {
        ...styles.fontS,
        ...styles.fontNunitoRegular,
        color: 'red',
        marginTop: -23,
        marginBottom: 15
    }
})