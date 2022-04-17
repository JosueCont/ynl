import React, {useEffect, useState} from "react";
import {Box, Text, Button, VStack, HStack, Image} from "native-base";
import {connect} from "react-redux";
import {TouchableOpacity} from "react-native";
import productsDuck from "../redux/ducks/productsDuck";
import logo from '../assets/logo.png'

const HomeScreen = ({productsDuck,navigation}) => {

    const [feelings,setFeelings] = useState(null)

    useEffect(() => {

        getFeels();




    }, [])

    const getFeels=async ()=>{
        try{

        }catch (e){
        }



    }


    const logOut=async ()=>{
        navigation.navigate('Login')
    }

    const HistoryPage=()=>{
        navigation.navigate('HistoryList')
    }

    return (
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
            <HStack justifyContent={'center'} pt={5} pb={3}>
                <VStack>
                    <Image size={'md'} source={logo} />
                </VStack>
            </HStack>
            <HStack>
                <VStack>
                    <Text size={'lg'} color={'red.400'}>Bienvenido a YNL!</Text>
                    <Button  colorScheme={'red'} onPress={() => navigation.navigate('YourFeel')}>¿Cómo te calificas en ?</Button>
                    <TouchableOpacity onPress={()=>{HistoryPage()}}>
                        <Text mb={3} size={'sm'} color={'red.400'}>Registros hasta el momento ({feelings ? feelings.length : 0})</Text>
                    </TouchableOpacity>
                    <Button colorScheme={'red'} onPress={() => logOut()}>Cerrar Sesión</Button>
                </VStack>
            </HStack>


        </Box>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeScreen);