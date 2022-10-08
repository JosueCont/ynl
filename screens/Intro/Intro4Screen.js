import React from "react";
import {ImageBackground} from "react-native";
import bgIntro4 from '../../assets/bgIntro4.jpg';
import {Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";

const Intro4Screen = () => {
    return (
        <View flex={1} style={{backgroundColor: '#FD5902'}}>
            <ImageBackground source={bgIntro4} style={{flex: 1}} resizeMode={'contain'}>
                <View flex={1} alignItems={'center'} justifyContent={'flex-end'}>
                    <Image source={logoSmall} alt="img"></Image>
                </View>
                <View flex={1}>

                    <Text color={'white'} size={'lg'} textAlign={'center'} px={4} mt={4}>Descubre poco a poco nuevas herramientas
                        que
                        te ayudarán en tu
                        desarrollo</Text>
                </View>
                </ImageBackground>
            </View>
    )
}

export default Intro4Screen;