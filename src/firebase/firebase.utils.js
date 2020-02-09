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
    appId: "1:339259654192:web:045856451ce5ddffb12df5",
    measurementId: "G-0XZDNRY0E7"
  }

export const createUserProfileDocument = async (userAuth,additionalData) => {

	if(!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapshot = await userRef.get();

	if(!snapshot.exist){

		const { email, displayName} = userAuth;

		const createdAt = new Date();

		try{

			await userRef.set({
				email,
				displayName,
				createdAt,
				...additionalData
			})
		}
		catch(error){

			console.log('error creating user',error.message);
		}
	}

	return userRef;

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
