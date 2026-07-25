import React, { Dispatch, SetStateAction, memo, useEffect, useRef, useState } from "react"
import { Animated, Pressable, StyleSheet } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import type { VideoPlayer } from "expo-video"

import { View } from "../Themed"
import Colors from "../../constants/Colors"
import Layout from "../../constants/Layout"

interface IVideoControls {
    player: VideoPlayer;
    currentTime: number;
    duration: number;
    isVideoReady: boolean;
    showControls: boolean;
    handleChangeControls: Dispatch<SetStateAction<boolean>>;
    isPaused: boolean;
    isFullScreen: boolean;
    handleChangeIsFullScreen: Dispatch<SetStateAction<boolean>>;
    handleChangeIsPaused: Dispatch<SetStateAction<boolean>>;
}

const SLIDER_TRACK_WIDTH = Layout.window.width - 30

const VideoControls = (props: IVideoControls) => {

    const {
        player,
        currentTime,
        duration,
        showControls,
        isPaused,
        isFullScreen,
        isVideoReady,
        handleChangeControls,
        handleChangeIsFullScreen,
        handleChangeIsPaused
    } = props

    const [isManuallySliding, setIsManuallySliding] = useState(false);
    const [sliderPositionState, setSliderPositionState] = useState<number>(0);
    const sliderPositionRef = useRef<number>(0);
    sliderPositionRef.current = sliderPositionState;

    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>();
    const currenttimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
    currenttimeout.current = timeoutId

    const sliderScale = useRef(new Animated.Value(1)).current
    const controllersOpacity = useRef(new Animated.Value(1)).current

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
        if (isManuallySliding || !isVideoReady || !duration) return;
        let timePercentage = (currentTime * 100) / duration

        let position = (timePercentage * SLIDER_TRACK_WIDTH) / 100
        animateSlider(position)
    }, [currentTime, duration, isManuallySliding, isVideoReady])

    useEffect(() => () => clearTimeout(currenttimeout.current), [])

    function handleSliderRelease(position: number) {
        handleHideControlsTimeout()
        Animated.timing(sliderScale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start()

        handleVideoSeekPosition(position)
    }

    function handleVideoSeekPosition(position: number) {
        if (!duration) return;

        let positionPercentage = (position * 100) / SLIDER_TRACK_WIDTH
        let timeToSeek = (positionPercentage * duration) / 100

        // expo-video seeks by assigning currentTime, replacing videoRef.seek().
        player.currentTime = timeToSeek
    }

    function handleHideControlsTimeout() {
        setIsManuallySliding(false)

        let timeOut = setTimeout(() => {
            handleChangeControls(false)
            Animated.timing(controllersOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }).start()
        }, 2000)
        setTimeoutId(timeOut)
    }

    const animateSlider = (position: number) => {
        if (position > SLIDER_TRACK_WIDTH || position < 0) return;

        setSliderPositionState(position)
    }

    return (
        <Animated.View style={[localStyles.controlsContainer, { opacity: controllersOpacity, alignSelf: 'center' }]}>

            <Pressable onPress={() => handleChangeControls((showControls: boolean) => !showControls)} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0)', alignItems: 'center', justifyContent: 'center' }}>
                {showControls &&
                    <>
                        <Pressable onPress={() => handleChangeIsPaused((isPaused: boolean) => !isPaused)} style={localStyles.playPauseButton}>
                            {isPaused ?
                                <Ionicons name="play" size={60} color="white" style={localStyles.playPauseIcon} />
                                :
                                <Ionicons name="pause" size={60} color="white" style={localStyles.playPauseIcon} />
                            }
                        </Pressable>

                        <Pressable onPress={() => handleChangeIsFullScreen(isFullScreen => !isFullScreen)} style={localStyles.fullScreenButton}>
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
                                <View style={[localStyles.sliderIcon, { height: 3, width: sliderPositionState + 5, backgroundColor: Colors.light.tint }]} />
                                <Animated.View style={[localStyles.sliderIcon, { transform: [{ translateX: sliderPositionState }, { scale: sliderScale }] }]}>

                                </Animated.View>

                            </View>

                        </View>
                    </>
                }
            </Pressable>


        </Animated.View>
    )
}

export default memo(VideoControls)

const localStyles = StyleSheet.create({
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
        borderRadius: 5
    }

})
