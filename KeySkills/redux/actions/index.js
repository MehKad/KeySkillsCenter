import firebase from "firebase/compat";
import { USER_STATE_CHANGE } from "../constants";

export function fetchUser() {
  const uid = firebase.auth().currentUser.uid;
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          let currentUser = snapshot.data();
          dispatch({ type: USER_STATE_CHANGE, currentUser });
        } else {
          console.log("does not exist");
        }
      });
  };
}
