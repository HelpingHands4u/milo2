import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDd_cG9cMVjwL3zrm8MShgFyJaHoewTLhg",
  authDomain: "student-chatbot-ai.firebaseapp.com",
  projectId: "student-chatbot-ai",
  storageBucket: "student-chatbot-ai.firebasestorage.app",
  messagingSenderId: "526263984530",
  appId: "1:526263984530:web:47a4a781f6c1ce6182214b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;