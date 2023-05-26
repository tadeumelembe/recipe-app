import React, { Ref, RefObject, memo, useEffect, useRef, useState } from "react"
import { Animated, Pressable, StyleSheet } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

import { View } from "../../../components/Themed"
import Colors from "../../../constants/Colors"
import Layout from "../../../constants/Layout"

interface IVideoControls {
    videoRef: RefObject<any>;
    videoDetails: any;
    handleHideControlsTimeout: () => void;
    isVideoReady: boolean;
    showControls: boolean;
    handleChangeControls: (e: any) => boolean;
    isPaused: boolean;
    status: any;
    isFullScreen: boolean;
    handleChangeIsFullScreen: (e: any) => boolean;
    handleChangeIsPaused: (e: any) => boolean
}

const VideoControls = (props: IVideoControls) => {

    const {
        videoRef,
        videoDetails,
        showControls,
        isPaused,
        isFullScreen,
        isVideoReady,
        status,
        handleChangeControls,
        handleChangeIsFullScreen,
        handleChangeIsPaused
    } = props

    const [isManuallySliding, setIsManuallySliding] = useState(false);
    const [sliderPositionState, setSliderPositionState] = useState<number>(0);
    const sliderPositionRef = useRef<any>();
    sliderPositionRef.current = sliderPositionState;

    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
    const currenttimeout = useRef<any>();
    currenttimeout.current = timeoutId

    const sliderPosition = useRef(new Animated.Value(sliderPositionRef.current)).current
    const sliderScale = useRef(new Animated.Value(1)).current
    const controllersOpacity = useRef(new Animated.Value(1)).current

    console.log('VideoControls')
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
        if (isManuallySliding || !isVideoReady) return;
        let timePercentage = (status.currentTime * 100) / videoDetails.duration

        let position = (timePercentage * (Layout.window.width - 30)) / 100
        animateSlider(position, 200, false)
    }, [status])

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