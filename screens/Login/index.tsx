import React from "react";
import { StyleSheet } from "react-native";
import { Text, View, Container, ImageBackground, ScrollView } from "../../components/Themed";
import styles from "../../constants/style";

const Login: React.FC = () => {
    return (
        <Container style={{ paddingTop: 0 }}>
            <View style={[localStyles.header]}>
                <ImageBackground imageStyle={{ borderBottomRightRadius: 80 }} source={require('../../assets/images/login-header.png')}>
                    <View style={[localStyles.headerImageView]}>
                        <Text>
                            Welcome
                        </Text>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView>

                <Text>
                    Login
                </Text>
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
    headerImageView:{
        ...styles.horizontalPadding,
        backgroundColor:'rgba(255, 255, 255, 0.3)',
        width:'100%',
        height:'100%',
        justifyContent:'center'
    }
})