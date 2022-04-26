import React, {useEffect, useState} from "react";
import {Box, Text, VStack,HStack, Image, Slider, Icon, Button, Input} from "native-base";
import {Alert, ScrollView,ImageBackground} from "react-native";
import {connect} from "react-redux";
import logo from '../assets/logo.png'
import groupicon from '../assets/groupicon.png'
import backgroundGroup from '../assets/backGroups.png'
import ApiApp from "../utils/ApiApp";
import uuid from 'react-native-uuid';

const MyGroupsScreen = ({authDuck,navigation}) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(false)


    useEffect(()=>{
        if(authDuck.isLogged){
            setUser(authDuck.user)
        }
    },[authDuck])


    return (
        <Box flex={1} bg="#fff" alignItems="center">
            <ScrollView w={'100%'}>
                <HStack justifyContent={'center'} p={3}>
                    <Image size={'xs'} source={logo} />
                </HStack>
                <HStack justifyContent={'center'}  pl={7} pr={7}>
                    <VStack alignItems={'center'} mt={2} h={'600px'} w={'100%'}>
                        <ImageBackground  borderRadius={10} style={styles.image} source={backgroundGroup}>
                            <HStack w={'100%'} justifyContent={'center'}>
                                <VStack w={'100%'} justifyContent={'center'}>
                                    <Box alignItems={'center'} w={'100%'}>
                                        <Image  size={'md'} source={groupicon} />
                                        <Text textAlign={'center'} color={'white'} fontSize={30} w={'80%'} size={'md'}>Crea tu primer grupo</Text>
                                        <Input mx="3"  color={'gray.700'} backgroundColor={'white'} size={'lg'} placeholder="Nombre del grupo" w="80%" />
                                    </Box>
                                </VStack>
                            </HStack>
                            <HStack w={'100%'}>
                                <VStack w={'100%'}>
                                    <Button size="lg" colorScheme={'red'} m={3}>
                                        Registrarme
                                    </Button>
                                </VStack>

                            </HStack>
                        </ImageBackground>
                    </VStack>
                </HStack>
            </ScrollView>
        </Box>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}

const styles={
    image: {
        flex: 1,
        justifyContent: "center",
        height:'100%',
        width:'100%',
    },
}

export default connect(mapState)(MyGroupsScreen);