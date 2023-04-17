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
import * as ImagePicker from "expo-image-picker";

export default class Signup extends Component {
  state = {
    image: null,
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    let { image } = this.state;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.parent}>
          <View style={styles.container}>
            <Image source={require("./Images/KK.png")} style={styles.img} />
            <Text style={styles.title}>KeySkills Center</Text>
          </View>

          <View style={styles.body}>
            <TouchableOpacity onPress={this.pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.image} />
              ) : (
                <Text style={styles.buttonText}>Add your profile picture</Text>
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Full name"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              keyboardType="numeric"
              maxLength={10}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="date of birth (MMDDYYYY)"
              onChangeText={(date) => console.log(date)}
              keyboardType="numeric"
              maxLength={8}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Create account
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text>Already have one?</Text>
            <TouchableOpacity onPress={() => console.log("pressed signup")}>
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
