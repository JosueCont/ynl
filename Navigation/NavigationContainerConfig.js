import React, {useEffect, useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import StackAuth from "./StackAuth";
import {useSelector} from "react-redux";
import DrawerConfig from "./DrawerConfig";
import StackLogged from "./StackLogged";
import {Spinner, View} from "native-base";
import {Colors} from "../utils/Colors";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();

const NavigationContainerConfig = ({introStatus}) => {
    const status = useSelector(state => state.authDuck.isLogged);
    const [loggedIn, setLoggedIn] = useState(null)
    const [loading, setLoading] = useState(true)


    console.log(typeof loggedIn, 19)
    useEffect(() => {

        Notifications.setBadgeCountAsync(0);

        if (status) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
        setTimeout(() => {
            setLoading(false)
        }, 300)

    }, [status])


    return (
        <NavigationContainer>
            {
                loading === true ?
                    <View flex={1} bgColor={Colors.red} alignItems={'center'} justifyContent={'center'}>
                        <Spinner size={'sm'} color={'white'}></Spinner>
                    </View> :
                    (loading === false && loggedIn === true) ?
                        <StackLogged/> :
                        <StackAuth/>

            }

        </NavigationContainer>

    )
}


export default NavigationContainerConfig;