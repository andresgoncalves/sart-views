import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJgcma6GJiFZ9W23BwiIebyfXJ47ydhNY",
  authDomain: "sart-views.firebaseapp.com",
  projectId: "sart-views",
  storageBucket: "sart-views.appspot.com",
  messagingSenderId: "1098980578820",
  appId: "1:1098980578820:web:c8d7ab1ee06c5e8e0e8751",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
