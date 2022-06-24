import React from "react";
import {ImageBackground} from "react-native";
import bgIntro2 from '../../assets/bgIntro2.png';
import {Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";

const Intro2Screen = () => {
    return (
        <View flex={1} style={{backgroundColor: '#FD5902'}}>
            <ImageBackground source={bgIntro2} style={{flex: 1}} resizeMode={'contain'}>
                <View flex={1} alignItems={'center'} justifyContent={'flex-end'}>
                    <Image source={logoSmall} alt="img"></Image>
                </View>
                <View flex={1}>
                    <Text color={'white'} textAlign={'center'} px={4} mt={4}>Podrás día a día consultar tu avance
                        personal</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Intro2Screen;