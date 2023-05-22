import { Container, ScrollView, Text } from "../../../components/Themed"
import style from "../../../constants/style"
import { ProfileStackScreenProps } from "../../../types"
import Header from "../../components/Head"

const AddRecipe = ({ navigation, route }: ProfileStackScreenProps<'AddRecipe'>) => {

    return (
        <Container>
            <Header type={'back'} navigation={navigation} />
            <ScrollView>
                <Text style={style.textH1}>New Recipe</Text>
            </ScrollView>
        </Container>
    )
}

export default AddRecipe