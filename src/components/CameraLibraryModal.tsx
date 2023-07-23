import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Button, View } from './Themed'
import style from '../constants/style'
import Colors from '../constants/Colors'

interface ICameraLibraryModal {
    openCamera: ()=>Promise<void>;
    openLibrary: ()=>Promise<void>;
}

const CameraLibraryModal: React.FC<ICameraLibraryModal> = (props) => {
    return (
        <View style={localStyle.root}>
            <Button
                btnText="Open Camera"
                style={[localStyle.button]}
                onPress={props.openCamera}
            />
            <Button

                btnText="Pick from library"
                onPress={props.openLibrary}
                btnSecondary={true}
                style={[localStyle.button,{ marginTop: 10 }]}
            />
        </View>
    )
}

export default CameraLibraryModal;

const localStyle = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
    button: {
        width: '70%'
    }
}) 