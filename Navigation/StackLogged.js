import React, {useEffect, useState} from "react";
import {createStackNavigator} from '@react-navigation/stack';
import DrawerConfig from "./DrawerConfig";
import IntroScreen from "../screens/IntroScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const StackLogged = ({}) => {
    const [introStatus, setIntroStatus] = useState(null);

    useEffect(() => {
        getIntroStatus()
    }, [])

    const getIntroStatus = async () => {
        try {
            let intro = await AsyncStorage.getItem('@intro');
            console.log(intro)
            if (parseInt(intro) === 1) {
                setIntroStatus(parseInt(intro))
            } else {
                setIntroStatus(parseInt(intro))
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
            <Stack.Screen name="IntroScreen" component={IntroScreen}/>
            <Stack.Screen name="DrawerNavigator" component={DrawerConfig}/>

        </Stack.Navigator>
    );

}


export default StackLogged;
