import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { AnimatedFAB } from "react-native-paper";
import firebase from "firebase/compat";

export default function FirstModal({
  showModal,
  closeModal,
  Lessons,
  fetchD,
  currentUser,
  test,
}) {
  const [lessonName, setLessonName] = useState("");

  const [lessonModalVisible, setLessonModalVisible] = useState(false);

  const handleSave = (test) => {
    setLessonName(lessonName);
    addLesson(test);
    closeLessonModal();
  };

  const openLessonModal = () => {
    setLessonModalVisible(true);
  };

  const closeLessonModal = () => {
    setLessonModalVisible(false);
  };

  const addLesson = (id) => {
    firebase
      .firestore()
      .collection("Lessons")
      .doc(lessonName)
      .set({
        [id]: true,
      })
      .then(() => {
        console.log(`Lesson document "${lessonName}" written with ID: ${id}`);

        const usersCollection = firebase
          .firestore()
          .collection("Lessons")
          .doc(lessonName)
          .collection("users");
        const defaultUserDoc = usersCollection.doc(
          "zWAp3jOoiea0sqW4rvi3laswbl22"
        );
        defaultUserDoc
          .set({})
          .then(() => {
            console.log(
              `Default user document created in the "users" sub-collection for lesson "${lessonName}"`
            );
          })
          .catch((error) => {
            console.error(
              `Error creating default user document in the "users" sub-collection for lesson "${lessonName}":`,
              error
            );
          });
      })
      .catch((error) => {
        console.error(`Error adding lesson document "${lessonName}": `, error);
      });
  };

  const deleteL = (id) => {
    firebase
      .firestore()
      .collection("Lessons")
      .doc(id)
      .delete()
      .then(() => Alert.alert("deleted ", `${id} has just been deleted`));
  };

  return (
    <Modal visible={showModal} animationType="slide">
      <View style={styles.modalContainer}>
        <AntDesign
          name="close"
          size={24}
          onPress={closeModal}
          style={{ alignSelf: "flex-end" }}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Lessons : </Text>
        </View>
        <View style={styles.lescours}>
          {Lessons.map((cours) => (
            <TouchableOpacity
              style={styles.small}
              onPress={() => fetchD(cours)}
              key={cours}
            >
              <Text style={{ color: "white" }}>{cours}</Text>
              {currentUser.admin && (
                <AntDesign
                  name="delete"
                  size={24}
                  onPress={() => deleteL(cours)}
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
              openLessonModal();
            }}
            // onPress={openLessonModal}
            animateFrom={"right"}
            iconMode={"dynamic"}
            style={styles.fabStyle}
          />
        )}
      </View>
      <Modal
        visible={lessonModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeLessonModal}
      >
        <TouchableOpacity style={styles.overlay} onPress={closeLessonModal}>
          <View style={styles.addMod}>
            <AntDesign
              name="close"
              size={24}
              onPress={closeLessonModal}
              style={{ alignSelf: "flex-end", marginBottom: 10 }}
            />
            <TextInput
              placeholder="Lesson name"
              onChangeText={(text) => setLessonName(text)}
              maxLength={50}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSave(test)}
            >
              <Text style={{ color: "white" }}>Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    marginTop: StatusBar.currentHeight,
    flex: 1,
    alignItems: "center",
  },
  addMod: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "35%",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  lescours: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 20,
  },
  fabStyle: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  saveButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 20,
    alignSelf: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
