import React from "react";
import { Pressable, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { Text, View, Container, ImageBackground, ScrollView, TextInput, Button, TextButton } from "../../../components/Themed";
import styles from "../../../constants/style";

const SignUp: React.FC = ({ navigation }) => {
    return (
        <Container style={{ paddingTop: 0 }}>
            <View style={[localStyles.header]}>
                <ImageBackground imageStyle={{ borderBottomRightRadius: 80 }} source={require('../../../assets/images/login-header.png')}>
                    <View style={[localStyles.headerImageView]}>
                        <Text style={[styles.fontNunitoBold, styles.fontXl]}>
                            Create a new account
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView>

                <Text style={[styles.fontNunitoRegular, styles.fontR, styles.textMuted2, { paddingTop: 25, paddingBottom: 50 }]}>
                    Create a new account
                </Text>

                <View style={localStyles.inputView}>
                    <TextInput
                        placeholder="Full name"
                        autoCapitalize="none"

                    />
                </View>

                <View style={localStyles.inputView}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        secureTextEntry
                    />
                </View>

                <View style={localStyles.inputView}>
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
            </ScrollView>
        </Container>
    )
}

export default SignUp

const localStyles = StyleSheet.create({
    header: {
        height: 300,
        width: '100%',
        borderBottomRightRadius: 100,
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