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
import Signup from "./Signup";
import { signIn } from "../components/Functions";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onSignIn = () => {
    const { email, password } = this.state;
    signIn(email, password).catch((error) => alert(error));
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
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(email) => this.setState({ email })}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onSignIn()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Se Connecter
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text>Pas de compte?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.contact}>Sign up</Text>
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
    marginBottom: 80,
    marginTop: 10,
  },
  body: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    flex: 1,
  },
  img: {
    width: 500,
    height: 200,
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
});
