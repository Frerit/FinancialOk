
import React from "react";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "../scenes/home";
import Login from "../scenes/login";


import Splash from "../scenes/splash";

const Stack = createStackNavigator({
    Home: {
        screen: Home,
        headerMode: 'none',
        header: null,
        navigationOptions: {
            header: null
        }
    },
}, {
    defaultNavigationOptions: {
        headerStyle: {
            marginTop: 30,
        }
    }
});

const AppNavigator = createSwitchNavigator({
    Splash: Splash,
    Login: Login,
    Stack: Stack
},{
    initialRouteName: "Splash",
});


export default createAppContainer(AppNavigator);