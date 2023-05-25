import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { Text, View, Container, ScrollView, TextInput, Button, TextButton } from "../../../../components/Themed";
import styles from "../../../../constants/style";
import AuthHeader from "../../../components/Auth/AuthHeader";
import { IAuthPage } from "../../../components/types";
import authStyles from "../authStyles"

const SignUp: React.FC<IAuthPage> = ({ navigation }) => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit = data => {
        console.log(data)
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
                                required: true,
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
                                required: true,
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
                                required: true,
                            }}
                            name="password"
                        />
                    </View>

                    <Button
                        btnText="Create Account"
                        onPress={handleSubmit(onSubmit)}
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
