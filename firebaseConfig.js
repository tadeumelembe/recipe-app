import * as firebase from "firebase/app";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  initializeAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

let app;
if (firebase.getApps().length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.getApp();
}

// getReactNativePersistence moved to the main firebase/auth entry in v10+;
// the old firebase/auth/react-native subpath no longer exists.
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage(app);
const db = getFirestore(app);

export {
  auth,
  db,
  storage,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
};
