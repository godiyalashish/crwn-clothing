import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBqzool-XT7XYlWdIIT4A8AJacK13mZ70g",
    authDomain: "crwncloth-db.firebaseapp.com",
    databaseURL: "https://crwncloth-db.firebaseio.com",
    projectId: "crwncloth-db",
    storageBucket: "crwncloth-db.appspot.com",
    messagingSenderId: "339259654192",
    appId: "1:339259654192:web:f1405a7e35f6e2eeb12df5",
    measurementId: "G-X8NXSDMC48"
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
  'prompt': 'select_account'
	});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
