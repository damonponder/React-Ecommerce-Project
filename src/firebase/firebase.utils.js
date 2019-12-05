import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDeQYmbaOish3xkYxsowqMSIkNGacskSNg",
  authDomain: "ecommerce-react-56f38.firebaseapp.com",
  databaseURL: "https://ecommerce-react-56f38.firebaseio.com",
  projectId: "ecommerce-react-56f38",
  storageBucket: "ecommerce-react-56f38.appspot.com",
  messagingSenderId: "956564720936",
  appId: "1:956564720936:web:6350af81c09fcc73c1941d"
};

firebase.initializeApp(config);

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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
