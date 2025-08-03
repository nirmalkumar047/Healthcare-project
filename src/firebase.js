// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtoziSub6WrPqgOaIfv5cGLSXLRzk3cl0",
  authDomain: "healthone-41469.firebaseapp.com",
  projectId: "healthone-41469",
  storageBucket: "healthone-41469.firebasestorage.app",
  messagingSenderId: "40967991818",
  appId: "1:40967991818:web:28a2b58973baa5647465f3",
  measurementId: "G-333B61R59G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);