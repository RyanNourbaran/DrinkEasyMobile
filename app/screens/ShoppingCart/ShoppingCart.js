/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

import ShoppingCartList from "./Components/ShoppingCartList";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      subTotals: [],
      drinkNames: [],
      prices: [],
      qty: [],
      grandTotal: 0
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

    //creating props for ShoppingCartList
    let subTotals = [];
    let drinkNames = [];
    let prices = [];
    let qty = [];
    let grandTotal = 0;
    updatedOrder.map((result, i) => {
      let thisPrice = parseInt(result.price.slice(1));
      subTotals.push("$" + thisPrice * result.qty);
      grandTotal += thisPrice * result.qty;
      drinkNames.push(result.drinkName);
      prices.push(result.price);
      qty.push(result.qty);
    });
    console.log(subTotals);

    this.setState(
      {
        order: updatedOrder,
        subTotals: subTotals,
        drinkNames: drinkNames,
        prices: prices,
        qty: qty,
        grandTotal: grandTotal
      },
      () => console.log(this.state.drinkNames)
    );
    console.log("order is " + this.state.order);
  }

  render() {
    let subTotalPrice = 0;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <ShoppingCartList
          drinkNames={this.state.drinkNames}
          prices={this.state.prices}
          qty={this.state.qty}
          subTotals={this.state.subTotals}
          grandTotal={this.state.grandTotal}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  orderList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  text: {
    fontSize: 20,
    textAlign: "left",
    alignSelf: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "yellow",
    padding: 10,
    borderWidth: 1
  }
});
