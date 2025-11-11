//src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWd_oefMIOJJXMVlV9oLoXuTyf-MT-1y4",
  authDomain: "ecommerce-2c53e.firebaseapp.com",
  projectId: "ecommerce-2c53e",
  storageBucket: "ecommerce-2c53e.firebasestorage.app",
  messagingSenderId: "410104718685",
  appId: "1:410104718685:web:d4ca8d2380db1bfe20b4b4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
