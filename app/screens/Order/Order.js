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

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPrice: 0,
      payNowModal: false,
      text: "",
      drinkNames: [],
      prices: [],
      qty: []
    };
  }
  componentDidMount() {
    let totalPrice = 0;
    console.log(
      "order.js has order: ",
      this.props.navigation.state.params.order
    );
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
    this.setState(
      {
        payNowModal: true
      },
      () => console.log("order.js: ", this.state.payNowModal)
    );
  }
  addToTab() {
    this.props.navigation.navigate(
      "ShoppingCart",
      {
        order: this.props.navigation.state.params.order
      },
      60
    );
  }
  submitEmail() {
    console.log("Insert Interac API here");
  }
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
          isVisible={this.state.payNowModal}
          onBackdropPress={() => this.setState({ payNowModal: false })}
        >
          <KeyboardAvoidingView
            behavior="height"
            style={{ flex: 0.3, backgroundColor: "white", opacity: 0.8 }}
          >
            <Text style={styles.text}>Enter E-Mail for Interac E-transfer</Text>
            <TextInput
              style={{ borderWidth: 0.5, margin: 5, fontSize: 20 }}
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.submitEmail.bind(this)}
            >
              <Text style={[styles.text, { color: "white", margin: 5 }]}>
                Send E-Transfer Request to my E-Mail
              </Text>
            </TouchableOpacity>
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
