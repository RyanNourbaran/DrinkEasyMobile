import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
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
    if (this.state.order.length == 0) {
      const firstOrder = [
        {
          drinkName: drinkName,
          price: price,
          qty: 1
        }
      ];
      this.setState(
        {
          order: firstOrder
        },
        () => console.log(this.state.order)
      );
    } else {
      let orderCopy = this.state.order;
      let drinkObject = {};
      for (var i = 0; i < this.state.order.length; i++) {
        if (this.state.order[i].drinkName == drinkName) {
          console.log("if made it");
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
      this.setState({
        order: orderCopy
      });
      console.log(this.state.order);
    }
  }
  renderTable() {
    const ele = (drinkName, price) => (
      <TouchableOpacity onPress={this.addToOrder.bind(this, drinkName, price)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Add</Text>
        </View>
      </TouchableOpacity>
    );
    let buttonArray = [];
    let testArray = [];
    for (var i = 0; i < this.props.drinkNames.length; i++) {
      testArray.push(i);
      buttonArray.push(ele(this.props.drinkNames[i], this.props.prices[i]));
    }
    if (this.props.drinkNames.length > 0) {
      const tableHead = ["Drink Name", "Description", "Price", "Add to Order"];
      const tableData = [
        this.props.drinkNames,
        this.props.descriptions,
        this.props.prices,
        buttonArray
      ];
      return (
        <Table style={styles.table}>
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
  }
});
