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

export default class DrinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      qtyArray: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
  addToOrder(drinkName, price) {
    let orderCopy = this.state.order;
    let drinkObject = {};
    for (var i = 0; i < this.state.order.length; i++) {
      if (this.state.order[i].drinkName == drinkName) {
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
      drinkObject = {
        drinkName: drinkName,
        price: price,
        qty: 1
      };
    }
    orderCopy.push(drinkObject);

    let qtyArray = this.state.qtyArray;
    for (var i = 0; i < this.props.drinkNames.length; i++) {
      if (this.props.drinkNames[i] == drinkName) {
        qtyArray[i] = qtyArray[i] + 1;
      }
    }
    this.setState(
      {
        order: orderCopy,
        qtyArray: qtyArray
      },
      this.props.setOrder(this.state.order)
    );
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
    for (var i = 0; i < this.props.drinkNames.length; i++) {
      buttonArray.push(ele(this.props.drinkNames[i], this.props.prices[i]));
    }
    if (this.props.drinkNames.length > 0) {
      const tableHead = ["Drink Name", "Price", "Add to Order", "Quantity"];
      const tableData = [
        this.props.drinkNames,
        this.props.prices,
        buttonArray,
        this.state.qtyArray
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
                this.cellWidth() + 30,
                this.cellWidth() - 30,
                this.cellWidth(),
                this.cellWidth()
              ]}
            />
            <Cols
              data={tableData}
              textStyle={styles.text2}
              heightArr={this.cellHeight()}
              flexArr={[1]}
              widthArr={[
                this.cellWidth() + 30,
                this.cellWidth() - 30,
                this.cellWidth(),
                this.cellWidth()
              ]}
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
    height: 55,
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
