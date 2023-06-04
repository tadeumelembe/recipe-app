import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Text, View } from '../Themed'
import style from '../../constants/style'
import Colors from '../../constants/Colors'

interface IInputContainer {
    name: string;
    placeHolder: string;
    onPress: () => void
}

const CardContent: React.FC<IInputContainer> = (props) => {
    return (
        <View style={localStyle.inputContainer}>
            <Text style={style.textH3}>{props.name}</Text>
            <Pressable style={localStyle.pressableArea} onPress={props.onPress}>
                <Ionicons name="add" size={20} color={Colors.light.text} />
                <Text style={localStyle.placeHolder}>{props.placeHolder}</Text>
            </Pressable>
        </View>
    )
}

export default CardContent;

const localStyle = StyleSheet.create({
    inputContainer: {
        ...style.card,
        backgroundColor: '#fff',
        elevation: 8,
        zIndex: 999,
        padding: 15,
        marginTop: 20,
        width: '100%',
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
    placeHolder: {
        ...style.fontNunitoRegular,
        ...style.fontM,
        ...style.textMuted2,
        marginLeft: 15
    },
})