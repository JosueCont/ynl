import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import circleParts from '../assets/ruleta.png';
//import {useSharedValue} from "react-native-reanimated";
import {Button, Image, Text, View} from "native-base";
import ScreenBaseV1 from "./Components/ScreenBaseV1";
import {Colors} from "../utils/Colors";
import pointerImage from '../assets/arrow2.png';
import ApiApp from "../utils/ApiApp";
import _ from "lodash";
import {t} from 'i18n-js';
import * as GH from 'react-native-gesture-handler';
import moment from 'moment'
import Animated,{useSharedValue, useAnimatedGestureHandler,withSpring, useAnimatedStyle} from 'react-native-reanimated';

const window_height = Dimensions.get("screen").height
const window_width = Dimensions.get("screen").width

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
    // const [emotionPosition, setEmotionPosition] = useState(0);

    const definitionOfFeeling = ()=>{
        let indexSelected = 0
        if (gradLast.value !== 0){
            let valueDeg = Math.abs(parseInt(360-gradLast.value))
            let valueRangeEmoticon = 360/emotions.length
            let chosenIndex = Math.floor(valueDeg/valueRangeEmoticon)
            indexSelected =chosenIndex
        }
        return emotions[indexSelected]
    }

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const velX = useSharedValue(0);
    const velY = useSharedValue(0);
    const absX = useSharedValue(0);
    const absY = useSharedValue(0);
    const centerx = useSharedValue(0);
    const centery = useSharedValue(0);
    const gradLast = useSharedValue(0);
    const saveValue = useSharedValue(0)
    const grad0 = useSharedValue(0);
    const giroPositivo = useSharedValue(0);
    

    const onPanGestureEvent = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
        ctx.startX = translateX.value;
        ctx.startY = translateY.value;
        centery.value = window_height*0.5619
        centerx.value = window_width*0.50
        // gradLast.value = 0;
        saveValue.value = ctx.velocityY;
        velX.value = 0
        velY.value = 0

      },
      onActive: (event, ctx) => {
        translateX.value =  ctx.startX +event.translationX;
        translateY.value = ctx.startY + event.translationY;
        velX.value = event.velocityX
        velY.value = event.velocityY
        absX.value = event.absoluteX
        absY.value = event.absoluteY;
        saveValue.value = ctx.velocityY+ event.velocityY

      },
      onEnd: (_) => {
        //translateX.value = withSpring(0);
        // console.log(translateX.value + translateY.value)

      },
    });

    const animatedStyle = useAnimatedStyle(() => {
      const defineGrad = () =>{

        let positionCurrentY = centery.value - absY.value
        let positionCurrentX = absX.value - centerx.value

        let centerY = centery.value
        let centerX = centerx.value
        let y1 = absY.value
        let x1 = absX.value
        let mLast = (-centerY+y1)/(centerX-x1)
        let degLast = Math.atan(mLast)*180/Math.PI;
        let degCurrent;

        if (Math.sign(positionCurrentX) < 0 && Math.sign(positionCurrentY)>0){
            degCurrent = degLast+180
        }else if(Math.sign(positionCurrentX) > 0 && Math.sign(positionCurrentY)>0){
            degCurrent = degLast
        }else if(Math.sign(positionCurrentX) > 0 && Math.sign(positionCurrentY)<0){
            degCurrent = degLast+360
        }else if(Math.sign(positionCurrentX) < 0 && Math.sign(positionCurrentY)<0){
            degCurrent = degLast+180
        }else if(Math.sign(positionCurrentX) === 0 && Math.sign(positionCurrentY)<0){
            degCurrent = 270
        }else if(Math.sign(positionCurrentX) === 0 && Math.sign(positionCurrentY)>0){
            degCurrent = 90
        }else if(Math.sign(positionCurrentY) === 0 && Math.sign(positionCurrentX)<0){
            degCurrent = 180
        }else if(Math.sign(positionCurrentY) === 0 && Math.sign(positionCurrentX)>0){
            degCurrent = 0
        }

        if (degCurrent !== undefined){
            if (Math.abs(degCurrent-gradLast.value)<1 || Math.abs(degCurrent-gradLast.value)> 359){
                if (-grad0.value + degCurrent < 0){
                    giroPositivo.value = 0
                }else{
                    giroPositivo.value = 1
                }

                if(degCurrent < 0){
                    gradLast.value = 360+degCurrent
                    grad0.value = 360+degCurrent
                }else if(degCurrent > 360){
                    gradLast.value = degCurrent - 360
                    grad0.value = degCurrent - 360
                }else{
                    gradLast.value = degCurrent%360
                    grad0.value = degCurrent%360
                }
            }else{
                if(Math.abs(grad0.value - degCurrent) >0){
                    if (-grad0.value + degCurrent < 0){
                        giroPositivo.value = 0
                    }else{
                        giroPositivo.value = 1
                    }
                    if (Math.abs(grad0.value - degCurrent) < (Math.sqrt(Math.pow(velX.value,2)+Math.pow(velY.value,2)) < 200 ?10:40) || Math.abs(grad0.value - degCurrent) > (Math.sqrt(Math.pow(velX.value,2)+Math.pow(velY.value,2)) < 200 ?350:320)){
                        gradLast.value += -grad0.value + degCurrent
                        if(gradLast.value < 0){
                            let newValue_grad = 360+gradLast.value
                            gradLast.value = newValue_grad
                            grad0.value = newValue_grad
                        }else if(gradLast.value > 360){
                            let newValue_grad = gradLast.value - 360
                            gradLast.value = newValue_grad
                            grad0.value = newValue_grad
                        }else{
                            let newValue_grad = gradLast.value%360
                            gradLast.value=newValue_grad
                            grad0.value = newValue_grad
                        }
                    }else{
                        if(degCurrent < 0){
                            grad0.value = 360-degCurrent
                        }else{
                            grad0.value = degCurrent%360
                        }
                    }
                }
            }
        }

        return -gradLast.value%360
      }
      return {
        transform: [
          {
            rotate:   defineGrad()    + 'deg',
          },
        ],
      };
    },[]);

    /*const rotationGesture = GH.Gesture.Rotation()
        .onTouchesMove((e) => {
            //Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            // let spins = (deg / 360);
            // let spingResolve = spins >= 1 ? spins - parseInt((spins + "").split(".")[0]) : spins;
            // let emotionPositionVal = Math.abs(parseInt(((((spingResolve * 360) + 0) / (360 / 7)) + "").split(".")[0]));
            // if (emotionPositionVal < 7) {
            //     setEmotionPosition(emotionPositionVal)
            // }
            let varAng = 5; // Variación angular
            let limMax = 50; // Limite máximo angular
            let limMin = 10; // Limite máximo angularcc
            let x2= e.allTouches[0].x
            let y2= e.allTouches[0].y
            if (x1 !== null){
                let mLast = (-centerY+y1)/(centerX-x1)
                let mCurrent = (-centerY+y2)/(centerX-x2)
                let degLast = Math.atan(mLast)*180/Math.PI
                let degCurrent = Math.atan(mCurrent)*180/Math.PI
                if (Math.abs(degLast-degCurrent)>limMin ){
                    if (Math.abs(degLast-degCurrent)>limMax){
                        if(degLast > degCurrent){
                            setDeg(deg - varAng)
                        }else{
                            setDeg(deg + varAng)
                        }
                    }else{
                        if(degLast > degCurrent){
                            setDeg(deg + varAng)
                        }else{
                            setDeg(deg - varAng)
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

        })*/

    return (
        <ScreenBaseV1>
            <GH.GestureHandlerRootView>


                <View flex={1} width={'100%'}>
                    <View flex={0.2} >
                        <Text color={'#FD5902'} style={{fontWeight:'bold', marginTop:30}} size={'lg'}  textAlign={'center'}>{t('roulette_how_are_you')}</Text>
                        <Text color={'#FD5902'} style={{marginTop:10}}  textAlign={'center'}>{moment().format('LL')}</Text>
                        <Text color={'#FD5902'} style={{marginTop:10,paddingLeft:20, paddingRight:20}}  textAlign={'center'}>{t('roulette_istructions')}</Text>
                    </View>
                    <View flex={0.4} alignItems={'center'} justifyContent={'flex-end'}>
                        <Image alt={'roulette'} source={pointerImage} style={{resizeMode: 'contain'}} width={10} height={10}/>
                    </View>

                    <View flex={1} alignItems={'center'}>
                        <GH.PanGestureHandler onGestureEvent={onPanGestureEvent}>
                            <Animated.Image source={circleParts} style={[animatedStyle,{
                                width: 300,
                                height: 300,
                                //transform: [{rotate: deg + `deg`}],
                                borderRadius: 150
                            }]}/>
                        </GH.PanGestureHandler>

                    </View>

                    <View flex={0.2} mx={4}>
                        <Button colorScheme={'orange'}
                                onPress={() => navigation.navigate('RouletteStep2Screen', {parentItem: _.find(parents, (o)=> {
                                        return o.attributes.slug_name === (definitionOfFeeling().slug)
                                    } )})}>{t('continue')}</Button>
                    </View>
                </View>
            </GH.GestureHandlerRootView>
        </ScreenBaseV1>
    );
};

export default RouletteStep1Screen;