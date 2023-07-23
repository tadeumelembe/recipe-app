import React, { Ref, useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";

import { FlatList, ScrollView, Text, TextButton, View } from "../Themed";
import style from "../../constants/style";
import { ImagePickerResult } from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { IRecipeForm } from "../types";

interface IEditGallery {
    items: Array<any>;
    openCamera: (e: string) => void;
    form: IRecipeForm,
    thisModalRef: Ref<any>;
    handleGalleryRemove: (index: number) => void
}

const EditDirections = (props: IEditGallery) => {
    const { items, openCamera, setForm, handleGalleryRemove, form, thisModalRef } = props;

    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const handleUplaodModal = () => {
        openCamera(`directions`)
    }

    const removeVideo = () => {
        setForm({
            ...form,
            video: ''
        })
    }

    return (
        <View style={localStyle.root}>
            {form.video ?
                <>
                    <TouchableOpacity onPress={() => removeVideo()} style={localStyle.removeIconContainer}>
                        <Ionicons name="trash-outline" size={19} color="white" />
                    </TouchableOpacity>
                    <View style={localStyle.videoContainer}>
                        <Image
                            resizeMode="cover"
                            style={localStyle.image}
                            source={{ uri: form.video?.uri }}
                        />
                    </View>
                </>
                :
                <Pressable style={localStyle.uploadSection} onPress={() => handleUplaodModal()}>
                    <Ionicons name="add" size={20} color={Colors.light.text} />
                    <Text style={localStyle.placeHolder}>Upload Video or Open camera</Text>
                </Pressable>
            }

            <View style={[style.borderSeparator, { marginVertical: 30 }]}></View>

            <View style={localStyle.directionsContainer}>
                <Text style={localStyle.subtitle}>Directions</Text>

                <ScrollView
                    horizontal={true}
                    style={localStyle.imageSection}
                >
                    {items.map((item, index) => {
                        return (
                            <Pressable style={[localStyle.pressableImage, selectedImage == index && localStyle.selectedImage]} onPress={() => setSelectedImage(index)}>
                                <Image style={localStyle.image} resizeMode="cover" source={{ uri: item?.uri }} />
                            </Pressable>
                        )
                    })}
                </ScrollView>
            </View>


        </View>
    )
}

export default EditDirections

const localStyle = StyleSheet.create({
    root: {
        paddingTop: 10
    },
    subtitle: {
        ...style.textH2
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    directionsContainer: {
        marginTop: 0
    },
    imageSection: {
        marginTop: 15
    },
    videoContainer:{
        height:300,
        width:'100%',
        backgroundColor:'#000'
    },
    image: {
        aspectRatio: 1,
        width: '100%',
        alignSelf: 'center',
        maxHeight: 300,
    },
    selectedImage: {
        borderWidth: 2,
        borderColor: Colors.light.tint,
        borderRadius: 4
    },
    pressableImage: {
        marginRight: 10,
        padding: 3
    },
    removeIconContainer: {
        position: 'absolute',
        zIndex: 1,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        right: 15,
        backgroundColor: 'rgba(0,0,0,.5)',
        top: 0,
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25
    },
    removeInfo: {
        ...style.fontNunitoRegular,
        ...style.fontM,
        marginLeft: 5
    },
    uploadSection: {
        width: '100%',
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.light.textMuted2,
        flexDirection: 'row',
        borderRadius: 8,
        borderStyle: 'dashed',
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    placeHolder: {
        ...style.fontNunitoRegular,
        ...style.fontM,
        ...style.textMuted2,
        marginLeft: 15
    },
})