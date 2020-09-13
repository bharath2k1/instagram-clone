import firebase from "firebase";
import firebaseConfig from "./keys";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export default db;
