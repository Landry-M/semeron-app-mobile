import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";


//ecran
import splashScreen from "../screens/splash/splashScreen";
import loginScreen from "../screens/login/loginScreen";
import registerScreen from "../screens/register/register";
import loginOrRegister from "../screens/loginOrRegister/loginOrRegisterScreen";
import presentationScreen from "../screens/presentation/presentationScreen";
import homeScreen from "../screens/home/homeScreen";
import searchScreen from "../screens/search/searchScreen";
import parametreScreen from "../screens/parametre/parametreScreen";
import detailsPublicationScreen from "../screens/detailsPublication/detailsPublicationScreen";
import internetErrorScreen from "../screens/internetError/internetError";
import bugErrorScreen from "../screens/bugError/bugError";
import allPublicationScreen from "../screens/allPublications/allPublicationScreen";


import Icon from "react-native-vector-icons/MaterialCommunityIcons";

//
const stackForAuth = createStackNavigator(
    {
        login: {
            screen: loginScreen,
        },
        register: {
            screen: registerScreen
        },
        logOrReg: {
            screen: loginOrRegister
        }
    },
    {
        initialRouteName: 'logOrReg'
    }
);

//
const stackForHome = createStackNavigator({
    accueil: homeScreen,
    details: detailsPublicationScreen,
    allMag: {
        screen: allPublicationScreen,
        navigationOptions: {
            title: 'Toutes les publications'
        }
    }
});

//
const stackForSearch = createStackNavigator({
    search: searchScreen,
    details: detailsPublicationScreen
});

//
const stackForParams = createStackNavigator({
    parametre: {
        screen: parametreScreen,
        navigationOptions: {
            title: 'Profile'
        }
    }
});

//
const tabForHome = createBottomTabNavigator(
    {
        accueil: {
            screen: stackForHome,
            navigationOptions: {
                tabBarLabel: "Home",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home-circle-outline" color='#3FC4ED' size={21} />
                )
            }
        },
        recherche: {
            screen: stackForSearch,
            navigationOptions: {
                tabBarLabel: "Recherche",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="cloud-search-outline" color='#3FC4ED' size={21} />
                )
            }
        },
        option: {
            screen: stackForParams,
            navigationOptions: {
                tabBarLabel: "Option",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="cog-sync-outline" color='#3FC4ED' size={21} />
                )
            }
        }
    }
);

const appNav = createAppContainer(createSwitchNavigator(

    {

        splash: splashScreen,
        presentation: presentationScreen,
        auth: stackForAuth,
        home: tabForHome,
        intErr: internetErrorScreen,
        bugErr: bugErrorScreen
    },
    {
        initialRouteName: 'splash'
    }
));

export default appNav;