import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Greetings from "../screens/greetings";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Stack = createNativeStackNavigator();

export default class AuthStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Greetings">
        <Stack.Screen
          name="Greetings"
          component={Greetings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}
