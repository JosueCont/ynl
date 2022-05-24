import React, {useEffect, useState} from "react";
import {Icon, Image, Skeleton, Text, View} from "native-base";
import {connect} from "react-redux";
import {RefreshControl, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {getMyGroups} from "../redux/ducks/groupDuck";
import {useIsFocused} from "@react-navigation/native";
import profile from '../assets/profile.jpg';
import {Colors} from "../utils/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import ApiApp from "../utils/ApiApp";
import bg1 from '../assets/bg1.png'
import {getShadowCircleStyle} from "../utils/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({authDuck, navigation, groupDuck}) => {

    const [feelings, setFeelings] = useState(null);
    const isFocused = useIsFocused();
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState(null);
    const [lastEmotion, setLastEmotion] = useState(null);
    const [lastEmotion1, setLastEmotion1] = useState(null);
    const [lastEmotion2, setLastEmotion2] = useState(null);

    const [days, setDays] = useState([]);
    const [fullName, setFullName] = useState(null);

    const [introStatus, setIntroStatus] = useState(null);

    useEffect(() => {
        getIntroStatus()
    }, [])

    const getIntroStatus = async () => {
        try {
            let intro = await AsyncStorage.getItem('@intro');
            if (!intro) {
                intro = 0;
            }

            setIntroStatus(parseInt(intro))
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        if (introStatus === 0) {
            navigation.navigate('IntroScreen')
        } else if (authDuck.emotionStatus === 0) {
            navigation.navigate('RouletteStep1Screen')
        }

    }, [authDuck.emotionStatus])

    useEffect(() => {
        if (isFocused) {
            console.log('focused')
            getGroups()
            getHome()
        }
    }, [isFocused])


    const getHome = async () => {
        try {
            setLoading(true)

            const res = await ApiApp.getHomeData(authDuck.user.id)

            setDays(res.data.data.days)
            setLastEmotion(res.data.data.lastEmotion.name)
            setLastEmotion1(res.data.data.lastEmotion.child.name)
            setLastEmotion2(res.data.data.lastEmotion.child.child.name)

            setFullName(res.data.data.userInfo.fullName)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const getGroups = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getMyGroups(authDuck.user.id)
            setGroups(response.data.data)
        } catch (e) {
            console.log(e, 61)
        } finally {
            setLoading(false)
        }

    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.white}}
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: 'white'}}
                        tintColor={Colors.red}
                        refreshing={loading}
                    />
                }>
                <View flex={1} alignItems={'center'} justifyContent={'center'} mb={2}>
                    <View style={getShadowCircleStyle(10, 10)}>
                        <Image w={220} h={220} source={profile}
                               style={[
                                   {resizeMode: 'cover'}]}
                               borderRadius={110} borderWidth={2} borderColor={'white'}/>
                    </View>

                    <Image source={bg1} style={{
                        position: 'absolute',
                        resizeMode: 'contain',
                        zIndex: -1,
                        width: '150%',
                        height: 100
                    }}></Image>
                </View>
                <View flex={1} mx={4}>

                    <Text mb={4} fontSize={24} color={Colors.red} textAlign={'center'}>{fullName}</Text>
                    <Text fontSize={14} color={Colors.red} textAlign={'center'}>17/Mayo/202</Text>

                    {
                        loading === true ?
                            <Skeleton height={60} my={2}/> :
                            <View my={2} width={'70%'} alignSelf={'center'} height={60} flexDir={'row'}
                                  alignItems={'center'} justifyContent={'center'}>

                                {
                                    days.map((item) => {
                                        return (
                                            <View flex={1} height={20} style={getShadowCircleStyle(5, 5)}
                                                  alignItems={'center'} justifyContent={'center'}>
                                                <Text fontSize={7} textAlign={'center'} mb={1}
                                                      color={Colors.red}>{item.alias}</Text>
                                                <View style={{width: 20, height: 20}} bgColor={'#' + item.color}
                                                      borderRadius={15} borderWidth={0.5} borderColor={Colors.red}>

                                                </View>
                                            </View>
                                        )
                                    })
                                }

                            </View>
                    }

                    <View
                        flexDir={'row'}
                        mb={8}
                        bgColor={Colors.gray}
                        style={getShadowCircleStyle(10, 10)}
                        borderRadius={10}
                        p={3}>
                        <View flex={1} height={70} alignItems={'center'} justifyContent={'center'}>
                            <Icon as={MaterialIcons} name={'mood'} size={'6xl'} color={Colors.red}></Icon>
                        </View>
                        <View flex={1} height={70} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10
                                }}>
                                <Text fontSize={12}>Última emoción</Text>
                                <Text fontSize={26} color={Colors.red}>{lastEmotion2}</Text>
                                <Text fontSize={12}>{lastEmotion1} - {lastEmotion}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View flexDir={'row'} mb={4} height={70}>
                        <View flex={1} mr={2}>
                            <TouchableOpacity
                                style={[{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }, getShadowCircleStyle(10, 10)]}
                                onPress={() => navigation.navigate('YourFeelScreen')}>
                                <Icon as={MaterialIcons} name={'mood'} size={6} color={'white'} mb={1}></Icon>
                                <Text color={'white'} fontSize={11}>Del 1 al 10</Text>
                            </TouchableOpacity>
                        </View>
                        <View flex={1} ml={2}>
                            <TouchableOpacity
                                style={[{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }, getShadowCircleStyle(10, 10)]}
                                onPress={() => {
                                    navigation.navigate('StatisticsScreen')
                                }}>
                                <Icon as={MaterialIcons} name={'donut-large'} size={6} color={'white'} mb={1}></Icon>
                                <Text color={'white'} fontSize={11}>Mis Avances</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View flexDir={'row'} mb={4} height={70}>
                        <View flex={1} mr={2}>
                            <TouchableOpacity
                                style={[{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }, getShadowCircleStyle(10, 10)]}
                                onPress={() => {
                                    navigation.navigate('RouletteStep1Screen')
                                }}>
                                <Icon as={MaterialIcons} name={'nat'} size={6} color={'white'} mb={1}></Icon>
                                <Text color={'white'} fontSize={11}>Nueva emoción</Text>
                            </TouchableOpacity>
                        </View>
                        <View flex={1} height={70} ml={2}>
                            <TouchableOpacity
                                style={[{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }, getShadowCircleStyle(10, 10)]}
                                onPress={() => {
                                    if (groups.length === 0) {
                                        navigation.navigate('GroupsStartScreen')
                                    } else {
                                        navigation.navigate('GroupsScreen')
                                    }
                                }}>
                                <Icon as={MaterialIcons} name={'groups'} size={6} color={'white'} mb={1}></Icon>
                                <Text color={'white'} fontSize={11}>Mis
                                    grupos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        groupDuck: state.groupDuck
    }
}

export default connect(mapState, {getMyGroups})(HomeScreen);