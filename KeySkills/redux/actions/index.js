import firebase from "firebase/compat";
import { USER_STATE_CHANGE, FETCH_CURRENT_USER_LESSONS } from "../constants";

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
          if (!currentUser.admin) {
            dispatch(fetchCurrentUserLessons(uid));
          }
        } else {
          console.log("does not exist");
        }
      });
  };
}

export const fetchCurrentUserLessons = (uid) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("Lessons")
      .onSnapshot((snapshot) => {
        const names = snapshot.docs.map((test) => test.id);
        const promises = names.map((id) => {
          return firebase
            .firestore()
            .collection("Lessons")
            .doc(id)
            .collection("users")
            .get();
        });

        Promise.all(promises)
          .then((snapshots) => {
            let testtest = [];
            snapshots.forEach((querySnapshot, index) => {
              const id = names[index];
              querySnapshot.forEach((doc) => {
                if (doc.id === uid) {
                  testtest.push(id);
                }
              });
            });
            dispatch({
              type: FETCH_CURRENT_USER_LESSONS,
              testtest: testtest,
            });
          })
          .catch((error) => {
            console.log("Error getting user documents: ", error);
          });
      });
  };
};
