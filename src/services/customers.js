import firebase from 'firebase/app';
import 'firebase/firestore';

export const getCustomers = (callback) => {
  const db = firebase.firestore();
  db.collection('user-profiles')
    .get()
    .then((users) => users.docs.map((user) => ({ id: user.id, ...user.data() })))
    .then((users) => callback(users))
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

export const deleteCustomers = (uids, callback) => {
  const db = firebase.firestore();
  const batch = db.batch();

  uids.forEach((id) => {
    const userRef = db.collection('user-profiles').doc(id);
    batch.delete(userRef);
  });

  batch
    .commit()
    .then(() => {
      callback('Successfully deleted the customers');
    })
    .catch((e) => callback(`Was not able to delete the customers: ${e.message}`));
};
