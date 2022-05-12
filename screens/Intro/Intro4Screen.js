import React from "react";
import {ImageBackground, SafeAreaView} from "react-native";
import bgIntro4 from '../../assets/bgIntro4.png';
import {Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";
import {Colors} from "../../utils/Colors";

const Intro4Screen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.gray}}>
            <View flex={1} mx={2} my={6}>
                <ImageBackground source={bgIntro4} style={{flex: 1}} resizeMode={'contain'}>
                    <View flex={1} alignItems={'center'} justifyContent={'center'}>
                        <Image source={logoSmall}></Image>
                    </View>
                    <View flex={1}>

                        <Text color={'white'} textAlign={'center'} px={4}>Descubre poco a poco nuevas herramientas que
                            te ayudarán en tu
                            desarrollo</Text>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default Intro4Screen;