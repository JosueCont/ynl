import React from "react";
import {ImageBackground, SafeAreaView} from "react-native";
import bgIntro2 from '../../assets/bgIntro2.png';
import {Image, Text, View} from "native-base";
import logoSmall from "../../assets/logoSmall.png";
import {Colors} from "../../utils/Colors";

const Intro2Screen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.gray}}>
            <View flex={1} mx={4} mb={10}>
                <ImageBackground source={bgIntro2} style={{flex: 1}} resizeMode={'contain'}>
                    <View flex={1} alignItems={'center'} justifyContent={'center'}>
                        <Image source={logoSmall}></Image>
                    </View>
                    <View flex={1}>
                        <Text color={'white'} textAlign={'center'} px={4}>Podrás día a día consultar tu avance
                            personal</Text>
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default Intro2Screen;