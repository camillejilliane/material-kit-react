import firebase from 'firebase/app';
import 'firebase/auth';

export const loginUser = (email, password, callback) => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          callback(true, 'Successfully logged in!');
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          callback(false, error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      callback(false, error.message);
    });

  // const db = firebase.firestore();
  // db.collection('admin-users')
  //   .where('email', '==', email)
  //   .get()
  //   .then((user) => {
  //     if (user.exists) {
  //       console.log('User exists');
  //       firebase
  //         .auth()
  //         .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  //         .then(() => {
  //           firebase
  //             .auth()
  //             .signInWithEmailAndPassword(email, password)
  //             .then(() => {
  //               callback(true, 'Successfully logged in!');
  //             })
  //             .catch((error) => {
  //               const errorCode = error.code;
  //               console.log(errorCode);
  //               callback(false, error.message);
  //             });
  //         })
  //         .catch((error) => {
  //           const errorCode = error.code;
  //           console.log(errorCode);
  //           callback(false, error.message);
  //         });
  //     }
  //   });
};

export const signOutUser = async (setIsLoggedIn) => {
  try {
    await firebase.auth().signOut();
    setIsLoggedIn(false);
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthenticated = (setLoggedIn) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return unsubscribe;
};

export const authOnOpen = (navigation) => {
  const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashNav' }]
      });
    }
  });

  return unsubscribe;
};
