import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import DrawerConfig from "./DrawerConfig";
import ProfileScreen from "../screens/ProfileScreen";
import { Icon, View, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import { Colors } from "../utils/Colors";
import {MaterialIcons} from "@expo/vector-icons";
import ProfilePersonScreen from "../screens/ProfilePersonScreen";
import { getFontSize } from "../utils/functions";


const Stack = createStackNavigator();

const StackLogged = ({}) => {

    return (
        <Stack.Navigator screenOptions={({navigation, route}) => ({
            headerShown: route.name.includes('Profile') || route.name.includes('ProfilePerson'),
            headerTitle:()=>{
                if(route.name.includes('ProfilePerson')){
                    return(
                        <View flexDirection={'row'} >
                            {route?.params?.image !=undefined ? (
                                <Image w={25} h={25} source={{uri: route.params.image}}
                                    style={[
                                        {resizeMode: 'cover', }]}
                                    borderRadius={12.5}  alt="img"/>
                            ):(
                                <Image w={25} h={25} source={require('../assets/profile-default.jpg')}
                                    style={[
                                        {resizeMode: 'cover', }]}
                                    borderRadius={12.5}  alt="img"/>
                            )}
                            <Text fontSize={getFontSize(19)} style={{fontWeight:'900', marginLeft:5}}>{route.params.name}</Text>
                        </View>
                    )
                }
            },
            headerLeft: () => {
                if(route.name.includes('Profile')){
                    return(
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                width: 50,
                                height: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 5,
                                marginLeft: 10,
                              }}>
                            <Icon
                                as={MaterialIcons}
                                name={"arrow-back-ios"}
                                color={Colors.red}
                                size={"xl"}
                            />
                        </TouchableOpacity>
                    )
                }else if(route.name.includes('ProfilePerson')){
                    console.log('params',route)
                    return(
                        <View flexDirection={'row'}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{
                                    width: 50,
                                    height: "100%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 5,
                                    marginLeft: 10,
                                    marginRight:10
                                  }}>
                                <Icon
                                    as={MaterialIcons}
                                    name={"arrow-back-ios"}
                                    color={Colors.red}
                                    size={"xl"}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }
            }
        })}>

            <Stack.Screen name="DrawerNavigator" component={DrawerConfig} />
            <Stack.Screen name='Profile' component={ProfileScreen} options={{ title: "Perfil" }}/>
            <Stack.Screen name="ProfilePerson" component={ProfilePersonScreen} />

        </Stack.Navigator>
    );

}


export default StackLogged;
