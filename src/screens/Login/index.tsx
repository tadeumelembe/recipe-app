import React from "react";
import { Pressable, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import { Text, View, Container, ImageBackground, ScrollView, TextInput, TouchableOpacity, TextButton } from "../../../components/Themed";
import styles from "../../../constants/style";

const Login: React.FC = ({ navigation }) => {
    return (
        <Container style={{ paddingTop: 0 }}>
            <View style={[localStyles.header]}>
                <ImageBackground imageStyle={{ borderBottomRightRadius: 80 }} source={require('../../../assets/images/login-header.png')}>
                    <View style={[localStyles.headerImageView]}>
                        <Text style={[styles.fontNunitoBold, styles.fontXl]}>
                            Welcome Back!
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView>

                <Text style={[styles.fontNunitoRegular, styles.fontR, styles.textMuted2, { paddingTop: 25, paddingBottom: 50 }]}>
                    Please login to continue.
                </Text>

                <View style={localStyles.inputView}>
                    <TextInput
                        placeholder="Email address"
                        autoCapitalize="none"

                    />
                </View>

                <View style={localStyles.inputView}>
                    <TextInput
                        placeholder="Password"
                        autoCapitalize="none"
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
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
            </ScrollView>
        </Container>
    )
}

export default Login

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