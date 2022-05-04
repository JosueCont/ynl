import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../screens/Security/LoginScreen";
import RegisterScreen from "../screens/Security/RegisterScreen";
import IntroScreen from "../screens/IntroScreen";

const Stack = createStackNavigator();

const StackAuth = ({}) => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="IntroScreen" options={{gestureEnabled: false, headerShown: false}}
                          component={IntroScreen}/>
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    );

}


export default StackAuth;
