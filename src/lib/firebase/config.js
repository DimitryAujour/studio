import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDAlfEYv2pVi7krj_eKIRwRUF4W-g9wOk",
  authDomain: "hidayah-steps.firebaseapp.com",
  projectId: "hidayah-steps",
  storageBucket:"hidayah-steps.firebasestorage.app",
  messagingSenderId: "337415180236",
  appId:"1:337415180236:web:380eb6de0a45b5cb941769"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);

export { auth };