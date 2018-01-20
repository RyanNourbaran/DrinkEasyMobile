/* @flow */

import React, { Component, TouchableOpacity } from "react";
import SearchBar from "react-native-searchbar";
import { View, Text, StyleSheet } from "react-native";

import barData from "../../api/bars.json";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "hello world",
      results: []
    };
  }

  handleResults(results) {
    this.setState({
      results
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 110 }}>
          {this.state.results.map((result, i) => {
            return <Text key={i}>{result[i].company}</Text>;
          })}
          <TouchableOpacity onPress={() => this.searchBar.show()}>
            <View
              style={{ backgroundColor: "green", height: 100, marginTop: 50 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.searchBar.hide()}>
            <View style={{ backgroundColor: "red", height: 100 }} />
          </TouchableOpacity>
        </View>
        <Text>{this.state.test}</Text>
        <SearchBar
          ref={ref => (this.searchBar = ref)}
          data={barData}
          handleResults={this.handleResults.bind(this)}
          showOnLoad
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
