import React from 'react';
import {StyleSheet, View, LogBox} from 'react-native';
import {NativeBaseProvider, Box, Text} from 'native-base';
import {theme} from "./theme";
import {SSRProvider} from '@react-aria/ssr';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import YourFeelScreen from "./screens/YourFeelScreen";
import HistoryListScreen from "./screens/HistoryList";
import {Provider} from "react-redux";
import generateStore from './redux/store';
import LoginScreen from "./screens/Security/LoginScreen";
import RegisterScreen from "./screens/Security/RegisterScreen";
import EmotionsPage from "./screens/EmotionsPage";
import EmotionModal from "./screens/EmotionModal";
import MyGroupsScreen from "./screens/MyGroupsScreen";


const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const store = generateStore();

export default function App() {
    return (

        <SSRProvider>
        <Provider store={store}>
        <NativeBaseProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Home" options={{headerShown: false,title:''}} component={HomeScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                    <Stack.Screen name="YourFeel" options={{gestureEnabled:false}} component={YourFeelScreen}/>
                    <Stack.Screen name="HistoryList" options={{gestureEnabled:false}} component={HistoryListScreen}/>
                    <Stack.Screen name="Emotions" options={{gestureEnabled:false,title:'Emociones'}} component={EmotionsPage}/>
                    <Stack.Screen name="EmotionModal" options={{gestureEnabled:false,title:''}} component={EmotionModal}/>
                    <Stack.Screen name="MyGroups" options={{gestureEnabled:false,title:'Mis grupos'}} component={MyGroupsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </NativeBaseProvider>
        </Provider>
        </SSRProvider>
    );
}


const styles = StyleSheet.create({
    container: {}
});
