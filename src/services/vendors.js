import firebase from 'firebase/app';
import 'firebase/firestore';

export const getVendors = (callback) => {
  const db = firebase.firestore();
  db.collection('vendor-profiles')
    .get()
    .then((vendors) => vendors.docs.map((user) => ({ id: user.id, ...user.data() })))
    .then((vendors) => callback(vendors))
    .catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
    });
};

export const approveVendors = (uids, callback) => {
  const db = firebase.firestore();
  const batch = db.batch();

  uids.forEach((id) => {
    const vendorRef = db.collection('vendor-profiles').doc(id);
    batch.update(vendorRef, { isApproved: true });
  });

  batch
    .commit()
    .then(() => {
      callback('Successfully approved the vendors');
    })
    .catch((e) => callback(`Was not able to approve the vendors: ${e.message}`));
};
