import React, { useEffect, useRef } from "react";
import { KeyboardAvoidingView, Keyboard, Platform, Animated, StyleSheet } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View, Container, ImageBackground, ScrollView, TextInput, Button, TextButton } from "../../../../components/Themed";
import styles from "../../../../constants/style";
import Header from "../../../components/Auth/AuthHeader";
import authStyles from "../authStyles"


const Login: React.FC = ({ navigation }) => {


    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={authStyles.scrollView}
                keyboardShouldPersistTaps={'handled'}
            >

                <Header title={'Recipe Rells'} />

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