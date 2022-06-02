import React from "react";
import {ImageBackground} from "react-native";
import bgIntro3 from '../../assets/bgIntro3.png';
import {Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";

const Intro3Screen = () => {
    return (

        <View flex={1}>
            <ImageBackground source={bgIntro3} style={{flex: 1}} resizeMode={'contain'}>
                <View flex={1} alignItems={'center'} justifyContent={'flex-end'}>
                    <Image source={logoSmall} alt="img"></Image>
                </View>
                <View flex={1}>
                    <Text color={'white'} textAlign={'center'} px={4} mt={4}>Crea diferentes grupos y comparte con tus
                        amigos tu avance</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Intro3Screen;