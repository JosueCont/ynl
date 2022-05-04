import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import AppIntroSlider from 'react-native-app-intro-slider';
import {Icon} from 'native-base';
import {styles} from './Intro/IntroStyleSheet';
import OneScreen from "./Intro/OneScreen";
import TwoScreen from "./Intro/TwoScreen";
import ThreeScreen from "./Intro/ThreeScreen";
import FourScreen from "./Intro/FourScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        navigation.navigate('PreLogin')
    }

    const introStatus = async () => {
        try {
            let intro = await AsyncStorage.getItem('@intro');
            if (intro) {
                navigation.navigate('PreLogin');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const renderItem = ({item, index}) => {
        if (item.screen === 0) {
            return (
                <OneScreen></OneScreen>
            );
        }
        if (item.screen === 1) {
            return (
                <TwoScreen></TwoScreen>
            );
        }
        if (item.screen === 2) {
            return (
                <ThreeScreen></ThreeScreen>
            );
        }
        if (item.screen === 3) {
            return (
                <FourScreen navigation={navigation}></FourScreen>
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
                    <Icon
                        name="done"
                        type={'MaterialIcons'}
                        style={{color: 'white'}}
                        size={24}
                    />
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
            dotStyle={{backgroundColor: 'gray'}}
            showDoneButton={true}
            showNextButton={false}
            keyExtractor={(item, index) => index.toString()}
        />
    )
}


export default IntroScreen;