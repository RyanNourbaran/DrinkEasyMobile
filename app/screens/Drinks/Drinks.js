/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity
} from "react-native";

import DrinkList from "./Components/DrinkList";
import barData from "../../api/bars.json";

export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkNames: ["el"],
      prices: [],
      descriptions: [],
      order: []
    };
  }
  componentDidMount() {
    let thisBar = this.props.navigation.state.params.thisBar;

    let drinkNames = [];
    let prices = [];
    let descriptions = [];

    for (var i = 0; i < thisBar.drinks.length; i++) {
      drinkNames.push(thisBar.drinks[i].drinkName);
      prices.push("$" + thisBar.drinks[i].price);
      descriptions.push(thisBar.drinks[i].description);
    }
    this.setState(
      {
        drinkNames: drinkNames,
        prices: prices,
        descriptions: descriptions
      },
      () => console.log(this.state.drinkNames)
    );
  }
  setOrder(order) {
    this.setState(
      {
        order: order
      },
      () => console.log("Drinks.js has order:", this.state.order)
    );
  }
  createOrder(order) {
    console.log(order.length);
    if (order.length <= 0) {
      return;
    }
    this.props.navigation.navigate(
      "Order",
      {
        order: order
      },
      60
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text />
        <DrinkList
          drinkNames={this.state.drinkNames}
          prices={this.state.prices}
          descriptions={this.state.descriptions}
          setOrder={this.setOrder.bind(this)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.createOrder.bind(this, this.state.order)}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Proceed to Order</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    alignItems: "center",
    backgroundColor: "#226666",
    padding: 10,
    borderWidth: 1,
    zIndex: 10
  }
});
