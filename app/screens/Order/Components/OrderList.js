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

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      totalPrice: 0
    };
    this.renderTable = this.renderTable.bind(this);
    this.cellHeight = this.cellHeight.bind(this);
  }

  cellHeight() {
    let { height, width } = Dimensions.get("window");
    const arrayLength = Math.floor(height * 0.6 / this.props.drinkNames.length);
    let heightArr = Array(this.props.drinkNames.length);
    const tests = heightArr.toString();
    heightArr.fill(arrayLength);

    return heightArr;
  }

  renderTable() {
    if (this.props.drinkNames.length > 0) {
      const tableHead = ["Drink Name", "Price", "Qty"];
      const tableData = [
        this.props.drinkNames,
        this.props.prices,
        this.props.qty
      ];
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
            <Row
              data={["Total for order:", "$" + this.props.totalPrice]}
              style={styles.head}
              textStyle={styles.text1}
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
    height: "85%"
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
