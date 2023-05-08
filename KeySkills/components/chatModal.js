import { StyleSheet, View, Modal, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase/compat";

import { GiftedChat } from "react-native-gifted-chat";

export default function ChatModal({ close, groups, show, users, current }) {
  const [messages, setMessages] = useState([]);

  const currentUser = users.find(
    (user) => user.id === firebase.auth().currentUser.uid
  );

  const isCurrentUserConfirmed = currentUser?.data?.confirmed;

  const fetchMessage = () => {
    const messagesRef = firebase
      .firestore()
      .collection("Lessons")
      .doc(groups)
      .collection("messages")
      .orderBy("createdAt", "desc");
    messagesRef.onSnapshot((querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: {
          _id: doc.data().user._id,
          fullName: doc.data().user.fullName,
          avatar: doc.data().user.avatar,
        },
      }));
      setMessages(messages);
    });
  };
  useEffect(() => {
    fetchMessage();
  }, []);

  const onSend = (messages = []) => {
    const newMessage = messages[0];

    firebase
      .firestore()
      .collection("Lessons")
      .doc(groups)
      .collection("messages")
      .add({
        text: newMessage.text,
        createdAt: firebase.firestore.Timestamp.now(),
        user: {
          _id: newMessage.user._id,
          fullName: newMessage.user.name,
          avatar: newMessage.user.avatar,
        },
      })
      .then(() => console.log("Successfully sent message"))
      .catch((error) => console.error(error));
  };

  return (
    <Modal visible={show} animationType="slide" onRequestClose={close}>
      {isCurrentUserConfirmed ? (
        <View style={styles.modalContent}>
          <AntDesign
            name="close"
            size={24}
            onPress={close}
            style={styles.closeButton}
          />
          <GiftedChat
            showUserAvatar
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: firebase.auth().currentUser.uid,
              name: current.fullName,
              avatar: current.profilePic,
            }}
          />
        </View>
      ) : (
        <View style={styles.modalContent}>
          <AntDesign
            name="close"
            size={24}
            onPress={close}
            style={styles.closeButton}
          />
          <Text style={styles.title}>You need to be verified first.</Text>
        </View>
      )}
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
  title: {
    fontSize: 20,
    alignSelf: "center",
    padding: 10,
    paddingTop: 25,
    fontFamily: "serif",
    fontWeight: "bold",
  },
});
