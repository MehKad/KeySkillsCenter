import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase/compat";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Reducer from "../redux/reducers";
import AuthStack from "./authStack";
import AppStack from "./appStack";

const store = createStore(Reducer, applyMiddleware(thunk));

//Firebase config

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

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ loggedIn: user });
    });
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <NavigationContainer>
        {loggedIn ? (
          <Provider store={store}>
            <AppStack />
          </Provider>
        ) : (
          <AuthStack />
        )}
      </NavigationContainer>
    );
  }
}
