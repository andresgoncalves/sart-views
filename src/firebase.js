import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDJgcma6GJiFZ9W23BwiIebyfXJ47ydhNY",
  authDomain: "sart-views.firebaseapp.com",
  projectId: "sart-views",
  storageBucket: "sart-views.appspot.com",
  messagingSenderId: "1098980578820",
  appId: "1:1098980578820:web:c8d7ab1ee06c5e8e0e8751",
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
