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

export default class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      data: []
    };
    this._handleResults = this._handleResults.bind(this);
  }
  componentDidMount() {
    this.getData().then(data => {
      this.setState({
        data: data
      });
    });
  }

  async getData() {
    let response = await fetch(
      "https://api.mlab.com/api/1/databases/drinkeasy/collections/menus?apiKey=z6BRmL_6zmBPyH2x3KY7lyOCZ4A_QOVt"
    );

    let json = await response.json();
    return json;
  }

  _handleResults(results) {
    this.setState({ results });
  }

  nextPage(bar) {
    console.log(bar.drinks);
    Keyboard.dismiss();
    this.props.navigation.navigate(
      "Drinks",
      {
        id: bar._id,
        thisBar: bar
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
          <View style={{ marginTop: "30%", marginBottom: "10%" }}>
            {this.state.results.map((result, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={this.nextPage.bind(this, result)}
                  style={{
                    justifyContent: "center",
                    borderBottomWidth: 0.2
                  }}
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
          data={this.state.data}
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
    fontWeight: "bold",
    margin: "2%"
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});
