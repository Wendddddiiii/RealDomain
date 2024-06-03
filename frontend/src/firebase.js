// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "realdomain-21069.firebaseapp.com",
    projectId: "realdomain-21069",
    storageBucket: "realdomain-21069.appspot.com",
    messagingSenderId: "561472636706",
    appId: "1:561472636706:web:b4b50de92a05f72330c77b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);