import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default class Chat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Chat</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
