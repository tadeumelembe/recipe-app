import React, { memo } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'

import { Text, View } from '../Themed'
import style from '../../constants/style'
import Colors from '../../constants/Colors'

interface IInputContainer {
    name: string;
    type: string;
    items?: Array<any>;
    placeHolder: string;
    onPress: (e:string) => void
    onPressEdit: (e:string) => void
}

const CardContent: React.FC<IInputContainer> = (props) => {
    const { name, type, items,onPressEdit, placeHolder, onPress } = props

    const itemsEmpty = (items?.length == 0)

    const handleOnPress = () =>{
        if(type == 'gallery') return onPress(`${type}-pick-camera`)
        if(type == 'ingredients') return onPress(`edit-${type}`)
        
    }
    return (
        <View style={localStyle.inputContainer}>
            <View style={localStyle.topHead}>
                <Text style={style.textH3}>{name}</Text>
                <Pressable onPress={() => {
                    if (!itemsEmpty) return onPress(`edit-${type}`)
                }}
                >
                    <SimpleLineIcons name="pencil" size={20} color={itemsEmpty ? 'black' : Colors.light.tint} />
                </Pressable>
            </View>
            {itemsEmpty &&
                <Pressable style={localStyle.pressableArea} onPress={()=>handleOnPress()}>
                    <Ionicons name="add" size={20} color={Colors.light.text} />
                    <Text style={localStyle.placeHolder}>{placeHolder}</Text>
                </Pressable>
            }

            {!itemsEmpty &&
                <>
                    {type === 'gallery' &&

                        <View style={localStyle.gallerySection}>
                            {items?.map((element, index) => {
                                console.log(items.length)
                                return (
                                    <View style={{ width: (index > 0) ? '33%' : '100%', flex: (index > 0) ? 1 : 0 }}>
                                        <Image
                                            resizeMode="cover"
                                            style={index == 0 ? localStyle.mainImage : (items.length > 1 && items.length <4) ? localStyle.secondRowmTempImage : localStyle.squareImage}
                                            source={{ uri: element?.uri }}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    }
                    {type === 'ingredients' &&
                        <View style={localStyle.ingredientSection}>
                            {items?.map(element => {
                                return (
                                    <View style={localStyle.ingredientWrap}>
                                       <Text style={[style.fontNunitoRegular,style.fontR]}>{element}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    }
                </>
            }
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
    topHead: {
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    mainImage: {
        height: 125,
        width: '100%'
    },
    secondRowmTempImage: {
        height: 100,
        width: '100%'
    },
    squareImage: {
        aspectRatio: 1
    },
    gallerySection: {
        flexDirection: 'row',
        gap: 7,
        flexWrap: 'wrap',
        marginTop: 15,
        alignItems: 'flex-start'
    },
    ingredientSection: {
        flexDirection: 'row',
        gap: 7,
        flexWrap: 'wrap',
        marginTop: 15,
        alignItems: 'flex-start'
    },
    ingredientWrap:{
        backgroundColor:Colors.light.lightBlack,
        borderRadius:8,
        paddingHorizontal:5,
        paddingVertical:2,
        alignItems:'center',
        justifyContent:'center'
    }
})