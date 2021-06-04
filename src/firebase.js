// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const fire = firebase.initializeApp({
    apiKey: "AIzaSyBED2lOi4pnviP1rX4q3obUiF-ZKzdpGVI",
    authDomain: "semeron-78ccd.firebaseapp.com",
    projectId: "semeron-78ccd",
    storageBucket: "semeron-78ccd.appspot.com",
    messagingSenderId: "135609926094",
    appId: "1:135609926094:web:8ee17c012e7894fa98ab9f"
});
export const auth = fire.auth();
export const db = fire.firestore();
export default {
    fire,
};