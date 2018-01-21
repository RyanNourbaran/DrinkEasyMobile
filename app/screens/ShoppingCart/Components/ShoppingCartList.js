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

export default class ShoppingCartList extends Component {
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
    const arrayLength = Math.floor(
      height * 0.75 / this.props.drinkNames.length
    );
    let heightArr = Array(this.props.drinkNames.length);
    const tests = heightArr.toString();
    heightArr.fill(arrayLength);

    return heightArr;
  }

  cellWidth() {
    let { height, width } = Dimensions.get("window");
    //const arrayLength = Math.floor(width / this.props.drinkNames.length);
    //let widthArr = Array(this.props.drinkNames.length);
    //const tests = widthArr.toString();
    //widthArr.fill(arrayLength);

    return width / 4;
  }
  renderTable() {
    if (this.props.drinkNames.length > 0) {
      const tableHead = ["Drink Name", "Price", "Qty", "Sub-Totals"];
      const tableData = [
        this.props.drinkNames,
        this.props.prices,
        this.props.qty,
        this.props.subTotals
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
              widthArr={[
                this.cellWidth() + 50,
                this.cellWidth() - 25,
                this.cellWidth() - 50,
                this.cellWidth() + 25
              ]}
            />
            <Cols
              data={tableData}
              textStyle={styles.text2}
              heightArr={this.cellHeight()}
              widthArr={[
                this.cellWidth() + 50,
                this.cellWidth() - 25,
                this.cellWidth() - 50,
                this.cellWidth() + 25
              ]}
              flexArr={[1]}
            />
            <Row
              data={["Bar Tab Total:", "$" + this.props.grandTotal]}
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
    backgroundColor: "#B9D2B1"
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
