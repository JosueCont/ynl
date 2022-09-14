import React, {useEffect, useRef, useState} from "react";
import {Icon, Image, Skeleton, Text, View} from "native-base";
import {connect} from "react-redux";
import {Platform, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {Colors} from "../utils/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import ApiApp from "../utils/ApiApp";
import bg1 from '../assets/bg1.png'
import _ from 'lodash';
import moment from 'moment';
import {getShadowCircleStyle} from "../utils/functions";
import 'moment/locale/es';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const HomeScreen = ({authDuck, navigation, groupDuck}) => {
    /**
     * Para push
     */
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const [feelings, setFeelings] = useState(null);
    const [colorMainFeeling, setColorMainFeeling] = useState('FFFF');
    const isFocused = useIsFocused();
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [groups, setGroups] = useState(null);
    const [groupsRequests, setGroupsRequests] = useState([])
    const [lastEmotion, setLastEmotion] = useState(null);
    const [lastEmotion1, setLastEmotion1] = useState(null);
    const [mainFeeling, setMainFeeling] = useState(null)

    const [days, setDays] = useState([]);
    const [fullName, setFullName] = useState(null);

    const [intro, setIntro] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {

        // console.log(authDuck.emotionStatus)
        if (intro === false) {
            navigation.navigate('IntroScreen')
        } else if (authDuck.emotionStatus === 0 || authDuck.emotionStatus === undefined) {
            navigation.navigate('RouletteStep1Screen')
        }

    }, [authDuck.emotionStatus, intro])

    useEffect(() => {
        if (isFocused) {
            boot()
        }
        console.log(authDuck)
    }, [isFocused])

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token)).catch(e => {
            console.log('HomeScreen registerForPushNotificationsAsync error => ', e.toString())
        });

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(" responseListener.current: ", response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])

    useEffect(() => {
        if (expoPushToken) {
            sendPushTokenToBack()
        }
    }, [expoPushToken])

    const boot = async () => {
        try {
            setLoading(true)
            await getGroupsRequests();
            await getGroups()
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

    const getGroupsRequests = async () => {
        try {
            const response = await ApiApp.getGroupsRequests(authDuck.user.id)
            setGroupsRequests(response.data.data)
        } catch (e) {
            console.log("HomeScreen getGroupsRequests error =>", e.toString())
        }
    }

    const getHome = async () => {
        try {

            const res = await ApiApp.getHomeData(authDuck.user.id, authDuck.userSiteConfig)

            // console.log('consolelog?===',res.data.data)
            if (_.get(res, 'data.data', null)) {
                setDays(res.data.data.days)
                if (res.data.data.lastEmotion) {
                    // console.log('lastEmotion =>', res.data.data.lastEmotion)
                    setLastEmotion(res.data.data.lastEmotion.name)
                    setMainFeeling(res.data.data.lastEmotion)

                    if (res.data.data.lastEmotion.child) {
                        setLastEmotion1(res.data.data.lastEmotion.child.name)
                        setColorMainFeeling(res.data.data.lastEmotion.child.color)
                    }
                }
                if (res.data.data.userInfo) {
                    if (res.data.data.userInfo.avatar) {
                        setImage(res.data.data.userInfo.avatar.formats.small.url)
                    }
                    setFullName(res.data.data.userInfo.fullName)
                    setIntro(res.data.data.userInfo.intro)
                }
            }
        } catch (e) {
            console.log("HomeScreen getHome error =>", e.toString())
        } finally {
            //
        }
    }

    const getGroups = async () => {
        try {
            const response = await ApiApp.getMyGroups(authDuck.user.id)


            if (_.get(response, 'data.data', null)) {
                // console.log("groups", response.data.data.entries)
                setGroups(response.data.data.entries)
            }

        } catch (e) {
            console.log("HomeScreen getGroups error =>", e.toString())
        } finally {

        }

    }
    /**
     * Enviamos el pushtoken al backend
     */
    const sendPushTokenToBack = async () => {
        try {
            let data = {
                "pushToken": expoPushToken,
                "platform": Platform.OS,
                "provider": "expo",
                "users_permissions_user": authDuck.user.id
            }
            console.log(data)
            const res = await ApiApp.sendPushToken({data})
        } catch (e) {
            console.log("HomeScreen sendPushTokenToBack error =>", e)
        }
    }

    async function registerForPushNotificationsAsync() {
        try {
            let token;
            if (Device.isDevice) {
                const {existingStatus} = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const {status} = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    console.log('Failed to get push token for push notification!');
                    return;
                }
                token = (await Notifications.getExpoPushTokenAsync()).data;
                console.log(token);
            } else {
                console.log('Must use physical device for Push Notifications');
            }

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }

            return token;
        } catch (e) {
            console.log("registerForPushNotificationsAsync error =>", e.toString())
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
                        refreshing={loading && refreshing}
                        onRefresh={() => {
                            setRefreshing(true)
                            boot()
                        }}
                    />
                }>
                <View flex={1} alignItems={'center'} justifyContent={'center'} mb={2}>
                    {
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
                    }


                    <Image source={bg1} style={{
                        position: 'absolute',
                        resizeMode: 'contain',
                        zIndex: -1,
                        width: '150%',
                        height: 100
                    }} alt="img"></Image>
                </View>
                <View flex={1} mx={4}>

                    {
                        loading ?
                            <Skeleton.Text px="10" lines={1} mb={2}/> :
                            <Text mb={4} fontSize={24} color={Colors.red} textAlign={'center'}>{fullName}</Text>

                    }
                    {
                        loading ?
                            <Skeleton.Text px="10" lines={1}/> :
                            <Text fontSize={14} color={Colors.red}
                                  textAlign={'center'}>{moment().locale('es').format('ll')}</Text>

                    }


                    {
                        loading === true ?
                            <Skeleton height={50} my={2}/> :
                            loading === false &&
                            <View my={2} width={'70%'} alignSelf={'center'} height={60} flexDir={'row'}
                                  alignItems={'center'} justifyContent={'center'}>

                                {
                                    days.map((item, i) => {
                                        return (
                                            <View key={i} flex={1} height={20} style={getShadowCircleStyle(5, 5)}
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


                    {
                        loading === true ?
                            <Skeleton height={70} my={2}/> :
                            loading === false &&
                            <View
                                flexDir={'row'}
                                mb={8}
                                bgColor={'#' + colorMainFeeling}
                                style={getShadowCircleStyle(10, 10)}
                                borderRadius={30}
                                p={3}>
                                <View flex={0.5} height={70} alignItems={'center'} justifyContent={'center'}>

                                    {
                                        _.has(mainFeeling, 'icon.url') &&
                                        <Image alt=":)" size="sm"
                                               source={{uri: mainFeeling.icon.url}}/>
                                    }


                                </View>
                                {
                                    (!loading && !lastEmotion) &&
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('RouletteStep1Screen')
                                        }}><Text style={{fontSize: 20, color: '#FF5E00', fontWeight: 'bold', marginTop: 10}}>Registra tu primera emoción</Text>
                                    </TouchableOpacity>
                                }

                                {
                                    lastEmotion && <View flex={1} height={70} mr={1}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('HistoryFeelingScreen')
                                            }}
                                            style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 10
                                            }}>
                                            <Text fontSize={12} color={'white'}>Última emoción</Text>
                                            <Text color={'white'} style={{fontWeight: 'bold'}}
                                                  fontSize={20}
                                                  adjustsFontSizeToFit>{lastEmotion}</Text>
                                            <Text color={'white'} fontSize={16} adjustsFontSizeToFit
                                                  numberOfLines={1}>{lastEmotion1}  </Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                            </View>
                    }
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
                                <Text color={'white'} fontSize={11}>Mis Avance</Text>
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
                                    if (groups.length === 0 && groupsRequests.length === 0) {
                                        navigation.navigate('GroupsStartScreen')
                                    } else {
                                        navigation.navigate('GroupsScreen')
                                    }
                                }}>
                                <Icon as={MaterialIcons} name={'groups'} size={6} color={'white'} mb={1}></Icon>
                                <Text color={'white'} fontSize={11}>Mis grupos</Text>
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

export default connect(mapState)(HomeScreen);


//connect(mapState, {getMyGroups})(HomeScreen);