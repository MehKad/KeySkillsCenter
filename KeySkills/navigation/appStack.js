import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchUser } from "../redux/actions";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Formation from "../screens/Formation";
import Chat from "../screens/Chat";
import { Button } from "react-native-paper";

const Tab = createMaterialBottomTabNavigator();

class AppStack extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button loading={true} mode="text" textColor="#386BF6">
            Loading
          </Button>
        </View>
      );
    } else {
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
                  iconName = focused
                    ? "person-circle"
                    : "person-circle-outline";
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
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(AppStack);
