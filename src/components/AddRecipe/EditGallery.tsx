import React, { Ref, useState } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity } from "react-native";

import { FlatList, ScrollView, Text, TextButton, View } from "../Themed";
import style from "../../constants/style";
import { ImagePickerResult } from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

interface IEditGallery {
    items: Array<any>;
    openCamera: (e: string) => void;
    thisModalRef: Ref<any>;
    handleGalleryRemove: (index: number) => void
}

const EditGallery = (props: IEditGallery) => {
    const { items, openCamera, handleGalleryRemove, thisModalRef } = props;

    const [selectedImage, setSelectedImage] = useState<number | null>(null)

    const handleUplaodModal = () => {
        openCamera(`gallery-pick-camera`)
        thisModalRef.close()
    }

    const removeFromGallery = () => {
        console.log(selectedImage)
        if (selectedImage == null) return
        return handleGalleryRemove(selectedImage)
    }

    return (
        <View style={localStyle.root}>

            <View style={localStyle.row}>
                <Text style={localStyle.imagesInfo}>Images</Text>
                <TextButton
                style={{display:'none'}}
                    btnText="View All"
                />
            </View>

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

            <TouchableOpacity onPress={() => removeFromGallery()} style={localStyle.removeSection}>
                <Ionicons name="trash-outline" size={20} color="black" />
                <Text style={localStyle.removeInfo}>Remove</Text>
            </TouchableOpacity>

            <Pressable style={localStyle.uploadSection} onPress={() => handleUplaodModal()}>
                <Ionicons name="add" size={20} color={Colors.light.text} />
                <Text style={localStyle.placeHolder}>Upload Images or Open camera</Text>
            </Pressable>

        </View>
    )
}

export default EditGallery

const localStyle = StyleSheet.create({
    root: {
        paddingTop: 10
    },
    imagesInfo: {
        ...style.textH3
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imageSection: {
        marginTop: 15
    },
    image: {
        height: 90,
        width: 150,
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
    removeSection: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        marginTop: 30
    },
    placeHolder: {
        ...style.fontNunitoRegular,
        ...style.fontM,
        ...style.textMuted2,
        marginLeft: 15
    },
})