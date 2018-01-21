import React, { Component } from "react";
import { Text, View, TouchableOpacity, Keyboard } from "react-native";
import SearchBar from "react-native-searchbar";

import barData from "../../api/bars.json";

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this._handleResults = this._handleResults.bind(this);
  }

  _handleResults(results) {
    this.setState({ results });
  }

  nextPage(id) {
    Keyboard.dismiss();
    this.props.navigation.navigate(
      "Drinks",
      {
        id: id
      },
      60
    );
  }
  render() {
    return (
      <View>
        <View style={{ marginTop: 110 }}>
          {this.state.results.map((result, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={this.nextPage.bind(this, result.id)}
              >
                <Text key={i}>
                  {typeof result === "object" && !(result instanceof Array)
                    ? result.company
                    : result.toString()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <SearchBar
          ref={ref => (this.searchBar = ref)}
          data={barData}
          handleResults={this._handleResults}
          showOnLoad
        />
      </View>
    );
  }
}
