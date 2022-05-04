import React from "react";

import {NavigationContainer} from "@react-navigation/native";

import {createStackNavigator} from "@react-navigation/stack";
import StackAuth from "./StackAuth";

const Stack = createStackNavigator();

const NavigationContainerConfig = () => {
    //const status = useSelector(state => state.accountDuck.userId);
    return (
        <NavigationContainer>
            <StackAuth/>
            {/*<StackLogged />*/}
        </NavigationContainer>

    )
}

export default NavigationContainerConfig;