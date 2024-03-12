// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtuIQ-mFfOnIifD17lG0dapbBp3zk6n5o",
  authDomain: "mathing-prototype-last.firebaseapp.com",
  projectId: "mathing-prototype-last",
  storageBucket: "mathing-prototype-last.appspot.com",
  messagingSenderId: "62392934107",
  appId: "1:62392934107:web:1bfa5a1959ba9cf500f6fe",
  measurementId: "G-NH3TK3G12C"
 
};

 //  Disable two step verification strip backup code: gvpv-rehn-nuoj-qnoi-bxam
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {auth}
export {db}
export const initFirebase = () => {
  return app;
};