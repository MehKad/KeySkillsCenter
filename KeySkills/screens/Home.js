import React, { Component, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { fetchGcUsers } from "../redux/actions";
import firebase from "firebase/compat";

function Home(props) {
  const { currentUser, lessonsAdmin, dispatch, users: propsUsers } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [users, setUsers] = useState([]);

  const handleFormationPress = (formation) => {
    setSelectedFormation(formation);
    setShowModal(true);
    dispatch(fetchGcUsers(formation));
  };

  const removeUser = (id) => {
    firebase
      .firestore()
      .collection("Lessons")
      .doc(selectedFormation)
      .collection("users")
      .doc(id)
      .delete()
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const verify = (id) => {
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
        setUsers(
          users.map((user) => {
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
          })
        );
        console.log("Updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const remove = (id) => {
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
        setUsers(
          users.map((user) => {
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
          })
        );
        console.log("Updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (propsUsers !== users) {
      setUsers(propsUsers);
    }
  }, [propsUsers]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: currentUser.profilePic }} style={styles.img} />
        <Text style={styles.title}>Welcome back {currentUser.fullName}</Text>
      </View>
      {currentUser.admin && (
        <View style={styles.lescours}>
          <Text style={styles.desc}>
            Click on One of the following Lessons to see its users:
          </Text>
          {lessonsAdmin.map((title) => (
            <TouchableOpacity
              key={title}
              style={styles.small}
              onPress={() => handleFormationPress(title)}
            >
              <Text style={{ color: "white" }} key={title}>
                {title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <AntDesign
            name="close"
            size={24}
            onPress={() => setShowModal(false)}
            style={{ alignSelf: "flex-end", marginBottom: 10 }}
          />
          <Text style={styles.modalTitle}>{selectedFormation}</Text>
          <Text style={styles.modalSubtitle}>User List</Text>
          {users.map((user) => (
            <View key={user.id} style={styles.userContainer}>
              <Text style={styles.userName}>{user.data.fullName}</Text>
              <View style={styles.userActions}>
                <TouchableOpacity
                  onPress={() => removeUser(user.id)}
                  style={styles.userAction}
                >
                  <AntDesign name="delete" size={24} color="white" />
                </TouchableOpacity>
                {!user.data.confirmed && (
                  <TouchableOpacity
                    onPress={() => verify(user.id)}
                    style={[styles.userAction, styles.userActionCancel]}
                  >
                    <AntDesign name="close" size={24} color="white" />
                  </TouchableOpacity>
                )}
                {user.data.confirmed && (
                  <TouchableOpacity
                    onPress={() => remove(user.id)}
                    style={[styles.userAction, styles.userActionConfirm]}
                  >
                    <AntDesign name="checksquare" size={24} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>
      </Modal>
    </View>
  );
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
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  small: {
    backgroundColor: "#212121",
    padding: 20,
    borderRadius: 10,
    width: "40%",
    margin: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginTop: 20,
    marginBottom: 10,
  },
  userContainer: {
    width: "90%",
    padding: 20,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontSize: 15,
  },
  userActions: {
    flexDirection: "row",
  },
  userAction: {
    marginLeft: 10,
    backgroundColor: "#212121",
    padding: 10,
    borderRadius: 5,
  },
  userActionConfirm: {
    backgroundColor: "green",
  },
  userActionCancel: {
    backgroundColor: "red",
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
