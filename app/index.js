import React, { Component } from "react";
import { Tabs, Root } from "./config/router";
import { View, Text, StyleSheet } from "react-native";

export default class App extends Component {
    render() {
        return <Root />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
