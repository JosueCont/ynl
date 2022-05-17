import React from 'react';
import {ImageBackground} from "react-native";
import {Button, Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";
import bgIntro from "../../assets/bgIntro.png";

const SuccessScreen = ({navigation}) => {
    return (
        <ImageBackground source={bgIntro} style={{flex: 1}} resizeMode={'cover'}>
            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                <Image source={logoSmall}></Image>
            </View>
            <View flex={0.5}>
                <Text color={'white'} textAlign={'center'} px={4}>Registro realizado exitosamente.</Text>
            </View>
            <View flex={0.5} mx={20}>
                <Button colorScheme="orange" onPress={() => navigation.navigate('VerificationCodeScreen')}>
                    Iniciar
                </Button>
            </View>
        </ImageBackground>
    )
}

export default SuccessScreen;