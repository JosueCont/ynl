import React, {useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, TouchableOpacity, View} from 'react-native';
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
import {connect} from "react-redux";

const IntroScreen = ({navigation, authDuck}) => {

    const {width, height} = Dimensions.get('window');

    const [slides, setSlides] = useState([{screen: 0}, {screen: 1}, {screen: 2}, {screen: 3}])

    useEffect(() => {
        introStatus();
    }, [])

    const nextScreen = async () => {
        try {
            await AsyncStorage.setItem('@intro', '1');
            if (authDuck.emotionStatus === 0) {
                navigation.navigate('RouletteStep1Screen', {from: 'intro'})
            } else {
                navigation.navigate('HomeScreen')
            }

        } catch (e) {
            console.log(e)
        }
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
            <TouchableOpacity style={styles.buttonCircle} onPress={() => nextScreen()}>
                <Icon as={MaterialIcons} name="done" size={5} color={'white'}/>
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.gray}}>
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
        </SafeAreaView>
    )
}

const mapState = (state) => {
    return {
        accountDuck: state.accountDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState)(IntroScreen);