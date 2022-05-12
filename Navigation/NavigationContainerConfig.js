import React from "react";

import {NavigationContainer} from "@react-navigation/native";

import {createStackNavigator} from "@react-navigation/stack";
import StackAuth from "./StackAuth";
import StackLogged from "./StackLogged";
import {useSelector} from "react-redux";

const Stack = createStackNavigator();

const NavigationContainerConfig = () => {
    const status = useSelector(state => state.authDuck.isLogged);
    return (
        <NavigationContainer>
            {
                status ?
                    <StackLogged/> :
                    <StackAuth/>
            }
        </NavigationContainer>

    )
}

export default NavigationContainerConfig;