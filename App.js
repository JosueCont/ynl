import React from 'react';
import {LogBox, StyleSheet, Text as TextRN, TextInput} from 'react-native';
import {NativeBaseProvider, Text} from 'native-base';
import {theme} from "./theme";
import {SSRProvider} from '@react-aria/ssr';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from "react-redux";
import generateStore from './redux/store';
import NavigationContainerConfig from "./Navigation/NavigationContainerConfig";

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const store = generateStore();



if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;


if (TextRN.defaultProps == null) TextRN.defaultProps = {};
TextRN.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

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
