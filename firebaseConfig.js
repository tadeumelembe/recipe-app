import * as firebase from "firebase/app";
import {
  FIREBASE_KEY,
  FIREBASE_MESSAGIN_ID,
  FIREBASE_APP_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MESSAGING_ID,
} from "@env";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  initializeAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${FIREBASE_KEY}`,
  authDomain: `${FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: { FIREBASE_PROJECT_ID },
  storageBucket: `${FIREBASE_MESSAGING_ID}.appspot.com`,
  messagingSenderId: { FIREBASE_MESSAGIN_ID },
  appId: `${FIREBASE_APP_ID}`,
  measurementId: "G-measurement-id",
};

let app;
if (firebase.getApps().length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.getApp();
}

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
