import React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from "../screens/Security/LoginScreen";
import RegisterScreen from "../screens/Security/RegisterScreen";
import {Icon} from "native-base";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../utils/Colors";
import VerificationCodeScreen from "../screens/Security/VerificationCodeScreen";
import PhoneScreen from "../screens/Security/PhoneScreen";
import SuccessScreen from "../screens/Security/SuccessScreen";

const Stack = createStackNavigator();

const StackAuth = ({}) => {

    return (
        <Stack.Navigator
            mode={'card'}
            backBehavior={'history'}
            screenOptions={({navigation, route}) => ({
                drawerPosition: 'right',
                headerLeft: () => {

                    return (
                        <TouchableOpacity onPress={async () => {
                            navigation.goBack(0)
                        }} style={{
                            width: 50,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            marginLeft: 10
                        }}>
                            <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.red}/>

                        </TouchableOpacity>
                    )
                },
                headerStyle: {backgroundColor: Colors.white},
                headerTitleAlign: 'center',
                headerTitleStyle: {color: 'black'},
                // headerTitle: () => {
                //     return (
                //         <View flex={1}>
                //
                //         </View>
                //     )
                //
                // },
                // headerRight: () => (
                //     <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{
                //         width: 50,
                //         height: '100%',
                //         alignItems: 'center',
                //         justifyContent: 'center',
                //         marginRight: 5
                //     }}>
                //         {/*<Image source={menuImage} resizeMode={'contain'} width={30} height={30}*/}
                //         {/*       style={{tintColor: Colors.gray}}/>*/}
                //         <Icon as={MaterialIcons} color={Colors.red} name={'menu'}></Icon>
                //     </TouchableOpacity>
                // ),
            })}>
            {/*<Stack.Screen name="RotateCustom" options={{gestureEnabled: false, headerShown: false}}*/}
            {/*              component={RotateCustom}/>*/}

            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="PhoneScreen" component={PhoneScreen}/>
            <Stack.Screen name="VerificationCodeScreen" component={VerificationCodeScreen}/>
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{headerShown: false}}/>

        </Stack.Navigator>
    );

}


export default StackAuth;
