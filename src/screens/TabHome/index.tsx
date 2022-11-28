import React from "react";
import { Container, IoniconsIcon, ScrollView, Text, View } from "../../../components/Themed";
import styles from "../../../constants/style";

const TabHome: React.FC = ({ navigation }) => {
    return (
        <Container>
            <ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Logo</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ paddingRight: 40 }}>
                            <IoniconsIcon name="notifications-outline" color="#000" />
                        </View>
                        <View>
                            <IoniconsIcon name="mail-outline" color="#000" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}

export default TabHome