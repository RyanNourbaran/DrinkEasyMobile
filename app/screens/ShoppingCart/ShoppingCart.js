/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [{}]
    };
  }
  /*componentDidMount() {
    const order = this.props.navigation.state.params.order;
    let currentDrink = { qty: 0 };
    let updatedOrder = [{}];
    for (var i = 0; i < order.length; i++) {
      for (var j = 0; j < this.state.order.length; j++) {
        if (this.state.order[j].drinkName == order[i].drinkName) {
          currentDrink = {
            drinkName: order[i].drinkName,
            price: order[i].price,
            qty: order[i].qty + this.state.order[j].qty
          };
        }
      }
      if (currentDrink.qty < 1) {
        currentDrink = order[i];
      }
      updatedOrder.push(currentDrink);
    }
    this.setState(
      {
        order: updatedOrder
      },
      () => console.log(this.state.order)
    );
    console.log("order is " + this.state.order);
  }*/
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the ShoppingCart component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
