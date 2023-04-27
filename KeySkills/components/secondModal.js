import React from "react";
import { Modal, View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function SecondModal({ secondMod, closeSecondModal, dourous }) {
  return (
    <Modal visible={secondMod} animationType="slide">
      <View>
        <AntDesign
          name="close"
          size={24}
          onPress={closeSecondModal}
          style={{ alignSelf: "flex-end" }}
        />
        {Object.keys(dourous).map((title) => (
          <View key={title}>
            <Text>{title}</Text>
            {Array.isArray(dourous[title]) ? (
              dourous[title].map((item) => <Text key={item}>{item}</Text>)
            ) : (
              <Text>{dourous[title]}</Text>
            )}
          </View>
        ))}
      </View>
    </Modal>
  );
}
