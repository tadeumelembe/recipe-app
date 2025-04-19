import React, { useEffect, useState, useRef, RefObject, useCallback } from "react";
import { ActivityIndicator, StatusBar, Animated, BackHandler, Pressable, StyleSheet, } from "react-native";
import { ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess, VideoReadyForDisplayEvent } from 'expo-av';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Button, Container, ImageBackground, ScrollView, Text, View } from "../../components/Themed";
import { RootStackScreenProps } from "../../../types";
import style from "../../constants/style";
import Layout from "../../constants/Layout";

import Header from "../../components/Head";
import Colors from "../../constants/Colors";
import VideoControls from "../../components/CookingMode/VideoControls";

const headeHeight = Layout.window.height * 35 / 100
const videoContainerHeight = 200

const CookingMode = ({ navigation, route }: RootStackScreenProps<'CookingMode'>) => {

    const { item } = route.params

    const videoRef = useRef<RefObject<any>>(null);
    const [status, setStatus] = useState<AVPlaybackStatusSuccess>({});
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [videoError, setVideoError] = useState('');
    const [controlsWidth, setControlsWidth] = useState(0);
    const [videoDetails, setVideoDetails] = useState<VideoReadyForDisplayEvent>({});
    const [isPaused, setIsPaused] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showControls, setShowControls] = useState(false);

    useFocusEffect(() => {

        return () => {
            //   StatusBar.setHidden(false);
        }
    });

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!isFullScreen) return;

                e.preventDefault();
            }),
        [navigation, isFullScreen]
    );


    useEffect(() => {
        if (isFullScreen) {
            StatusBar.setHidden(true);

            if (videoDetails?.naturalSize?.width > videoDetails?.naturalSize?.height) {

            }
        } else {

            StatusBar.setHidden(false);
        }
    }, [isFullScreen])

    const memorizedChangeControls = useCallback(status => handleChangeControls(status), []);
    const memorizedChangeFullScreen = useCallback(status => handleChangeIsFullScreen(status), []);
    const memorizedChangePausd = useCallback(status => handleChangeIsPaused(status), []);

    function handleChangeControls(status: any) {
        setShowControls(status)
    }

    function handleChangeIsFullScreen(status: boolean) {
        setIsFullScreen(status)
    }
    function handleChangeIsPaused(status: boolean) {
        setIsPaused(status)
    }

    return (
        <Container style={[localStyles.root, isFullScreen && { paddingTop: 0 }]}>
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                {!isFullScreen &&
                    <View style={style.horizontalPadding}>
                        <Header navigation={navigation} type='back' />

                        <Text style={localStyles.pageTitle}>Cooking Mode</Text>

                        <Text style={localStyles.recipeName}>{item.title}</Text>
                    </View>
                }

                <Animated.View style={isFullScreen ? localStyles.videoContainerFullscreen : localStyles.videoContainer}>

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

                    {videoError &&
                        <View style={localStyles.videoError}>
                            <Text style={localStyles.videoErrorInfo}>Ocorreu um erro</Text>
                        </View>
                    }

                    {(isVideoReady && !videoError) &&
                        <VideoControls
                            videoRef={videoRef}
                            videoDetails={videoDetails}
                            showControls={showControls}
                            isFullScreen={false}
                            isPaused={isPaused}
                            isVideoReady={isVideoReady}
                            status={status}
                            handleChangeControls={memorizedChangeControls}
                            handleChangeIsFullScreen={memorizedChangeFullScreen}
                            handleChangeIsPaused={memorizedChangePausd}
                        />
                    }

                    <Video
                        ref={videoRef}
                        style={localStyles.video}
                        source={{
                            uri: 'https://video.wixstatic.com/video/889e9f_af2de088b3d2403fa53ba669948dc349/1080p/mp4/file.mp4',
                        }}
                        resizeMode={'contain'}
                        onError={(e) => {
                            setVideoError(e)
                            setIsVideoLoading(false)
                            console.log(e)
                        }}
                        repeat={true}
                        paused={isPaused}
                        onLoad={(e: any) => {
                            setIsVideoLoading(false)
                            setShowControls(true)
                            setVideoDetails(e)
                            setIsVideoReady(true)

                        }}
                        onProgress={(status: any) => { setStatus(() => status) }}
                        onReadyForDisplay={(e: any) => {
                            setShowControls(true)
                            setIsVideoReady(true)
                        }}
                        progressUpdateIntervalMillis={200}
                    />

                </Animated.View>

                {!isFullScreen &&
                    <View style={localStyles.steps}>


                        <Text style={localStyles.recipeName}>Steps</Text>
                    </View>
                }

            </ScrollView>
        </Container>

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