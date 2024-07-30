// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAv_-blHLdWFFBEtvu6G715sR7N7iEFc24",
    authDomain: "bookapp-e48cc.firebaseapp.com",
    databaseURL: "https://bookapp-e48cc-default-rtdb.firebaseio.com",
    projectId: "bookapp-e48cc",
    storageBucket: "bookapp-e48cc.appspot.com",
    messagingSenderId: "992287778411",
    appId: "1:992287778411:web:b982ff9c2d467bf9d6732e"
  };

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const REALTIME_DB = getDatabase(FIREBASE_APP);
