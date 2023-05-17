import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAns6si6vqhWYRyU8Ty8sbBlGDyuNdp_Sg",
  authDomain: "tubes-pam-f22ec.firebaseapp.com",
  databaseURL:
    "https://tubes-pam-f22ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tubes-pam-f22ec",
  storageBucket: "tubes-pam-f22ec.appspot.com",
  messagingSenderId: "1084103493801",
  appId: "1:1084103493801:web:69675e8745e37a2a5201b8",
  measurementId: "G-6DZQML423C",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
const storage = getStorage();

export { db, storage, firebase };
