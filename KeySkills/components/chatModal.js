import { Text, StyleSheet, View, Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function chatModal({ close, groups, show, users }) {
  return (
    <Modal visible={show} animationType="slide" onRequestClose={close}>
      <View style={styles.modalContent}>
        <AntDesign
          name="close"
          size={24}
          onPress={close}
          style={styles.closeButton}
        />
        <Text>Chat group name : {groups}</Text>

        <Text>The users are : </Text>
        {users.map((name, index) => (
          <Text key={index}>{name}</Text>
        ))}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 25,
  },
});
