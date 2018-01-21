import React from "react";
import { TabNavigator, StackNavigator } from "react-navigation";

import Drinks from "../screens/Drinks/Drinks";
import Home from "../screens/Home/Home";
import Order from "../screens/Order/Order";
import ShoppingCart from "../screens/ShoppingCart/ShoppingCart";

export const Root = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "Home"
      })
    },
    Drinks: {
      screen: Drinks,
      navigationOptions: ({ navigation }) => ({
        title: "Drinks"
      })
    },
    Order: {
      screen: Order,
      navigationOptions: ({ navigation }) => ({
        title: "Order"
      })
    },
    ShoppingCart: {
      screen: ShoppingCart,
      navigationOptions: ({ navigation }) => ({
        title: "Bar Tab"
      })
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#1d2088",
        backgroundColor: "#226666",
        height: 50
      },
      headerTitleStyle: {
        alignSelf: "center"
      }
    }
  }
);
