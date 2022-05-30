import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import circleParts from '../assets/ruleta.png';
import {useSharedValue} from "react-native-reanimated";
import {Button, Image, Text, View} from "native-base";
import ScreenBaseV1 from "./Components/ScreenBaseV1";
import {Colors} from "../utils/Colors";
import pointerImage from '../assets/arrow2.png'
import ApiApp from "../utils/ApiApp";
import _ from "lodash";
import * as GH from 'react-native-gesture-handler';

const RouletteStep1Screen = ({navigation}) => {

    const [loading, setLoading] = useState(null);
    const [parents, setParents] = useState([]);

    const emotions = [
        {id: 1, name: 'Feliz', range: [0, 60], color: '#F9CF67'},
        {id: 7, name: 'Sorprendido', range: [60, 120], color: '#F0A4BB'},
        {id: 6, name: 'Mal', range: [120, 180], color: '#F6AA80'},
        {id: 5, name: 'Temerozo', range: [180, 240], color: '#CFBBEF'},
        {id: 4, name: 'Enojado', range: [240, 300], color: '#EF7C7C'},
        {id: 3, name: 'Disgustado', range: [300, 360], color: '#BDEE9D'},
        {id: 2, name: 'Triste', range: [300, 360], color: '#B9CFEE'}
    ]

    useEffect(() => {
        getParents()
    }, [])


    const getParents = async () => {
        try {
            setLoading(true);
            let response = await ApiApp.getFeelingsV2(`populate=*&filters[parent][id][$null]=true`)
            console.log(response.data.data)
            setParents(response.data.data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const [deg, setDeg] = useState(0);
    const [emotionPosition, setEmotionPosition] = useState(0);


    const rotation = useSharedValue(1);
    const savedRotation = useSharedValue(1);

    const rotationGesture = GH.Gesture.Rotation()
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
            <GH.GestureHandlerRootView>


                <View flex={1} width={'100%'}>


                    <View flex={0.1}>

                        <Text color={Colors.red} size={'lg'} textAlign={'center'}>¿Cómo te sientes hoy?</Text>

                    </View>
                    <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
                        <Image alt={'roulette'} source={pointerImage} style={{resizeMode: 'contain'}} width={10} height={10}></Image>
                    </View>

                    <View flex={1} alignItems={'center'}>
                        <GH.GestureDetector gesture={GH.Gesture.Exclusive(rotationGesture)}>
                            <Animated.Image source={circleParts} style={{
                                width: 300,
                                height: 300,
                                transform: [{rotate: deg + `deg`}],
                                borderRadius: 150
                            }}/>
                        </GH.GestureDetector>

                    </View>

                    {/*<View>*/}
                    {/*    {*/}
                    {/*        <Text fontSize={24}>{emotions[emotionPosition].name}</Text>*/}
                    {/*    }*/}
                    {/*</View>*/}

                    <View flex={0.1} mx={4}>
                        <Button colorScheme={'orange'}
                                onPress={() => navigation.navigate('RouletteStep2Screen', {parentItem: _.find(parents, {id: emotions[emotionPosition].id})})}>Continuar</Button>
                    </View>
                </View>
            </GH.GestureHandlerRootView>
        </ScreenBaseV1>
    );
};

export default RouletteStep1Screen;