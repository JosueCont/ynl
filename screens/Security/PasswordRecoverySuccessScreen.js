import React from 'react';
import {ImageBackground} from "react-native";
import {Button, Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";
import bgIntro from "../../assets/bgIntro.png";
import {connect} from "react-redux";
import {t} from 'i18n-js'
import {loginEmail} from "../../redux/ducks/authDuck";
import {Colors} from "../../utils/Colors";

const SuccessScreen = ({navigation, authDuck, loginEmail}) => {


    return (
        <ImageBackground source={bgIntro} style={{flex: 1}} resizeMode={'cover'}>
            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                <Image source={logoSmall} alt="img"></Image>
            </View>
            <View flex={0.5}>
                <Text color={'white'} textAlign={'center'} px={4} fontSize={20}>
                    {t('email_send')} {'\n'}
                    {t('login_message_recover_password')}
                </Text>
            </View>
            <View flex={0.5} mx={20}>
                <Button backgroundColor={Colors.yellowV2} onPress={() => navigation.navigate('LoginScreen')}>
                    {t('ok')}
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