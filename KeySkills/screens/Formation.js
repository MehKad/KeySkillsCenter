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
import { fetchAllData, fetchAllLessons } from "../redux/actions";

class Formation extends Component {
  state = {
    firstMod: false,
    secondMod: false,
    addMod: false,
    newForm: "",
    test: "",
  };

  handleFirst = () => {
    this.setState((prevState) => ({ firstMod: !prevState.firstMod }));
  };
  handleSecond = () => {
    this.setState((prevState) => ({ secondMod: !prevState.secondMod }));
  };
  handleFirstAdd = () => {
    this.setState((prevState) => ({ addMod: !prevState.addMod }));
  };

  fetchLessons = (title) => {
    const { dispatch } = this.props;
    dispatch(fetchAllLessons(title));
    this.setState({ test: title });
    this.handleFirst();
  };

  fetchData = (courses) => {
    const { dispatch } = this.props;
    dispatch(fetchAllData(courses));
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
    const { firstMod, secondMod, addMod, test } = this.state;
    const { currentUser, formations, lessons, data, current } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Formation : </Text>
        </View>
        <View style={styles.lescours}>
          {formations.map((title) => (
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
          Lessons={lessons}
          fetchD={this.fetchData}
          currentUser={currentUser}
          test={test}
        />
        <SecondModal
          secondMod={secondMod}
          closeSecondModal={this.handleSecond}
          dourous={data}
          currentUser={currentUser}
          current={current}
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
  formations: store.userState.formations,
  lessons: store.userState.lessons,
  data: store.userState.data,
  current: store.userState.current,
});

export default connect(mapStateToProps, null)(Formation);
