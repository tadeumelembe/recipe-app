import React, { Dispatch, Ref, SetStateAction, useEffect, useState } from "react";
import { Image, NativeSyntheticEvent, Pressable, StyleSheet, TextInputKeyPressEventData, TouchableOpacity } from "react-native";

import { FlatList, ScrollView, Text, TextButton, TextInput, View } from "../Themed";
import style from "../../constants/style";
import { ImagePickerResult } from "expo-image-picker";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { useForm } from "react-hook-form";
import { IRecipeForm } from "../types";

interface IEditIngredients {
    items: Array<any>;
    openCamera: (e: string) => void;
    thisModalRef: Ref<any>;
    handleGalleryRemove: (index: number) => void;
    setForm: Dispatch<SetStateAction<IRecipeForm>>;
    form: IRecipeForm;
}

const EditIngredients = (props: IEditIngredients) => {
    const { items, openCamera, form, setForm, handleGalleryRemove, thisModalRef } = props;

    const [selectedItem, setSelectedItem] = useState<number | null>(null)
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>('')
    const [isEditing, setIsEditing] = useState(false)

    const reversedItems = items.reverse();

    const handleUplaodModal = () => {
        openCamera(`gallery-pick-camera`)
        thisModalRef.close()
    }

    const removeFromGallery = () => {
        console.log(selectedImage)
        if (selectedImage == null) return
        return handleGalleryRemove(selectedImage)
    }

    const { control, resetField, handleSubmit } = useForm({
        defaultValues: {
            ingredient: '',
        }
    });

    const { control: controlEdit, reset, handleSubmit: handleSubmitEdit } = useForm({
        defaultValues: {
            ingredient: '',
        }
    });

    const handleAddIngredient = (data: object) => {
        const { ingredient } = data

        let newIngredients = { ...form }
        newIngredients.ingredients.push(ingredient)

        setForm({ ...newIngredients })
        resetField('ingredient')
    }

    const handleEditIngredient = (data: object) => {
        const { ingredient } = data

        let newIngredients = { ...form }
        newIngredients.ingredients[selectedItem] = ingredient

        setForm({ ...newIngredients })
        resetField('ingredient')
        setSelectedItem(null)
        setSelectedIngredient(null)
    }

    const handleSetEdit = (index: number, element: string) => {
        setSelectedItem(index)
        setSelectedIngredient(element)
        reset(formValues => ({
            ...formValues,
            ingredient: element,
        }))
        setIsEditing(true)
    }

    return (
        <View style={localStyle.root}>

            <TextInput
                control={control}
                placeholder="Write ingredient"
                rules={{
                    required: 'Required is required',
                    minLength: {
                        value: 3,
                        message: 'Ingredient should be at least 3 characters long',
                    },
                    maxLength: {
                        value: 15,
                        message: 'Ingredient should be max 15 characters long',
                    }
                }}
                name="ingredient"
                onSubmitEditing={handleSubmit(handleAddIngredient)}
            />

            <ScrollView
                style={localStyle.ingredientsSection}
            >
                {reversedItems.map((item, index) => {
                    return (
                        <View key={index} style={{ marginBottom: 20 }}>
                                <Pressable style={[localStyle.ingredientRow]} onPress={() => handleSetEdit(index, item)}>
                                    {(isEditing && selectedItem == index) ?
                                        <TextInput
                                            control={controlEdit}
                                            style={{ paddingTop: 0, flex: 1, width: '100%', paddingLeft: 0, borderBottomColor: Colors.light.tint }}
                                            rules={{
                                                required: 'Required is required',
                                                minLength: {
                                                    value: 3,
                                                    message: 'Ingredient should be at least 3 characters long',
                                                },
                                                maxLength: {
                                                    value: 15,
                                                    message: 'Ingredient should be max 15 characters long',
                                                }
                                            }}
                                            name="ingredient"
                                            onSubmitEditing={handleSubmitEdit(handleEditIngredient)}
                                        /> :
                                        <Text style={localStyle.ingredientName}>{item}</Text>
                                    }
                                    <SimpleLineIcons name="pencil" size={22} color={'black'} />
                                </Pressable>
                        </View>
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default EditIngredients

const localStyle = StyleSheet.create({
    root: {
        paddingTop: 10,
        paddingHorizontal: 15
    },
    imagesInfo: {
        ...style.textH3
    },
    ingredientsSection: {
        marginTop: 15,
    },
    pressableItem: {
        marginRight: 10,
        padding: 3
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ingredientName: {
        ...style.fontR,
        ...style.fontNunitoRegular,
        letterSpacing: 0.5
    },
    editInputRow: {
        flexDirection: 'row',
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