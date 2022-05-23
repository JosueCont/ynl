import React, {useLayoutEffect, useState} from "react";

import {NavigationContainer} from "@react-navigation/native";

import {createStackNavigator} from "@react-navigation/stack";
import StackAuth from "./StackAuth";
import {connect, useSelector} from "react-redux";
import DrawerConfig from "./DrawerConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const NavigationContainerConfig = ({authDuck}) => {
    const status = useSelector(state => state.authDuck.isLogged);


    const [introStatus, setIntroStatus] = useState(null);

    useLayoutEffect(() => {
        getIntroStatus()
        console.log(authDuck)
    }, [])

    const getIntroStatus = async () => {
        try {
            let intro = await AsyncStorage.getItem('@intro');
            if (!intro) {
                intro = 0;
            }
            console.log(intro)

            setIntroStatus(parseInt(intro))
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <NavigationContainer>
            {
                status ?
                    <DrawerConfig introStatus={introStatus} emotionStatus={authDuck.emotionStatus}/> :
                    <StackAuth/>
            }
        </NavigationContainer>

    )
}

const mapState = (state) => {
    return {
        accountDuck: state.accountDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState)(NavigationContainerConfig);