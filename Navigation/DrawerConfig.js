import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";
import YourFeelScreen from "../screens/YourFeelScreen";


import {connect} from "react-redux";
import {Icon} from "native-base";
import {Colors} from "../utils/Colors";
import {TouchableOpacity} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import GroupsScreen from "../screens/GroupsScreen";
import GroupsMembersAdd from "../screens/GroupsMembersAdd";
import GroupsStartScreen from "../screens/GroupsStartScreen";

const Drawer = createDrawerNavigator();

const DrawerConfig = ({accountDuck}) => {


    return (
        <Drawer.Navigator backBehavior={'history'}
                          screenOptions={({navigation, route}) => ({
                              drawerPosition: 'right',
                              headerLeft: () => {
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
                                          <Icon as={MaterialIcons} name={'arrow-back-ios'}></Icon>

                                      </TouchableOpacity>)
                              },
                              headerStyle: {backgroundColor: Colors.gray},
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
                                      <Icon as={MaterialIcons} name={'menu'}></Icon>
                                  </TouchableOpacity>
                              ),
                          })}
                          drawerContent={(props) => <CustomDrawerContent  {...props} />}>
            <Drawer.Screen name={'HomeScreen'} component={HomeScreen}/>
            <Drawer.Screen name={'YourFeelScreen'} component={YourFeelScreen}/>
            <Drawer.Screen name={'GroupsScreen'} component={GroupsScreen}/>
            <Drawer.Screen name={'GroupsStartScreen'} component={GroupsStartScreen}/>
            <Drawer.Screen name={'GroupsMembersAdd'} component={GroupsMembersAdd}/>

        </Drawer.Navigator>
    );
}

const mapState = (state) => {
    return {
        accountDuck: state.accountDuck
    }
}

export default connect(mapState)(DrawerConfig);