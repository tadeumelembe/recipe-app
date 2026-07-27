import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, StatusBar, View as RNView, Pressable, StyleSheet, } from "react-native";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Button, ImageBackground, ScrollView, Text, View } from "../../components/Themed";
import { Screen } from "../../presentation/components/ui/Screen";
import style from "../../constants/style";
import Layout from "../../constants/Layout";

import Header from "../../components/Head";
import Colors from "../../constants/Colors";
import VideoControls from "../../components/CookingMode/VideoControls";

const headeHeight = Layout.window.height * 35 / 100
const videoContainerHeight = 200

const VIDEO_URI = 'https://video.wixstatic.com/video/889e9f_af2de088b3d2403fa53ba669948dc349/1080p/mp4/file.mp4'

const CookingMode = () => {

    const navigation = useNavigation()

    // Search params arrive as strings; `image` is the asset module id the recipe
    // details screen resolved via require().
    const { title, image } = useLocalSearchParams<{ id: string, title: string, image: string }>()
    const item = { title, image: Number(image) }

    const [isPaused, setIsPaused] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const player = useVideoPlayer(VIDEO_URI, (player) => {
        player.loop = true;
        // Replaces react-native-video's progressUpdateIntervalMillis={200}.
        player.timeUpdateEventInterval = 0.2;
    });

    const { currentTime } = useEvent(player, 'timeUpdate', {
        currentTime: player.currentTime,
        currentLiveTimestamp: null,
        currentOffsetFromLive: null,
        bufferedPosition: 0,
    });
    const { status, error } = useEvent(player, 'statusChange', { status: player.status });

    const isVideoReady = status === 'readyToPlay'
    const isVideoLoading = status === 'loading'
    const videoError = error?.message ?? ''

    useFocusEffect(
        useCallback(() => {
            return () => {
                StatusBar.setHidden(false);
            }
        }, [])
    );

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!isFullScreen) return;

                e.preventDefault();
            }),
        [navigation, isFullScreen]
    );

    useEffect(() => {
        StatusBar.setHidden(isFullScreen);
    }, [isFullScreen])

    // isPaused is the source of truth for the custom controls; mirror it onto the player.
    useEffect(() => {
        if (isPaused) {
            player.pause()
        } else {
            player.play()
        }
    }, [isPaused, player])

    useEffect(() => {
        if (isVideoReady) setShowControls(true)
    }, [isVideoReady])

    return (
        <Screen edges={isFullScreen ? [] : ['top']} style={localStyles.root}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                {!isFullScreen &&
                    <View style={style.horizontalPadding}>
                        <Header type='back' />

                        <Text style={localStyles.pageTitle}>Cooking Mode</Text>

                        <Text style={localStyles.recipeName}>{item.title}</Text>
                    </View>
                }

                <RNView style={isFullScreen ? localStyles.videoContainerFullscreen : localStyles.videoContainer}>

                    {isVideoLoading &&
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

                    {!!videoError &&
                        <View style={localStyles.videoError}>
                            <Text style={localStyles.videoErrorInfo}>Ocorreu um erro</Text>
                        </View>
                    }

                    {(isVideoReady && !videoError) &&
                        <VideoControls
                            player={player}
                            currentTime={currentTime}
                            duration={player.duration}
                            showControls={showControls}
                            isFullScreen={false}
                            isPaused={isPaused}
                            isVideoReady={isVideoReady}
                            handleChangeControls={setShowControls}
                            handleChangeIsFullScreen={setIsFullScreen}
                            handleChangeIsPaused={setIsPaused}
                        />
                    }

                    <VideoView
                        style={localStyles.video}
                        player={player}
                        contentFit="contain"
                        nativeControls={false}
                        fullscreenOptions={{ enable: true }}
                    />

                </RNView>

                {!isFullScreen &&
                    <View style={localStyles.steps}>


                        <Text style={localStyles.recipeName}>Steps</Text>
                    </View>
                }

            </ScrollView>
        </Screen>

    )
}

export default CookingMode

const localStyles = StyleSheet.create({
    root: {
        paddingHorizontal: 0,
        flex: 1
    },
    scrollView: {
        //height: '100%'
        paddingTop: -30
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
        height: videoContainerHeight,
        width: '100%',
        marginTop: 20,
    },
    videoContainerFullscreen: {
        height: Layout.window.width,
        width: Layout.window.height,
        backgroundColor: 'rgba(40, 41, 40, .9)',
        zIndex: 1,
        transform: [{
            rotateZ: '90deg'
        }],
        flex: 1,
        alignSelf: 'center'
    },
    image: {
        height: '100%'
    },
    image_bg: {
        height: '100%',
        justifyContent: 'flex-start',
    },
    video: {
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(40, 41, 40, .95)',
        //transform:[{rotateZ:'90deg'}]
    },
    videoLoader: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        zIndex: 1
    },
    videoError: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        zIndex: 1,
        backgroundColor: 'rgba(40, 41, 40, 1)',
    },
    videoErrorInfo: {
        textAlign: 'center',
        color: '#fff'
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
    },
    steps: {
        ...style.horizontalPadding,
        marginTop: 20
    }
})
