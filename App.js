import React, {useLayoutEffect, useState} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {NativeBaseProvider, View} from 'native-base';
import {theme} from "./theme";
import {SSRProvider} from '@react-aria/ssr';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from "react-redux";
import generateStore from './redux/store';

import NavigationContainerConfig from "./Navigation/NavigationContainerConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Colors} from "./utils/Colors";


const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const store = generateStore();

export default function App() {

    const [introStatus, setIntroStatus] = useState(null);
    const [ready, setReady] = useState(false);

    useLayoutEffect(() => {
        getIntroStatus()
    }, [introStatus])

    const getIntroStatus = async () => {
        try {
            let intro = await AsyncStorage.getItem('@intro');
            if (!intro) {
                intro = 0;
            }
            console.log(intro, 33)

            setIntroStatus(parseInt(intro))
            setReady(true)
        } catch (e) {
            console.log(e);
        }
    }


    if (ready) {
        return (
            <SSRProvider>
                <Provider store={store}>
                    <NativeBaseProvider theme={theme}>
                        <NavigationContainerConfig introStatus={introStatus}/>
                    </NativeBaseProvider>
                </Provider>
            </SSRProvider>
        );
    } else {
        return (
            <SSRProvider>
                <Provider store={store}>
                    <NativeBaseProvider theme={theme}>
                        <View flex={1} bgColor={Colors.red}>

                        </View>
                    </NativeBaseProvider>
                </Provider>
            </SSRProvider>
        )
    }

}


const styles = StyleSheet.create({
    container: {}
});
