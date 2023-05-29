import React, { Component } from "react";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Linking,
} from "react-native";
import { fetchGcUsers } from "../redux/actions";
import firebase from "firebase/compat";
import { TextInput } from "react-native-paper";

import * as DocumentPicker from "expo-document-picker";

import "firebase/storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

class Home extends Component {
  constructor(props) {
    super(props);
    const { testtest } = this.props;
    this.state = {
      showModal: false,
      selectedFormation: null,
      users: [],
      second: false,
      searchQuery: "",
      filteredTitles: testtest.map((item) => item.name),
      pdfFiles: [],
    };
  }

  handleFormationPress = (formation) => {
    const { dispatch } = this.props;
    this.setState({ selectedFormation: formation, showModal: true });
    dispatch(fetchGcUsers(formation));
  };

  handleUserPress = (index) => {
    const { testtest } = this.props;
    const form = testtest.map((item) => item.name);
    this.setState({ selectedFormation: form[index], second: true });
    this.handleShowedFiles(form[index]);
  };

  removeUser = (id) => {
    const { selectedFormation, users } = this.state;
    firebase
      .firestore()
      .collection("Lessons")
      .doc(selectedFormation)
      .collection("users")
      .doc(id)
      .delete()
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        this.setState({ users: updatedUsers });
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  verify = (id) => {
    const { selectedFormation, users } = this.state;
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
        const updatedUsers = users.map((user) => {
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
        });
        this.setState({ users: updatedUsers });
        console.log("Updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  remove = (id) => {
    const { selectedFormation, users } = this.state;
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
        const updatedUsers = users.map((user) => {
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
        });
        this.setState({ users: updatedUsers });
        console.log("Updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount() {
    const { propsUsers } = this.props;
    if (propsUsers) {
      this.setState({ users: propsUsers });
    }
  }

  componentDidUpdate(prevProps) {
    const { propsUsers } = this.props;
    if (propsUsers !== prevProps.propsUsers) {
      this.setState({ users: propsUsers });
    }
  }

  handleSearch = (query) => {
    const { testtest } = this.props;
    const names = testtest.map((item) => item.name);
    const filteredTitles = names.filter((title) =>
      title.toLowerCase().includes(query.toLowerCase())
    );
    this.setState({ searchQuery: query, filteredTitles });
  };

  handleFileSelect = async (id) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type === "success") {
        const { uri, name } = result;

        const response = await fetch(uri);
        const blob = await response.blob();
        const childPath = `docs/${id}/${name}`;

        const storage = getStorage();
        const storageRef = ref(storage, childPath);

        const snapshot = await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(downloadURL);
        const fileData = {
          name,
          downloadURL,
        };

        const fileDocRef = firebase
          .firestore()
          .collection("Lessons")
          .doc(id)
          .collection("documents")
          .doc();

        await fileDocRef.set(fileData);
      }
    } catch (error) {
      console.log("Error selecting file:", error);
    }
  };

  handleShowedFiles = async (id) => {
    try {
      const lessonRef = firebase
        .firestore()
        .collection("Lessons")
        .doc(id)
        .collection("documents");

      const snapshot = await lessonRef.get();
      const pdfFiles = snapshot.docs.map((doc) => doc.data());
      this.setState({ pdfFiles });
    } catch (error) {
      console.log("Error selecting file:", error);
    }
  };

  render() {
    const { currentUser, lessonsAdmin, users } = this.props;
    const {
      showModal,
      selectedFormation,
      second,
      searchQuery,
      filteredTitles,
      pdfFiles,
    } = this.state;

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
                onPress={() => this.handleFormationPress(title)}
              >
                <Text style={{ color: "white" }} key={title}>
                  {title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {!currentUser.admin && (
          <View>
            <Text style={styles.desc}>
              Here's the list of your currently listed lessons :
            </Text>
            <TextInput
              style={styles.searchBar}
              placeholder="Search formations..."
              value={searchQuery}
              onChangeText={this.handleSearch}
            />
            {filteredTitles.map((title, index) => (
              <View key={index}>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => this.handleUserPress(index)}
                >
                  <Text>{title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContainer}>
            <AntDesign
              name="close"
              size={24}
              onPress={() => this.setState({ showModal: false })}
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
            />
            <Text style={styles.modalTitle}>{selectedFormation}</Text>
            <Text style={styles.modalSubtitle}>User List :</Text>
            {users.map((user) => (
              <View key={user.id} style={styles.userContainer}>
                <Text style={styles.userName}>{user.data.fullName}</Text>
                <View style={styles.userActions}>
                  <TouchableOpacity
                    onPress={() => this.removeUser(user.id)}
                    style={styles.userAction}
                  >
                    <AntDesign name="delete" size={24} color="white" />
                  </TouchableOpacity>
                  {!user.data.confirmed && (
                    <TouchableOpacity
                      onPress={() => this.verify(user.id)}
                      style={[styles.userAction, styles.userActionCancel]}
                    >
                      <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                  )}
                  {user.data.confirmed && (
                    <TouchableOpacity
                      onPress={() => this.remove(user.id)}
                      style={[styles.userAction, styles.userActionConfirm]}
                    >
                      <AntDesign name="checksquare" size={24} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
            <Text style={styles.modalSubtitle}>
              Pdf files for the users to have :
            </Text>
            <TouchableOpacity
              onPress={() => this.handleFileSelect(selectedFormation)}
              style={styles.selectFileButton}
            >
              <Text style={styles.selectFileButtonText}>Select PDF File</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal visible={second} animationType="slide">
          <View style={styles.modalContainer}>
            <AntDesign
              name="close"
              size={24}
              onPress={() => this.setState({ second: false })}
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
            />
            <Text style={styles.modalTitle}>{selectedFormation}</Text>
            <FlatList
              data={pdfFiles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View key={item.id}>
                  <Text style={styles.desc}>
                    Here's this formation's documents that you need to print out
                    asap
                  </Text>
                  <TouchableOpacity
                    style={styles.pdfItem}
                    onPress={() => Linking.openURL(item.downloadURL)}
                  >
                    <AntDesign name="pdffile1" size={24} color="black" />
                    <Text style={styles.pdfFileName}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.desc}>
                  There's no available PDFs right now
                </Text>
              }
            />
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
    padding: 10,
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
  card: {
    backgroundColor: "lightblue",
    borderRadius: 5,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  searchBar: {
    backgroundColor: "white",
    height: 30,
    marginVertical: 10,
    padding: 10,
  },
  selectFileButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  selectFileButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  pdfItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  pdfFileName: {
    marginLeft: 10,
    fontSize: 16,
  },
});

const mapStateToProps = (store) => {
  return {
    currentUser: store.userState.currentUser,
    formations: store.userState.formations,
    lessonsAdmin: store.userState.lessonsAdmin,
    testtest: store.userState.testtest,
    users: store.userState.users,
  };
};

export default connect(mapStateToProps, null)(Home);
