import React from "react";
import {ImageBackground, SafeAreaView} from "react-native";
import bgIntro3 from '../../assets/bgIntro3.png';
import {Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";
import {Colors} from "../../utils/Colors";

const Intro3Screen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.gray}}>
            <View flex={1} mx={4} mb={10}>
                <ImageBackground source={bgIntro3} style={{flex: 1}} resizeMode={'contain'}>
                    <View flex={1} alignItems={'center'} justifyContent={'center'}>
                        <Image source={logoSmall}></Image>
                    </View>
                    <View flex={1}>
                        <Text color={'white'} textAlign={'center'} px={4}>Crea diferentes grupo y comparte con tus
                            amigos tu avance</Text>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default Intro3Screen;