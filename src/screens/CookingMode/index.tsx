import React, { useEffect, useState, useRef } from "react";
import { ActivityIndicator, StatusBar, Animated, BackHandler, Pressable, StyleSheet, } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess, VideoReadyForDisplayEvent } from 'expo-av';
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

    const video = useRef(null);
    const [status, setStatus] = useState<AVPlaybackStatusSuccess>({});
    const [isVideoReady, setIsVideoReady] = useState(false);
    const [videoError, setVideoError] = useState('');
    const [controlsWidth, setControlsWidth] = useState(0);
    const [videoDetails, setVideoDetails] = useState<VideoReadyForDisplayEvent>({});
    //const [controlsWidth, setVideoDetails] = useState<VideoReadyForDisplayEvent>({});
    const [isPlaying, setIsPlaying] = useState(false);
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
            StatusBar.setHidden(false);
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

        if (showControls && isPlaying) {
            handleHideControlsTimeout()
        } else if (!isPlaying) {
            clearTimeout(currenttimeout.current)
        }

    }, [showControls, isPlaying])

    useEffect(() => {
        if (isFullScreen) {
            //console.log(videoContainerHeight * videoDetails.naturalSize.width / videoDetails.naturalSize.height)
            if (videoDetails?.naturalSize?.width > videoDetails?.naturalSize?.height) {

            }
            StatusBar.setHidden(true);
        } else {

            StatusBar.setHidden(false);
        }
    }, [isFullScreen])

    // useEffect(() => {
    //     console.log(status)
    //     if (isManuallySliding) return;
    //     let timePercentage = (status.positionMillis * 100) / status.durationMillis

    //     let position = (timePercentage * (Layout.window.width - 30)) / 100
    //     animateSlider(position, 200, false)
    // }, [status])

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

        let timeToSeek = (positionPercentage * videoDetails.status.durationMillis) / 100

        setVideoTimeSeek(timeToSeek)
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
                        <Animated.View style={[localStyles.controlsContainer, { opacity: controllersOpacity, alignSelf: 'center' }]}>

                            <Pressable onPress={() => setShowControls(prevState => !prevState)} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', alignItems: 'center', justifyContent: 'center' }}>
                                {showControls &&
                                    <>
                                        <Pressable onPress={() => setIsPlaying(prevState => !prevState)} style={localStyles.playPauseButton}>
                                            {!isPlaying ?
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
                        ref={video}
                        style={localStyles.video}
                        source={{
                            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',//'https://scontent-jnb1-1.cdninstagram.com/o1/v/t16/f1/m78/EC4464B2D10B74DC74DBC9B379B93683_video_dashinit.mp4?efg=eyJxZV9ncm91cHMiOiJbXCJpZ193ZWJfZGVsaXZlcnlfdnRzX290ZlwiXSIsInZlbmNvZGVfdGFnIjoidnRzX3ZvZF91cmxnZW4uNDgwLnN0b3J5LmJhc2VsaW5lIn0&_nc_ht=scontent-jnb1-1.cdninstagram.com&_nc_cat=102&vs=1322204014971969_672847916&_nc_vs=HBkcFQIYUWlnX3hwdl9wbGFjZW1lbnRfcGVybWFuZW50X3YyL0VDNDQ2NEIyRDEwQjc0REM3NERCQzlCMzc5QjkzNjgzX3ZpZGVvX2Rhc2hpbml0Lm1wNBUAAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJrD58dGN5Ms%2FFQIoAkMzLBdAF3bItDlYEBgSZGFzaF9iYXNlbGluZV8yX3YxEQB16AcA&ccb=9-4&oh=00_AfCRW0sF6gfEUG829QUAoGw6iwC98-a4ip9JQM5egzwtEw&oe=646208FB&_nc_sid=276363',
                        }}
                        //useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        //onLoad={(e) => console.log(e)}
                        onError={(e) => setVideoError(e)}
                        isLooping
                        posterSource={item.image}
                        usePoster={false}
                        shouldPlay={isPlaying}
                        onPlaybackStatusUpdate={status => { setStatus(() => status) }}
                        onReadyForDisplay={(e) => {
                            setShowControls(true)
                            setControlsWidth(() => videoContainerHeight * e.naturalSize.width / e.naturalSize.height)
                            setVideoDetails(e)
                            setIsVideoReady(true)
                        }}
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
        backgroundColor: 'rgba(40, 41, 40, 0.8)',
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