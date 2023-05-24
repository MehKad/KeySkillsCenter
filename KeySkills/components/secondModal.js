import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase/compat";

export default function SecondModal({
  secondMod,
  closeSecondModal,
  dourous,
  currentUser,
  current,
}) {
  const addUser = async (id) => {
    try {
      const uid = firebase.auth().currentUser.uid;
      const userRef = firebase
        .firestore()
        .collection("Lessons")
        .doc(id)
        .collection("users")
        .doc(uid);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        Alert.alert(
          "User already exists",
          `${currentUser.fullName} already exists in ${id}`
        );
      } else {
        await userRef.set({
          confirmed: false,
          fullName: currentUser.fullName,
        });
        Alert.alert("User added", `${currentUser.fullName} Added to ${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = (content) => {
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <Text key={index} style={styles.content}>
          - {item}
        </Text>
      ));
    } else {
      return <Text style={styles.content}>{content}</Text>;
    }
  };

  return (
    <Modal visible={secondMod} animationType="slide">
      <View style={styles.container}>
        <AntDesign
          name="close"
          size={24}
          onPress={closeSecondModal}
          style={styles.closeButton}
        />
        <Text style={styles.header}>{current}</Text>
        {dourous &&
          Object.keys(dourous)
            .filter((title) => typeof dourous[title] !== "boolean")
            .map((title) => (
              <View key={title} style={styles.item}>
                <Text style={styles.title}>{title}</Text>
                {renderContent(dourous[title])}
              </View>
            ))}
        {!currentUser.admin && (
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => addUser(current)}
          >
            <Text style={styles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  item: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: "#444",
  },
  header: {
    fontSize: 20,
    alignSelf: "center",
    padding: 20,
    fontFamily: "serif",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subscribeButton: {
    backgroundColor: "blue",
    width: "40%",
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
