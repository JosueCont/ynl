import React from "react";

import {NavigationContainer} from "@react-navigation/native";

import {createStackNavigator} from "@react-navigation/stack";
import StackAuth from "./StackAuth";
import {useSelector} from "react-redux";
import DrawerConfig from "./DrawerConfig";

const Stack = createStackNavigator();

const NavigationContainerConfig = ({introStatus}) => {
    const status = useSelector(state => state.authDuck.isLogged);

    return (
        <NavigationContainer>
            {
                status ? <DrawerConfig/> : <StackAuth/>
            }
        </NavigationContainer>

    )
}


export default NavigationContainerConfig;