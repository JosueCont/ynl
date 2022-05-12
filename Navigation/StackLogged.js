import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import DrawerConfig from "./DrawerConfig";
import IntroScreen from "../screens/IntroScreen";


const Stack = createStackNavigator();

const StackLogged = ({}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="IntroScreen" component={IntroScreen}/>
            <Stack.Screen name="DrawerNavigator" component={DrawerConfig}/>
        </Stack.Navigator>
    );

}


export default StackLogged;
