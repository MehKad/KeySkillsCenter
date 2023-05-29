import firebase from "firebase/compat";
import {
  USER_STATE_CHANGE,
  FETCH_CURRENT_USER_LESSONS,
  FETCH_ALL_FORMATIONS,
  FETCH_ALL_LESSONS,
  FETCH_DATA,
  FETCH_CURRENT,
  FETCH_GC_USERS,
  FETCH_ADMIN_LESSONS,
} from "../constants";

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
          dispatch(fetchAllFormation());
          dispatch(fetchAdminLessons());
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
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("Lessons")
      .onSnapshot((snapshot) => {
        const names = snapshot.docs.map((test) => test.id);
        const images = snapshot.docs.map((test) => test.data().image);
        const requests = names.map((id, index) => {
          return firebase
            .firestore()
            .collection("Lessons")
            .doc(id)
            .collection("users")
            .onSnapshot((snapshot) =>
              snapshot.docs.map((doc) => {
                if (doc.id == uid) {
                  let previous = getState().userState.testtest;
                  let testtest = [];
                  testtest.push({ name: id, image: images[index] });
                  testtest = testtest.concat(previous);
                  dispatch({ type: FETCH_CURRENT_USER_LESSONS, testtest });
                }
              })
            );
        });
      });
  };
};

export const fetchAllFormation = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("formation")
      .onSnapshot((snapshot) => {
        const formationNames = snapshot.docs.map((formation) => formation.id);
        dispatch({ type: FETCH_ALL_FORMATIONS, formations: formationNames });
      });
  };
};

export const fetchAllLessons = (name) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("Lessons")
      .where(name, "==", true)
      .onSnapshot((snapshot) => {
        const lessonNames = snapshot.docs.map((lesson) => lesson.id);
        dispatch({ type: FETCH_ALL_LESSONS, lessons: lessonNames });
      });
  };
};

export const fetchAdminLessons = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("Lessons")
      .onSnapshot((snapshot) => {
        const lessos = snapshot.docs.map((name) => name.id);
        dispatch({ type: FETCH_ADMIN_LESSONS, lessonsAdmin: lessos });
      });
  };
};

export const fetchAllData = (id) => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("Lessons")
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data();
        const dourous = {};
        Object.keys(data).forEach((title) => {
          const info = data[title];
          dourous[title] = info;
        });
        dispatch({ type: FETCH_DATA, data: dourous });
        dispatch(getcurrent(id));
      });
  };
};

export const getcurrent = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_CURRENT, current: id });
  };
};

export const fetchGcUsers = (id) => {
  return (dispatch) => {
    const test = firebase
      .firestore()
      .collection("Lessons")
      .doc(id)
      .collection("users");
    const users = [];

    test
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, data: doc.data() });
        });
        dispatch({ type: FETCH_GC_USERS, users: users });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
