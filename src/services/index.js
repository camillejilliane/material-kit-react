import firebase from 'firebase/app';
import 'firebase/firestore';

const initFirebase = () => {
  const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`, // Firebase Web API key
    authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`, // project-id.firebaseapp.com
    databaseURL: `https://${process.env.REACT_APP_PROJECT_ID}.firebaseio.com`, // https://project-id.firebaseio.com
    projectId: `${process.env.REACT_APP_PROJECT_ID}`, // project-id
    storageBucket: `gs://${process.env.REACT_APP_PROJECT_ID}.appspot.com`, // project-id.appspot.com
    messagingSenderId: `${process.env.REACT_APP_SENDER_ID}`, // sender-id
    appId: `${process.env.REACT_APP_FB_APP_ID}`, // facebook app id
    measurementId: `${process.env.REACT_APP_G_MEASURE_ID}` // google analytics id
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

export default initFirebase;
