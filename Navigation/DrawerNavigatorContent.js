import React, {useEffect, useRef, useState} from "react";
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {ImageBackground, TouchableOpacity} from "react-native";
import sidebarImage from "../assets/bgmenu.png";
import {Image, Text, View} from "native-base";
import logoSmall from "../assets/logoSmall.png";
import {logOutAction} from "../redux/ducks/authDuck";
import ApiApp from "../utils/ApiApp";


const CustomDrawerContent = ({authDuck, navigation, navigationDuck, accountDuck, logOutAction, ...props}) => {

    const [groups, setGroups] = useState([]);
    const [groupsRequests, setGroupsRequests] = useState([])

    useEffect(() => {
        getGroupsRequests();
        getGroups();
    }, [])

    const redirectValidation = async () => {
        try {
            if (groups.length === 0 && groupsRequests.length === 0) {
                navigation.navigate('GroupsStartScreen')
            } else {
                navigation.navigate('GroupsScreen')
            }
        } catch (ex) {
            console.log(ex,' CustomDraveContent Error')
        }

    }

    const getGroupsRequests = async () => {
        try {
            const response = await ApiApp.getGroupsRequests(authDuck.user.id)
            setGroupsRequests(response.data.data)
        } catch (ex) {
            console.log(ex)
        }
    }

    const getGroups = async () => {
        try {
            const response = await ApiApp.getMyGroups(authDuck.user.id)

            setGroups(response.data.data)
        } catch (e) {
            console.log(e, 61)
        }

    }


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
                    <Image source={logoSmall} alt="img"></Image>
                </View>
                <View flex={1} alignItems={'center'}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ProfileScreen')
                    }}>
                        <Text color={'white'} fontSize={20} my={2}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {redirectValidation()
                    }}>
                        <Text color={'white'} fontSize={20} my={2}>Mis grupos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('StatisticsScreen')

                    }}>
                        <Text color={'white'} fontSize={20} my={2}>Mis avance</Text>
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
        authDuck: state.authDuck,
        navigationDuck: state.navigationDuck,
        accountDuck: state.accountDuck
    }
}

export default connect(mapState, {logOutAction})(CustomDrawerContent);
