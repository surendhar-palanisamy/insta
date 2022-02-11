// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCI6yCKkiFNszGysZrZAI6yx6o6dWYxu_4",
    authDomain: "instaclone-457e6.firebaseapp.com",
    projectId: "instaclone-457e6",
    storageBucket: "instaclone-457e6.appspot.com",
    messagingSenderId: "360427894775",
    appId: "1:360427894775:web:4c4efb1ef1d59115ae60f2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();


export { app, db, storage };