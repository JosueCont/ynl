import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import AppIntroSlider from 'react-native-app-intro-slider';
import {Icon} from 'native-base';
import {styles} from './Intro/IntroStyleSheet';
import Intro1Screen from "./Intro/Intro1Screen";
import Intro2Screen from "./Intro/Intro2Screen";
import Intro3Screen from "./Intro/Intro3Screen";
import Intro4Screen from "./Intro/Intro4Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Colors} from "../utils/Colors";

const IntroScreen = ({navigation}) => {

    const {width, height} = Dimensions.get('window');

    const [slides, setSlides] = useState([{screen: 0}, {screen: 1}, {screen: 2}, {screen: 3}])

    useEffect(() => {
        introStatus();
    }, [])

    const nextScreen = async () => {
        try {
            await AsyncStorage.setItem('@intro', '1');
        } catch (e) {
            console.log(e)
        }
        navigation.navigate('LoginScreen')
    }

    const introStatus = async () => {
        // try {
        //     let intro = await AsyncStorage.getItem('@intro');
        //     if (intro) {
        //         navigation.navigate('PreLogin');
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }

    const renderItem = ({item, index}) => {
        if (item.screen === 0) {
            return (
                <Intro1Screen></Intro1Screen>
            );
        }
        if (item.screen === 1) {
            return (
                <Intro2Screen></Intro2Screen>
            );
        }
        if (item.screen === 2) {
            return (
                <Intro3Screen></Intro3Screen>
            );
        }
        if (item.screen === 3) {
            return (
                <Intro4Screen navigation={navigation}></Intro4Screen>
            );
        }

    };

    const renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <Ionicons
                    name="md-arrow-round-forward"
                    color="black"
                    size={24}
                />
            </View>
        );
    };

    const renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <TouchableOpacity onPress={() => nextScreen()}>
                    <Icon as={MaterialIcons} name="done" size={5} color={'white'}/>
                </TouchableOpacity>

            </View>
        );
    };


    return (
        <AppIntroSlider
            data={slides}
            renderItem={renderItem}
            renderDoneButton={renderDoneButton}
            renderNextButton={renderNextButton}
            dotStyle={{backgroundColor: Colors.gray, borderWidth: 1, borderColor: 'red'}}
            activeDotStyle={{backgroundColor: 'red', borderWidth: 1, borderColor: 'red'}}
            showDoneButton={true}
            showNextButton={false}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}


export default IntroScreen;