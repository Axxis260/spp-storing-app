// firebase.js (of een apart bestand als je wilt)
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, signInAnonymously } from "firebase/auth";

// Jouw eigen configuratie hier plaatsen!

const firebaseConfig = {
    apiKey: "AIzaSyCXLiGBdPLTtUKk6IRfq-FWz4sZc1c7rCk",
    authDomain: "spp-storing-app.firebaseapp.com",
    projectId: "spp-storing-app",
    storageBucket: "spp-storing-app.appspot.com",
    messagingSenderId: "230498060957",
    appId: "1:230498060957:web:ad9a7d6fd321555a9ea274",
    measurementId: "G-W5J754LYW0"
  };

// Firebase initialiseren
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);


// Log direct in als anonieme gebruiker
signInAnonymously(auth).catch((error) => console.error("Auth error:", error));

export { storage, auth };
