/* @flow */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import Modal from "react-native-modal";
import OrderList from "./Components/OrderList";

import { NavigationActions } from "react-navigation";
export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      payNowModal: false,
      text: "",
      drinkNames: [],
      prices: [],
      qty: [],
      paid: false
    };
  }
  componentDidMount() {
    let totalPrice = 0;
    for (var i = 0; i < this.props.navigation.state.params.order.length; i++) {
      totalPrice +=
        this.props.navigation.state.params.order[i].qty *
        parseInt(this.props.navigation.state.params.order[i].price.slice(1));
    }
    this.setState({
      totalPrice
    });
    let drinkNames = [];
    let prices = [];
    let qty = [];
    let subTotals = [];
    this.props.navigation.state.params.order.map((result, i) => {
      subTotals.push(result.price * result.qty);
      drinkNames.push(result.drinkName);
      prices.push(result.price);
      qty.push(result.qty);
    });
    this.setState(
      {
        drinkNames: drinkNames,
        prices: prices,
        qty: qty
      },
      () => console.log(this.state.drinkNames)
    );
  }
  payNow() {
    fetch(
      "https://api.mlab.com/api/1/databases/drinkeasy/collections/outstanding?apiKey=z6BRmL_6zmBPyH2x3KY7lyOCZ4A_QOVt",
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
          drinks: this.props.navigation.state.params.order,
          totalPrice: this.state.totalPrice
        })
      }
    );

    this.setState(
      {
        paid: true
      },
      () => console.log("order.js: ", this.state.paid)
    );
  }
  addToTab() {
    fetch(
      "https://api.mlab.com/api/1/databases/drinkeasy/collections/outstanding?apiKey=z6BRmL_6zmBPyH2x3KY7lyOCZ4A_QOVt",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ready: false,
          barID: this.props.navigation.state.params.barId,
          customerID: this.props.navigation.state.params.userId,
          drinks: this.props.navigation.state.params.order,
          totalPrice: this.state.totalPrice
        })
      }
    );

    this.props.navigation.navigate(
      "ShoppingCart",
      {
        thisBar: this.props.navigation.state.params.thisBar,
        order: this.props.navigation.state.params.order,
        oldTotal: this.props.navigation.state.params.oldTotal
      },
      60
    );
  }
  submitEmail() {}
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <OrderList
          drinkNames={this.state.drinkNames}
          prices={this.state.prices}
          qty={this.state.qty}
          totalPrice={this.state.totalPrice}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.payNow.bind(this)}
        >
          <Text style={[styles.text, { color: "white" }]}>
            Pay now using Interac E-Transfer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.addToTab.bind(this)}
        >
          <Text style={[styles.text, { color: "white" }]}> Add to tab</Text>
        </TouchableOpacity>
        <Modal
          isVisible={this.state.paid}
          onBackdropPress={() => {
            this.setState({
              paid: false
            });
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: "Home" })]
            });
            this.props.navigation.dispatch(resetAction);
          }}
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
    borderWidth: 1,
    zIndex: 10
  }
});
