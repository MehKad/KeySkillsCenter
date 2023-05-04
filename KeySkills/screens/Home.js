import { Text, StyleSheet, View, StatusBar } from "react-native";
import React, { Component } from "react";

import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { currentUser, testtest } = this.props;
    return (
      <View style={styles.container}>
        <Text>Welcome back {currentUser.fullName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (store) => {
  return {
    currentUser: store.userState.currentUser,
    testtest: store.userState.testtest,
  };
};

export default connect(mapStateToProps, null)(Home);
