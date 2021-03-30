import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";


//ecran
import splashScreen from "../screens/splash/splashScreen";
import loginScreen from "../screens/login/loginScreen";
import registerScreen from "../screens/register/register";
import loginOrRegister from "../screens/loginOrRegister/loginOrRegisterScreen";

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
//const tabForHome = 

const appNav = createAppContainer(createSwitchNavigator(

    {
        splash: splashScreen,
        auth: stackForAuth,

    }
));

export default appNav;