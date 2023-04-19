import firebase from "firebase/compat";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const signIn = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      console.log(`Sign in: ${email}, ${password}`);
    })
    .catch((error) => alert(error));
};

export const createUser = async (
  email,
  password,
  fullName,
  phone,
  dateBirth,
  image
) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateBirth)) {
    throw new Error("Invalid date format");
  }

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const userId = firebase.auth().currentUser.uid;
    const dateOfBirthTimestamp = firebase.firestore.Timestamp.fromDate(
      new Date(dateBirth)
    );
    const response = await fetch(image);
    const blob = await response.blob();
    const childPath = `${userId}`;
    const storage = getStorage();
    const storageRef = ref(storage, childPath);
    const snapshot = await uploadBytes(storageRef, blob);
    console.log("Image success");
    const profilePic = await getDownloadURL(snapshot.ref);
    await firebase.firestore().collection("users").doc(userId).set({
      admin: false,
      fullName,
      dateBirth: dateOfBirthTimestamp,
      phone,
      email,
      profilePic,
    });

    console.log(`Created new user: ${email}, ${password}, uid: ${userId}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const onLogOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log("Signed out"))
    .catch((error) => alert(error));
  return true;
};
