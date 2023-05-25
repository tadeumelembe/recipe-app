import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Text, View, Container, ScrollView, TextInput, Button, TextButton } from "../../../../components/Themed";
import AuthHeader from "../../../components/Auth/AuthHeader";
import styles from "../../../../constants/style";
import authStyles from "../authStyles"
import { IAuthPage } from "../../../components/types";

import { useAuth } from "../../../context/authContext";
import { auth, signInWithEmailAndPassword } from "../../../../firebaseConfig";
import { helpers } from "../../../utils/constants";


interface IFormData {
    password: string;
    email: string
}

const Login: React.FC<IAuthPage> = ({ navigation }) => {
    const [loading, setLoading] = useState(false)

    const { signIn } = useAuth();

    const { control, handleSubmit } = useForm<IFormData>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = (data: IFormData) => {
        console.log(data)
        const { email, password } = data
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                console.log(error.code, error.message)

                const errorCode = error.code;
                const errorMessage = error.message;
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