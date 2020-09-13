import firebase from "firebase";
import firebaseConfig from "./keys";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
