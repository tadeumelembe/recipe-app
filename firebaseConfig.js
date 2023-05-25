import * as firebase from 'firebase/app';
import { FIREBASE_KEY, FIREBASE_MESSAGIN_ID, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID } from "@env"
import { getAuth, createUserWithEmailAndPassword, updateProfile }from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
    apiKey: `${FIREBASE_KEY}`,
    authDomain: { FIREBASE_AUTH_DOMAIN },
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    projectId: { FIREBASE_PROJECT_ID },
    storageBucket: 'project-id.appspot.com',
    messagingSenderId: { FIREBASE_MESSAGIN_ID },
    appId: `${FIREBASE_APP_ID}`,
    measurementId: 'G-measurement-id',
};

let app;
if (firebase.getApps().length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.getApp();
}

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, updateProfile }; 