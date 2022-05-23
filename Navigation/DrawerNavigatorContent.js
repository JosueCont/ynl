import React from 'react';
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {ImageBackground, TouchableOpacity} from "react-native";
import sidebarImage from "../assets/sidebar.png";
import {Image, Text, View} from "native-base";
import logoSmall from "../assets/logoSmall.png";
import {logOutAction} from "../redux/ducks/authDuck";


const CustomDrawerContent = ({navigation, navigationDuck, accountDuck, logOutAction, ...props}) => {


    const logoutFunction = async () => {
        try {
            await logOutAction()
        } catch (ex) {
            console.log('e', ex)
        }
    }

    return (
        <DrawerContentScrollView
            bounces={false}
            {...props}
            nestedScrollEnabled={true}
            contentContainerStyle={{flex: 1}}
        >
            <ImageBackground source={sidebarImage} style={{flex: 1}}>
                <View flex={0.5} alignItems={'center'} justifyContent={'center'}>
                    <Image source={logoSmall}></Image>
                </View>
                <View flex={1} alignItems={'center'}>
                    <TouchableOpacity onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate('ProfileScreen')
                    }}>
                        <Text color={'white'} fontSize={20} my={2}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate('GroupsScreen')
                    }}>
                        <Text color={'white'} fontSize={20} my={2}>Mis grupos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.closeDrawer();
                        navigation.navigate('')
                    }}>
                        <Text color={'white'} fontSize={20} my={2}>Historial</Text>
                    </TouchableOpacity>
                </View>
                <View flex={0.5} alignItems={'center'}>
                    <TouchableOpacity onPress={() => logoutFunction()}>
                        <Text color={'white'} fontSize={14} style={{textDecorationLine: 'underline'}} my={2}>Cerrar
                            sesión</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        </DrawerContentScrollView>
    );
}


const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck,
        accountDuck: state.accountDuck
    }
}

export default connect(mapState, {logOutAction})(CustomDrawerContent);
