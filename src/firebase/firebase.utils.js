import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/firebase-auth';

const config = {
  apiKey: 'AIzaSyBvE9zxwrJboV3uDZO7xAbtGWpn7st1Kow',
  authDomain: 'crwn-db-a57f4.firebaseapp.com',
  databaseURL: 'https://crwn-db-a57f4.firebaseio.com',
  projectId: 'crwn-db-a57f4',
  storageBucket: 'crwn-db-a57f4.appspot.com',
  messagingSenderId: '419111163927',
  appId: '1:419111163927:web:fa2560447572fb2c9d2452',
  measurementId: 'G-TJW6QHN40V',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('Error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
