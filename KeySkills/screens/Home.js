import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import React, { Component } from "react";

import { connect } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import { fetchGcUsers } from "../redux/actions";

import firebase from "firebase/compat";

class Home extends Component {
  state = {
    showModal: false,
    selectedFormation: null,
    users: [],
  };

  handleFormationPress = (formation) => {
    const { dispatch } = this.props;
    this.setState({ selectedFormation: formation, showModal: true });
    dispatch(fetchGcUsers(formation));
  };

  componentDidUpdate(prevProps) {
    if (this.props.users !== prevProps.users) {
      this.setState({ users: this.props.users });
    }
  }

  removeUser(id) {
    const { selectedFormation } = this.state;
    firebase
      .firestore()
      .collection("Lessons")
      .doc(selectedFormation)
      .collection("users")
      .doc(id)
      .delete()
      .then(() => {
        this.setState((prevState) => ({
          users: prevState.users.filter((user) => user.id !== id),
        }));
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  verify(id) {
    const { selectedFormation } = this.state;
    firebase
      .firestore()
      .collection("Lessons")
      .doc(selectedFormation)
      .collection("users")
      .doc(id)
      .update({
        confirmed: true,
      })
      .then(() => {
        // update the users array in the state to reflect the change
        this.setState((prevState) => ({
          users: prevState.users.map((user) => {
            if (user.id === id) {
              return {
                ...user,
                data: {
                  ...user.data,
                  confirmed: true,
                },
              };
            } else {
              return user;
            }
          }),
        }));
        console.log("updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  remove(id) {
    const { selectedFormation } = this.state;
    firebase
      .firestore()
      .collection("Lessons")
      .doc(selectedFormation)
      .collection("users")
      .doc(id)
      .update({
        confirmed: false,
      })
      .then(() => {
        this.setState((prevState) => ({
          users: prevState.users.map((user) => {
            if (user.id === id) {
              return {
                ...user,
                data: {
                  ...user.data,
                  confirmed: false,
                },
              };
            } else {
              return user;
            }
          }),
        }));
        console.log("updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { currentUser, lessonsAdmin } = this.props;
    const { selectedFormation, showModal, users } = this.state;
    console.log(users);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{ uri: currentUser.profilePic }} style={styles.img} />
          <Text style={styles.title}>Welcome back {currentUser.fullName}</Text>
        </View>
        <View style={styles.lescours}>
          <Text style={styles.desc}>
            Click on One of the following Lessons to see it's users :
          </Text>
          {lessonsAdmin.map((title) => (
            <TouchableOpacity
              key={title}
              style={styles.small}
              onPress={() => this.handleFormationPress(title)}
            >
              <Text style={{ color: "white" }} key={title}>
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <AntDesign
              name="close"
              size={24}
              onPress={() => this.setState({ showModal: false })}
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
            />
            <Text style={styles.modalTitle}>{selectedFormation}</Text>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
            >
              User List
            </Text>
            {users.map((user) => (
              <View
                key={user.id}
                style={{
                  width: "90%",
                  padding: 20,
                  borderWidth: 1,
                  borderRadius: 8,
                  marginBottom: 20,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ fontSize: 15 }}>{user.data.fullName}</Text>
                <AntDesign
                  name="delete"
                  size={24}
                  onPress={() => this.removeUser(user.id)}
                />
                {!user.data.confirmed && (
                  <AntDesign
                    name="checksquare"
                    size={24}
                    onPress={() => this.verify(user.id)}
                  />
                )}
                {user.data.confirmed && (
                  <AntDesign
                    name="close"
                    size={24}
                    onPress={() => this.remove(user.id)}
                  />
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
    marginTop: StatusBar.currentHeight,
    alignItems: "center",
  },
  lescours: {
    flex: 0.5,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  small: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 15,
    width: "40%",
    height: "15%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    padding: 10,
    paddingTop: 25,
    fontFamily: "serif",
    fontWeight: "bold",
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  desc: {
    fontSize: 15,
    textAlign: "justify",
    fontWeight: "bold",
    fontFamily: "Roboto",
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Roboto",
  },
});

const mapStateToProps = (store) => {
  return {
    currentUser: store.userState.currentUser,
    formations: store.userState.formations,
    lessonsAdmin: store.userState.lessonsAdmin,
    users: store.userState.users,
  };
};

export default connect(mapStateToProps, null)(Home);
