import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React, { Component } from "react";

import { connect } from "react-redux";
import firebase from "firebase/compat";

class Formation extends Component {
  state = {
    Name: [],
    Lessons: [],
  };

  componentDidMount() {
    this.fetchFormation();
  }

  fetchFormation = () => {
    return firebase
      .firestore()
      .collection("formation")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((formation) => {
          this.setState({ Name: [...this.state.Name, formation.id] });
        });
      });
  };

  fetchLessons = (title) => {
    this.setState({ Lessons: [] });
    firebase
      .firestore()
      .collection("Lessons")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((test) => {
          if (test.data()[title]) {
            this.setState({ Lessons: [...this.state.Lessons, test.id] });
          }
        });
      });
  };

  render() {
    const { Name, Lessons } = this.state;
    return (
      <View style={styles.container}>
        <Text>Formation : </Text>
        <View>
          {Name.map((title) => (
            <TouchableOpacity
              style={styles.small}
              onPress={() => this.fetchLessons(title)}
            >
              <Text style={{ color: "white" }}>{title}</Text>
            </TouchableOpacity>
          ))}
          {Lessons.map((cours) => (
            <Text>{cours}</Text>
          ))}
        </View>
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
  big: {
    backgroundColor: "blue",
    width: 200,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  small: {
    backgroundColor: "red",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    padding: 20,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Formation);
