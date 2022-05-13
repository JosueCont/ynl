import React, {useEffect, useState} from "react";
import {Button, Icon, Image, Text, View} from "native-base";
import {connect} from "react-redux";
import {RefreshControl, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {logOutAction} from "../redux/ducks/authDuck";
import {getMyGroups} from "../redux/ducks/groupDuck";
import {useIsFocused} from "@react-navigation/native";
import profile from '../assets/profile.jpg';
import {Colors} from "../utils/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import ApiApp from "../utils/ApiApp";

const HomeScreen = ({authDuck, navigation, logOutAction, groupDuck}) => {

    const [feelings, setFeelings] = useState(null);
    const isFocused = useIsFocused();
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [groups, setGroups] = useState(null);
    const [lastEmotion, setLastEmotion] = useState(null);

    useEffect(() => {
        if (isFocused) {
            console.log('focused')
            getGroups()
            getHome()
        }
    }, [isFocused])



    const _logOut = async () => {
        try {
            await logOutAction()
        } catch (ex) {
            console.log('e', ex)
        }
    }

    const HistoryPage = () => {
        navigation.navigate('HistoryList')
    }

    const getHome = async () => {
        try {
            setLoading(true)

            const res = await ApiApp.getHomeData(authDuck.user.id)
            setLastEmotion(res.data.data.lastEmotion.label)
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
        <SafeAreaView style={{flex: 1}}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: Colors.red}}
                        tintColor={'white'}
                        refreshing={loading}
                    />
                }>
                <View flex={1} mb={6} alignItems={'center'} backgroundColor={Colors.red} borderBottomLeftRadius={60}>
                    <Image w={150} h={150} source={profile}
                           style={{resizeMode: 'cover', position: 'absolute', bottom: -20}}
                           borderRadius={100} borderWidth={2} borderColor={'white'}/>
                </View>
                <View flex={1} mx={4}>

                    <Text mb={6} fontSize={24} color={'red.400'} textAlign={'center'}>{authDuck.user.username}</Text>
                    <View flexDir={'row'} mb={2}>
                        <View flex={1} height={70} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }}
                                onPress={() => navigation.navigate('YourFeelScreen')}>
                                <Text color={'white'} fontSize={18}>Última emoción</Text>
                                <Text color={'white'} fontSize={18}>{lastEmotion}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View flexDir={'row'} mb={2}>
                        <View flex={1} height={70} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }}
                                onPress={() => navigation.navigate('YourFeelScreen')}>
                                <Icon as={MaterialIcons} name={'mood'} size={9} color={'white'}></Icon>
                                <Text color={'white'} size={'sm'}>¿Cómo te
                                    calificas?</Text>
                            </TouchableOpacity>
                        </View>
                        <View flex={1} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }}
                                onPress={() => {
                                    HistoryPage()
                                }}>
                                <Icon as={MaterialIcons} name={'donut-large'} size={7} color={'white'}></Icon>
                                <Text color={'white'} size={'sm'}>Historial</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View flexDir={'row'} mb={2}>
                        <View flex={1} height={70} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }}
                                onPress={() => {
                                    navigation.navigate('EmotionsPage')
                                }}>
                                <Icon as={MaterialIcons} name={'nat'} size={7} color={'white'}></Icon>
                                <Text color={'white'} size={'sm'}>Ruleta de
                                    emociones</Text>
                            </TouchableOpacity>
                        </View>
                        <View flex={1} height={70} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }}
                                onPress={() => {
                                    if (groups.length === 0) {
                                        navigation.navigate('GroupsStartScreen')
                                    } else {
                                        navigation.navigate('GroupsScreen')
                                    }
                                }}>
                                <Icon as={MaterialIcons} name={'groups'} size={7} color={'white'}></Icon>
                                <Text color={'white'} size={'sm'}>Mis
                                    grupos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View flexDir={'row'} mb={2}>
                        <View flex={1} height={70} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }}
                                onPress={() => {
                                    navigation.navigate('StatisticsScreen')
                                }}>
                                <Icon as={MaterialIcons} name={'insert-chart-outlined'} size={7} color={'white'}></Icon>
                                <Text color={'white'} size={'sm'}>Estadísticas</Text>
                            </TouchableOpacity>
                        </View>
                        <View flex={1} height={70} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }}
                                onPress={() => {
                                    navigation.navigate('ProfileScreen')
                                }}>
                                <Icon as={MaterialIcons} name={'person-outline'} size={7} color={'white'}></Icon>
                                <Text color={'white'} size={'sm'}>Perfil</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View flexDir={'row'} mb={2}>
                        <View flex={1} height={70} mr={1}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: Colors.red,
                                    borderRadius: 10
                                }}
                                onPress={() => {
                                    navigation.navigate('RotateCustom')
                                }}>
                                <Icon as={MaterialIcons} name={'nat'} size={7} color={'white'}></Icon>
                                <Text color={'white'} size={'sm'}>Ruleta de
                                    emociones V2</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Button colorScheme={'red'} onPress={() => _logOut()}>Cerrar Sesión</Button>
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

export default connect(mapState, {logOutAction, getMyGroups})(HomeScreen);