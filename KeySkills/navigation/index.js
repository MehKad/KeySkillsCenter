import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Greetings from "../screens/greetings";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import * as firebase from "firebase/compat";

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyCk2F3xeaJlbmGRn5X2plycrjHX-9yQ8Cg",
  authDomain: "keyskillscenter.firebaseapp.com",
  projectId: "keyskillscenter",
  storageBucket: "keyskillscenter.appspot.com",
  messagingSenderId: "382673612861",
  appId: "1:382673612861:web:223b8a9a889850d9a57a54",
  measurementId: "G-1BKXK2X1K5",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Index = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default Index;
