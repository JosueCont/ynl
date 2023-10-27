import React, {useEffect, useRef, useState} from "react";
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {ImageBackground, TouchableOpacity, Dimensions, StatusBar} from "react-native";
import sidebarImage from "../assets/bgmenu.png";
import { Text, View, Image} from "native-base";
import logoSmall from "../assets/logoSmall.png";
import logoKhor from "../assets/logos.png";
import {t} from 'i18n-js';
import {logOutAction} from "../redux/ducks/authDuck";
import ApiApp from "../utils/ApiApp";
import { getProjectsAvailable } from '../utils/functions'
import {MaterialIcons, FontAwesome, Ionicons, FontAwesome5, Fontisto, Entypo} from "@expo/vector-icons";
import { Colors } from "../utils/Colors";
import ModalDayPhrase from "../screens/Modals/ModalDayPhrase";
import { removeModulesLogout } from "../redux/ducks/modulesDuck";

const {height} = Dimensions.get('screen');

const CustomDrawerContent = ({authDuck, navigation, navigationDuck, accountDuck, logOutAction, modulesDuck,removeModulesLogout, ...props}) => {

    const [groups, setGroups] = useState([]);
    const [groupsRequests, setGroupsRequests] = useState([])
    const [modalPhraseVisible, setModalPhraseVisible] = useState(false)
    const [phraseDay, setPhraseDay] = useState(null)

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
            removeModulesLogout()
        } catch (e) {
            console.log('DrawerConfig logoutFunction error => ',e.toString())
        }
    }

    const getPermissionsModules = (permission) => {
      return modulesDuck.modules.includes(permission);
  }


    return (
      <DrawerContentScrollView
        bounces={false}
        {...props}
        nestedScrollEnabled={true}
        contentContainerStyle={{ flex:1, backgroundColor:'#161616' }}
      >
        <View  style={{ flex: 1, backgroundColor:'#161616' }}>
          <View flexDirection={'row'} justifyContent={'space-between'} style={{marginBottom:100}}>
            <View  alignItems={'flex-start'} justifyContent={"center"} >
              <Image source={logoSmall} alt="img"  style={{height:65, width:56, resizeMode:'contain', marginLeft:40}}/>
            </View>
            <TouchableOpacity style={{alignSelf:'flex-start', marginRight:18}} onPress={() => navigation.closeDrawer()}>
              <MaterialIcons name='menu' size={30} color={Colors.yellowV2} />
            </TouchableOpacity>
          </View>

          <View flex={1} alignItems={"flex-start"} style={{marginLeft:45}}>
            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <Entypo name="home" size={25} color={Colors.white} />
              <TouchableOpacity
                style={{marginLeft:15}}
                onPress={() => {
                  navigation.navigate("HomeScreen");
                }}
              >
                <Text color={"white"} fontSize={20} my={2}>
                    Inicio
                </Text>
              </TouchableOpacity>

            </View>
            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <FontAwesome name='vcard' size={20} color={Colors.white} />
              <TouchableOpacity
                style={{marginLeft:15}}
                onPress={() => {
                  navigation.navigate("ProfileScreen");
                }}
              >
                <Text color={"white"} fontSize={20} my={2}>
                    {t('profile')}
                </Text>
              </TouchableOpacity>

            </View>
            {getPermissionsModules('EMOTIONS') ? (
            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <MaterialIcons name="donut-large" size={25} color={Colors.white}/>
              <TouchableOpacity
                  style={{marginLeft:15}}
                  onPress={() => {
                      navigation.navigate("StatisticsScreen");
                  }}
              >
                  <Text color={"white"} fontSize={20} my={2}>
                      {t('home_my_emotions')}
                  </Text>
              </TouchableOpacity>
            </View> ) : null}

            {getPermissionsModules('EMOTIONS') ? (
            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <Ionicons name="md-happy-outline" size={25} color={Colors.white}/>
              <TouchableOpacity
                  style={{marginLeft:15}}
                  onPress={() => {
                      navigation.navigate("RouletteStep1Screen");
                  }}
              >
                  <Text color={"white"} fontSize={20} my={2}>
                      Nueva emoción
                  </Text>
              </TouchableOpacity>
            </View> ) : null }

            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <Ionicons name="md-happy-outline" size={25} color={Colors.white}/>
              <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.navigate('YourFeelScreen')}>
                <Text color={"white"} fontSize={20} my={2}>
                    {t('home_aspects')}
                </Text>
              </TouchableOpacity>
            </View>

            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <MaterialIcons  name="group" size={25} color={Colors.white} />
              <TouchableOpacity style={{marginLeft:15}} onPress={() => redirectValidation()}>
                <Text color={"white"} fontSize={20} my={2}>
                    {t('home_my_groups')}
                </Text>
              </TouchableOpacity>
            </View>
            { getPermissionsModules('SIXPACK') ? (
            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                <FontAwesome5 name="clipboard-list" size={25} color={Colors.white}/> 
              <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.navigate('ProjectsList')}>
                <Text color={"white"} fontSize={20} my={2}>
                    Mis proyectos
                </Text>
              </TouchableOpacity>
            </View> ) : null}
            {getPermissionsModules('BOOKS') ? (
            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'} >
              <FontAwesome name="bookmark" size={25} color={Colors.white} />
              
              <TouchableOpacity style={{marginLeft:20}} onPress={() => navigation.navigate("BookList")}>
                <Text color={"white"} fontSize={20} my={2}>
                    {t('books')}
                </Text>
              </TouchableOpacity>
              
            </View> ) : null}

            {getPermissionsModules('GOALS') ? (
            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <FontAwesome name="trophy" size={25} color={Colors.white} />
              <TouchableOpacity style={{marginLeft:15}} onPress={() => navigation.navigate("GoalsScreen")}>
                <Text color={"white"} fontSize={20} my={2}>
                    {t('home_goals')}
                </Text>
              </TouchableOpacity>
            </View> ) : null}



            <View flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
              <MaterialIcons name="textsms" size={25} color="white" />
              <TouchableOpacity style={{marginLeft:15}} onPress={() => setModalPhraseVisible(true)}>
                <Text color={"white"} fontSize={20} my={2}>
                    Frase del día
                </Text>
              </TouchableOpacity>
            </View>

            {/*<TouchableOpacity
              onPress={() => {
                navigation.navigate("HomeScreen");
              }}
            >
              <Text color={"white"} fontSize={20} my={2}>
                  {t('home')}
              </Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('YourFeelScreen')}>
                  <Text color={"white"} fontSize={20} my={2}>
                      {t('home_my_aspects')}
                  </Text>
            </TouchableOpacity>*/}
            {
              /* getProjectsAvailable() &&  
              <TouchableOpacity onPress={() => navigation.navigate("ProjectsList")}>
                <Text color={"white"} fontSize={20} my={2}>
                  {t('home_projects')}
                </Text>
              </TouchableOpacity>*/
            }
            {/* <TouchableOpacity onPress={() => navigation.navigate("ReadBook")}>
                <Text color={"white"} fontSize={20} my={2}>
                  {t('read_books')}
                </Text>
              </TouchableOpacity> */}
            {/* <TouchableOpacity onPress={() => navigation.navigate("GoalsReport")}>
              <Text color={"white"} fontSize={20} my={2}>
                  {t('my_progress')}
              </Text>
            </TouchableOpacity> */}

          </View>

          <TouchableOpacity style={{marginBottom:40, alignSelf:'center'}}onPress={() => logoutFunction()}>
              <Text
                  color={"white"}
                  fontSize={14}
                  style={{ textDecorationLine: "underline" }}
                  my={2}
              >
                  {t('home_logout')}
              </Text>
          </TouchableOpacity>

          {/*<View flex={0.5} style={{marginTop:10}} alignItems={"center"} justifyContent={"center"}>
            <Image source={logoKhor} alt="img" />
          </View>*/}
        </View>
        <ModalDayPhrase phrase={modulesDuck.phrase}  visible={modalPhraseVisible} closeModalPhrase={() => setModalPhraseVisible(false)} />
      </DrawerContentScrollView>
    );
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        navigationDuck: state.navigationDuck,
        accountDuck: state.accountDuck,
        modulesDuck: state.modulesDuck
    }
}

export default connect(mapState, {logOutAction, removeModulesLogout})(CustomDrawerContent);
