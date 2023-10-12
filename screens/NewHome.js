import { Dimensions, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../utils/Colors'
import _ from 'lodash';
import {getShadowCircleStyle} from "../utils/functions";
import { HStack, Icon, Image, Skeleton, VStack } from 'native-base';
import { useSelector } from 'react-redux';
import {MaterialIcons} from "@expo/vector-icons";
import Lineas from '../assets/lineas.png'
import ApiApp from '../utils/ApiApp';
import { useEffect } from 'react';
import NewLogo from '../assets/new_logo.png'
import EmotionalKargo from '../assets/emotional_kargo.png'
import LifeMachine from '../assets/life_machine.png'
import SixPack from '../assets/six_pack_btn.png'
import CircularProgress from 'react-native-circular-progress-indicator';
import MisEmociones from '../assets/mis_emociones_icon.png'
import NvaEmocion from '../assets/nva_emocion.png'
import Yellow from '../assets/cuadro_amarillo.png'
import ListIcon from '../assets/list_icon.png'
import ObjetivosIcon from '../assets/objetivos_icon.png'
import DailyPhraseIcon from '../assets/daily_phrase_icon.png'
import BookmarkIcon from '../assets/bookmark_icon.png'
import ObjetivosIconHome from '../assets/objetivos_icon_home.png'
import { LinearGradient } from 'expo-linear-gradient';
import FooterLines from '../components/FooterLines'
import ModalDayPhrase from './Modals/ModalDayPhrase'
import moment from 'moment';
import {useIsFocused} from "@react-navigation/native";


const NewHome = ({navigation}) => {
    moment.locale();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [intro, setIntro] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [modalPhraseVisible, setModalPhraseVisible] = useState(false)
    const [phraseDay, setPhraseDay] = useState(null)
    const [fullName, setFullName] = useState(null);

    const isFocused = useIsFocused();
    const authDuck = useSelector(state => state?.authDuck)

    const screenWidth = Dimensions.get("window").width;

    useEffect(() => {
        if (isFocused) {
            boot()
        }
    }, [isFocused])
    
    const closeModalPhrase = () => {
        setModalPhraseVisible(false)
    }

    const boot = async () => {
        try {
            setLoading(true)
            /* await getGroupsRequests();
            await getGroups() */
            await getHome()

            setTimeout(() => {
                setLoading(false)
            }, 200)
        } catch (e) {
            console.log("boot error =>", e.toString())
            setTimeout(() => {
                setLoading(false)
            }, 200)
        } finally {
            setTimeout(() => {
                setRefreshing(false)
                setLoading(false)
            }, 200)

        }

    }

    const getHome = async () => {
        try {

            const res = await ApiApp.getHomeData(authDuck.user.id, authDuck.userSiteConfig)
            
            if (_.get(res, 'data.data', null)) {
                /* setDays(res.data.data.days) */
                if (res.data.data.lastEmotion) {
                    // console.log('lastEmotion =>', res.data.data.lastEmotion)
                    /* setLastEmotion(res.data.data.lastEmotion.name)
                    setMainFeeling(res.data.data.lastEmotion) */

                    /* if (res.data.data.lastEmotion.child) {
                        setLastEmotion1(res.data.data.lastEmotion.child.name)
                        setColorMainFeeling(res.data.data.lastEmotion.child.color)
                        //console.log("🚀 ~ file: HomeScreen.js ~ line 148 ~ getHome ~ color", res.data.data.lastEmotion.child.color)
                    } */
                }
                if (res.data.data.userInfo) {
                    if (res.data.data.userInfo.avatar) {
                        setImage(res.data.data.userInfo.avatar.url)
                    }
                    setFullName(res.data.data.userInfo.fullName)
                    console.log('setintro========>',res.data.data.userInfo.intro)

                    setIntro(res.data.data.userInfo.intro)
                }
            }
        } catch (e) {
            console.log("HomeScreen getHome error =>", e.toString())
        } finally {
            //
        }
    }

    useEffect( () => {
        // console.log(authDuck.emotionStatus)
        if (intro === false) {
            navigation.navigate('IntroScreen')
        } else  {   //if (authDuck.emotionStatus === 0 || authDuck.emotionStatus === undefined)            
            /* } */
            init()
        }

    }, [intro])

    const queryDailyPhrase = async () => {
        try {
            const response = await ApiApp.getUserDayPhrase(authDuck.user.id)
            if(response.status === 200){
                setPhraseDay(response?.data?.data?.phrase?.phrase)
                if(response?.data?.data?.exist === false){
                    setModalPhraseVisible(true)
                    return true
                }
            }
        } catch (e) {
            console.log("HomeScreen queryDailyPhrase error =>", e.toString())
            return false
        }
    }

    const init = async () => {
        console.log('init============')
        if(await queryDailyPhrase() === false){
            console.log('ERROR queryDailyPhrase')
            //validateEmotion()
        }

        if(modalPhraseVisible === false){
            /* fetchData() 
            if (emotionsStatus === 0) {
                navigation.navigate('RouletteStep1Screen')
            } */
            /* if(emotionsStatus !== 0){ */                
        }
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
            contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.white}}
            refreshControl={
                <RefreshControl
                    style={{backgroundColor: 'white'}}
                    tintColor={Colors.yellow}
                    refreshing={loading && refreshing}
                    onRefresh={() => {
                        setRefreshing(true)
                        boot()
                    }}
                />
        }>
            <View flex={1}  mb={2} style={{ marginBottom:130 }} >
                <VStack>
                    <HStack justifyContent={'center'}>
                        <Image 
                            source={NewLogo}
                            width={50}
                            height={60}
                            marginBottom={5}
                            resizeMode='contain'
                        />
                    </HStack>
                    <View style={{ width: screenWidth, justifyContent:'center', alignItems: 'center'  }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                            {/* <Image w={220} h={220} source={{uri: image}} alt="img" style={styles.phtoContainer} /> */}
                            <View style={styles.phtoContainer}>
                                <Icon as={MaterialIcons} name="person-outline" size={20} color={'gray.200'}/>
                            </View>
                            
                        </TouchableOpacity>
                        <Image source={Lineas} style={{
                                position: 'absolute',
                                zIndex:-1,
                                width: screenWidth,
                                height:150,
                                resizeMode:'contain'
                            }} alt="img"/>
                    </View>
                    <HStack justifyContent={'center'} marginTop={5} marginBottom={6}>
                        <Text style={{ color:Colors.black }} >
                            {moment().format('LL')}
                        </Text>
                    </HStack>
                    <View style={{ width:'90%',  alignSelf:'center', justifyContent:'space-evenly', flexDirection:'row' }}>
                        <View  backgroundColor={{ position:'relative', padding: 20, justifyContent:'center', backgroundColor:Colors.black }}>
                            <CircularProgress radius={45} activeStrokeWidth={5} value={58}  progressValueColor={'#F3BC38'} />
                            <View style={{ textAlign:'center', backgroundColor:Colors.yellow, position:'absolute', justifyContent:'center', alignSelf:'center', marginTop:10, borderRadius:110, width: 66, height:66, left:12, top:2 }}>
                                <Image source={EmotionalKargo} width={50} height={6} resizeMode='stretch' style={{ alignSelf:'center' }} />
                            </View>
                        </View>
                        <View  backgroundColor={{ position:'relative', backgroundColor:'red', padding: 20 }}>
                            <CircularProgress radius={45} activeStrokeWidth={5} value={58}  progressValueColor={'#F3BC38'} />
                            <View style={{ backgroundColor:"#93973D", position:'absolute', justifyContent:'center', alignSelf:'center', marginTop:10, borderRadius:110, width: 66, height:66, left:12, top:2 }}>
                                <Image source={LifeMachine} width={50} height={6} resizeMode='stretch' style={{ alignSelf:'center' }} />
                            </View>
                        </View>
                        <View  backgroundColor={{ position:'relative', backgroundColor:'red', padding: 20 }}>
                            <CircularProgress radius={45} activeStrokeWidth={5} value={58}  progressValueColor={'#F3BC38'} />
                            <View style={{ backgroundColor:Colors.red2, position:'absolute', justifyContent:'center', alignSelf:'center', marginTop:10, borderRadius:110, width: 65, height:65, left:13, top:2 }}>
                                <Image source={SixPack} width={50} height={6} resizeMode='stretch' style={{ alignSelf:'center' }} />    
                            </View>
                        </View>
                        {/* <View width={'25%'} backgroundColor={{ position:'relative', backgroundColor:'red', padding: 20 }}>
                            <CircularProgress radius={45} activeStrokeWidth={5} value={58}  progressValueColor={'#F3BC38'} />
                            <View style={{ backgroundColor:"#CBA25F", position:'absolute', justifyContent:'center', alignSelf:'center', marginTop:10, borderRadius:110, width: 65, height:65, left:13, top:2 }}>

                            </View>
                        </View> */}
                    </View>
                    <HStack style={{ marginTop:30 }} space={5} justifyContent={'center'} >
                        <TouchableOpacity  /* onPress={() => goToProject()} */>
                            <LinearGradient
                                // Button Linear Gradient
                                colors={['#5E5C5C', '#131212']}
                                style={styles.btnGradient}
                            >
                                <VStack justifyContent={'center'} alignSelf={'center'} >
                                    <Image source={MisEmociones} alignSelf={'center'} />
                                    <Text style={{ color:Colors.white}} >
                                        Mis emociones
                                    </Text>
                                </VStack>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity  /* onPress={() => goToProject()} */>
                            <LinearGradient
                                // Button Linear Gradient
                                colors={['#5E5C5C', '#131212']}
                                style={styles.btnGradient}
                            >
                                <VStack justifyContent={'center'} alignSelf={'center'} >
                                    <Image source={NvaEmocion} alignSelf={'center'} />
                                    <Text style={{ color:Colors.white}} >
                                        Mis emociones
                                    </Text>
                                </VStack>
                            </LinearGradient>
                        </TouchableOpacity>
                    </HStack>
                    <HStack style={{ marginTop:30 }} space={5} justifyContent={'center'} >
                        <TouchableOpacity>
                            <View style={{ position:'relative', justifyContent:'center' }} width={45} height={45}>
                                <Image source={Yellow} resizeMode='contain' style={{ position:'absolute', zIndex:-1 }} />
                                <Image source={ListIcon} style={{alignSelf:'center'}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ position:'relative', justifyContent:'center' }} width={45} height={45}>
                                <Image source={Yellow} resizeMode='contain' style={{ position:'absolute', zIndex:-1 }} />
                                <Image source={ObjetivosIcon} style={{alignSelf:'center'}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalPhraseVisible(true)}>
                            <View style={{ position:'relative', justifyContent:'center' }} width={45} height={45}>
                                <Image source={Yellow} resizeMode='contain' style={{ position:'absolute', zIndex:-1 }} />
                                <Image source={DailyPhraseIcon} style={{alignSelf:'center'}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ position:'relative', justifyContent:'center' }} width={45} height={45}>
                                <Image source={Yellow} resizeMode='contain' style={{ position:'absolute', zIndex:-1 }} />
                                <Image source={BookmarkIcon} style={{alignSelf:'center'}} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{ position:'relative', justifyContent:'center' }} width={45} height={45}>
                                <Image source={Yellow} resizeMode='contain' style={{ position:'absolute', zIndex:-1 }} />
                                <Image source={ObjetivosIconHome} style={{alignSelf:'center'}} />
                            </View>
                        </TouchableOpacity>
                    </HStack>
                </VStack>
                {/* {
                    loading === true ?
                        <View style={getShadowCircleStyle(10, 10)}>
                            <Skeleton endColor="warmGray.50" size="220" rounded="full"/>
                        </View> :
                        image ?
                            <View style={getShadowCircleStyle(10, 10)}>
                                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                                    <Image w={220} h={220} source={{uri: image}} alt="img"
                                            style={[
                                                {resizeMode: 'cover'}]}
                                            borderRadius={110} borderWidth={2} borderColor={'white'}/>
                                </TouchableOpacity>

                            </View> :
                            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                                <View style={[{
                                    width: 220,
                                    height: 220,
                                    alignSelf: 'center',
                                    alignItems: 'center'
                                }, getShadowCircleStyle(10, 10)]} mt={5} mb={10}>
                                    <View width={'100%'} height={'100%'} bgColor={'white'} alignItems={'center'}
                                        justifyContent={'center'}
                                        borderRadius={110} borderWidth={0.5}
                                        borderColor={"red.200"}>
                                        <Icon as={MaterialIcons} name="person-outline" size={20} color={'gray.200'}/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                } */}
            </View>
            <FooterLines bottom={20} />
            <ModalDayPhrase phrase={phraseDay}  visible={modalPhraseVisible} closeModalPhrase={closeModalPhrase} />
        </ScrollView>
    </SafeAreaView>
  )
}

export default NewHome

const styles = StyleSheet.create({
    phtoContainer:{
        width:220,
        height:220,
        borderWidth:9,
        borderColor: Colors.black,
        backgroundColor:Colors.white,
        resizeMode:'cover',
        borderRadius:110,
        alignItems:'center',
        justifyContent:'center'
    },
    btnGradient:{
        paddingVertical:12,
        paddingHorizontal:35,
        borderRadius: 10
    }
})