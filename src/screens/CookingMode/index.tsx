import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, StatusBar, Animated, BackHandler, Pressable, StyleSheet, } from "react-native";
import { ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess, VideoReadyForDisplayEvent } from 'expo-av';
import Video from 'react-native-video';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Button, Container, ImageBackground, ScrollView, Text, View } from "../../../components/Themed";
import { RootStackScreenProps } from "../../../types";
import style from "../../../constants/style";
import Layout from "../../../constants/Layout";

import Header from "../../components/Head";
import Colors from "../../../constants/Colors";

const headeHeight = Layout.window.height * 35 / 100
const videoContainerHeight = 200

const CookingMode = ({ navigation, route }: RootStackScreenProps<'CookingMode'>) => {

    const { item } = route.params

    const videoRef = useRef(null);
    const [status, setStatus] = useState<AVPlaybackStatusSuccess>({});
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [videoError, setVideoError] = useState('');
    const [controlsWidth, setControlsWidth] = useState(0);
    const [videoDetails, setVideoDetails] = useState<VideoReadyForDisplayEvent>({});
    //const [controlsWidth, setVideoDetails] = useState<VideoReadyForDisplayEvent>({});
    const [isPaused, setIsPaused] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isManuallySliding, setIsManuallySliding] = useState(false);
    const [showControls, setShowControls] = useState(false);

    const [videoTimeSeek, setVideoTimeSeek] = useState(0);

    const [sliderPositionState, setSliderPositionState] = useState(0);
    const sliderPositionRef = useRef();
    sliderPositionRef.current = sliderPositionState;

    const [timeoutId, setTimeoutId] = useState('');
    const currenttimeout = useRef();
    currenttimeout.current = timeoutId

    const controllersOpacity = useRef(new Animated.Value(1)).current

    useFocusEffect(() => {

        return () => {
         //   StatusBar.setHidden(false);
        }
    });

    useEffect(
        () =>
            navigation.addListener('beforeRemove', (e) => {
                if (!isFullScreen) {
                    // If we don't have unsaved changes, then we don't need to do anything
                    return;
                }

                // Prevent default behavior of leaving the screen
                e.preventDefault();
            }),
        [navigation, isFullScreen]
    );

    useEffect(() => {
        let opacity = showControls ? 1 : 0
        Animated.timing(controllersOpacity, {
            toValue: opacity,
            duration: 100,
            useNativeDriver: true
        }).start()

        if (showControls && isPaused) {
            handleHideControlsTimeout()
        } else if (!isPaused) {
            clearTimeout(currenttimeout.current)
        }

    }, [showControls, isPaused])

    useEffect(() => {
        if (isFullScreen) {
            StatusBar.setHidden(true);

            if (videoDetails?.naturalSize?.width > videoDetails?.naturalSize?.height) {

            }
        } else {

            StatusBar.setHidden(false);
        }
    }, [isFullScreen])

    useEffect(() => {
        if (isManuallySliding || !isVideoReady) return;
        let timePercentage = (status.currentTime * 100) / videoDetails.duration

        let position = (timePercentage * (Layout.window.width - 30)) / 100
        animateSlider(position, 200, false)
    }, [status])

    const sliderPosition = useRef(new Animated.Value(sliderPositionRef.current)).current
    const sliderScale = useRef(new Animated.Value(1)).current

    const animateSlider = (position: number, animationDuration = 0, nativeDriver = true) => {
        let maximumSliderPosition = Layout.window.width - 30

        if (position > maximumSliderPosition || position < 0) return;

        setSliderPositionState(position)
        // Animated.timing(sliderPosition, {
        //     toValue: position,
        //     duration: animationDuration,
        //     useNativeDriver: nativeDriver
        // }).start()
    }

    function handleHideControlsTimeout() {
        setIsManuallySliding(false)

        let timeOut = setTimeout(() => {
            setShowControls(false)
            Animated.timing(controllersOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }).start()
        }, 2000)
        setTimeoutId(timeOut)
    }


    function handleSliderRelease(position: number) {
        console.log(position)
        handleHideControlsTimeout()
        Animated.timing(sliderScale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start()

        handleVideoSeekPosition(position)
    }

    function handleVideoSeekPosition(position: number) {
        let positionPercentage = (position * 100) / (Layout.window.width - 30)
        console.log(positionPercentage)

        let timeToSeek = (positionPercentage * videoDetails.duration) / 100

        videoRef?.current?.seek(timeToSeek)
    }



    return (
        <Container style={[localStyles.root, isFullScreen && { paddingTop: 0 }]}>
            <ScrollView >
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
                        <Animated.View style={[localStyles.controlsContainer, { opacity: controllersOpacity, alignSelf: 'center' }]}>

                            <Pressable onPress={() => setShowControls(prevState => !prevState)} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', alignItems: 'center', justifyContent: 'center' }}>
                                {showControls &&
                                    <>
                                        <Pressable onPress={() => setIsPaused(prevState => !prevState)} style={localStyles.playPauseButton}>
                                            {isPaused ?
                                                <Ionicons name="play" size={60} color="white" style={localStyles.playPauseIcon} />
                                                :
                                                <Ionicons name="pause" size={60} color="white" style={localStyles.playPauseIcon} />
                                            }
                                        </Pressable>

                                        <Pressable onPress={() => setIsFullScreen(prevState => !prevState)} style={localStyles.fullScreenButton}>
                                            {!isFullScreen ?
                                                <MaterialIcons name="fullscreen" size={30} color="white" />
                                                :
                                                <MaterialIcons name="fullscreen-exit" size={30} color="white" />
                                            }
                                        </Pressable>

                                        <View
                                            onResponderMove={
                                                (e) => {
                                                    setIsManuallySliding(true)
                                                    clearTimeout(currenttimeout.current)

                                                    animateSlider(e.nativeEvent.locationX)
                                                }
                                            }
                                            onResponderRelease={(e) => handleSliderRelease(e.nativeEvent.locationX)}
                                            onResponderGrant={(e) => {
                                                Animated.timing(sliderScale, {
                                                    toValue: 2,
                                                    duration: 100,
                                                    useNativeDriver: true
                                                }).start()
                                            }}
                                            onMoveShouldSetResponder={() => true}
                                            onStartShouldSetResponder={() => true}
                                            style={localStyles.sliderContainer}
                                        >
                                            <View
                                                style={localStyles.slider}

                                            >
                                                <Animated.View style={[localStyles.sliderIcon, { transform: [{ translateX: sliderPositionRef.current }, { scale: sliderScale }] }]}>

                                                </Animated.View>

                                            </View>

                                        </View>
                                    </>
                                }
                            </Pressable>


                        </Animated.View>
                    }

                    <Video
                        ref={videoRef}
                        style={localStyles.video}
                        source={{
                            uri: 'https://scontent-mia3-1.cdninstagram.com/o1/v/t16/f1/m51/D54083C46596B02B22B6D6299F6AE08D_video_dashinit.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uNDgwLnN0b3J5LmJhc2VsaW5lIn0&_nc_ht=scontent-mia3-1.cdninstagram.com&_nc_cat=108&vs=1490071194853724_2838398618&_nc_vs=HBkcFQIYRGlnX3hwdl9wZXJtYW5lbnQvRDU0MDgzQzQ2NTk2QjAyQjIyQjZENjI5OUY2QUUwOERfdmlkZW9fZGFzaGluaXQubXA0FQACyAEAKAAYABsBiAd1c2Vfb2lsATEVAAAmpM7Iqf3D3D8VAigCQzMsF0Ahqn752yLRGBJkYXNoX2Jhc2VsaW5lXzJfdjERAHXoBwA%3D&ccb=9-4&oh=00_AfCmatZ1Z4OPZjn-OV8eWsonm-MjPJSQG-FEWy_R7nL6yw&oe=6466B331&_nc_sid=b32767',
                        }}
                        resizeMode={'contain'}
                        onError={(e) => {
                            setVideoError(e)
                            setIsVideoLoading(false)
                            console.log(e)
                        }}
                        repeat={true}
                        paused={isPaused}
                        onLoad={(e) => {
                            setControlsWidth(() => videoContainerHeight * e.naturalSize.width / e.naturalSize.height)
                            setIsVideoLoading(false)
                            setShowControls(true)
                            setVideoDetails(e)
                            setIsVideoReady(true)

                        }}
                        onProgress={status => { setStatus(() => status) }}
                        onReadyForDisplay={(e) => {
                            setShowControls(true)
                            setIsVideoReady(true)
                        }}
                        see
                        positionMillis={videoTimeSeek}
                        progressUpdateIntervalMillis={200}
                    />

                </Animated.View>


            </ScrollView>
        </Container>

    )
}

export default CookingMode

const localStyles = StyleSheet.create({
    slider: {
        height: 3,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginVertical: 0,
        overflow: 'visible',
    },
    sliderContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        position: 'absolute',
        bottom: 0,
        zIndex: 1,
        width: '100%',
        backgroundColor: '#ffffff00'
    },
    sliderIcon: {
        backgroundColor: Colors.light.tint,
        height: 10,
        width: 10,
        position: 'absolute',
        borderRadius: 5,
    },
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
        height: Layout.window.height,
        width: Layout.window.width,
        transform: [{
            rotate: '0deg'
        }]
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
        backgroundColor: 'rgba(40, 41, 40, .95)',
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
    fullScreenButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 1
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
      textAlign:'center',
      color:'#fff'
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