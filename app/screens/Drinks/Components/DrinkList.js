import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  Image
} from "react-native";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

export default class WorkoutList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: []
    };
    this.renderTable = this.renderTable.bind(this);
    this.cellHeight = this.cellHeight.bind(this);
  }

  cellHeight() {
    let { height, width } = Dimensions.get("window");
    const arrayLength = Math.floor(
      height * 0.75 / this.props.drinkNames.length
    );
    let heightArr = Array(this.props.drinkNames.length);
    const tests = heightArr.toString();
    heightArr.fill(arrayLength);

    return heightArr;
  }
  addToOrder(drinkName, price) {
    if (true) {
      let orderCopy = this.state.order;
      let drinkObject = {};
      for (var i = 0; i < this.state.order.length; i++) {
        if (this.state.order[i].drinkName == drinkName) {
          console.log("Drinklist.js: found drink already in state");
          drinkObject = this.state.order[i]; //drink object is now the right drink
          orderCopy.splice(i, 1); //removed drinkobject from orderCopy
          break;
        }
      }
      if (drinkObject.qty >= 1) {
        drinkObject = {
          drinkName: drinkObject.drinkName,
          price: drinkObject.price,
          qty: drinkObject.qty + 1
        };
      } else {
        console.log("Drinklist.js: drink added to state");
        drinkObject = {
          drinkName: drinkName,
          price: price,
          qty: 1
        };
      }
      orderCopy.push(drinkObject);
      this.setState(
        {
          order: orderCopy
        },
        this.props.setOrder(this.state.order)
      );
    }
  }
  renderTable() {
    const ele = (drinkName, price) => (
      <TouchableOpacity onPress={this.addToOrder.bind(this, drinkName, price)}>
        <Image
          source={require("../../../imgs/add.png")}
          style={{ width: 40, height: 40, alignSelf: "center" }}
        />
      </TouchableOpacity>
    );
    let buttonArray = [];
    let testArray = [];
    for (var i = 0; i < this.props.drinkNames.length; i++) {
      testArray.push(i);
      buttonArray.push(ele(this.props.drinkNames[i], this.props.prices[i]));
    }
    if (this.props.drinkNames.length > 0) {
      const tableHead = ["Drink Name", "Price", "Add to Order"];
      const tableData = [this.props.drinkNames, this.props.prices, buttonArray];
      return (
        <View>
          <Table
            style={styles.table}
            borderStyle={{ borderWidth: 0, borderColor: "black" }}
          >
            <Row
              data={tableHead}
              style={styles.head}
              textStyle={styles.text1}
              flexArr={[1]}
            />
            <Cols
              data={tableData}
              textStyle={styles.text2}
              heightArr={this.cellHeight()}
              flexArr={[1]}
            />
          </Table>
        </View>
      );
    }
  }
  render() {
    return <View style={styles.container}>{this.renderTable()}</View>;
  }
}

const styles = StyleSheet.create({
  table: {
    alignSelf: "stretch"
  },
  container: {
    height: "90%"
  },
  head: {
    height: 40,
    backgroundColor: "#226666"
  },
  text2: {
    textAlign: "center",
    fontSize: 20
  },
  text1: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});
