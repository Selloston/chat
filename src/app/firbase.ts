// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDq8LmdcyIj-JlXFHhPuD8j3tVouJeo6EY',
  authDomain: 'chat-5f469.firebaseapp.com',
  projectId: 'chat-5f469',
  storageBucket: 'chat-5f469.appspot.com',
  messagingSenderId: '179856152021',
  appId: '1:179856152021:web:0bdfe6adcfb0786580995c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore };
