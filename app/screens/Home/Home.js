import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  ImageBackground
} from "react-native";
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
      <ImageBackground
        source={require("./home-background.jpg")}
        style={styles.backgroundImage}
      >
        <View style={{ backgroundColor: "#d8d8d8", opacity: 0.8 }}>
          <View style={{ marginTop: 110 }}>
            {this.state.results.map((result, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={this.nextPage.bind(this, result.id)}
                >
                  <Text style={styles.text1} key={i}>
                    {typeof result === "object" && !(result instanceof Array)
                      ? result.company
                      : result.toString()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <SearchBar
          ref={ref => (this.searchBar = ref)}
          data={barData}
          handleResults={this._handleResults}
          backgroundColor={"#d8d8d8"}
          heightAdjust={40}
          fontSize={24}
          showOnLoad
        />

        <View style={styles.drinkEasy}>
          <Text
            style={{
              fontSize: 40,
              color: "white"
            }}
          >
            Drink
          </Text>
          <Text
            style={{
              fontSize: 40,
              color: "white",
              fontStyle: "italic"
            }}
          >
            Easy
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  table: {
    alignSelf: "stretch"
  },
  drinkEasy: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  container: {
    backgroundColor: "#73CFE6",
    height: "100%"
  },
  head: {
    height: 40,
    backgroundColor: "#00B3E6"
  },
  text2: {
    textAlign: "center",
    fontSize: 20
  },
  text1: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});
