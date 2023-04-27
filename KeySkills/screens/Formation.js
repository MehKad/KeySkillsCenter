import { Text, StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import React, { Component } from "react";

import { connect } from "react-redux";
import firebase from "firebase/compat";
import { AntDesign } from "@expo/vector-icons";

class Formation extends Component {
  state = {
    Name: [],
    Lessons: [],
    showModal: false,
    secondMod: false,
    dourous: {},
  };

  componentDidMount() {
    this.fetchFormation();
  }

  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  openSecondModal = () => {
    this.setState({ secondMod: true });
  };
  closeSecondModal = () => {
    this.setState({ secondMod: false });
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
    this.openModal();
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
    this.openSecondModal();
  };

  render() {
    const { Name, Lessons, showModal, secondMod, dourous } = this.state;
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
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <AntDesign
              name="close"
              size={24}
              onPress={this.closeModal}
              style={{ alignSelf: "flex-end" }}
            />
            <Text style={styles.title}>Lessons: </Text>
            {Lessons.map((cours) => (
              <TouchableOpacity
                style={styles.small}
                onPress={() => this.fetchAllData(cours)}
              >
                <Text>{cours}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
        <Modal visible={secondMod} animationType="slide">
          <View>
            <AntDesign
              name="close"
              size={24}
              onPress={this.closeSecondModal}
              style={{ alignSelf: "flex-end" }}
            />
            {Object.keys(dourous).map((title) => (
              <View key={title}>
                <Text>{title}</Text>
                {Array.isArray(dourous[title]) ? (
                  dourous[title].map((item) => <Text key={item}>{item}</Text>)
                ) : (
                  <Text>{dourous[title]}</Text>
                )}
              </View>
            ))}
          </View>
        </Modal>
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
