/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

import DrinkList from "./Components/DrinkList";
import barData from "../../api/bars.json";

export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkNames: ["el"],
      prices: [],
      descriptions: [],
      order: [{}]
    };
  }
  componentDidMount() {
    let thisBar = [];

    for (let i = 0; i < barData.length; i++) {
      if (barData[i].id == this.props.navigation.state.params.id) {
        thisBar = barData[i];
        break;
      }
    }

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
    this.setState({
      order: order
    });
  }
  createOrder(order) {
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
        <Button
          color="#cca408"
          title="Place Order"
          onPress={this.createOrder.bind(this, this.state.order)}
        />
        <DrinkList
          drinkNames={this.state.drinkNames}
          prices={this.state.prices}
          descriptions={this.state.descriptions}
          setOrder={this.setOrder.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
