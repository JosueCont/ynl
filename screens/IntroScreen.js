import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import AppIntroSlider from 'react-native-app-intro-slider';
import {Icon, Text} from 'native-base';
import {styles} from './Intro/IntroStyleSheet';
import Intro1Screen from "./Intro/Intro1Screen";
import Intro2Screen from "./Intro/Intro2Screen";
import Intro3Screen from "./Intro/Intro3Screen";
import Intro4Screen from "./Intro/Intro4Screen";
import {Colors} from "../utils/Colors";
import {connect} from "react-redux";

const IntroScreen = ({navigation, authDuck}) => {

    const [slides, setSlides] = useState([{screen: 0}, {screen: 1}, {screen: 2}, {screen: 3}])


    const nextScreen = async () => {
        try {
            //if (authDuck.emotionStatus === 0 || authDuck.emotionStatus === undefined) {
            //    navigation.navigate('RouletteStep1Screen', {from: 'intro'}) // cambiarla para que no mande directo a la ruleta
            //} else {
                navigation.navigate('HomeScreen')
            //}
        } catch (e) {
            console.log(e.toString())
            console.log("IntroScreen nextScreen error =>",e.toString())
        }
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

const mapState = (state) => {
    return {
        accountDuck: state.accountDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState)(IntroScreen);