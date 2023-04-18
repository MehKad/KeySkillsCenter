import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>{currentUser.fullName}</Text>
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

export default connect(mapStateToProps, null)(Home);
