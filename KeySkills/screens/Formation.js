import { Text, StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import React, { Component } from "react";

import { connect } from "react-redux";
import firebase from "firebase/compat";

import FirstModal from "../components/firstModal";
import SecondModal from "../components/secondModal";

class Formation extends Component {
  state = {
    Name: [],
    Lessons: [],
    firstMod: false,
    secondMod: false,
    dourous: {},
  };

  componentDidMount() {
    this.fetchFormation();
  }

  handleFirst = () => {
    this.setState((prevState) => ({ firstMod: !prevState.firstMod }));
  };
  handleSecond = () => {
    this.setState((prevState) => ({ secondMod: !prevState.secondMod }));
  };

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
    this.handleFirst();
  };

  fetchAllData = (courses) => {
    firebase
      .firestore()
      .collection("Lessons")
      .doc(courses)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        const dourous = {};
        Object.keys(data).forEach((title) => {
          const info = data[title];
          dourous[title] = info;
        });
        this.setState({ dourous });
      });
    this.handleSecond();
  };

  render() {
    const { Name, Lessons, firstMod, secondMod, dourous } = this.state;
    return (
      <View style={styles.container}>
        <Text>Formation : </Text>
        <View>
          {Name.map((title) => (
            <TouchableOpacity
              key={title}
              style={styles.small}
              onPress={() => this.fetchLessons(title)}
            >
              <Text style={{ color: "white" }}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <FirstModal
          showModal={firstMod}
          closeModal={this.handleFirst}
          Lessons={Lessons}
          fetchAllData={this.fetchAllData}
        />
        <SecondModal
          secondMod={secondMod}
          closeSecondModal={this.handleSecond}
          dourous={dourous}
        />
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
  small: {
    backgroundColor: "red",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Formation);
