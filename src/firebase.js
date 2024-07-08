import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBdv--7q3mLcjKK3MsKgH06fN7rvhGZAdw",
  authDomain: "netflix-clone-69a94.firebaseapp.com",
  projectId: "netflix-clone-69a94",
  storageBucket: "netflix-clone-69a94.appspot.com",
  messagingSenderId: "410758562192",
  appId: "1:410758562192:web:4f661be289594fca593315"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;