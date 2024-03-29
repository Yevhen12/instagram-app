import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRo1UPdTrngpcpHG1iY5w3wXbeepOjCpE",
  authDomain: "instagram-fce78.firebaseapp.com",
  databaseURL: "https://instagram-fce78-default-rtdb.firebaseio.com",
  projectId: "instagram-fce78",
  storageBucket: "instagram-fce78.appspot.com",
  messagingSenderId: "1056482395357",
  appId: "1:1056482395357:web:cfdfbf53364e619b320734"
};

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase)
const db = getFirestore(firebase)
const auth = getAuth();

export { firebase, storage, db, auth }
