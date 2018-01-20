/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import DrinkList from "./Components/DrinkList";
import barData from "../../api/bars.json";

export default class Drinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinkNames: ["el"],
      prices: [],
      descriptions: []
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
  render() {
    return (
      <View style={styles.container}>
        <DrinkList
          drinkNames={this.state.drinkNames}
          prices={this.state.prices}
          descriptions={this.state.descriptions}
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
