import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {NativeBaseProvider} from 'native-base';
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
import MyGroupsScreen from "./screens/Groups/MyGroupsScreen";
import AddMemberScreen from "./screens/Groups/AddMemberScreen";
import ProfileScreen from "./screens/ProfileScreen";
import IntroScreen from "./screens/IntroScreen";


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
                    <Stack.Screen name="Home" options={{headerShown: false, title: ''}} component={HomeScreen}/>
                    <Stack.Screen name="Register" component={RegisterScreen}/>
                    <Stack.Screen name="YourFeel" options={{gestureEnabled: false}} component={YourFeelScreen}/>
                    <Stack.Screen name="HistoryList" options={{gestureEnabled: false}} component={HistoryListScreen}/>
                    <Stack.Screen name="Emotions" options={{gestureEnabled: false, title: 'Emociones'}}
                                  component={EmotionsPage}/>
                    <Stack.Screen name="EmotionModal" options={{gestureEnabled: false, title: ''}}
                                  component={EmotionModal}/>
                    <Stack.Screen name="MyGroups" options={{gestureEnabled: false, title: 'Mis grupos'}}
                                  component={MyGroupsScreen}/>
                    <Stack.Screen name="AddMemberScreen"
                                  options={{gestureEnabled: false, title: 'Añadir miembro al grupo'}}
                                  component={AddMemberScreen}/>
                    <Stack.Screen name="ProfileScreen" options={{gestureEnabled: false}} component={ProfileScreen}/>
                    <Stack.Screen name="IntroScreen" options={{gestureEnabled: false}} component={IntroScreen}/>

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
