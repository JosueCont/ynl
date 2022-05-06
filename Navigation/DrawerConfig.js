import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CustomDrawerContent from "./DrawerNavigatorContent";
import HomeScreen from "../screens/HomeScreen";


import {connect} from "react-redux";

const Drawer = createDrawerNavigator();

const DrawerConfig = ({accountDuck}) => {


    return (
        <Drawer.Navigator backBehavior={'history'} drawerContent={(props) => <CustomDrawerContent  {...props} />}>
            <Drawer.Screen name={'HomeScreen'} component={HomeScreen}/>
        </Drawer.Navigator>
    );
}

const mapState = (state) => {
    return {
        accountDuck: state.accountDuck
    }
}

export default connect(mapState)(DrawerConfig);