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

    const shadowStyle = {
        shadowColor: "#000",
        shadowOffset: {
            width: 15,
            height: 4,
        },
        shadowOpacity: 0.24,
        shadowRadius: 15.27,
        elevation: 20,
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView
                contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.white}}
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: 'white'}}
                        tintColor={Colors.red}
                        refreshing={loading}
                    />
                }>
                <View flex={1} alignItems={'center'}>
                    <Image w={220} h={220} source={profile}
                           style={[
                               {resizeMode: 'cover'}]}
                           borderRadius={110} borderWidth={2} borderColor={'white'}/>
                </View>
                <View flex={1} mx={4}>

                    <Text fontSize={24} color={Colors.red} textAlign={'center'}>{authDuck.user.username}</Text>
                    <Text mb={6} fontSize={16} color={Colors.red} textAlign={'center'}>17/Mayo/202</Text>

                    <View
                        flexDir={'row'}
                        mb={8}
                        bgColor={Colors.gray}
                        style={shadowStyle}
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
                                }}
                                onPress={() => navigation.navigate('YourFeelScreen')}>
                                <Text fontSize={12}>Última emoción</Text>
                                <Text fontSize={26} color={Colors.red}>{lastEmotion}</Text>
                                <Text fontSize={12}>Juguetón - Descarado</Text>
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
                                <Text color={'white'} size={'sm'}>Del 1 al 10</Text>
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
                                <Text color={'white'} size={'sm'}>Mi Avance</Text>
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
                                <Text color={'white'} size={'sm'}>Nueva emoción</Text>
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
                                    navigation.navigate('RotateCustomScreen')
                                }}>
                                <Icon as={MaterialIcons} name={'nat'} size={7} color={'white'}></Icon>
                                <Text color={'white'} size={'sm'}>Ruleta de
                                    emociones V2</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View flex={1} justifyContent={'center'}>
                        <Button colorScheme={'orange'} onPress={() => _logOut()}>Cerrar Sesión</Button>
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