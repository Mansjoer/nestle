import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// IMPORTANT: Replace the placeholder values with your own Firebase project configuration.
const firebaseConfig = {
  apiKey: "AIzaSyAQKnNKwCs8roNmc2ScijAIGWrBXl36HXY",
  authDomain: "event-tracker-d0k85.firebaseapp.com",
  projectId: "event-tracker-d0k85",
  storageBucket: "event-tracker-d0k85.firebasestorage.app",
  messagingSenderId: "907246123585",
  appId: "1:907246123585:web:e4b02b7b84f0182e3ce4c0",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
