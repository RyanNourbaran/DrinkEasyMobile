import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SearchBar from "react-native-searchbar";

import items from "../../api/bars.json";

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      results: []
    };
    this._handleResults = this._handleResults.bind(this);
  }

  _handleResults(results) {
    this.setState({ results });
  }

  render() {
    return (
      <View>
        <Text>{this.results}</Text>
        <View style={{ marginTop: 110 }}>
          {this.state.results.map((result, i) => {
            return (
              <Text key={i}>
                {typeof result === "object" && !(result instanceof Array)
                  ? result.company
                  : result.toString()}
              </Text>
            );
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
        <SearchBar
          ref={ref => (this.searchBar = ref)}
          data={items}
          handleResults={this._handleResults}
          showOnLoad
        />
      </View>
    );
  }
}
