// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_EgX73UQ1uJO3icWten6DrRbkPAXHGuo",
  authDomain: "vpppc-e2bf0.firebaseapp.com",
  projectId: "vpppc-e2bf0",
  storageBucket: "vpppc-e2bf0.appspot.com",
  messagingSenderId: "467083926654",
  appId: "1:467083926654:web:836e49103c934a47898c2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)