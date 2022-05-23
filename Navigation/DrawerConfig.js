import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";
import YourFeelScreen from "../screens/YourFeelScreen";


import {connect} from "react-redux";
import {Icon, View} from "native-base";
import {Colors} from "../utils/Colors";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import GroupsScreen from "../screens/GroupsScreen";
import GroupsMembersAdd from "../screens/GroupsMembersAdd";
import GroupsStartScreen from "../screens/GroupsStartScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import EmotionsPage from "../screens/EmotionsPage";
import GroupsMembersScreen from "../screens/GroupsMembersScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EmotionModal from "../screens/EmotionModal";
import RotateCustomScreen from "../screens/RotateCustomScreen";
import IntroScreen from "../screens/IntroScreen";

const Drawer = createDrawerNavigator();

const DrawerConfig = ({accountDuck, authDuck}) => {


    return (
        <Drawer.Navigator
            backBehavior={'history'}
            screenOptions={({navigation, route}) => ({
                drawerPosition: 'right',
                headerLeft: () => {
                    if (route.name.includes('HomeScreen')) {
                        return (
                            <View/>
                        )
                    } else {
                        return (
                            <TouchableOpacity onPress={async () => {

                                if (route.name.includes('GroupsScreen')) {
                                    navigation.navigate('HomeScreen')
                                } else {
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
                    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{
                        width: 50,
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5
                    }}>
                        {/*<Image source={menuImage} resizeMode={'contain'} width={30} height={30}*/}
                        {/*       style={{tintColor: Colors.gray}}/>*/}
                        <Icon as={MaterialIcons} color={Colors.red} name={'menu'} size={'xl'}></Icon>
                    </TouchableOpacity>
                ),
                swipeEnabled: false
            })}
            drawerContent={(props) => <CustomDrawerContent  {...props} />}>
            {
                authDuck.emotionStatus === 0 &&
                <Drawer.Screen name={'EmotionsPage'} component={EmotionsPage} options={{title: ''}}/>


            }

            <Drawer.Screen name="IntroScreen" component={IntroScreen} options={{headerShown: false}}/>

            <Drawer.Screen name={'HomeScreen'} component={HomeScreen} options={{title: ''}}/>
            <Drawer.Screen name={'YourFeelScreen'} component={YourFeelScreen}/>
            <Drawer.Screen name={'GroupsScreen'} component={GroupsScreen} options={{title: 'Mis grupos'}}/>
            <Drawer.Screen name={'GroupsStartScreen'} component={GroupsStartScreen}/>
            <Drawer.Screen name={'GroupsMembersAdd'} component={GroupsMembersAdd}/>
            <Drawer.Screen name={'GroupsMembersScreen'} component={GroupsMembersScreen} options={{title: 'Miembros'}}/>
            <Drawer.Screen name={'StatisticsScreen'} component={StatisticsScreen} options={{title: 'Estadísticas'}}/>
            <Drawer.Screen name={'EmotionsPageV2'} component={EmotionsPage} options={{title: ''}}/>
            <Drawer.Screen name={'EmotionModal'} component={EmotionModal} options={{title: ''}}/>
            <Drawer.Screen name={'ProfileScreen'} component={ProfileScreen} options={{title: 'Perfil'}}/>
            <Drawer.Screen name={'RotateCustomScreen'} component={RotateCustomScreen} options={{title: ''}}/>

        </Drawer.Navigator>
    );
}

const mapState = (state) => {
    return {
        accountDuck: state.accountDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState)(DrawerConfig);