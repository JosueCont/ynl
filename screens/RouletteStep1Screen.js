import React, {useState} from 'react';
import {Animated} from 'react-native';
import circleParts from '../assets/ruleta.png';
import {useSharedValue} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {Button, Image, Text, View} from "native-base";
import ScreenBaseV1 from "./Components/ScreenBaseV1";
import {Colors} from "../utils/Colors";
import pointerImage from '../assets/arrow2.png'

const RouletteStep1Screen = ({navigation}) => {


    const emotions = [
        {id: 1, name: 'Feliz', range: [0, 60]},
        {id: 7, name: 'Sorprendido', range: [60, 120]},
        {id: 6, name: 'Mal', range: [120, 180]},
        {id: 5, name: 'Temerozo', range: [180, 240]},
        {id: 4, name: 'Enojado', range: [240, 300]},
        {id: 3, name: 'Disgustado', range: [300, 360]},
        {id: 2, name: 'Triste', range: [300, 360]},
    ]


    const [deg, setDeg] = useState(0);
    const [emotionPosition, setEmotionPosition] = useState(0);


    const rotation = useSharedValue(1);
    const savedRotation = useSharedValue(1);

    const rotationGesture = Gesture.Rotation()
        .onTouchesMove((e) => {
            //Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            let spins = (deg / 360);
            let spingResolve = spins >= 1 ? spins - parseInt((spins + "").split(".")[0]) : spins;
            let emotionPositionVal = parseInt(((((spingResolve * 360) + 0) / (360 / 7)) + "").split(".")[0]);
            if (emotionPositionVal < 7) {
                setEmotionPosition(emotionPositionVal)
            }
            setDeg(deg + 3)
        })
        .onUpdate((e) => {
            rotation.value = savedRotation.value + e.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
            console.log('end')

        })


    return (
        <ScreenBaseV1>
            <View flex={1} width={'100%'}>


                <View flex={0.1}>

                    <Text color={Colors.red} size={'lg'} textAlign={'center'}>¿Cómo te sientes hoy?</Text>
                    <Text color={Colors.red} size={'md'} textAlign={'center'}>17/Mayo/2022</Text>

                </View>
                <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
                    <Image source={pointerImage} style={{resizeMode: 'contain'}} width={10} height={10}></Image>
                </View>

                <View flex={1} alignItems={'center'}>
                    <GestureDetector gesture={Gesture.Exclusive(rotationGesture)}>
                        <Animated.Image source={circleParts} style={{
                            width: 300,
                            height: 300,
                            transform: [{rotate: deg + `deg`}],
                            borderRadius: 150
                        }}/>
                    </GestureDetector>

                </View>

                {/*<View>*/}
                {/*    {*/}
                {/*        <Text fontSize={24}>{emotions[emotionPosition].name}</Text>*/}
                {/*    }*/}
                {/*</View>*/}

                <View flex={0.1} mx={4}>
                    <Button colorScheme={'orange'}
                            onPress={() => navigation.navigate('RouletteStep2Screen', {parentItem: emotions[emotionPosition]})}>Continuar</Button>
                </View>
            </View>
        </ScreenBaseV1>
    );
};

export default RouletteStep1Screen;