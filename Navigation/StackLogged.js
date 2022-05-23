import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import DrawerConfig from "./DrawerConfig";

const Stack = createStackNavigator();

const StackLogged = ({}) => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>

            <Stack.Screen name="DrawerNavigator" component={DrawerConfig}/>

        </Stack.Navigator>
    );

}


export default StackLogged;
