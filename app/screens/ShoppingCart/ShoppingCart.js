/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
  }
  componentDidMount() {
    const order = this.props.navigation.state.params.order;
    let updatedOrder = this.state.order;

    for (var i = 0; i < order.length; i++) {
      let currentDrink = order[i];

      for (var j = 0; j < this.state.order.length; j++) {
        if (this.state.order[j].drinkName == order[i].drinkName) {
          currentDrink.qty = currentDrink.qty + this.state.order[j].qty;

          updatedOrder.splice(j, 1);
        }
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
  }
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
