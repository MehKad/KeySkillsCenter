import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { Component } from "react";

import firebase from "firebase/compat";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { currentUser, testtest } = this.props;
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>{currentUser.fullName}</Text>

        <View style={styles.cardsContainer}>
          {!currentUser.admin &&
            testtest.map((title, index) => (
              <TouchableOpacity style={styles.card} key={index}>
                <Text>{title}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 20,
  },
  card: {
    backgroundColor: "red",
    borderRadius: 10,
    width: "45%",
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
});

const mapStateToProps = (store) => {
  return {
    currentUser: store.userState.currentUser,
    testtest: store.userState.testtest,
  };
};

export default connect(mapStateToProps, null)(Home);
