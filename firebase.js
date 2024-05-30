// // Initialize Firestore
// const firestore = firebase.firestore();

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// import { getFirestore } from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCvrv7ZN7a-cnGID2kOsa_PCPeMTbxSW9E",
//   authDomain: "pot-membership.firebaseapp.com",
//   projectId: "pot-membership",
//   storageBucket: "pot-membership.appspot.com",
//   messagingSenderId: "283568190276",
//   appId: "1:283568190276:web:a7ef143537bbb5b2831d11"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

// onAuthStateChanged(auth, user => {
//     if(user != null) {
//         console.log('Logged in!')
//     } else {
//         console.log('No user')
//     }
// })


import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCvrv7ZN7a-cnGID2kOsa_PCPeMTbxSW9E",
  authDomain: "pot-membership.firebaseapp.com",
  projectId: "pot-membership",
  storageBucket: "pot-membership.appspot.com",
  messagingSenderId: "283568190276",
  appId: "1:283568190276:web:a7ef143537bbb5b2831d11"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };