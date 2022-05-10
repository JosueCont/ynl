import React, {useEffect, useState} from "react";
import {Box, Button, HStack, Image, Text, VStack} from "native-base";
import {connect} from "react-redux";
import {TouchableOpacity} from "react-native";
import {logOutAction} from "../redux/ducks/authDuck";

import logo from '../assets/logo.png'
import {getMyGroups} from "../redux/ducks/groupDuck";
import {useIsFocused} from "@react-navigation/native";

const HomeScreen = ({authDuck, navigation, logOutAction, groupDuck}) => {

    const [feelings, setFeelings] = useState(null);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            getGroups()
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

    const getGroups = async () => {
        if (authDuck.user) {
            try {
                const res = await getMyGroups(authDuck.user.id)
            } catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
            <HStack justifyContent={'center'} pt={5} pb={3}>
                <VStack>
                    <Image size={'md'} source={logo}/>
                </VStack>
            </HStack>
            <HStack>
                <VStack>
                    <Text size={'lg'} color={'red.400'}>Bienvenido a
                        YNL! {authDuck.user ? authDuck.user.email : ''}</Text>
                    <Button colorScheme={'red'} onPress={() => navigation.navigate('ProfileScreen')}
                            mb={2}>Perfil</Button>

                    <Button colorScheme={'red'} onPress={() => navigation.navigate('IntroScreen')}
                            mb={2}>Intro</Button>

                    <Button colorScheme={'red'} onPress={() => navigation.navigate('YourFeelScreen')}>¿Cómo te calificas
                        en
                        ?</Button>
                    <TouchableOpacity onPress={() => {
                        HistoryPage()
                    }}>
                        <Text mb={3} size={'sm'} color={'red.400'}>Registros hasta el momento
                            ({feelings ? feelings.length : 0})</Text>
                    </TouchableOpacity>
                    <Button colorScheme={'red'} onPress={() => navigation.navigate('Emotions')}>Ruleta de
                        emociones</Button>
                    <Button colorScheme={'red'} mt={3} onPress={() => {
                        if (groupDuck.groups.length > 0) {
                            navigation.navigate('GroupsStartScreen')
                        } else {
                            navigation.navigate('GroupsScreen')
                        }

                    }}>Mis
                        grupos</Button>
                    <Button mt={3} colorScheme={'red'} onPress={() => _logOut()}>Cerrar Sesión</Button>
                </VStack>
            </HStack>
        </Box>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        groupDuck: state.groupDuck
    }
}

export default connect(mapState, {logOutAction, getMyGroups})(HomeScreen);