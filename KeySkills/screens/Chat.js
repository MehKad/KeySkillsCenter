import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
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
    const { dispatch, testtest, users } = this.props;
    dispatch(fetchGcUsers(testtest[index]));
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

    return (
      <View style={styles.container}>
        {testtest && <Text style={styles.grouptitle}>Your groups are : </Text>}
        <View style={styles.cardsContainer}>
          {!currentUser.admin &&
            testtest.map((title, index) => (
              <TouchableOpacity
                style={styles.card}
                key={index}
                onPress={() => this.openChat(index)}
              >
                <Text>{title}</Text>
              </TouchableOpacity>
            ))}
        </View>

        {modalVisible && (
          <ChatModal
            show={modalVisible}
            groups={testtest[selectedChat]}
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
    backgroundColor: "lightgreen",
    borderRadius: 10,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
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
    fontFamily: "serif",
    fontWeight: "bold",
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
