import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import logo from "./Images/Keyskills.png";

class Greetings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>
            Il vaut mieux investir sur les compétences, plutôt que de subir le
            coût de l'incompétence
          </Text>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => console.log("Pressed")}
          >
            Get Started
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    width: "100%",
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: "#217a7e",
  },
  logo: {
    width: "50%",
    height: "25%",
    position: "absolute",
    bottom: "-8%",
    left: "25%",
  },
  content: {
    flex: 1.5,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  button: {
    backgroundColor: "#0653da",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default Greetings;
