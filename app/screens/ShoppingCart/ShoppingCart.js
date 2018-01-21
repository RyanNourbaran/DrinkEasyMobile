/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

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
    let subTotalPrice = 0;
    let TotalPrice = 0;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.orderList}>
          {this.state.order.map((result, i) => {
            let price = parseInt(result.price.slice(1)); //get rid of $ sign from price string
            TotalPrice += price * result.qty;
            return (
              <Text style={styles.text} key={i}>
                {result.drinkName} x {result.qty} @ {result.price} =
                {result.qty * price}
              </Text>
            );
          })}
          <Text style={styles.text}>Total = ${TotalPrice}</Text>
        </View>
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
