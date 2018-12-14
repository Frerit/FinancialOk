
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
    transitionConfig: () => ({
        transitionSpec: {
            duration: 300,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;

            const height = layout.initHeight;
            const translateY = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [height, 0, 0],
            });

            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index],
                outputRange: [0, 1, 1],
            });

            return { opacity, transform: [{ translateY }] };
        },
    }),
});


export default createAppContainer(AppNavigator);