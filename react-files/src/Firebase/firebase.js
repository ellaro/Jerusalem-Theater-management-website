import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCU2lcoRLGSsst3E7nbiYKU6JZx28pRKzM",
  authDomain: "theater2-d72bc.firebaseapp.com",
  projectId: "theater2-d72bc",
  storageBucket: "theater2-d72bc.appspot.com",
  messagingSenderId: "627448883483",
  appId: "1:627448883483:web:2e85d8d5970f5cf0164bbe",
  measurementId: "G-G47MB34FES"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage= firebase.storage();