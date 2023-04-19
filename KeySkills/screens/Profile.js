import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import moment from "moment";
import React, { Component } from "react";
import { onLogOut } from "../components/Functions";

import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image source={{ uri: currentUser.profilePic }} style={styles.img} />
          <View style={styles.data}>
            <Text style={styles.datatext}>
              Full name: {currentUser.fullName}
            </Text>
            <Text style={styles.datatext}>Email: {currentUser.email}</Text>
            <Text style={styles.datatext}>
              Date of Birth:
              {moment(currentUser.dateBirth.seconds * 1000).format(
                "DD/MM/YYYY"
              )}
            </Text>
            <Text style={styles.datatext}>
              Phone number: {currentUser.phone}
            </Text>
          </View>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => onLogOut()}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  top: {
    flex: 4,
    width: "100%",
    alignItems: "center",
  },
  data: {
    borderWidth: 1,
    borderRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 50,
    paddingRight: 50,
    flex: 0.8,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  datatext: {
    fontSize: 15,
    fontWeight: "bold",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    paddingVertical: 20,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 50,
  },
  editButton: {
    backgroundColor: "#386BF6",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#386BF6",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  logoutButtonText: {
    color: "#386BF6",
    fontWeight: "bold",
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Profile);
