import React, { Dispatch, Ref, SetStateAction, useState } from "react";
import { Pressable, StyleSheet, } from "react-native";

import { FlatList, ScrollView, Text, TextButton, TextInput, View } from "../Themed";
import style from "../../constants/style";
import { ImagePickerResult } from "expo-image-picker";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
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

    const reversedItems = Array.from(items).reverse();

    const handleUplaodModal = () => {
        openCamera(`gallery-pick-camera`)
        thisModalRef.close()
    }

    const removeFromGallery = () => {
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
        let lastPosition = items.length - 1

        let newIngredients = { ...form }
        newIngredients.ingredients[lastPosition - selectedItem] = ingredient

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

            <View style={{flexDirection:'row',alignItems:'center'}}>
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
                        value: 30,
                        message: 'Ingredient should be max 30 characters long',
                    }
                }}
                name="ingredient"
                onFocus={() => setIsEditing(false)}
                onSubmitEditing={handleSubmit(handleAddIngredient)}
                rightIcon={<Pressable onPress={handleSubmit(handleAddIngredient)}><Ionicons name="send-outline" size={24} color="black" /></Pressable>}
            />
            </View>

            <View
                style={localStyle.ingredientsSection}
            >
                {reversedItems.map((item, index) => {
                    return (
                        <View key={index} style={{ marginBottom: 20, width: '100%' }}>
                            <Pressable style={[localStyle.ingredientRow]} onPress={() => handleSetEdit(index, item)}>
                                {(isEditing && selectedItem == index) ?
                                    <View style={{flex:1, paddingRight:30, borderBottomColor: Colors.light.tint }}>
                                        <TextInput
                                            control={controlEdit}
                                            style={{ paddingTop: 0, flexGrow: 1, width: '100%', paddingLeft: 0, borderBottomColor: Colors.light.tint }}
                                            rules={{
                                                required: 'Required is required',
                                                minLength: {
                                                    value: 3,
                                                    message: 'Ingredient should be at least 3 characters long',
                                                },
                                                maxLength: {
                                                    value: 30,
                                                    message: 'Ingredient should be max 30 characters long',
                                                }
                                            }}
                                            autoCapitalize='sentences'
                                            name="ingredient"
                                            onSubmitEditing={handleSubmitEdit(handleEditIngredient)}
                                        />
                                    </View>
                                    :
                                    <Text style={localStyle.ingredientName}>{item}</Text>
                                }
                                <View style={{ flexDirection: 'row', gap: 15, }}>
                                    <SimpleLineIcons name="pencil" size={22} color={(isEditing && selectedItem == index) ? Colors.light.tint : Colors.light.textMuted2} />
                                    <Pressable>
                                        <Feather name="x" size={26} color={Colors.light.textMuted2} />
                                    </Pressable>
                                </View>
                            </Pressable>
                        </View>
                    )
                })}
            </View>

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
        width: '100%'
    },
    pressableItem: {
        marginRight: 10,
        padding: 3
    },
    ingredientRow: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
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