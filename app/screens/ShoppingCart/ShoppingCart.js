/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";

import Modal from "react-native-modal";
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
      grandTotal: 0,
      paid: false
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
  drinkMore() {
    this.props.navigation.navigate(
      "Drinks",
      {
        thisBar: this.props.navigation.state.params.thisBar,
        userId: this.props.navigation.state.params.thisBar._id
      },
      60
    );
  }
  payNow() {
    fetch(
      "https://api.mlab.com/api/1/databases/drinkeasy/collections/bills?apiKey=z6BRmL_6zmBPyH2x3KY7lyOCZ4A_QOVt",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ready: true,
          barID: this.props.navigation.state.params.barId,
          customerID: this.props.navigation.state.params.userId,
          drinks: this.props.navigation.state.params.order
        })
      }
    );
    this.setState({
      paid: true
    });
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

        <TouchableOpacity
          style={styles.button}
          onPress={this.payNow.bind(this)}
        >
          <Text style={[styles.text, { color: "white" }]}>
            Pay off tab using Interac E-Transfer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.drinkMore.bind(this)}
        >
          <Text style={[styles.text, { color: "white" }]}>Keep drinking</Text>
        </TouchableOpacity>

        <Modal
          isVisible={this.state.paid}
          onBackdropPress={() => this.setState({ paid: false })}
        >
          <KeyboardAvoidingView
            behavior="height"
            style={{ flex: 0.3, backgroundColor: "white", opacity: 0.8 }}
          >
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                alignSelf: "center",
                alignContent: "center"
              }}
            >
              Check your E-Mail and accept the E-transfer request!
            </Text>
          </KeyboardAvoidingView>
        </Modal>
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
    backgroundColor: "#226666",
    padding: 10,
    borderWidth: 1
  },
  drinkEasy: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  }
});
