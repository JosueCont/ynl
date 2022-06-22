import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";
import YourFeelScreen from "../screens/YourFeelScreen";
import {Icon, View} from "native-base";
import {Colors} from "../utils/Colors";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import GroupsScreen from "../screens/GroupsScreen";
import GroupsMembersAdd from "../screens/GroupsMembersAdd";
import GroupsStartScreen from "../screens/GroupsStartScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import GroupsDetailsScreen from "../screens/GroupsDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import IntroScreen from "../screens/IntroScreen";
import RouletteStep1Screen from "../screens/RouletteStep1Screen";
import RouletteStep2Screen from "../screens/RouletteStep2Screen";
import RouletteStep3Screen from "../screens/RouletteStep3Screen";
import RouletteStep4Screen from "../screens/RouletteStep4Screen";
import HistoryFeelingScreen from "../screens/HistoryFeelingScreen";
import HistoryFeelingScreenDetail from "../screens/HistoryFeelingScreenDetail";

const Drawer = createDrawerNavigator();

const DrawerConfig = () => {

    return (
        <Drawer.Navigator
            useLegacyImplementation={true}
            backBehavior={'history'}
            screenOptions={({navigation, route}) => ({
                drawerPosition: 'right',
                headerLeft: () => {
                    // console.log(route.params)
                    if (route.name.includes('HomeScreen')) {
                        return (
                            <View/>
                        )
                    } else {
                        return (
                            <TouchableOpacity onPress={async () => {
                                try {
                                    if (route.name.includes('GroupsScreen')) {
                                        navigation.navigate('HomeScreen')
                                    } else if (route.params.from === 'intro') {
                                        navigation.navigate('HomeScreen')
                                    } else {
                                        navigation.goBack(0)
                                    }
                                } catch (e) {
                                    console.log('DrawerConfig error => ',e.toString())
                                    navigation.goBack(0)
                                }


                            }} style={{
                                width: 50,
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 5,
                                marginLeft: 10
                            }}>
                                <Icon as={MaterialIcons} name={'arrow-back-ios'} color={Colors.red} size={'xl'}/>

                            </TouchableOpacity>
                        )
                    }
                },
                headerStyle: {backgroundColor: Colors.white},
                headerTitleAlign: 'center',
                headerTitleStyle: {color: 'black'},
                headerTitle: () => {
                    return (
                        <View flex={1}>

                        </View>
                    )

                },
                headerRight: () => (
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{
                        width: 50,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5
                    }}>
                        <Icon as={MaterialIcons} color={Colors.red} name={'menu'} size={'xl'}></Icon>
                    </TouchableOpacity>
                ),
                swipeEnabled: false
            })}
            drawerContent={(props) => <CustomDrawerContent  {...props} />}>

            <Drawer.Screen name={'HomeScreen'} component={HomeScreen} options={{title: ''}}/>
            <Drawer.Screen name={'YourFeelScreen'} component={YourFeelScreen}/>
            <Drawer.Screen name={'GroupsScreen'} component={GroupsScreen} options={{title: 'Mis grupos'}}/>
            <Drawer.Screen name={'GroupsStartScreen'} component={GroupsStartScreen}/>
            <Drawer.Screen name={'GroupsMembersAdd'} component={GroupsMembersAdd}/>
            <Drawer.Screen name={'GroupsDetailsScreen'} component={GroupsDetailsScreen} options={{title: 'Miembros'}}/>
            <Drawer.Screen name={'StatisticsScreen'} component={StatisticsScreen} options={{title: 'Estadísticas'}}/>
            <Drawer.Screen name={'ProfileScreen'} component={ProfileScreen} options={{title: 'Perfil'}}/>
            <Drawer.Screen name={'HistoryFeelingScreen'} component={HistoryFeelingScreen}
                           options={{title: 'Historial'}}/>
            <Drawer.Screen name={'HistoryFeelingScreenDetail'} component={HistoryFeelingScreenDetail}
                           options={{title: 'Historial'}}/>

            <Drawer.Screen name={'RouletteStep1Screen'} component={RouletteStep1Screen} options={{title: ''}}/>
            <Drawer.Screen name={'RouletteStep2Screen'} component={RouletteStep2Screen} options={{title: ''}}/>
            <Drawer.Screen name={'RouletteStep3Screen'} component={RouletteStep3Screen} options={{title: ''}}/>
            <Drawer.Screen name={'RouletteStep4Screen'} component={RouletteStep4Screen} options={{title: ''}}/>
            <Drawer.Screen name="IntroScreen" component={IntroScreen} options={{headerShown: false}}/>

        </Drawer.Navigator>
    );
}

export default DrawerConfig;