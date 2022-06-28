import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import circleParts from '../assets/ruleta.png';
import {useSharedValue} from "react-native-reanimated";
import {Button, Image, Text, View} from "native-base";
import ScreenBaseV1 from "./Components/ScreenBaseV1";
import {Colors} from "../utils/Colors";
import pointerImage from '../assets/arrow2.png';
import ApiApp from "../utils/ApiApp";
import _ from "lodash";
import * as GH from 'react-native-gesture-handler';

const RouletteStep1Screen = ({navigation}) => {

    const [loading, setLoading] = useState(null);
    const [parents, setParents] = useState([]);

    const emotions = [
        {slug:'contento', name: 'Contento', range: [0, 60], color: '#F9CF67'},
        {slug:'en-paz', name: 'En paz', range: [60, 120], color: '#BBEBFF'},
        {slug:'inspirado', name: 'Inspirado', range: [120, 180], color: '#F0A4BB'},
        {slug:'abierto', name: 'Abierto', range: [180, 240], color: '#70DDEC'},
        {slug:'confundido', name: 'Confundido', range: [240, 300], color: '#F6AA80'},
        {slug:'molesto', name: 'Molesto', range: [300, 360], color: '#EF7C7C'},
        {slug:'deprimido', name: 'Deprimido', range: [300, 360], color: '#B9CFEE'}
    ]

    useEffect(() => {
        getParents()
    }, [])


    const getParents = async () => {
        try {
            setLoading(true);
            let response = await ApiApp.getFeelingsV2(`populate=*&filters[parent][id][$null]=true`)
            //console.log(response.data.data)
            setParents(response.data.data)
        } catch (e) {
            console.log('getParents error =>',e.toString());
        } finally {
            setLoading(false)
        }
    }

    const [deg, setDeg] = useState(0);
    const [emotionPosition, setEmotionPosition] = useState(0);


    const rotation = useSharedValue(1);
    const savedRotation = useSharedValue(1);
    const [centerX, setCenterX] = useState(150)
    const [centerY, setCenterY] = useState(150)
    const [x1, setX1] = useState(null)
    const [y1, setY1] = useState(null)

    const rotationGesture = GH.Gesture.Rotation()
        .onTouchesMove((e) => {
            //Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            let spins = (deg / 360);
            let spingResolve = spins >= 1 ? spins - parseInt((spins + "").split(".")[0]) : spins;
            let emotionPositionVal = parseInt(((((spingResolve * 360) + 0) / (360 / 7)) + "").split(".")[0]);
            if (emotionPositionVal < 7) {
                setEmotionPosition(emotionPositionVal)
            }
            let x2= e.allTouches[0].x
            let y2= e.allTouches[0].y
            if (x1 !== null){
                let mLast = (-centerY+y1)/(centerX-x1)
                let mCurrent = (-centerY+y2)/(centerX-x2)
                let degLast = Math.atan(mLast)*180/Math.PI
                let degCurrent = Math.atan(mCurrent)*180/Math.PI
                if (Math.abs(degLast-degCurrent)>35 ){
                    if (Math.abs(degLast-degCurrent)>50){
                        if(degLast > degCurrent){
                            setDeg(deg - 5)
                        }else{
                            setDeg(deg + 5)
                        }
                    }else{
                        if(degLast > degCurrent){
                            setDeg(deg + 5)
                        }else{
                            setDeg(deg - 5)
                        }
                    }
                    setX1(x2)
                    setY1(y2)
                }
            }else{
                setX1(x2)
                setY1(y2)
            }
        })
        .onUpdate((e) => {
            rotation.value = savedRotation.value + e.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
            // console.log('end')

        })


    return (
        <ScreenBaseV1>
            <GH.GestureHandlerRootView>


                <View flex={1} width={'100%'}>

                    <View flex={0.2} >
                        <Text color={emotions[emotionPosition].color} style={{fontWeight:'bold',fontSize:30, marginTop:30}}  textAlign={'center'}>¿Cómo te sientes hoy?</Text>
                    </View>
                    <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
                        <Image alt={'roulette'} source={pointerImage} style={{resizeMode: 'contain'}} width={10} height={10}/>
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
                    {/*        <Text fontSize={24}>{emotions[emotionPosition].slug}</Text>*/}
                    {/*    }*/}
                    {/*</View>*/}

                    <View flex={0.1} mx={4}>
                        <Button colorScheme={'orange'}
                                onPress={() => navigation.navigate('RouletteStep2Screen', {parentItem: _.find(parents, (o)=> {
                                        return o.attributes.slug_name === emotions[emotionPosition].slug
                                    } )})}>Continuar</Button>
                    </View>
                </View>
            </GH.GestureHandlerRootView>
        </ScreenBaseV1>
    );
};

export default RouletteStep1Screen;