import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function FirstModal({ showModal, closeModal, Lessons, fetchD }) {
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
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
});
