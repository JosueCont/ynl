import React, {useEffect, useState} from 'react';
import {Dimensions, Platform} from 'react-native';
import circleParts from '../assets/ruleta.png';
//import {useSharedValue} from "react-native-reanimated";
import {Button, Image, Text, View, Icon} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import ScreenBaseV1 from "./Components/ScreenBaseV1";
import {Colors} from "../utils/Colors";
import pointerImage from '../assets/arrow2.png';
import ApiApp from "../utils/ApiApp";
import Style from '../utils/styles'
import _ from "lodash";
import {t} from 'i18n-js';
import * as GH from 'react-native-gesture-handler';
import simplepregunta from '../assets/una_simple_pregunta.png'
import hoy_siento from '../assets/hoy_siento.png'
import moment from 'moment'
import Animated,{useSharedValue, useAnimatedGestureHandler,withSpring, useAnimatedStyle} from 'react-native-reanimated';
import { useFonts } from 'expo-font';


const window_height = Dimensions.get("screen").height
const window_width = Dimensions.get("screen").width

const RouletteStep1Screen = ({navigation}) => {

    const [fontsLoaded] = useFonts({
        'Amberla': require('../assets/fonts/Amberla.otf'),
      }); 
    const [loading, setLoading] = useState(null);
    const [parents, setParents] = useState([]);
    const [emotions, setEmotions] = useState([]);

    // const emotions = [
    //     {slug:'contento', name: 'Contento', range: [0, 60], color: '#F9CF67'},
    //     {slug:'en-paz', name: 'En paz', range: [60, 120], color: '#BBEBFF'},
    //     {slug:'inspirado', name: 'Inspirado', range: [120, 180], color: '#F0A4BB'},
    //     {slug:'abierto', name: 'Abierto', range: [180, 240], color: '#70DDEC'},
    //     {slug:'confundido', name: 'Confundido', range: [240, 300], color: '#F6AA80'},
    //     {slug:'molesto', name: 'Molesto', range: [300, 360], color: '#EF7C7C'},
    //     {slug:'deprimido', name: 'Deprimido', range: [300, 360], color: '#B9CFEE'}
    // ]

    useEffect(() => {
        getParents()
        getEmotions() 
    }, [])

  

    const getEmotions = async () => {
        try {
            setLoading(true);
            let response = await ApiApp.getRoulette();
            //console.log(response.data.data)
            setEmotions(response.data)
            //alert(JSON.stringify(response.data))
        } catch (e) {
            console.log('getEmotions error =>',e.toString());
        } finally {
            setLoading(false)
        }
    }

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
       const circleSize =  Math.min(window_height, window_width) * 0.78
    return (
        <ScreenBaseV1>
            <GH.GestureHandlerRootView>


                <View  width={'100%'}>
                    <View  style={{marginTop:0, marginBottom:-20, width:window_width/1.2, height:100, }}>
                     <Image source={simplepregunta} style={{flex:1, resizeMode:'contain'}}/>
                    {/*fontsLoaded ? <Text color={Colors.black} style={{fontFamily: 'Amberla', fontSize:44, marginBottom:1,}} size={'xl'}  textAlign={'center'}>{t('roulette_how_i_feel')}</Text> : 
                    (<Text> </Text> )*/}
                        {/*<Text color={Colors.black} style={{marginBottom:1, marginTop:60, paddingLeft:20, paddingRight:20}} size={'lg'}  textAlign={'center'}>{t('roulette_how_are_you')}</Text> 
                        <Text color={'#FD5902'} style={{marginTop:10}}  textAlign={'center'}>{moment().format('LL')}</Text>
                        <Text color={'#FD5902'} style={{marginTop:10, paddingLeft:20, paddingRight:20}}  textAlign={'center'}>{t('roulette_istructions')}</Text> */}
                    </View>
                    <View  alignItems={'center'} justifyContent={'flex-end'} style={{marginTop:10,zIndex:100}}>
                        {/* <Image alt={'roulette'} source={pointerImage} style={{resizeMode: 'contain'}} width={10} height={10}/> */}
                        <Icon
                        style={{fontWeight:'bold', marginBottom:-25, position: 'relative',resizeMode: 'contain' }}
                        as={MaterialIcons}
                        name={"keyboard-arrow-down"}
                        color={Colors.black}
                        size={"5xl"}
                        />
                    </View>
                    <View  alignItems={'center'} justifyContent={'center'}>
                        <GH.PanGestureHandler onGestureEvent={onPanGestureEvent}>
                            <Animated.Image source={circleParts} style={[animatedStyle,{
                                width: 300,
                                height: 300,
                                //transform: [{rotate: deg + `deg`}],
                                borderRadius: 150
                            }]}/>
                        </GH.PanGestureHandler>
                    </View>

                </View>
            </GH.GestureHandlerRootView>
            <View  style={{marginTop:5, marginBottom:-20, width:window_width/1.7, height:100, }}>
                <Image source={hoy_siento} style={{flex:1, resizeMode:'contain'}}/>
            </View>
            <View   style={{marginTop:30, paddingLeft:80, paddingRight:80,}}>
                <Button style={Style.buttonGray}
                    onPress={() => navigation.navigate('RouletteStep2Screen', {parentItem: _.find(parents, (o)=> {
                            return o.attributes.slug_name === (definitionOfFeeling().slug)
                        } )})}>{t('continue')}</Button>
            </View>
            <View style={{marginTop:20}}>
                <View flexDirection={'row'} justifyContent={'space-between'} style={{position:'relative'}}>
                    <View backgroundColor={'#F5AC00'} style={{width:90, height:24, borderTopRightRadius:20, borderBottomRightRadius:20, position:'absolute', left:-55}}/>
                    <View backgroundColor={'#F5AC00'} style={{width:90, height:24,position:'absolute', right:-55, borderTopLeftRadius:20, borderBottomLeftRadius:20}}/>
                </View>
                <View style={{width:300, height:17, justifyContent:'center', backgroundColor:'#F5AC00', marginTop:35, borderRadius:20}}></View>
                <View flexDirection={'row'}  style={{ marginTop:10}} justifyContent={'center'} alignItems={'center'}>
                <Text alignSelf={'center'} >Your now limitless</Text>
                    <View backgroundColor={'#F5AC00'} style={{width:53, height:13, borderRadius:20, position:'absolute', left:-20}}/>
                    <View backgroundColor={'#F5AC00'} style={{width:53, height:13,position:'absolute', right:-20, borderRadius:20,}}/>
                </View>
            </View>
        </ScreenBaseV1>
    );
};

export default RouletteStep1Screen;