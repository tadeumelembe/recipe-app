import { Pressable, StyleSheet } from "react-native"
import { Container, ScrollView, Text, TextInput, View } from "../../../components/Themed"
import style from "../../../constants/style"
import { ProfileStackScreenProps } from "../../../types"
import Header from "../../components/Head"
import Colors from "../../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

interface IInputContainer {
    name: string;
    placeHolder: string;
}

const AddRecipe = ({ navigation, route }: ProfileStackScreenProps<'AddRecipe'>) => {

    function InputContainer(props: IInputContainer) {
        return (
            <View style={localStyle.inputContainer}>
                <Text style={style.textH3}>{props.name}</Text>
                <Pressable style={localStyle.pressableArea}>
                    <Ionicons name="add" size={20} color={Colors.light.text} />
                    <Text style={localStyle.placeHolder}>{props.placeHolder}</Text>
                </Pressable>
            </View>
        )
    }

    return (
        <Container>
            <Header type={'back'} navigation={navigation} />

            <ScrollView>
                <Text style={style.textH1}>New Recipe</Text>
                <View style={localStyle.recipeNameView}>
                    <Pressable onPress={() => alert('Open Image')} style={localStyle.cover}>
                        <Ionicons name="add" size={20} color={Colors.light.text} />
                    </Pressable>
                    <View style={localStyle.recipeNameInputView}>
                        <TextInput placeholder={'Recipe Name'} />
                    </View>
                </View>

                <InputContainer name={'Gallery'} placeHolder={'Upload Images or Open Camera'} />

                <InputContainer name={'Ingredients'} placeHolder={'Add Ingredient'} />

                <InputContainer name={'How to Cook'} placeHolder={'Add Directions'} />

                <InputContainer name={'Additional Info'} placeHolder={'Add Info'} />

            </ScrollView>

        </Container>
    )
}

export default AddRecipe

const localStyle = StyleSheet.create({
    recipeNameView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    recipeNameInputView: {
        flex: 1
    },
    cover: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.light.text,
        borderRadius: 8,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressableArea: {
        width: '100%',
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.light.text,
        flexDirection: 'row',
        borderRadius: 8,
        borderStyle: 'dashed',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginTop: 10
    },
    inputContainer: {
        ...style.card,
        padding: 15,
        marginTop: 20,
        width: '100%'
    },
    placeHolder: {
        ...style.fontNunitoRegular,
        ...style.fontM,
        ...style.textMuted2,
        marginLeft: 15
    }
})