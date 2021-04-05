const admin = require('firebase-admin');

export const getCustomers = (callback) => {
  console.log(admin);
  const db = admin.firestore();
  db.collection('user-profiles')
    .get()
    .then((users) => users.docs.map((user) => ({ id: user.id, ...user.data() })))
    .then((users) => callback(users))
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

export default {
  getCustomers
};
