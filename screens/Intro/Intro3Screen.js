import React from "react";
import {ImageBackground} from "react-native";
import bgIntro3 from '../../assets/bgIntro3.jpg';
import {Image, Text, View} from "native-base";
import {t} from 'i18n-js';
import logoSmall from "../../assets/logoSmall.png";

const Intro3Screen = () => {
    return (

        <View flex={1} style={{backgroundColor: '#FD5902'}}>
            <ImageBackground source={bgIntro3} style={{flex: 1}} resizeMode={'contain'}>
                <View flex={1} alignItems={'center'} justifyContent={'flex-end'}>
                    <Image source={logoSmall} alt="img"></Image>
                </View>
                <View flex={1}>
                    <Text color={'white'} size={'lg'} textAlign={'center'} px={4} mt={4}>{t('intro3_text')}</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Intro3Screen;