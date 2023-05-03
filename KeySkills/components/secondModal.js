import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase/compat";

export default function SecondModal({
  secondMod,
  closeSecondModal,
  dourous,
  currentUser,
  current,
}) {
  addUser = async (id) => {
    try {
      const uid = firebase.auth().currentUser.uid;
      // Check if the current user exists in the users collection
      const userRef = firebase
        .firestore()
        .collection("Lessons")
        .doc(id)
        .collection("users")
        .doc(uid);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        console.log(`User ${uid} already exists in ${id}`);
      } else {
        // Add the current user to the users collection
        await userRef.set({
          uid,
        });
        console.log(`User ${uid} Added to ${id}`);
      }
    } catch (error) {
      console.error(error);
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
        {dourous &&
          Object.keys(dourous)
            .filter((title) => typeof dourous[title] !== "boolean")
            .map((title) => (
              <View key={title} style={styles.item}>
                <Text style={styles.title}>{title}</Text>
                {Array.isArray(dourous[title]) ? (
                  dourous[title].map((item) => (
                    <Text key={item} style={styles.content}>
                      {item}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.content}>{dourous[title]}</Text>
                )}
              </View>
            ))}
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            width: "40%",
            height: 50,
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          onPress={() => this.addUser(current)}
        >
          <Text style={{ color: "white" }}>Subscribe</Text>
        </TouchableOpacity>
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
});
