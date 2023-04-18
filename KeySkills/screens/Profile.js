import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { onLogOut } from "../components/Functions";

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => onLogOut()}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
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
  logoutButton: {
    backgroundColor: "#386BF6",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    color: "white",
  },
});
