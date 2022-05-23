import React from 'react';
import {ImageBackground} from "react-native";
import {Button, Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";
import bgIntro from "../../assets/bgIntro.png";
import {connect} from "react-redux";
import {loginEmail} from "../../redux/ducks/authDuck";

const SuccessScreen = ({navigation, authDuck, loginEmail}) => {


    return (
        <ImageBackground source={bgIntro} style={{flex: 1}} resizeMode={'cover'}>
            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                <Image source={logoSmall}></Image>
            </View>
            <View flex={0.5}>
                <Text color={'white'} textAlign={'center'} px={4} fontSize={20}>
                    Correo electrónico enviado.{'\n'}
                    Por favor sigue las instrucciones para poder recuperar tu contraseña.
                </Text>
            </View>
            <View flex={0.5} mx={20}>
                <Button colorScheme="orange" onPress={() => navigation.navigate('LoginScreen')}>
                    Entendido
                </Button>
            </View>
        </ImageBackground>
    )
}


const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}

export default connect(mapState, {loginEmail})(SuccessScreen);