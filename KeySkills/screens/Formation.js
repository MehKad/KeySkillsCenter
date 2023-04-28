import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  StatusBar,
} from "react-native";
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
    const { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <Text>Formation : </Text>
        <View style={styles.lescours}>
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
        {currentUser.admin ? console.log("admin") : console.log("not")}
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
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
  },
  lescours: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginTop: 20,
  },
  small: {
    backgroundColor: "red",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    margin: 15,
    width: "40%",
    aspectRatio: 1,
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
