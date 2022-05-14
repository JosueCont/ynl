import React, {useRef, useState} from 'react';
import {Alert, Animated, SafeAreaView} from 'react-native';
import circleParts from '../assets/circlev2.png';
import {useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import * as Haptics from 'expo-haptics';
import {Icon, Text, View} from "native-base";
import {FontAwesome} from "@expo/vector-icons";

const RotateCustom = () => {


    const emotions = [
        {name: 'Contento', range: [0, 60]},
        {name: 'Confundido', range: [60, 120]},
        {name: 'Inspirado', range: [120, 180]},
        {name: 'Enfadado', range: [180, 240]},
        {name: 'En paz', range: [240, 300]},
        {name: 'Deprimido', range: [300, 360]},
    ]


    const [deg, setDeg] = useState(0);
    const [emotionPosition, setEmotionPosition] = useState(0);

    const imageRef = useRef();

    const rotation = useSharedValue(1);
    const savedRotation = useSharedValue(1);

    const rotationGesture = Gesture.Rotation()
        .onTouchesMove((e) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            let spins = (deg / 360);
            let spingResolve = spins >= 1 ? spins - parseInt((spins + "").split(".")[0]) : spins;
            let emotionPositionVal = parseInt(((((spingResolve * 360) + 30) / 60) + "").split(".")[0]);
            if (emotionPositionVal < 6) {
                setEmotionPosition(emotionPositionVal)
            }
            setDeg(deg + 3)
        })
        .onUpdate((e) => {
            rotation.value = savedRotation.value + e.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
            // console.log(Object.keys(imageRef.current))
            console.log('end')

        })
    const singleTap = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            setDeg(deg + 45)
        });

    const doubleTap = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            Alert.alert('Double tap!');
        });


    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{rotateZ: `${(rotation.value / Math.PI) * 180}deg`}]
    }));


    return (
        <SafeAreaView style={{flex: 1}}>
            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
                    <Icon as={FontAwesome} name={'arrow-down'} size={'2xl'}></Icon>
                </View>

                <View flex={1}>
                    <GestureDetector gesture={Gesture.Exclusive(rotationGesture)}>
                        <Animated.Image ref={imageRef} source={circleParts} style={{
                            width: 300,
                            height: 300,
                            transform: [{rotate: deg + `deg`}],
                            borderRadius: 150
                        }}/>
                    </GestureDetector>

                </View>

                <View>
                    {
                        <Text fontSize={24}>{emotions[emotionPosition].name}</Text>
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RotateCustom;