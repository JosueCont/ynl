import React, {useEffect, useRef, useState} from "react";
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {ImageBackground, TouchableOpacity, Dimensions} from "react-native";
import sidebarImage from "../assets/bgmenu.png";
import { Text, View, Image} from "native-base";
import logoSmall from "../assets/logoSmall.png";
import logoKhor from "../assets/logos.png";
import {t} from 'i18n-js';
import {logOutAction} from "../redux/ducks/authDuck";
import ApiApp from "../utils/ApiApp";

const {height} = Dimensions.get('screen');

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
        } catch (e) {
            console.log('DrawerConfig redirectValidation error => ',e.toString())
        }

    }

    const getGroupsRequests = async () => {
        try {
            const response = await ApiApp.getGroupsRequests(authDuck.user.id)
            setGroupsRequests(response.data.data)
        } catch (e) {
            console.log('DrawerConfig getGroupsRequests error => ',e.toString())
        }
    }

    const getGroups = async () => {
        try {
            const response = await ApiApp.getMyGroups(authDuck.user.id)
            setGroups(response.data.data)
        } catch (e) {
            console.log('DrawerConfig getGroups error =>', e.toString())
        }

    }


    const logoutFunction = async () => {
        try {
            console.log('aqui')
            await logOutAction()
        } catch (e) {
            console.log('DrawerConfig logoutFunction error => ',e.toString())
        }
    }

    return (
      <DrawerContentScrollView
        bounces={false}
        {...props}
        nestedScrollEnabled={true}
        contentContainerStyle={{ height:height }}
      >
        <ImageBackground source={sidebarImage} style={{ flex: 1 }}>
          <View flex={0.5} alignItems={"center"} justifyContent={"center"}>
            <Image source={logoSmall} alt="img" />
          </View>

          <View flex={0.5} alignItems={"center"}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("HomeScreen");
              }}
            >
              <Text color={"white"} fontSize={20} my={2}>
                  {t('home')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfileScreen");
              }}
            >
              <Text color={"white"} fontSize={20} my={2}>
                  {t('profile')}
              </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('YourFeelScreen')}>
                  <Text color={"white"} fontSize={20} my={2}>
                      {t('home_my_aspects')}
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => {
                      navigation.navigate("StatisticsScreen");
                  }}
              >
                  <Text color={"white"} fontSize={20} my={2}>
                      {t('home_my_emotions')}
                  </Text>
              </TouchableOpacity>
            <TouchableOpacity onPress={() => redirectValidation()}>
              <Text color={"white"} fontSize={20} my={2}>
                  {t('home_my_groups')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("GoalsScreen")}>
              <Text color={"white"} fontSize={20} my={2}>
                  {t('home_goals')}
              </Text>
            </TouchableOpacity>

              <TouchableOpacity onPress={() => logoutFunction()}>
                  <Text
                      color={"white"}
                      fontSize={14}
                      style={{ textDecorationLine: "underline" }}
                      my={2}
                  >
                      {t('home_logout')}
                  </Text>
              </TouchableOpacity>

          </View>


          <View flex={0.5} style={{marginTop:10}} alignItems={"center"} justifyContent={"center"}>
            <Image source={logoKhor} alt="img" />
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
