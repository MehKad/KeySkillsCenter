import React from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SecondModal({ secondMod, closeSecondModal, dourous }) {
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
