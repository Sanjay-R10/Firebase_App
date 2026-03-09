import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcNUY0_3cw5f-8Pz7bHSfimF7AXu2_0VY",
  authDomain: "fir-todo-app-61cf9.firebaseapp.com",
  projectId: "fir-todo-app-61cf9",
  storageBucket: "fir-todo-app-61cf9.firebasestorage.app",
  messagingSenderId: "798004704818",
  appId: "1:798004704818:web:6c7c80cb24998589756e2b",
  measurementId: "G-W68Y82VC70"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
