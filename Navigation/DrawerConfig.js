import React, {useState, useEffect} from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";
import YourFeelScreen from "../screens/YourFeelScreen";
import {Icon, Image, View, Text} from "native-base";
import {Colors} from "../utils/Colors";
import {Platform, TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import GroupsScreen from "../screens/GroupsScreen";
import GroupsMembersAdd from "../screens/GroupsMembersAdd";
import GroupsStartScreen from "../screens/GroupsStartScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import GroupsDetailsScreen from "../screens/GroupsDetailsScreen";
//import ProfileScreen from "../screens/ProfileScreen";
import ProfileUserScreen from "../screens/ProfileUserScreen";
import IntroScreen from "../screens/IntroScreen";
import GoalsScreen from '../screens/GoalsScreen'
import GoalsReport from '../screens/GoalsReport'
import GoalTree from '../screens/GoalTree'
import Projects from '../screens/Projects'
import ProjectForm from '../screens/ProjectForm'
import BookList from '../screens/books/BookList'
import ReadBook from '../screens/books/ReadBook'
import {t} from 'i18n-js';
import RouletteStep1Screen from "../screens/RouletteStep1Screen";
import RouletteStep2Screen from "../screens/RouletteStep2Screen";
import RouletteStep3Screen from "../screens/RouletteStep3Screen";
import RouletteStep4Screen from "../screens/RouletteStep4Screen";
import HistoryFeelingScreen from "../screens/HistoryFeelingScreen";
import HistoryFeelingScreenDetail from "../screens/HistoryFeelingScreenDetail";
import OverlaySpinner from '../components/OverlaySpinner'
import imageLogo from '../assets/new_logo.png'
import { useSelector } from "react-redux";
import { getFontSize } from "../utils/functions";

const Drawer = createDrawerNavigator();

const DrawerConfig = () => {
    const [redIcons, setredIcons] = useState(false)

    const loading = useSelector(state => state.authDuck?.loadingOverlay);
    

    return (
      <>
      { loading && <OverlaySpinner /> }
      <Drawer.Navigator
        useLegacyImplementation={true}
        backBehavior={"history"}
        screenOptions={({ navigation, route }) => ({
          drawerPosition: "right",
          headerLeft: () => {
            //console.log("route", route?.params.parentItem.attributes.name);
            if ((route.name.includes("HomeScreen") || route.name.includes("GoalsScreen") || route.name.includes("GoalsReport") || route.name.includes("GoalsTree") || route.name.includes('ProjectsList') || route.name.includes('ProjectForm') || route.name.includes("BookList") || route.name.includes("ReadBook") ) && Platform.OS !== "ios") {
              return <View />;
            } else if(route.name.includes("HomeScreen")  && Platform.OS === "ios"){
              return <View />;
            } else if(route.name.includes('ProfileScreen')){
              return(
                <View flexDirection={'row'}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
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
                      color={Colors.yellowV2}
                      size={"xl"}
                    />
                  </TouchableOpacity>
                  <Image
                    tintColor={"gray"}
                    style={{ marginTop: 10, height: 30, width: 30 }}
                    size={"xs"}
                    source={imageLogo}
                  />
                </View>
              )
            }else{
              return (
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      if (route.name.includes("GroupsScreen")) {
                        navigation.navigate("HomeScreen");
                      } else if (route.params.from === "intro") {
                        navigation.navigate("HomeScreen");
                      } else {
                        navigation.goBack(0);
                      }
                    } catch (e) {
                      console.log("DrawerConfig error => ", e.toString());
                      navigation.goBack(0);
                    }
                  }}
                  style={{
                    width: 50,
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                    marginLeft: 10,
                  }}
                >
                  <Icon
                    as={MaterialIcons}
                    name={"arrow-back-ios"}
                    color={Colors.yellowV2}
                    size={"xl"}
                  />
                </TouchableOpacity>
              );
            }
          },
          headerTransparent: route.name.includes("GoalsTree") || route.name.includes("ProjectsList") || route.name.includes('ProjectForm') || route.name.includes("BookList") ? true : false,
          headerStyle: { backgroundColor: Colors.white, opacity: 1, borderColor:'transparent'  },
          headerTitleAlign: "center",
          headerTitleStyle: { color: "black" },
          headerShadowVisible:false,
          headerTitle: () => {
            if (route.name.includes("GoalsScreen") || route.name.includes("GoalsReport") || route.name.includes("GoalsTree") || route.name.includes("ProjectsList") || route.name.includes('ProjectForm') || route.name.includes("BookList") || route.name.includes("ReadBook") ) {
              return <View />;
            } if(route.name.includes('ProfileScreen')){
              return <Text fontSize={getFontSize(19)} style={{fontWeight:'900'}}>{t('my_profile')}</Text>
            }else {
              return (
                <View flex={1}>
                  <Image
                    tintColor={"gray"}
                    style={{ marginTop: 10, height: 30, width: 30 }}
                    size={"xs"}
                    source={imageLogo}
                  />
                </View>
              );
            }
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{
                width: 50,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 5,
              }}
            >
              <Icon
                as={MaterialIcons}
                color={Colors.yellowV2}
                name={"menu"}
                size={"xl"}
              ></Icon>
            </TouchableOpacity>
          ),
          swipeEnabled: false,
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name={"HomeScreen"}
          component={HomeScreen}
          options={{ title: "" }}
        />
        <Drawer.Screen name={"YourFeelScreen"} component={YourFeelScreen} />
        <Drawer.Screen
          name={"GroupsScreen"}
          component={GroupsScreen}
          options={{ title: "Mis grupos" }}
        />
        <Drawer.Screen
          name={"GoalsScreen"}
          component={GoalsScreen}
          options={{ title: "Mis objetivos" }}
        />
        <Drawer.Screen
          name={"GoalsReport"}
          component={GoalsReport}
          options={{ title: "Mis avances" }}
        />
        <Drawer.Screen
          name={"GoalsTree"}
          component={GoalTree}
          options={{ title: "Categorias" }}
        />
        <Drawer.Screen
          name={"ProjectsList"}
          component={Projects}
          options={{ title: "Projectos" }}
        />
        <Drawer.Screen
          name={"ProjectForm"}
          component={ProjectForm}
          options={{ title: "Detalles del proyecto" }}
        />
        <Drawer.Screen
          name={'BookList'}
          component={BookList}
          options={{ title: "Libros"}}
        />
        <Drawer.Screen
          name={'ReadBook'}
          component={ReadBook}
          options={{ title: "Leer libro"}}
        />
        
        <Drawer.Screen
          name={"GroupsStartScreen"}
          component={GroupsStartScreen}
        />
        <Drawer.Screen name={"GroupsMembersAdd"} component={GroupsMembersAdd} />
        <Drawer.Screen
          name={"GroupsDetailsScreen"}
          component={GroupsDetailsScreen}
          options={{ title: t('members') }}
        />
        <Drawer.Screen
          name={"StatisticsScreen"}
          component={StatisticsScreen}
          options={{ title: "Estadísticas" }}
        />
        <Drawer.Screen
          name={"ProfileScreen"}
          component={ProfileUserScreen}
          //options={{ title: "Perfil" }}
        />
        <Drawer.Screen
          name={"HistoryFeelingScreen"}
          component={HistoryFeelingScreen}
          options={{ title: "Historial" }}
        />
        <Drawer.Screen
          name={"HistoryFeelingScreenDetail"}
          component={HistoryFeelingScreenDetail}
          options={{ title: "Historial" }}
        />

        <Drawer.Screen
          name={"RouletteStep1Screen"}
          component={RouletteStep1Screen}
          options={{ title: "" }}
        />
        <Drawer.Screen
          name={"RouletteStep2Screen"}
          component={RouletteStep2Screen}
          options={{ title: "" }}
        />
        <Drawer.Screen
          name={"RouletteStep3Screen"}
          component={RouletteStep3Screen}
          options={{ title: "" }}
        />
        <Drawer.Screen
          name={"RouletteStep4Screen"}
          component={RouletteStep4Screen}
          options={{ title: "" }}
        />
        <Drawer.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
      </>
    );
}

export default DrawerConfig;