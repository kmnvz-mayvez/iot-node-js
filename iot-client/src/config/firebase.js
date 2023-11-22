/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider}  from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDT-gL-eBBxWQv5WRfJl7dKLeUmIqizRh4",
    authDomain: "fir-iot-19456.firebaseapp.com",
    databaseURL: "https://fir-iot-19456-default-rtdb.firebaseio.com",
    projectId: "fir-iot-19456",
    storageBucket: "fir-iot-19456.appspot.com",
    messagingSenderId: "977376127549",
    appId: "1:977376127549:web:004717768a913d3a599854"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()