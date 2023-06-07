import { useCallback, useEffect, useRef, useState } from "react";
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
import CameraLibraryModal from "../../components/CameraLibraryModal";
import EditGallery from "../../components/AddRecipe/EditGallery";

const AddRecipe = ({ navigation, route }: RootStackScreenProps<'AddRecipe'>) => {
    const modalRef = useRef();
    const modalGalleryRef = useRef();

    const [form, setForm] = useState<IRecipeForm>(JSON.parse(JSON.stringify(initialRecipeForm)));
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');

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
        modalRef.current?.close()
    }

    const handleGalleryImages = async (type: string) => {

        const result = await pickImage(type);

        const previousGalleryLength = form.galleryImages?.length

        if (previousGalleryLength >= 4) {
            alert('No more than 4 images');
            if (previousGalleryLength >= 1) return modalGalleryRef.current.open()
        }

        if (!result) return;

        const totalImages = result.length + previousGalleryLength
        console.log(totalImages)

        let concactImages = form.galleryImages.concat(result).slice(0, 4)

        setForm({
            ...form,
            galleryImages: concactImages
        })

        modalRef.current?.close()
        if (previousGalleryLength >= 1) modalGalleryRef.current.open()
    }

    const handleGalleryRemove = (index: number) => {
        setForm({
            ...form,
            galleryImages: form.galleryImages.filter(function (obj, i) { return i != index })
        })
    }

    useEffect(()=>{
        if (form.galleryImages.length == 0) return modalGalleryRef.current.close()
    },[form.galleryImages])

    useEffect(() => {
        const status = ImagePicker.requestMediaLibraryPermissionsAsync();
    }, [])

    const openModal = useCallback((content: string) => {
        switch (content) {
            case 'camera':
                setModalContent('camera')
                break;

            case 'gallery-pick-camera':
                setModalContent('gallery-pick-camera')
                break;

            case 'edit-gallery':
                return modalGalleryRef.current?.open()

            default:
                break;
        }
        modalRef.current?.open()
    }, [])

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
                        <Pressable onPress={() => openModal('camera')} style={[localStyle.cover, form.coverImage?.uri && { borderWidth: 0 }]}>
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
                                        value: 15,
                                        message: 'Name should be max 15 characters long',
                                    }
                                }}
                                name="name"
                            />
                        </View>
                    </View>

                    <CardContent
                        name={'Gallery'}
                        type={'gallery'}
                        items={form.galleryImages}
                        onPress={openModal}
                        onPressEdit={openModal}
                        placeHolder={'Upload Images or Open Camera'}
                    />

                    <CardContent
                        name={'Ingredients'}
                        placeHolder={'Add Ingredient'}
                    />

                    <CardContent
                        name={'How to Cook'}
                        placeHolder={'Add Directions'}
                    />

                    <CardContent
                        name={'Additional Info'}
                        placeHolder={'Add Info'}
                    />

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

                    <Button onPress={() => setModalContent(Math.random())} btnText="Post to feed" style={{ marginTop: 20 }} />
                    <View style={{ height: 50 }} />

                </Container>



            </ScrollView>

            <Modal resizable={true} title={modalTitle} ref={modalRef}>
                {modalContent == 'camera' &&
                    <CameraLibraryModal
                        openCamera={() => handleCoverImage('camera')}
                        openLibrary={() => handleCoverImage('library')}
                    />
                }
                {modalContent == 'gallery-pick-camera' &&
                    <CameraLibraryModal
                        openCamera={() => handleGalleryImages('camera')}
                        openLibrary={() => handleGalleryImages('library')}
                    />
                }

            </Modal>

            <Modal resizable={true} title={"Edit gallery"} ref={modalGalleryRef}>
                <EditGallery
                    items={form.galleryImages}
                    openCamera={openModal}
                    handleGalleryRemove={handleGalleryRemove}
                    thisModalRef={modalGalleryRef.current}
                />
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
    },
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