import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDAlfEYv2pVi7krj_eKIRwRUF4W-g9wOk",
  authDomain: "hidayah-steps.firebaseapp.com",
  projectId: "hidayah-steps",
  storageBucket:"hidayah-steps.appspot.com",
  messagingSenderId: "337415180236",
  appId:"1:337415180236:web:380eb6de0a45b5cb941769"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
