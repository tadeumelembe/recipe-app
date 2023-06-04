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

    if (!result.canceled) return result.assets;

    return false
};