import React from 'react';
import {ImageBackground} from "react-native";
import {Button, Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";
import bgIntro from "../../assets/bgIntro.png";
import {connect} from "react-redux";
import {loginEmail} from "../../redux/ducks/authDuck";
import {Colors} from "../../utils/Colors";

const SuccessScreen = ({navigation, authDuck, loginEmail}) => {

    const loginAutomatic = async () => {
        //console.log(authDuck);
        try {
            const res = await loginEmail(authDuck.user.email,authDuck.provitionalData.password)
             console.log(res.data)
        } catch (e) {
            console.log('loginAutomatic error =>',e.toString())
            navigation.navigate('LoginScreen')

        }
    }

    return (
        <ImageBackground source={bgIntro} style={{flex: 1}} resizeMode={'cover'}>
            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                <Image source={logoSmall} alt="img"></Image>
            </View>
            <View flex={0.5}>
                <Text color={'white'} size={'lg'} textAlign={'center'} px={4}>Registro realizado exitosamente.</Text>
            </View>
            <View flex={0.5} mx={20}>
                <Button backgroundColor={Colors.yellowV2}
                        onPress={() => loginAutomatic()}>
                    Iniciar
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