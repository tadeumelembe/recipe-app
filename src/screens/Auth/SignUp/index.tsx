import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Text, View, Container, ScrollView, TextInput, Button, TextButton } from "../../../../components/Themed";
import styles from "../../../../constants/style";
import AuthHeader from "../../../components/Auth/AuthHeader";
import { IAuthPage } from "../../../components/types";
import authStyles from "../authStyles"
import { auth, createUserWithEmailAndPassword, updateProfile } from "../../../../firebaseConfig";
import { helpers } from "../../../utils/constants";

interface IFormData {
    name: string;
    password: string;
    email: string
}

const SignUp: React.FC<IAuthPage> = ({ navigation }) => {

    const [loading, setLoading] = useState(false)

    const { control, handleSubmit, watch } = useForm<IFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });
    const pwd = watch('password');

    const onSubmit = (data: IFormData) => {
        const { email, password, name } = data

        createUserWithEmailAndPassword(auth, email, password).then((authUser) => {
            console.log(authUser)
            updateProfile(auth.currentUser, {
                displayName: name,

            }).then(() => {
                console.log('Profile Updated')
            }).catch((error) => {
                console.log('Update Error', error)
            });
        }).catch((error) => {
            console.log(error.code, error.message)
            const errorCode = error.code;
            const errorMessage = error.message;
        }).finally(() => setLoading(false));

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
                <AuthHeader title={'Sign Up'} />

                <Container style={authStyles.container}>

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
                                validate: value => (value === pwd || pwd == '') || 'Password do not match',
                            }}
                            name="password2"
                        />
                    </View>


                    <Button
                        btnText="Create Account"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        disabled={loading}
                    />

                    <View style={[{ alignItems: 'center', marginTop: 40 }]}>
                        <Text style={[styles.fontR, styles.fontNunitoMedium, styles.textMuted]}>
                            Already have an account?
                        </Text>

                        <TextButton
                            btnText="Sign In here"
                            onPress={() => navigation.pop()}

                        />

                    </View>
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignUp
