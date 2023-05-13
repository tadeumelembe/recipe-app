import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, Animated, Pressable, StyleSheet, } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';

import { Button, Container, ImageBackground, ScrollView, Text, View } from "../../../components/Themed";
import { RootStackScreenProps } from "../../../types";
import style from "../../../constants/style";
import Layout from "../../../constants/Layout";

import Header from "../../components/Head";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const headeHeight = Layout.window.height * 35 / 100

const CookingMode = ({ navigation, route }: RootStackScreenProps<'CookingMode'>) => {

    const { item } = route.params

    const video = useRef(null);

    const [status, setStatus] = useState<AVPlaybackStatusSuccess>({});
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [videoError, setVideoError] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [timeoutId, setTimeoutId] = useState('');
    const currenttimeout = useRef();
    currenttimeout.current = timeoutId

    const controllersOpacity = useRef(new Animated.Value(1)).current

    useEffect(() => {
        let timeOut

        if (showControls) {
            Animated.timing(controllersOpacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }).start()
        }

        if (showControls && isPlaying) {
            timeOut = setTimeout(() => {
                setShowControls(false)
                Animated.timing(controllersOpacity, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true
                }).start()
            }, 2000)
            setTimeoutId(timeOut)
        } else if (!isPlaying) {
            clearTimeout(currenttimeout.current)
        }

    }, [showControls, isPlaying])

    useEffect(() => {
        if (isVideoReady) setShowControls(true)
    }, [isVideoReady])

    return (
        <Container style={localStyles.root}>

            <ScrollView>
                <View style={style.horizontalPadding}>
                    <Header navigation={navigation} type='back' />

                    <Text style={localStyles.pageTitle}>Cooking Mode</Text>

                    <Text style={localStyles.recipeName}>{item.title}</Text>
                </View>

                <View style={[localStyles.videoContainer]}>

                    {!isVideoReady &&
                        <View style={localStyles.videoLoader}>
                            <ImageBackground
                                source={item.image}
                                resizeMode={'cover'}
                                style={localStyles.image_bg}
                                imageStyle={localStyles.image}
                            >
                                <View style={localStyles.loaderCover}></View>
                                <ActivityIndicator size={'large'} color="#fff" style={localStyles.loader} />
                            </ImageBackground>
                        </View>
                    }

                    {isVideoReady &&
                        <Animated.View style={[localStyles.controlsContainer, { opacity: controllersOpacity }]}>

                            <Pressable onPress={() => setShowControls(prevState => !prevState)} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', alignItems: 'center', justifyContent: 'center' }}>
                                {showControls &&
                                    <Pressable onPress={() => setIsPlaying(prevState => !prevState)} style={localStyles.playPauseButton}>
                                        {!isPlaying ?
                                            <Ionicons name="play" size={60} color="white" style={localStyles.playPauseIcon} />
                                            :
                                            <Ionicons name="pause" size={60} color="white" style={localStyles.playPauseIcon} />
                                        }
                                    </Pressable>
                                }
                            </Pressable>

                        </Animated.View>
                    }

                    <Video
                        ref={video}
                        style={localStyles.video}
                        source={{
                            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                        }}
                        //useNativeControls
                        resizeMode={ResizeMode.COVER}
                        onError={(e) => setVideoError(e)}
                        isLooping
                        shouldPlay={isPlaying}
                        onPlaybackStatusUpdate={status => { setStatus(() => status) }}
                        onReadyForDisplay={(e) => setIsVideoReady(true)}
                    />

                </View>


            </ScrollView>
        </Container>

    )
}

export default CookingMode

const localStyles = StyleSheet.create({
    root: {
        paddingHorizontal: 0
    },
    pageTitle: {
        ...style.textH1,
        paddingTop: 15,
        paddingBottom: 30
    },
    recipeName: {
        ...style.textH2
    },
    videoContainer: {
        height: 200,
        width: '100%',
        marginTop: 20,
    },
    image: {
        height: '100%'
    },
    image_bg: {
        height: '100%',
        justifyContent: 'flex-start',
    },
    videoLoaderSkeleton: {
        backgroundColor: 'rgba(40, 41, 40, .9)',

    },
    video: {
        height: '100%',
        width: '100%',

    },
    controlsContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(40, 41, 40, 0.5)',
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    controlsContainerHidden: {
        backgroundColor: 'rgba(40, 41, 40, 0)',
    },
    playPauseButton: {
        width: 80,
        height: 80,
        borderRadius: 45,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 1,
        justifyContent: 'center',
    },
    playPauseIcon: {
        paddingLeft: 6
    },
    videoLoader: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    loaderCover: {
        height: '100%',
        backgroundColor: 'rgba(40, 41, 40, 1)',

    },
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }
})