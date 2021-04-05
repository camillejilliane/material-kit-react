import firebase from 'firebase/app';
import 'firebase/auth';

export const getCurrentUser = (callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  if (auth.currentUser) {
    const { uid, email } = auth.currentUser;

    db.collection('user-profiles')
      .doc(uid)
      .get()
      .then((userProfile) => callback({
        id: uid,
        ...userProfile.data(),
        email
      }))
      .catch((e) => console.log(e));
  }
};

export const updateUserProfile = (body, callback) => {
  const auth = firebase.auth();
  const db = firebase.firestore();
  const currentUserUID = auth.currentUser.uid;

  db.collection('user-profiles')
    .doc(currentUserUID)
    .update(body)
    .then(() => callback('Successfully updated your details!'))
    .catch((e) => {
      callback(
        `Could not update your details because of the following: ${e.message}`
      );
    });
};

export const updatePassword = (password, callback) => {
  const auth = firebase.auth();
  const { currentUser } = auth;

  currentUser
    .updatePassword(password)
    .then(() => {
      callback('Successfully updated your password.');
    })
    .catch((e) => {
      callback(`Could not update your password: ${e.message}`);
    });
};
