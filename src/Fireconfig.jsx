// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

import { getApp } from "firebase/app";
import {  doc, getDoc } from "firebase/firestore";
import { getStorage, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDj0cYH69BlpT_-0H8wQmytygJ0W_vG_w",
  authDomain: "e-commerce-96fd8.firebaseapp.com",
  projectId: "e-commerce-96fd8",
  storageBucket: "e-commerce-96fd8.appspot.com",
  messagingSenderId: "382580325992",
  appId: "1:382580325992:web:a719e9c94694c4423685dd",
  measurementId: "G-SGTFQ8W1K9",
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
const firebaseApp = getApp();
export const storage = getStorage(app);
export {  doc, getDoc ,getDownloadURL };