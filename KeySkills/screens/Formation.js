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

import { AnimatedFAB, TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

class Formation extends Component {
  state = {
    Name: [],
    Lessons: [],
    firstMod: false,
    secondMod: false,
    dourous: {},
    addMod: false,
    newForm: "",
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
  handleFirstAdd = () => {
    this.setState((prevState) => ({ addMod: !prevState.addMod }));
  };

  fetchFormation = () => {
    return firebase
      .firestore()
      .collection("formation")
      .onSnapshot((snapshot) => {
        const formationNames = snapshot.docs.map((formation) => formation.id);
        this.setState({ Name: formationNames });
      });
  };

  fetchLessons = (title) => {
    this.setState({ Lessons: [] });
    firebase
      .firestore()
      .collection("Lessons")
      .where(title, "==", true)
      .onSnapshot((snapshot) => {
        const lessonNames = snapshot.docs.map((lesson) => lesson.id);
        this.setState({ Lessons: lessonNames });
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

  addFormation = () => {
    firebase
      .firestore()
      .collection("formation")
      .doc(this.state.newForm)
      .set({ name: this.state.newForm })
      .then(() => this.handleFirstAdd());
  };

  deleteF = (title) => {
    firebase
      .firestore()
      .collection("formation")
      .doc(title)
      .delete()
      .then(() => console.log("deleted ", title));
  };

  render() {
    const { Name, Lessons, firstMod, secondMod, dourous, addMod, newForm } =
      this.state;
    const { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Formation : </Text>
        </View>
        <View style={styles.lescours}>
          {Name.map((title) => (
            <TouchableOpacity
              key={title}
              style={styles.small}
              onPress={() => this.fetchLessons(title)}
            >
              <Text style={{ color: "white" }} key={title}>
                {title}
              </Text>
              {currentUser.admin && (
                <AntDesign
                  name="delete"
                  size={24}
                  onPress={() => this.deleteF(title)}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {currentUser.admin && (
          <AnimatedFAB
            icon={"plus"}
            label={"Add"}
            onPress={() => {
              this.handleFirstAdd();
            }}
            animateFrom={"right"}
            iconMode={"dynamic"}
            style={styles.fabStyle}
          />
        )}
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
        <Modal
          visible={addMod}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            this.handleFirstAdd();
          }}
        >
          <TouchableOpacity
            style={styles.background}
            onPress={() => {
              this.handleFirstAdd();
            }}
          >
            <View style={styles.addmod}>
              <AntDesign
                name="close"
                size={24}
                onPress={() => {
                  this.handleFirstAdd();
                }}
                style={{ alignSelf: "flex-end", marginBottom: 10 }}
              />
              <TextInput
                placeholder="New Formation"
                maxLength={50}
                onChangeText={(text) => {
                  this.setState({ newForm: text });
                }}
              />
              <TouchableOpacity
                style={styles.save}
                onPress={() => this.addFormation()}
              >
                <Text style={{ color: "white" }}>Add</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
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
  header: {
    width: "100%",
    height: "10%",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
  },
  lescours: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
  },
  small: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 15,
    width: "40%",
    height: "10%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
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
  fabStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  addmod: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "35%",
    padding: 20,
  },
  save: {
    backgroundColor: "blue",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20,
    alignSelf: "center",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Formation);
