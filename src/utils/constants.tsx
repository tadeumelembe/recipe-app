import * as ImagePicker from 'expo-image-picker';

export const navigationNames = {
    RecipeStack: 'RecipeScreen',
    RecipeDetails: 'RecipeDetails',
    CookingMode: 'CookingMode',

    AddRecipe: 'AddRecipe',
}

export const helpers = {
    EMAIL_VALIDATION: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
}

export const pickImage = async (type: string) => {
    let result;
    if (type == 'camera') {
        result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
    } else {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 1,
        });
    }

    if (!result.canceled) return result.assets;

    return false
};

export const pickVideo = async (type: string) => {
    let result;
    if (type == 'camera') {
        result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
            quality: 1,
        });
    } else {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            quality: 1,
        });
    }

    if (!result.canceled) return result.assets;

    return false
};