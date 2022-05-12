import React from 'react';
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {ImageBackground, TouchableOpacity} from "react-native";
import sidebarImage from "../assets/sidebar.png";
import {Image, Text, View} from "native-base";
import logoSmall from "../assets/logoSmall.png";


const CustomDrawerContent = ({navigation, navigationDuck, accountDuck, ...props}) => {


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
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                        <Text color={'white'} fontSize={20} my={2}>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('GroupsScreen')}>
                        <Text color={'white'} fontSize={20} my={2}>Mis grupos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <Text color={'white'} fontSize={20} my={2}>Historial</Text>
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

export default connect(mapState)(CustomDrawerContent);
