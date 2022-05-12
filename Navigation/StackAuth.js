import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../screens/Security/LoginScreen";
import RegisterScreen from "../screens/Security/RegisterScreen";

const Stack = createStackNavigator();

const StackAuth = ({}) => {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {/*<Stack.Screen name="RotateCustom" options={{gestureEnabled: false, headerShown: false}}*/}
            {/*              component={RotateCustom}/>*/}

            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    );

}


export default StackAuth;
