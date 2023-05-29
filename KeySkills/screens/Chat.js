import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from "react-native";
import { connect } from "react-redux";

import ChatModal from "../components/chatModal";
import { fetchGcUsers } from "../redux/actions";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedChat: null,
      messages: [],
    };
  }

  openChat = (index) => {
    const { dispatch, testtest } = this.props;
    const testtitles = testtest.map((item) => item.name);
    dispatch(fetchGcUsers(testtitles[index]));
    this.openModal(index);
  };

  openModal = (index) => {
    this.setState({
      selectedChat: index,
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      selectedChat: null,
      modalVisible: false,
    });
  };

  render() {
    const { testtest, currentUser, users } = this.props;
    const { modalVisible, selectedChat } = this.state;

    const testtitles = testtest.map((item) => item.name);

    return (
      <View style={styles.container}>
        {testtest.length > 0 && (
          <Text style={styles.grouptitle}>Chat groups</Text>
        )}

        {testtest.length == 0 && (
          <Text style={styles.desc}>
            You're not subscribed to any of the offered lessons
          </Text>
        )}

        <View style={styles.cardsContainer}>
          {!currentUser.admin &&
            testtest.map((item, index) => (
              <TouchableOpacity
                style={styles.card}
                key={index}
                onPress={() => this.openChat(index)}
              >
                <Text style={styles.title}>{item.name}</Text>
                <Image source={{ uri: item.image }} style={styles.cardImage} />
              </TouchableOpacity>
            ))}
          {currentUser.admin && (
            <Text style={styles.desc}>
              You are a Teacher, you don't have access to the chatgroups
            </Text>
          )}
        </View>

        {modalVisible && (
          <ChatModal
            show={modalVisible}
            groups={testtitles[selectedChat]}
            close={this.closeModal}
            users={users}
            current={currentUser}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
  cardsContainer: {
    justifyContent: "space-between",
    padding: 20,
  },
  card: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  modalContent: {
    height: "100%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 25,
  },
  grouptitle: {
    fontSize: 20,
    alignSelf: "center",
    padding: 10,
    paddingTop: 25,
    fontWeight: "bold",
  },
  cardImage: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginRight: 20,
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  desc: {
    fontSize: 15,
    textAlign: "center",
  },
});

const mapStateToProps = (store) => {
  return {
    currentUser: store.userState.currentUser,
    testtest: store.userState.testtest,
    users: store.userState.users,
  };
};

export default connect(mapStateToProps, null)(Chat);
