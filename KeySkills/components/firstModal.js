import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function FirstModal({
  showModal,
  closeModal,
  Lessons,
  fetchAllData,
}) {
  return (
    <Modal visible={showModal} animationType="slide">
      <View style={styles.modalContainer}>
        <AntDesign
          name="close"
          size={24}
          onPress={closeModal}
          style={{ alignSelf: "flex-end" }}
        />
        <Text style={styles.title}>Lessons: </Text>
        {Lessons.map((cours) => (
          <TouchableOpacity
            style={styles.small}
            onPress={() => fetchAllData(cours)}
            key={cours}
          >
            <Text>{cours}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
