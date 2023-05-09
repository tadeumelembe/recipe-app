import React, { useRef, useEffect } from "react";
import { KeyboardAvoidingView, Keyboard, Animated, StyleSheet, Platform } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View, Container, ImageBackground, ScrollView, TextInput, Button, TextButton } from "../../../../components/Themed";
import styles from "../../../../constants/style";
import AuthHeader from "../../../components/Auth/AuthHeader";
import authStyles from "../authStyles"

const SignUp: React.FC = ({ navigation }) => {

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <AuthHeader title={'Sign Up'} />

            <ScrollView
                style={authStyles.scrollView}
                keyboardShouldPersistTaps={'handled'}
            >
                <Container style={authStyles.container}>

                    <Text style={authStyles.pageTitle}>
                        Create a new account
                    </Text>

                    <View style={authStyles.inputView}>
                        <TextInput
                            placeholder="Full name"
                            autoCapitalize="none"

                        />
                    </View>

                    <View style={authStyles.inputView}>
                        <TextInput
                            placeholder="Email"
                            autoCapitalize="none"
                            secureTextEntry
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
                        btnText="Create Account"
                        onPress={() => alert('ok')}
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

const localStyles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 0,
        flex: 1
    },
    header: {
        height: 300,
        width: '100%',
        borderBottomRightRadius: 100,
    },
    headerText: {
        ...styles.fontNunitoBold,
        ...styles.fontXl
    },
    headerImage: {
        height: 300,
    },
    headerImageView: {
        ...styles.horizontalPadding,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    inputView: {
        marginBottom: 30
    }
})