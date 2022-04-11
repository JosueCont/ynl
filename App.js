import React from 'react';
import {StyleSheet, View, LogBox} from 'react-native';
import {NativeBaseProvider, Box, Text} from 'native-base';
import {theme} from "./theme";
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import YourFeelScreen from "./screens/YourFeelScreen";
import {Provider} from "react-redux";
import generateStore from './redux/store';
import LoginScreen from "./screens/Security/LoginScreen";
import {initFirebase} from "./utils/firebase";
import RegisterScreen from "./screens/Security/RegisterScreen";

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const store = generateStore();

export default function App() {
    return (
        <Provider store={store}>
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                    <Stack.Screen name="YourFeel" component={YourFeelScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
        </Provider>
    );
}


const styles = StyleSheet.create({
    container: {}
});
