import React from "react";

import {NavigationContainer} from "@react-navigation/native";

import {createStackNavigator} from "@react-navigation/stack";
import StackAuth from "./StackAuth";
import {useSelector} from "react-redux";
import DrawerConfig from "./DrawerConfig";
import DrawerConfigIntro from "./DrawerConfigIntro";

const Stack = createStackNavigator();

const NavigationContainerConfig = ({authDuck, introStatus}) => {
    const status = useSelector(state => state.authDuck.isLogged);

    console.log(authDuck, status, typeof introStatus)

    return (
        <NavigationContainer>
            {
                (status && introStatus === 0) ? <DrawerConfigIntro/> : !status ? <StackAuth/> : <DrawerConfig/>
            }
        </NavigationContainer>

    )
}


export default NavigationContainerConfig;