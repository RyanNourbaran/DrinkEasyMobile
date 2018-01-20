import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";

import Drinks from "../screens/Drinks/Drinks";
import Home from "../screens/Home/Home";
import Order from "../screens/Order/Order";
import ShoppingCart from "../screens/ShoppingCart/ShoppingCart";

export const Root = StackNavigator(
    {
        Tabs: {
            screen: MainOptions,
            navigationOptions: ({ navigation }) => ({
                title: "Pick Your Muscle Groups"
            })
        },
        Options2: {
            screen: Options2,
            navigationOptions: ({ navigation }) => ({
                title: "Customize Your Workout"
            })
        },
        ListView: {
            screen: ListView,
            navigationOptions: ({ navigation }) => ({
                title: "Workout         "
            })
        }
    },
    {
        navigationOptions: {
            headerStyle: {
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#1d2088",
                backgroundColor: "#e8bb06",
                height: 50
            },
            headerTitleStyle: {
                alignSelf: "center"
            }
        }
    }
);
