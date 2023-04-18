import firebase from "firebase/compat";

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
  dateBirth
) => {
  //Validating date
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
    await firebase.firestore().collection("users").doc(userId).set({
      admin: false,
      fullName,
      dateBirth: dateOfBirthTimestamp,
      phone,
      email,
    });
    console.log(`Created new user: ${email}, ${password}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
