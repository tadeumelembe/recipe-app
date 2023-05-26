import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from "react-hook-form";

import { Container, Modal, ScrollView, Text, TextInput, View } from "../../components/Themed"
import style from "../../constants/style"
import { RootStackScreenProps } from "../../types"
import Header from "../../components/Head"
import Colors from "../../constants/Colors"
import { Ionicons } from "@expo/vector-icons"

interface IInputContainer {
    name: string;
    placeHolder: string;
    onPress: () => void
}

const AddRecipe = ({ navigation, route }: RootStackScreenProps<'AddRecipe'>) => {
    const modalRef = useRef();

    const [form, setForm] = useState({});
    const [image, setImage] = useState(null);

    const { control, handleSubmit, watch } = useForm<IFormData>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const pickImage = async (type: string) => {
        let result;
        if (type == 'camera') {
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } else {
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                allowsMultipleSelection: true,
                quality: 1,
            });
        }
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        const status = ImagePicker.requestMediaLibraryPermissionsAsync();
    }, [])

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

    const openModal = () => {
        modalRef.current?.open()
    }

    return (
        <Container style={{ paddingHorizontal: 0 }}>
            <View style={style.horizontalPadding}>
                <Header type={'back'} navigation={navigation} />
            </View>

            <ScrollView
                contentContainerStyle={localStyle.scrollView}
            >
                <Container style={{ paddingTop: 15 }}>

                    <Text style={style.textH1}>New Recipe</Text>
                    <View style={localStyle.recipeNameView}>
                        <Pressable onPress={() => openModal()} style={localStyle.cover}>
                            <Ionicons name="add" size={20} color={Colors.light.text} />
                        </Pressable>
                        <View style={localStyle.recipeNameInputView}>
                            <TextInput
                                placeholder={'Recipe Name'}
                                autoCapitalize='sentences'
                                control={control}
                                rules={{
                                    required: 'Name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Name should be at least 3 characters long',
                                    },
                                    maxLength: {
                                        value: 24,
                                        message: 'Name should be max 24 characters long',
                                    }
                                }}
                                name="name"
                            />
                        </View>
                    </View>

                    <InputContainer name={'Gallery'} onPress={pickImage} placeHolder={'Upload Images or Open Camera'} />

                    <InputContainer name={'Ingredients'} placeHolder={'Add Ingredient'} />

                    <InputContainer name={'How to Cook'} placeHolder={'Add Directions'} />

                    <InputContainer name={'Additional Info'} placeHolder={'Add Info'} />
                    <View style={{ height: 50 }} />

                </Container>



            </ScrollView>
            <Modal title="" ref={modalRef}>
                <View style={localStyle.mediaTypePickerContainer}>
                    <TouchableOpacity onPress={() => pickImage('camera')}>
                        <Text style={style.textH3}>Open camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 10 }} onPress={() => pickImage('library')}>
                        <Text style={style.textH3}>Pick from phone</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </Container>
    )
}

export default AddRecipe

const localStyle = StyleSheet.create({
    scrollView: {
    },
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
        width: 62,
        height: 62,
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
        backgroundColor: '#fff',
        elevation: 3,
        zIndex: 999,
        padding: 15,
        marginTop: 20,
        width: '100%',
    },
    placeHolder: {
        ...style.fontNunitoRegular,
        ...style.fontM,
        ...style.textMuted2,
        marginLeft: 15
    },
    mediaTypePickerContainer: {
        alignItems: 'center'
    }
})