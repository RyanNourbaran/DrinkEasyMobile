/* @flow */

import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Drinks extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is id: {this.props.navigation.state.params.id}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
