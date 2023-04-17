import React, { Component } from "react";
import Home from "../screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default class AppStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}
