import { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from "react-hook-form";
import { ref as firebaseRef, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Ionicons } from "@expo/vector-icons"

import { Button, Container, Modal, ScrollView, Text, TextInput, View } from "../../components/Themed"
import style from "../../constants/style"
import { RootStackScreenProps } from "../../types"
import Header from "../../components/Head"
import Colors from "../../constants/Colors"
import { getBlobFromUri } from "../../utils/helpers";
import { storage } from "../../firebaseConfig";
import { initialRecipeForm } from "../../constants/initialData";
import { IRecipeForm } from "../../components/types";
import CardContent from "../../components/AddRecipe/CardContent";
import { pickImage } from "../../utils/constants";

const AddRecipe = ({ navigation, route }: RootStackScreenProps<'AddRecipe'>) => {
    const modalRef = useRef();

    const [form, setForm] = useState<IRecipeForm>(JSON.parse(JSON.stringify(initialRecipeForm)));

    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            name: '',
        }
    });


    const handleCoverImage = async (type: string) => {
        const result = await pickImage(type);

        if (!result) return;

        let newForm = { ...form }
        newForm.coverImage = result[0]

        setForm({ ...newForm })
    }

    const handleGalleryImages = async () => {
        openModal()
    }

    useEffect(() => {
        const status = ImagePicker.requestMediaLibraryPermissionsAsync();
    }, [])

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
                        <Pressable onPress={() => openModal()} style={[localStyle.cover, form.coverImage?.uri && { borderWidth: 0 }]}>
                            {form.coverImage?.uri ?
                                <Image
                                    resizeMode="cover"
                                    style={localStyle.coverImage}
                                    source={{ uri: form.coverImage?.uri }}
                                />
                                :
                                <Ionicons name="add" size={20} color={Colors.light.text} />
                            }

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

                    <CardContent name={'Gallery'} onPress={() => handleGalleryImages()} placeHolder={'Upload Images or Open Camera'} />

                    <CardContent name={'Ingredients'} placeHolder={'Add Ingredient'} />

                    <CardContent name={'How to Cook'} placeHolder={'Add Directions'} />

                    <CardContent name={'Additional Info'} placeHolder={'Add Info'} />

                    <View style={localStyle.categorySection}>
                        <Text style={[style.textMuted2, style.fontNunitoRegular, style.fontR]}>Save to</Text>
                        <View style={localStyle.categoryRow}>
                            <View style={localStyle.categoryCard}>
                                <Text>Save to</Text>

                            </View>
                            <View style={{ width: '45%' }}>
                                <Button
                                    btnText="Draft"
                                    btnSecondary={true}
                                />
                            </View>
                        </View>
                    </View>

                    <Button btnText="Post to feed" style={{ marginTop: 20 }} />
                    <View style={{ height: 50 }} />

                </Container>



            </ScrollView>

            <Modal resizable={true} title="Upload cover" ref={modalRef}>
                <View style={localStyle.mediaTypePickerContainer}>
                    <Button
                        btnText="Open Camera"
                        onPress={() => handleCoverImage('camera')}
                    />
                    <Button
                        btnText="Pick from phone"
                        onPress={() => handleCoverImage('library')}
                        btnSecondary={true}
                        style={{ marginTop: 10 }}
                    />
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
        elevation: 8,
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
        alignItems: 'center',
    },
    categorySection: {
        marginTop: 20
    },
    categoryRow: {
        flexDirection: 'row',
        flex: 1,
        gap: 15,
        marginTop: 10
    },
    coverImage: {
        ...style.strechImage,
        borderRadius: 8
    },
    categoryCard: {
        ...style.card,
        elevation: 6,
        padding: 5,
        backgroundColor: '#fff',
        flexGrow: 1
    }
})

const handleFireabseUplaod = async (uri: string) => {
    const blob = await getBlobFromUri(uri)

    const storageRef = firebaseRef(storage, "images/recipes/" + Date.now().toString());

    const metadata = {
        contentType: 'image/jpeg',
    };

    const uploadTask = uploadBytesResumable(storageRef, blob);

    // 'file' comes from the Blob or File API
    uploadTask.on('state_changed',
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                // ...

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
            blob.close()
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
            });
            blob.close()
        }
    );
}