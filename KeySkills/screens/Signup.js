import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Login from "./Login";
import { createUser } from "../components/Functions";

export default class Signup extends Component {
  state = {
    dateBirth: "",
    email: "",
    fullName: "",
    phone: "",
    password: "",
  };

  handleCreateAccount = async () => {
    const { email, password, fullName, phone, dateBirth } = this.state;
    createUser(email, password, fullName, phone, dateBirth).catch((error) =>
      alert(error)
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.parent}>
          <View style={styles.container}>
            <Image source={require("../assets/KK.png")} style={styles.img} />
            <Text style={styles.title}>KeySkills Center</Text>
          </View>

          <View style={styles.body}>
            <TextInput
              style={styles.input}
              placeholder="Full name"
              onChangeText={(fullName) => this.setState({ fullName })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({ email })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              maxLength={10}
              onChangeText={(phone) => this.setState({ phone })}
            />
            <TextInput
              style={styles.input}
              placeholder="date of birth YYYY-MM-DD"
              keyboardType="numeric"
              onChangeText={(dateBirth) => this.setState({ dateBirth })}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleCreateAccount}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Create account
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text>Already have one?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.contact}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: "center",
    marginTop: "20%",
  },
  container: {
    alignItems: "center",
  },
  body: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footer: {
    flexDirection: "row",
    flex: 1,
  },
  img: {
    width: 350,
    height: 125,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  contact: {
    color: "#004AAD",
    fontWeight: "bold",
    marginLeft: 5,
  },
  input: {
    borderWidth: 2,
    padding: 8,
    width: 330,
    borderColor: "rgba(232, 236, 244, 1)",
    borderRadius: 8,
    marginTop: "5%",
  },
  button: {
    backgroundColor: "#004AAD",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 120,
    paddingRight: 120,
    marginTop: "5%",
    marginBottom: "10%",
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
  },
});
