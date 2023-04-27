import React from "react";
import { Container, ScrollView, Text } from "../../../components/Themed";
import Header from "../../components/TabProfile/Header";

const TabHome: React.FC = ({ navigation }) => {
    return (
        <Container>
            <ScrollView>
             <Header />
            </ScrollView>
        </Container>
    )
}

export default TabHome