import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

import { connect } from "react-redux";

class Chat extends Component {
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

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Chat);
