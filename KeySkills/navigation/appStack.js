import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Formation from "../screens/Formation";
import Chat from "../screens/Chat";

const Tab = createMaterialBottomTabNavigator();

export default class AppStack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        shifting={true}
        activeColor="#386BF6"
        inactiveColor="#9DB2CE"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = focused ? "home" : "home-outline";
                break;
              case "Formation":
                iconName = focused ? "book" : "book-outline";
                break;
              case "Chat":
                iconName = focused ? "chatbubbles" : "chatbubbles-outline";
                break;
              case "Profile":
                iconName = focused ? "person-circle" : "person-circle-outline";
                break;
            }
            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Formation" component={Formation} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}
