import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { getStorage } from 'firebase/storage';

  const firebaseConfig = {
    apiKey: "AIzaSyBrNBg6nU5cK5oM8bljPSYvEzmDCOx6Cdk",
    authDomain: "kchat-6d40c.firebaseapp.com",
    databaseURL: "https://kchat-6d40c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "kchat-6d40c",
    storageBucket: "kchat-6d40c.appspot.com",
    messagingSenderId: "477715243263",
    appId: "1:477715243263:web:39ffac6578e7b650152cca",
    measurementId: "G-XNLXLBGJ55"
  };
  
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage();

export { app ,auth, database, storage, ref, set, push};