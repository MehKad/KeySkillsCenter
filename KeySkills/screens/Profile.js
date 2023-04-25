import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  TextInput,
} from "react-native";
import moment from "moment";
import React, { Component } from "react";
import { onLogOut } from "../components/Functions";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase/compat";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

class Profile extends Component {
  state = {
    modalVisible: false,
    posting: true,
    prevName: "",
    prevPhone: "",
    prevEmail: "",
    prevDate: "",
    prevImage: null,
  };

  toggleModal = () => {
    const { currentUser } = this.props;
    const date = currentUser.dateBirth;
    const prevDate = moment(date.seconds * 1000).format("DD/MM/YYYY");
    this.setState({
      prevName: currentUser.fullName,
      prevImage: currentUser.profilePic,
      prevPhone: currentUser.phone,
      prevEmail: currentUser.email,
      prevDate: prevDate,
      modalVisible: !this.state.modalVisible,
    });
  };

  handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
      exif: true,
    });
    if (!result.canceled) {
      const uid = firebase.auth().currentUser.uid;
      const newIm = result.assets[0].uri;
      const response = await fetch(newIm);
      const blob = await response.blob();
      const childPath = `users/${uid}/${Math.random().toString(36)}`;
      const storage = getStorage();
      const storageRef = ref(storage, childPath);
      const snapshot = await uploadBytes(storageRef, blob);
      const profilePic = await getDownloadURL(snapshot.ref);
      this.setState({ prevImage: profilePic });
    }
  };

  handleSaveChanges = () => {
    const uid = firebase.auth().currentUser.uid;
    const { prevEmail, prevName, prevPhone, prevDate, prevImage } = this.state;
    const dateBirth = moment(prevDate, "DD/MM/YYYY").toDate();
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .update({
        fullName: prevName,
        phone: prevPhone,
        email: prevEmail,
        dateBirth: dateBirth,
        profilePic: prevImage,
      })
      .then(() => {
        this.setState({ posting: false });
        this.toggleModal();
        console.log("user successfully modified");
      });
  };

  render() {
    const { currentUser } = this.props;
    const { prevEmail, prevName, prevPhone, prevDate, prevImage } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={{ uri: currentUser.profilePic }} style={styles.img} />
          <View style={styles.data}>
            <Text style={styles.datatext}>
              Full name: {currentUser.fullName}
            </Text>
            <Text style={styles.datatext}>Email: {currentUser.email}</Text>
            <Text style={styles.datatext}>
              Date of Birth:
              {moment(currentUser.dateBirth.seconds * 1000).format(
                "DD/MM/YYYY"
              )}
            </Text>
            <Text style={styles.datatext}>
              Phone number: {currentUser.phone}
            </Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => onLogOut()}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={this.toggleModal}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={this.state.modalVisible} animationType="slide">
          <View style={styles.container}>
            <AntDesign
              name="close"
              size={24}
              onPress={this.toggleModal}
              style={styles.closeIcon}
            />
            <View style={styles.content}>
              <TouchableOpacity onPress={this.handlePickImage}>
                <Image source={{ uri: prevImage }} style={styles.image} />
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={prevName}
                  onChangeText={(prevName) => this.setState({ prevName })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  value={prevPhone}
                  onChangeText={(prevPhone) => this.setState({ prevPhone })}
                  maxLength={10}
                />
                <TextInput
                  style={styles.input}
                  placeholder="email"
                  value={prevEmail}
                  keyboardType="email-address"
                  onChangeText={(prevEmail) => this.setState({ prevEmail })}
                />
                <TextInput
                  style={styles.input}
                  value={prevDate}
                  placeholder="date of birth DD/MM/YYYY"
                  onChangeText={(prevDate) => this.setState({ prevDate })}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleSaveChanges}
            >
              <Text>Save</Text>
            </TouchableOpacity>
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
    marginTop: StatusBar.currentHeight,
  },
  top: {
    flex: 4,
    width: "100%",
    alignItems: "center",
  },
  data: {
    borderWidth: 1,
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 50,
    paddingRight: 50,
    flex: 0.8,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  datatext: {
    fontSize: 15,
    fontWeight: "bold",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingVertical: 20,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 50,
  },
  editButton: {
    backgroundColor: "#386BF6",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#386BF6",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  logoutButtonText: {
    color: "#386BF6",
    fontWeight: "bold",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    height: "75%",
    alignSelf: "center",
    marginTop: "20%",
    borderWidth: 1,
  },
  closeButtonText: {
    color: "#386BF6",
    fontWeight: "bold",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#386BF6",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  input: {
    borderWidth: 2,
    padding: 8,
    width: 330,
    borderColor: "rgba(232, 236, 244, 1)",
    borderRadius: 8,
    marginTop: "5%",
  },
  button: {
    backgroundColor: "#004AAD",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 120,
    paddingRight: 120,
    marginTop: "5%",
    marginBottom: "10%",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Profile);
