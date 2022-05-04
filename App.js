import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {theme} from "./theme";
import {SSRProvider} from '@react-aria/ssr';
import {createStackNavigator} from '@react-navigation/stack';

import {Provider} from "react-redux";
import generateStore from './redux/store';

import NavigationContainerConfig from "./Navigation/NavigationContainerConfig";


const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const store = generateStore();

export default function App() {
    return (
        <SSRProvider>
            <Provider store={store}>
                <NativeBaseProvider theme={theme}>
                    <NavigationContainerConfig/>
                </NativeBaseProvider>
            </Provider>
        </SSRProvider>
    );
}


const styles = StyleSheet.create({
    container: {}
});
