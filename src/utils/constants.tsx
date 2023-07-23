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
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
    } else {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });
    } else {
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            quality: 1,
        });
    }

    if (!result.canceled) return result.assets;

    return false
};