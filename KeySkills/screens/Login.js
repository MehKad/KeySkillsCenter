import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  Linking,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import firebase from "firebase/compat";

export default class Login extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     password: "",
  //     visible: false,
  //   };
  // }

  // onSignIn = () => {
  //   const { email, password } = this.state;
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       console.log(`Sign in: ${email}, ${password}`);
  //     })
  //     .catch((error) => alert(error));
  //   this.onToggleSnackBar();
  // };

  render() {
    // const { visible } = this.state;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.parent}>
          <View style={styles.container}>
            <Image source={require("./Images/KK.png")} style={styles.img} />
            <Text style={styles.title}>KeySkills Center</Text>
          </View>

          <View style={styles.body}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              // onChangeText={(email) => this.setState({ email })}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              // onChangeText={(password) => this.setState({ password })}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.button}
              // onPress={() => this.onSignIn()}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Se Connecter
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text>Pas de compte?</Text>
            <TouchableOpacity onPress={() => console.log("pressed signup")}>
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